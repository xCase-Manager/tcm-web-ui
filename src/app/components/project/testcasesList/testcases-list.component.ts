import {Component, QueryList, ViewChildren, Output, EventEmitter} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';

import {Project} from '../project';
import {TestcaseService} from '../testcase.service';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';

@Component({
  selector: 'app-testcaseslist',
  templateUrl: './testcases-list.component.html',
  styleUrls: ['./testcases-list.component.scss'],
  providers: [TestcaseService, DecimalPipe]
})
export class TestcasesListComponent  {
  @Output() selectedTestcase = new EventEmitter<Project>();
  @Output() createTestcase = new EventEmitter<boolean>();

  page = 1;
  pageSize =10;
  projects$: Observable<Project[]>;
  total$: Observable<number>; 

  @ViewChildren(NgbdSortableHeader) 
  headers: QueryList<NgbdSortableHeader>;
  
  constructor(public service: TestcaseService) {
    this.projects$ = service.projects$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  selectedItem(project: Project){
    this.selectedTestcase.emit(project); 
  }

  create(){
    this.createTestcase.emit(true); 
  }
}