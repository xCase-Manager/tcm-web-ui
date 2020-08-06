import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup,  FormGroupName, FormControl, FormArray, FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

//import { Testcase } from '../../../models/testcase.model';
import { Testcase } from '../testcase';
import { Step } from '../step';

import { SelectedTestcase } from '../selectedtestcase';
import { TestcaseCreateService } from './testcase-create.service';
import { patternValidator } from '../../../utils/pattern-validator';

@Component({
  selector: 'app-testcase-create',
  templateUrl: './testcase-create.component.html',
  styleUrls: ['./testcase-create.component.scss']
})
export class TestcaseCreateComponent implements OnInit {
  
  @Input() currentTestcase: Testcase;
  @Input() currentProject: string;
  @Output() createTestcase = new EventEmitter<Testcase>();

  title = 'Add Test';
  testcaseFormLabel = 'New test'; 
  buttonLabel = 'Create';
  testcaseForm: FormGroup;
  //testcaseCode: FormGroup;
  items: FormArray;

  testcase$: Testcase;
  area: string;
  public selectedTC:SelectedTestcase;

  constructor(
    private testcasecreateservice: TestcaseCreateService, 
    private fb: FormBuilder,
    private router: Router
  ) {
    this.testcaseForm = new FormGroup({
      //email: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),     
      // FormControl([default value input should get], [validator-option])
      //testcaseCode: new FormControl("", Validators.required),
      testcaseTitle: new FormControl("",
                                    Validators.compose([ 
                                          Validators.maxLength(25),
                                          Validators.minLength(5),
                                          Validators.pattern(/[A-Za-z0-9]/),
                                          Validators.required
                                    ])),
      testcaseDescription: new FormControl("", Validators.required),
      steps: this.fb.array([])
   });
  }

  /*
  createForm() {
    this.testcaseForm = this.fb.group({});
    this.testcaseCode.setValue({testcaseCode: this.currentTestcase.id});
  }
  */

  addNext() {
    (this.testcaseForm.controls['steps'] as FormArray).push(this.createStep());
  }

  deleteStep(index) {
    (this.testcaseForm.controls['steps'] as FormArray).removeAt(index);
  }

  createStep(name?, description?): FormGroup{

    return this.fb.group({
      name: new FormControl(name,
                                Validators.compose([ 
                                          Validators.maxLength(25),
                                          Validators.minLength(5),
                                          Validators.pattern(/[A-Za-z0-9]/),
                                          Validators.required
                                ])
                            ),
      description: new FormControl(description, Validators.required)
    });

    /*
    return this.fb.group({
      name: [''],
      description: ['']
    })
    */
  }

  addItem(): void {
    this.items.push(this.createStep());
  }

  submitTestcase() {
    //console.log("---- project code: ----\n%s", this.testcaseForm.get('testcaseCode').value );
    console.log("---- testcase title: ----\n%s", this.testcaseForm.get('testcaseTitle').value );
    console.log("---- testcase description: ----\n%s", this.testcaseForm.get('testcaseDescription').value );

    this.area = "progress";

    console.log("items number: " + this.items.length);
    var steps = [];
    this.items.controls.map( (v) => {
                  //console.log("pushing .... " + this.items.at(0).get("name").value);
                  console.log("pushing .... " + v.get("name").value);
                  steps.push({
                    "name": v.get("name").value, 
                    "description": v.get("description").value
                  });
                }
    )
   
    console.log("-------- Steps elements -------");
    steps.forEach( function(element) {
         console.log(element);
    } )

    if(this.currentTestcase != null && this.currentTestcase.id!=""){
      this.testcasecreateservice.updateTestcase(
        this.currentTestcase.id,
        this.currentTestcase.projectId, 
        this.testcaseForm.get('testcaseTitle').value, 
        this.testcaseForm.get('testcaseDescription').value,
        steps,
        (testcase: Testcase) : void=>  {
                                          this.testcase$ = testcase;
                                          console.log("---- request response: ----\n%s", testcase );
                                          console.log(Object.getOwnPropertyNames(testcase));
                                          console.log("---- testcase updated: ----\n%s", this.testcase$.id );
                                          this.area = "detail";
                                          this.createTestcase.emit(testcase);                                       
                                      }
      );
    }
    else{
        console.log("---- create testcase  ----");

        //this.testcaseForm.controls['steps'],

        /*
        let stepsFormArray = new Array(this.items.length)
        .map( (v, index) => this.items.at(index) as FormGroup);
        */
  
        this.testcasecreateservice.addTestcase(
          this.currentProject, 
          this.testcaseForm.get('testcaseTitle').value, 
          this.testcaseForm.get('testcaseDescription').value,
          steps, 
          (testcase: Testcase) : void=>  {
                                            this.testcase$ = testcase;
                                            console.log("---- request response: ----\n%s", testcase );
                                            console.log("---- testcase created: ----\n%s", this.testcase$.id );
                                            this.area = "detail";
                                            this.createTestcase.emit(testcase);
                                            // change URL
                                            window.history.replaceState({}, '','/testcase/'+this.testcase$.projectId + '-' + this.testcase$.id);
                                        }
        );
        
    }    
  }

  cancel() {
    this.createTestcase.emit(null);
  }

  ngOnInit() {
    this.area = "form";
    this.items = this.testcaseForm.get('steps') as FormArray;

    if(this.currentTestcase!= null && this.currentTestcase.id!=""){
      this.title = 'Update Test';
      this.buttonLabel = 'Update';
      this.testcaseFormLabel = 'Test ' + this.currentTestcase.projectId + "-" + this.currentTestcase.id;
      //this.testcaseForm.get('testcaseCode').setValue(this.currentTestcase.id);
      this.testcaseForm.get('testcaseTitle').setValue(this.currentTestcase.title);
      this.testcaseForm.get('testcaseDescription').setValue(this.currentTestcase.description);
      for(var i=0; i < this.currentTestcase.steps.length; i++){
        this.items = this.testcaseForm.get('steps') as FormArray;

        this.items.push(this.createStep(this.currentTestcase.steps[i].name, 
                                      this.currentTestcase.steps[i].description));
        /*
        this.items.push(this.fb.group(
          { name: this.currentTestcase.steps[i].name, 
            description: this.currentTestcase.steps[i].description
          }));
        */
      } 
    }
  }
}