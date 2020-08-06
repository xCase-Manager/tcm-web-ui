import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, AfterViewChecked, Renderer2, ElementRef} from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams, HttpClientModule, HttpRequest} from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Project } from '../project';
import { SelectedProject } from '../selectedproject';
import { ProjectComponent } from '../project.component';
import { ProjectService } from '../project.service';

interface IProject {
  id: string;
  name: string;
}

@Component({
  selector: 'app-projectView',
  templateUrl: './projectView.component.html'
})
export class ProjectViewComponent implements OnInit{

  public project$;
  public selectedTC:SelectedProject;
  public errorMessageProjectNotFound$:string;

  currentProjectId:string;
  title = 'Project View';

  @Input() currentProject: Project;
  @Output() status = new EventEmitter<string>();

  /*
  testcases = [
    new Testcase("A0001", 'Windstorm'),
    new Testcase("A0002", 'Bombasto'),
    new Testcase("A0003", 'Magneta'),
    new Testcase("A0004", 'Tornado')
  ];

  currentTestcase = this.testcases[0];
  */

  constructor(
    private router: Router,
    private route:  ActivatedRoute,
    private http: HttpClient,
    private projectService: ProjectService,
    //private testcase: Testcase
    ) { 
      
    }

  ngOnInit() {
    /*
      this.route.queryParams.subscribe(params => {
      this.currentTestcaseId = this.route.snapshot.params.id;
    });
    */

    //this.testcase$ = this.currentTestcaseId;
    /*
    if(this.currentTestcaseId!=null)
      this.getTestcase(this.currentTestcaseId); 
    */
  }

  public getTestcase(projectId: string): Subscription {
    
    return this.http.get<IProject>('/api/projects/' + projectId, {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe((data) => {
          var dataString = data.toString();
          console.log("datastring: %s", dataString);
          var dataJSON = JSON.parse(dataString);
          this.project$ = dataJSON;
      }, error => {
        this.errorMessageProjectNotFound$ = "Project '" + projectId + "' could not be found";
      })
  }

  public edit(){
    this.status.emit("update");
    console.log("project view - update");
  }
}