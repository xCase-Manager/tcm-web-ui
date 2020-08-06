import { Component, OnInit, AfterViewChecked, Renderer2, ElementRef } from '@angular/core';
import { TestcaseService } from '../testcase.service';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'testcaseSearch',
  templateUrl: './testcaseSearch.component.html',
  styleUrls: ['./testcaseSearch.component.scss']
})
export class TestcaseSearchComponent implements OnInit, AfterViewChecked{

  //sorting
  key: string = 'name';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;

  // search
  searchTerm$ = new Subject<string>();

  // testcase list
  reloadedList$ = true;

  // datatable
  testcases = undefined;

  testcaseFilter: any = { id: '', title: ''};

  //sorting
  testcaseKey: string = 'title';
  listReverse: boolean = false;
  testcaseSort(key){
    console.log("key: " + key);
    console.log("testcaseKey: " + this.testcaseKey);
    this.testcaseKey = key;
    this.listReverse = !this.listReverse;
  }

  // error message
  errorMessageTestCaseNotFound$

  listPage: number = 1;

  constructor(
      private testcaseService: TestcaseService,
      private renderer: Renderer2, 
      private el: ElementRef
  ) {

    this.searchTerm$.subscribe({
      next: (response) => {
          //do stuff. The property name "response" references the value
          this.testcases = undefined;
          this.reloadedList$ = false;
      }
    });

    this.testcaseService.search("AAA01", this.searchTerm$)
     .subscribe(data => {
        this.testcases = data;
        this.reloadedList$ = true;
      });
  }

  ngOnInit() {  

    this.testcases = undefined;
    this.reloadedList$ = false;

    this.testcaseService.getTestcasesList("AAA01").subscribe((data) => {
          console.log("list testcases: " + Object.getOwnPropertyNames(data));
          console.log("list testcases: " + data.length);
          this.testcases = data;
          this.reloadedList$ = true;
          console.log("list templ testcases: " + Object.getOwnPropertyNames(this.testcases));
          console.log("list templ testcases: " + this.testcases.length);
          console.log("test id: %s - %s", this.testcases[0].id, this.testcases[0].projectId);
      }, error => {
        console.log("error: " + error);
        this.errorMessageTestCaseNotFound$ = "Test cases could not be found";
      }
    ); 
  }

  ngAfterViewChecked() {
    /*
      change values styles of pagination controls to be centered 
    */
    var ele = document.querySelector("pagination-template ul");
    if(ele != null){
      this.renderer.setStyle(ele, 'width', 'fit-content');
      this.renderer.setStyle(ele, 'display', 'block');
      this.renderer.setStyle(ele, 'margin-left', 'auto');
      this.renderer.setStyle(ele, 'margin-right', 'auto');
      this.renderer.setStyle(ele, 'padding', '0');
    }

  }
}