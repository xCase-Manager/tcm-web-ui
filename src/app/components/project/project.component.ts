import { Component, OnInit, AfterViewInit, Renderer2, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TabsetConfig } from 'ngx-bootstrap/tabs';
import { Subscription } from 'rxjs';
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
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.area = "list";
    this.currentProject = {id: "", name: "", description: ""};
    this.status = "edit";
    
    this.route.queryParams.subscribe(params => {
      var projectId = null;
      if(this.route.snapshot.params.id!=null){
        projectId= this.route.snapshot.params.id;
      }

      if(projectId!=null){
        if(this.currentProject.id==''){
          this.getProject(projectId);
          this.area = "detail";
          this.status = "edit";
        }
        else if(this.currentProject.id!=''){
          this.getProject(projectId);
          this.area = "detail";
          this.status = "edit";
        }
      }
      else{
            this.area = "detail";
            this.status = "create";
          }    
    }); 
  }

  ngAfterViewInit() {}

  public getProject(projectId: string): Subscription {
    return this.http.get<Project>('/api/projects/' + projectId, {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe((data) => {
          this.currentProject = data;
      }, error => {
        this.errorMessageProjectNotFound$ = "Project '" + projectId + "' could not be found";
      })
  }

  public onCreate(project: Project) {
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