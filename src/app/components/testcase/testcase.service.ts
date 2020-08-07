import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subscription} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Testcase } from './testcase';

@Injectable()
export class TestcaseService {
  constructor(private http: HttpClient) { }
  testcase: Testcase;
  
  public getTestcase(testcaseId: string): Subscription {
    return this.http.get<Testcase>('/api/projects/' + testcaseId, {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe((data) => {
          const dataJSON = JSON.parse(data.toString());
          this.testcase = {
              id: dataJSON.id,
              title: dataJSON.title,
              projectId: dataJSON.projectId,
              description: dataJSON.description,
              steps: data.steps
          };
      })   
  }

  public getTestcasesList(projectId: string, search?: string): Observable<Testcase[]> {
    let url = projectId? '/api/projects/' + projectId + '/testcases' : '/api/testcases';
    if(search!=undefined)
      url += '?search='+search;
    return this.http.get<Testcase[]>(url, {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  search(projectId: string, terms: Observable<string>): Observable<Testcase[]>{
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.getTestcasesList(projectId, term));
  }

  public getTestcaseBIS(testcaseId: string) : Observable<Object>{   
    var jsonRes = null;
    return this.http.get('/api/projects/' + testcaseId, {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  public getTestcaseBISBIS(testcaseId: string) : Observable<any>{ 
    let response = this.http.get('/api/projects/' + testcaseId, {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).map((res: Response) => res.json());
    return response;
  }

  public fetchTestcase(testcaseId: string) {
    return this.http.get('/api/projects/' + testcaseId).map((res: Response) => res.json())
  }

  public addProject(projectCode: string, projectName: string, projectDescription: string): Subscription {
    let stringJson = 
                    '{' +
                    '"id": "' + projectCode + '",' +
                    '"name": "' + projectName + '",' +
                    '"description": "' + projectDescription + '"' +
                    '}';

    return this.http.post("/api/projects", JSON.parse(stringJson), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).pipe()
        .map((res: Response) => console.log("Response from server: %s", res))
        .catch((err) => {
            console.log("POST error: %s", err)
            return Observable.throw(err)
        }).subscribe(res => console.log("Response from server: %s", res));
  }
}