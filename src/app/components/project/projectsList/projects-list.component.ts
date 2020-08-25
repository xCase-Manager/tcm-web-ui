import {Component, QueryList, ViewChildren, Output, EventEmitter} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';

import {Project} from '../project';
import {ProjectService} from '../project.service';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';

@Component({
  selector: 'app-projectslist',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
  providers: [ProjectService, DecimalPipe]
})
export class ProjectsListComponent  {
  @Output() selectedProject = new EventEmitter<Project>();
  @Output() createProject = new EventEmitter<boolean>();

  page = 1;
  pageSize =10;
  projects$: Observable<Project[]>;
  total$: Observable<number>; 

  @ViewChildren(NgbdSortableHeader) 
  headers: QueryList<NgbdSortableHeader>;
  
  constructor(public service: ProjectService) {
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
    this.selectedProject.emit(project); 
  }

  create(){
    this.createProject.emit(true); 
  }
}