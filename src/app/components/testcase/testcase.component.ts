import { Component, OnInit, AfterViewInit, Renderer2, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { TabsetConfig } from 'ngx-bootstrap/tabs';
import { Subscription } from 'rxjs';
import {Testcase} from './testcase';
import { Globals } from '../../globals';

export function getTabsetConfig(): TabsetConfig {
  return Object.assign(new TabsetConfig(), { type: 'pills' });
}

@Component({
  selector: 'app-testcase',
  templateUrl: './testcase.component.html',
  styleUrls: ['./testcase.component.scss'],
  providers: [{ provide: TabsetConfig, useFactory: getTabsetConfig }, Globals]
})
export class TestcaseComponent implements OnInit, AfterViewInit {
  area:string;
  currentTestcase:Testcase;
  message:string;
  status:string;
  errorMessageTestCaseNotFound$:string;
  currentProjectId:string;
 
  constructor(
    private router: Router,
    private route:  ActivatedRoute,
    private http: HttpClient,
    private renderer: Renderer2, 
    private el: ElementRef,
    private globals: Globals
    ) {}

  ngOnInit() {
    this.area = "list";
    this.currentTestcase = {id: "", title: "", description: "", projectId: "", steps: []};
    this.status = "edit";

    this.currentProjectId = this.globals.currentProjectId;
    
    this.route.queryParams.subscribe(params => {
      var testcaseId, projectId = null;
      const param = this.route.snapshot.params.id;
      if(param!=null){
        if(param.indexOf("-") < 0){
          this.currentProjectId = this.route.snapshot.params.id;
          projectId = this.currentProjectId;
          testcaseId = null;
          console.log(" ---- > found project id " + this.currentProjectId);
        }else{
          testcaseId= this.route.snapshot.params.id.substr(this.route.snapshot.params.id.indexOf('-') + 1);
          projectId= this.route.snapshot.params.id.substr(0, this.route.snapshot.params.id.indexOf('-'));
        }   
      }

      if(testcaseId!=null){
        if(this.currentTestcase.id==''){
          this.getTestcase(testcaseId, projectId);
          this.area = "detail";
          this.status = "edit";
        }
        else if(this.currentTestcase.id!=''){
          this.getTestcase(testcaseId, projectId);
          this.area = "detail";
          this.status = "edit";
        }
      }
      else if(projectId==null){
            this.area = "detail";
            this.status = "create";
          }    
    }); 
  }

  ngAfterViewInit() {}

  public getTestcase(testcaseId: string, projectId: string): Subscription {
    return this.http.get<Testcase>('/api/projects/' + projectId + '/testcases/' + testcaseId, {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe((data) => {
          this.currentTestcase = data;
      }, error => {
        this.errorMessageTestCaseNotFound$ = "Test case '" + testcaseId + "' could not be found";
      })
  }

  public onCreate(testcase: Testcase) {
    if(testcase!=null){
      this.currentTestcase = testcase;
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