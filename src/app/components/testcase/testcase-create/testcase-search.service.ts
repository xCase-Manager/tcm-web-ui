import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams, HttpClientModule, HttpRequest} from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, Subscription, pipe} from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { Testcase } from '../testcase';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Injectable()
export class TestcaseSearchService {

  constructor(private http: HttpClient) { }

  public addTestcase(
    projectCode: string, projectName: string, 
    projectDescription: string,
    steps: string[],
    callback: (tescase: Testcase)=>void): Subscription {

    var stringJson = 
                    '{' +
                    '"title": "' + projectName + '",' +
                    '"description": "' + projectDescription + '",' +
                    '"steps": ' + JSON.stringify(steps)  +
                    '}';
    
    console.log("JSON: " + stringJson);
    
    var json = JSON.parse(stringJson);

    return this.http.post("/api/projects/" + projectCode + "/testcases", json, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe(

      value => {
        console.log(value);
        callback(<Testcase>value);
      },
      err => {
        console.error('test case creation error:', err.message);
      }
    );
  }


  public updateTestcase(
    testcaseId: string,
    projectId: string,
    testcaseTitle: string, 
    testcaseDescription: string,
    steps: string[],
    callback: (tescase: Testcase)=>void): Subscription {
    var stringJson = 
                    '{' +
                    '"title": "' + testcaseTitle + '",' +
                    '"description": "' + testcaseDescription + '",' +
                    '"steps": ' + JSON.stringify(steps)  +
                    '}';
    
    console.log("JSON: " + stringJson);
    
    var json = JSON.parse(stringJson);

    return this.http.put("/api/projects/" + projectId + "/testcases/" + testcaseId, json, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe(

      value => {
        console.log(value);
        callback(<Testcase>value);
      },
      err => {
        console.error('test case creation error:', err.message);
      }
    );
  }

}
