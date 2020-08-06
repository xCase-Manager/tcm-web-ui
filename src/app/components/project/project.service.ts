import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams, HttpClientModule, HttpRequest} from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, Subscription, pipe} from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { Project } from './project';

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient) { }

  project: Project;
  
  public getTestcase(projectId: string): Subscription {
    
    var jsonRes = null;
    return this.http.get<Project>('/api/projects/' + projectId, {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe((data) => {
          console.log("got project data : %s - %s", data, data.id);
          var dataString = data.toString();
          var dataJSON = JSON.parse(dataString);
          this.project = {
              id: dataJSON.id,
              name: dataJSON.name,
              description: dataJSON.description,
          };
          console.log("project name: %s", this.project.name);
          console.log("project id: %s", this.project.id);
          jsonRes = this.project;

      })    
  }

  public getProjectsList(search?: string): Observable<Project[]> {
    console.log("getProjectsList: %s", search);
    var url = '/api/projects';

    if(search!=undefined)
      url += '?search='+search;

    return this.http.get<Project[]>(url, {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  search(terms: Observable<string>): Observable<Project[]>{
    console.log("searching: %s", terms);
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.getProjectsList(term));
  }

  public getProjectBIS(projectId: string) : Observable<Object>{   
    var jsonRes = null;
    return this.http.get('/api/projects/' + projectId, {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  public getProjectBISBIS(projectId: string) : Observable<any>{ 
  
    let response = this.http.get('/api/projects/' + projectId, {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).map((res: Response) => res.json());
    return response;
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


  addProject2(projectId: string, projectName: string, projectDescription: string): Subscription {

    const uri = '/api/projects';

    const projectObject = {
      id: projectId,
      name: projectName,
      description: projectDescription
    };

    // creat an object map for headers
    const headers = {
      headers: {'Content-Type':'json','header2':'value2'}
   };

   var stringJson = '{"id":"AAA10", "name":"nameAAA10", "description":"DescAAA10"}';
   var json = JSON.parse(stringJson);

   // build request
   const req = new HttpRequest('POST', uri, json, {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  });

   //req.headers.set('Content-Type', 'application/json')

   return this.http.request(req)
   .pipe(
    //map(res => res.data) // or any other operator
  )
  .subscribe(res => console.log(res));

  /*
    return this.http.post(uri, JSON.stringify(projectObject), headers)
    .pipe(
      //map(res => res.data) // or any other operator
    )
    .subscribe(res => console.log(res));
    */

    /** POST: add a new hero to the database */

}


}