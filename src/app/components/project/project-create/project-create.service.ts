import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Subscription} from 'rxjs/Rx';
import { Project } from '../project';

@Injectable()
export class ProjectCreateService {

  constructor(private http: HttpClient) { }

  public addProject(
    projectId: string,
    projectName: string, 
    projectDescription: string,
    callback: (project: Project)=>void): Subscription {

    var stringJson = 
                    '{' +
                    '"id": "' + projectId + '",' +
                    '"name": "' + projectName + '",' +
                    '"description": "' + projectDescription + '"' +
                    '}';
    
    var json = JSON.parse(stringJson);

    return this.http.post("/api/projects", json, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe(

      value => {
        callback(<Project>value);
      },
      err => {
        console.error('Project creation error:', err.message);
      }
    );
  }

  public updateProject(
    projectId: string,
    projectName: string,
    projectDescription: string,
    callback: (project: Project)=>void): Subscription {
    var stringJson = 
                    '{' +
                    '"name": "' + projectName + '",' +
                    '"description": "' + projectDescription + '"' +
                    '}';
    
    console.log("JSON: " + stringJson);
    
    var json = JSON.parse(stringJson);

    return this.http.put("/api/projects/" + projectId, json, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe(

      value => {
        console.log(value);
        callback(<Project>value);
      },
      err => {
        console.error('test case creation error:', err.message);
      }
    );
  }
}
