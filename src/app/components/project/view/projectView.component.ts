import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from '../project';
import { SelectedProject } from '../selectedproject';
import { ProjectService } from '../project.service';

interface IProject {
  id: string;
  name: string;
}

@Component({
  selector: 'app-projectView',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit{

  public project$;
  public selectedTC:SelectedProject;
  public errorMessageProjectNotFound$:string;

  currentProjectId:string;
  title = 'Project View';

  @Input() currentProject: Project;
  @Output() status = new EventEmitter<string>();
  @Output() area = new EventEmitter<string>();

  constructor(
    private router: Router,
    private route:  ActivatedRoute,
    private http: HttpClient,
    private projectService: ProjectService,
    ) {}

  ngOnInit() {}

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
  }

  public testcasesList(){
    this.status.emit("testcaseList");
  }
}