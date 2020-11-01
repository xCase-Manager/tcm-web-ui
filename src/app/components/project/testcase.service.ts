import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TCItem } from './tc-item';
import { Testcase } from './testcase';
import { TCResult } from './result';
import { TCSearchResult } from './searchresult';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap, map } from 'rxjs/operators';
import { SortColumn, SortDirection } from './testcasesList/sortable.directive';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { environment } from './../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, 
  v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sort(testcases: Testcase[], column: SortColumn, 
  direction: string): Testcase[] {
  if (direction === '' || column === '') {
    return testcases;
  } else {
    return [...testcases].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(testcase: Testcase, term: string, pipe: PipeTransform) {
  return testcase.name.toLowerCase().includes(term.toLowerCase())
    || testcase.description.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(testcase.status).includes(term);
}

@Injectable({providedIn: 'root'})
export class TestcaseService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _testcases$ = new BehaviorSubject<Testcase[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private testcasesUrl = environment.apiUrl + '/testcases';
  private handleError: HandleError;

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(
    private http: HttpClient,
    private pipe: DecimalPipe,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TCMService');
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._testcases$.next(result.testcases);
      this._total$.next(result.total);
    });
    this._search$.next();
  }

  get testcases$() { return this._testcases$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { 
    this._set({sortDirection}); 
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<TCSearchResult> {
    return this.http.get(this.testcasesUrl, httpOptions).pipe(
      map(res => {
        var list = JSON.parse(JSON.stringify(res)).map(
          item => {
            return new TCItem(
              item.id,
              item.name,
              item.description,
              item.status,
              item.projectId
            );
          }
        )
        const { sortColumn, sortDirection, pageSize, page, 
          searchTerm } = this._state;
        let testcases = sort(list, sortColumn, sortDirection);
        testcases = testcases.filter(
          testcase => matches(testcase, searchTerm, this.pipe)
        );
        const total = testcases.length;
        testcases = testcases.slice(
          (page - 1) * pageSize, (page - 1) * pageSize + pageSize); 
        var res:Object = new TCResult(testcases, total);
        return res as TCSearchResult;
      })
    )
  }
}