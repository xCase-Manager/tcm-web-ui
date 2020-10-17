import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Item } from './item';
import { Project } from './project';
import { Result } from './result';
import { SearchResult } from './searchresult';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap, map } from 'rxjs/operators';
import { SortColumn, SortDirection } from './projectsList/sortable.directive';
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
function sort(projects: Project[], column: SortColumn, 
  direction: string): Project[] {
  if (direction === '' || column === '') {
    return projects;
  } else {
    return [...projects].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(project: Project, term: string, pipe: PipeTransform) {
  return project.name.toLowerCase().includes(term.toLowerCase())
    || project.description.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(project.status).includes(term);
}

@Injectable({providedIn: 'root'})
export class ProjectService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _projects$ = new BehaviorSubject<Project[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private projectsUrl = environment.apiUrl + '/projects';
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
      this._projects$.next(result.projects);
      this._total$.next(result.total);
    });
    this._search$.next();
  }

  get projects$() { return this._projects$.asObservable(); }
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

  private _search(): Observable<SearchResult> {
    return this.http.get(this.projectsUrl, httpOptions).pipe(
      map(res => {
        var list = JSON.parse(JSON.stringify(res)).map(
          item => {
            return new Item(
              item.id,
              item.name,
              item.description,
              item.icon,
              item.status
            );
          }
        )
        const { sortColumn, sortDirection, pageSize, page, 
          searchTerm } = this._state;
        let projects = sort(list, sortColumn, sortDirection);
        projects = projects.filter(
          project => matches(project, searchTerm, this.pipe)
        );
        const total = projects.length;
        projects = projects.slice(
          (page - 1) * pageSize, (page - 1) * pageSize + pageSize); 
        var res:Object = new Result(projects, total);
        return res as SearchResult;
      })
    )
  }
}