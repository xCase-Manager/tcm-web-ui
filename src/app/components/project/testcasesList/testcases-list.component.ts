import {Component, QueryList, ViewChild, ViewChildren, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {Project} from '../project';
import {Testcase} from '../testcase';
import {TestcaseService} from '../testcase.service';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';

@Component({
  selector: 'app-testcaseslist',
  templateUrl: './testcases-list.component.html',
  styleUrls: ['./testcases-list.component.scss'],
  providers: [TestcaseService, DecimalPipe]
})
export class TestcasesListComponent  {
  @Input() currentProject: Project;
  @Output() selectedTestcase = new EventEmitter<Testcase>();
  @Output() createTestcase = new EventEmitter<boolean>();
  @Output() goback = new EventEmitter<boolean>();
  @ViewChild('logo') logoImage: ElementRef;
  @ViewChildren(NgbdSortableHeader) 

  page = 1;
  pageSize =10;
  testcases$: Observable<Testcase[]>;
  total$: Observable<number>; 
  headers: QueryList<NgbdSortableHeader>;
  
  constructor(public service: TestcaseService) {
    this.testcases$ = service.testcases$;
    this.total$ = service.total$;
  }

  ngOnChanges() {
    if (this.currentProject)   
      this.logoImage.nativeElement.setAttribute('src',this.currentProject.icon); 
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

  selectedItem(testcase: Testcase){
    this.selectedTestcase.emit(testcase); 
  }

  create(){
    this.createTestcase.emit(true); 
  }

  gotoProjectDetails(){
    this.goback.emit(true); 
  }
}