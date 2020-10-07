import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Project} from './project';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';


const httpOptions = {
  
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class TCMService {
  projectsUrl = 'http://localhost:3000/api/projects';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TCMService');
  }

  /** GET projects */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getProject', []))
      );
  }
}