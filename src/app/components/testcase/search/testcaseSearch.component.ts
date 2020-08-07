import { Component, OnInit, Input, AfterViewChecked, Renderer2, ElementRef } from '@angular/core';
import { TestcaseService } from '../testcase.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'testcaseSearch',
  templateUrl: './testcaseSearch.component.html',
  styleUrls: ['./testcaseSearch.component.scss']
})
export class TestcaseSearchComponent implements OnInit, AfterViewChecked{

  @Input() currentProject: string;

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
          this.testcases = undefined;
          this.reloadedList$ = false;
      }
    });

    this.testcaseService.search(this.currentProject, this.searchTerm$)
     .subscribe(data => {
        this.testcases = data;
        this.reloadedList$ = true;
      });
  }

  ngOnInit() {  
    this.testcases = undefined;
    this.reloadedList$ = false;
    this.testcaseService.getTestcasesList(this.currentProject).subscribe((data) => {
          this.testcases = data;
          this.reloadedList$ = true;
      }, error => {
        console.log("error: " + error);
        this.errorMessageTestCaseNotFound$ = "Test cases could not be found.";
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