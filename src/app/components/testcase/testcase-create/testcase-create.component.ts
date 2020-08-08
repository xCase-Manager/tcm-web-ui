import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup,  FormControl, FormArray, FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Testcase } from '../testcase';
import { SelectedTestcase } from '../selectedtestcase';
import { TestcaseCreateService } from './testcase-create.service';

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
  items: FormArray;

  testcase$: Testcase;
  area: string;
  public selectedTC:SelectedTestcase;

  constructor(
    private testcasecreateservice: TestcaseCreateService, 
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.testcaseForm = new FormGroup({
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
  }

  addItem(): void {
    this.items.push(this.createStep());
  }

  submitTestcase() {
    this.area = "progress";
    var steps = [];
    this.items.controls.map( (v) => {
                  console.log("pushing ... " + v.get("name").value);
                  steps.push({
                    "name": v.get("name").value, 
                    "description": v.get("description").value
                  });
                }
    )
  
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
                                          this.area = "detail";
                                          this.createTestcase.emit(testcase);                                       
                                      }
      );
    }
    else{
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
                                            window.history.replaceState({}, '','/testcase/'+this.testcase$.projectId + '-' + this.testcase$.id);
                                        }
        );     
    }    
  }

  cancel() {
    this.createTestcase.emit(null);
  }

  ngOnInit() {
    this.currentProject = this.route.snapshot.queryParamMap.get("projectId");
    console.log(" testcase create -- currentProjectId: " + this.currentProject);
    this.area = "form";
    this.items = this.testcaseForm.get('steps') as FormArray;
    if(this.currentTestcase!= null && this.currentTestcase.id!=""){
      this.title = 'Update Test';
      this.buttonLabel = 'Update';
      this.testcaseFormLabel = 'Test ' + this.currentTestcase.projectId + "-" + this.currentTestcase.id;
      this.testcaseForm.get('testcaseTitle').setValue(this.currentTestcase.title);
      this.testcaseForm.get('testcaseDescription').setValue(this.currentTestcase.description);
      for(var i=0; i < this.currentTestcase.steps.length; i++){
        this.items = this.testcaseForm.get('steps') as FormArray;
        this.items.push(this.createStep(this.currentTestcase.steps[i].name, 
                                      this.currentTestcase.steps[i].description));
      } 
    }
  }
}