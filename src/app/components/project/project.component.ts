import { Component, OnInit, AfterViewInit, Renderer2, ElementRef} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams, HttpClientModule, HttpRequest} from '@angular/common/http';
import { TabsetConfig } from 'ngx-bootstrap/tabs';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {Project} from './project';
import { Globals } from '../../globals';

export function getTabsetConfig(): TabsetConfig {
  return Object.assign(new TabsetConfig(), { type: 'pills' });
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [{ provide: TabsetConfig, useFactory: getTabsetConfig }, Globals]
})
export class ProjectComponent implements OnInit, AfterViewInit {
  area:string;
  currentProject:Project;
  message:string;
  status:string;
  errorMessageProjectNotFound$:string;
 
  constructor(
    private router: Router,
    private route:  ActivatedRoute,
    private http: HttpClient,
    private renderer: Renderer2, 
    private el: ElementRef,
    private globals: Globals
  ) {}

  ngOnInit() {

    this.globals.currentProjectId = "AAA01";

    this.area = "list";
    this.currentProject = {id: "", name: "", description: ""};
    this.status = "edit";
    
    this.route.queryParams.subscribe(params => {
      var projectId = null;
      if(this.route.snapshot.params.id!=null){
        projectId= this.route.snapshot.params.id;
      }
      console.log("----- queryparam");

      if(projectId!=null){
        console.log("----- id not null");
        if(this.currentProject.id==''){
          console.log("----- project details: %s", projectId);
          this.getProject(projectId);
          this.area = "detail";
          this.status = "edit";
        }
        else if(this.currentProject.id!=''){
          console.log("----- NEW & current project not null");
          this.getProject(projectId);
          this.area = "detail";
          this.status = "edit";
        }
      }
      else{
            console.log("----- create");
            this.area = "detail";
            this.status = "create";
          }    
    }); 
  }

  ngAfterViewInit() {}

  public getProject(projectId: string): Subscription {
    console.log("url: %s", '/api/projects/' + projectId);
    return this.http.get<Project>('/api/projects/' + projectId, {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe((data) => {
          console.log("got project id: %s", data.id);
          this.currentProject = data;
      }, error => {
        this.errorMessageProjectNotFound$ = "Project '" + projectId + "' could not be found";
      })
  }

  public onCreate(project: Project) {
    // update successul
    if(project!=null){
      this.currentProject = project;
      this.message = "Update successful";
    }else{
      this.message = "";
    }
    this.status = "edit";
  }

  public onEdit(status: string) {
    this.status = status;
  }
}