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


import { Testcase } from './testcase';
//import { Testcase } from '../../models/testcase.model';

@Injectable()
export class TestcaseService {

  
  constructor(private http: HttpClient) { }

  testcase: Testcase;
  
  public getTestcase(testcaseId: string): Subscription {
    
    var jsonRes = null;
    return this.http.get<Testcase>('/api/projects/' + testcaseId, {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe((data) => {
          console.log("got testcase data : %s - %s", data, data.id);
          var dataString = data.toString();
          var dataJSON = JSON.parse(dataString);
          this.testcase = {
              id: dataJSON.id,
              title: dataJSON.title,
              projectId: dataJSON.projectId,
              description: dataJSON.description,
              steps: data.steps
          };
          console.log("testcase: %s", this.testcase.title);
          console.log("testcase: %s", this.testcase.id);
          jsonRes = this.testcase;

          /*
          getUser(): Observable<User[]> {
            return this.http.get('/api/user')
              .map((res: Response) => res.json().response.map((user: User) => new User().deserialize(user)));
          }
          */

      })
        
       /*
       .subscribe(data => {
        console.log("subscribe - Response from server: %s", data);
        var dataString = data.toString();
        console.log("subscribe - Response from server: %s", dataString);
        var dataJSON = JSON.parse(dataString);
        console.log("subscribe - Response from server: %s", dataJSON);
        console.log("subscribe - Response from server: %s", dataJSON.name);
      });
      */
      

    /*
        .subscribe(data => {
          console.log("subscribe - Response from server: %s", data)
        });
        */

        //console.log("return - Response from server: %s", res);     
  }

  public getTestcasesList(projectId: string, search?: string): Observable<Testcase[]> {
    
    var url = '/api/projects/' + projectId + '/testcases';

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
    var stringJson = 
                    '{' +
                    '"id": "' + projectCode + '",' +
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


  addProject2(projectCode: string, projectName: string, projectDescription: string): Subscription {

    const uri = '/api/projects';

    const projectObject = {
      id: projectCode,
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

get getTestcasesL() {
  return "";
  //return this.getTestcasesList();
}

/*
  addProject(projectCode, projectName, projectDescription) {

    const uri = 'http://localhost:3000/projects';

    const projectObject = {
      id: projectCode,
      name: projectName,
      description: projectDescription
    };

   
    let headers = new Headers();
headers.append('Content-Type','Application/json');

    this.http.post(
      uri, 
      JSON.stringify(projectObject), 
      {headers: headers})
        .subscribe(res => console.log('Done'));

  }
*/
}