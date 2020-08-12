import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable, Subscription} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Project } from './project';

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient) { }

  project: Project;

  public getProjectsList(search?: string): Observable<Project[]> {
    var url = '/api/projects';
    if(search!=undefined)
      url += '?search='+search;
    return this.http.get<Project[]>(url, {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  search(terms: Observable<string>): Observable<Project[]>{
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.getProjectsList(term));
  }

  public fetchProject(projectId: string) {
    return this.http.get('/api/projects/' + projectId).map((res: Response) => res.json())
  }

  public addProject(projectId: string, projectName: string, projectDescription: string): Subscription {
    var stringJson = 
                    '{' +
                    '"id": "' + projectId + '",' +
                    '"name": "' + projectName + '",' +
                    '"description": "' + projectDescription + '"' +
                    '}';
    
    var json = JSON.parse(stringJson);

    return this.http.post("/api/projects", json, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).pipe()
        .map((res: Response) => console.log("Response from server: %s", res))
        .catch((err) => {
            console.log("POST error: %s", err)
            return Observable.throw(err)
        }).subscribe(res => console.log("Response from server: %s", res));
  }
}