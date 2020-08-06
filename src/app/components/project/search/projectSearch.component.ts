import { Component, OnInit, AfterViewChecked, Renderer2, ElementRef } from '@angular/core';
import { ProjectService } from '../project.service';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'projectSearch',
  templateUrl: './projectSearch.component.html',
  styleUrls: ['./projectSearch.component.scss']
})
export class ProjectSearchComponent implements OnInit, AfterViewChecked{

  //sorting
  key: string = 'name';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;

  // search
  searchTerm$ = new Subject<string>();

  // project list
  reloadedList$ = true;

  // datatable
  projects = undefined;

  projectFilter: any = { id: '', name: ''};

  //sorting
  projectKey: string = 'name';
  listReverse: boolean = false;
  projectSort(key){
    console.log("key: " + key);
    console.log("projectKey: " + this.projectKey);
    this.projectKey = key;
    this.listReverse = !this.listReverse;
  }

  // error message
  errorMessageprojectNotFound$

  listPage: number = 1;

  constructor(
      private projectService: ProjectService,
      private renderer: Renderer2, 
      private el: ElementRef
  ) {

    this.searchTerm$.subscribe({
      next: (response) => {
          //do stuff. The property name "response" references the value
          this.projects = undefined;
          this.reloadedList$ = false;
      }
    });

    this.projectService.search(this.searchTerm$)
     .subscribe(data => {
        this.projects = data;
        this.reloadedList$ = true;
      });
  }

  ngOnInit() {  

    this.projects = undefined;
    this.reloadedList$ = false;

    this.projectService.getProjectsList().subscribe((data) => {
      console.log("list projects: " + Object.getOwnPropertyNames(data));
      console.log("list projects: " + data.length);
      this.projects = data;
      this.reloadedList$ = true;
      console.log("list templ projects: " + Object.getOwnPropertyNames(this.projects));
      console.log("list templ projects: " + this.projects.length);
      console.log("project id: %s", this.projects[0].id);
      console.log("project name: %s", this.projects[0].name);
      }, error => {
        console.log("error: " + error);
        this.errorMessageprojectNotFound$ = "Projects could not be found";
      }
    ); 
  }

  ngAfterViewChecked() {
    /*
      change values styles of pagination controls to be centered 
    */
    var ele = document.querySelector("pagination-template ul");
    if(ele != null){
      this.renderer.setStyle(ele, 'width', 'fit-content');
      this.renderer.setStyle(ele, 'display', 'block');
      this.renderer.setStyle(ele, 'margin-left', 'auto');
      this.renderer.setStyle(ele, 'margin-right', 'auto');
      this.renderer.setStyle(ele, 'padding', '0');
    }

  }
}