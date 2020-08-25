import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, AfterViewChecked, Renderer2, ElementRef} from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams, HttpClientModule, HttpRequest} from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Testcase } from '../testcase';
import { SelectedTestcase } from '../selectedtestcase';
import { TestcaseComponent } from '../testcase.component';
import { TestcaseService } from '../testcase.service';

interface ITestcase {
  id: string;
  name: string;
}

@Component({
  selector: 'app-testcaseView',
  templateUrl: './testcaseView.component.html'
})
export class TestcaseViewComponent implements OnInit{

  public testcase$;
  public selectedTC:SelectedTestcase;
  public errorMessageTestCaseNotFound$:string;

  currentTestcaseId:string;
  title = 'Testcase View';

  @Input() currentTestcase: Testcase;
  @Output() status = new EventEmitter<string>();

  constructor(
    private router: Router,
    private route:  ActivatedRoute,
    private http: HttpClient,
    private testcaseService: TestcaseService,
    ) {}

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

  public getTestcase(testcaseId: string): Subscription {
    
    return this.http.get<ITestcase>('/api/projects/' + testcaseId, {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe((data) => {
          var dataString = data.toString();
          console.log("datastring: %s", dataString);
          var dataJSON = JSON.parse(dataString);
          this.testcase$ = dataJSON;
      }, error => {
        this.errorMessageTestCaseNotFound$ = "Test case '" + testcaseId + "' could not be found";
      })
  }

  public edit(){
    this.status.emit("update");
    console.log("testcase view - update");
  }
}