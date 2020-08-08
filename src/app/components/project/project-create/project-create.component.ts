import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup,  FormControl, FormArray, FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from '../../../globals';
import { Project } from '../project';

import { ProjectCreateService } from './project-create.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  @Input() currentProject: Project;
  @Output() createProject = new EventEmitter<Project>();

  title = 'Add Test';
  projectFormLabel = 'New test'; 
  buttonLabel = 'Create';
  projectForm: FormGroup;
  items: FormArray;

  project$: Project;
  area: string;
  
  constructor(
    private projectCreateService: ProjectCreateService, 
    private fb: FormBuilder,
    private router: Router,
    private globals: Globals
  ) {

    let projectIdControl = new FormControl("", null);

    if(this.currentProject != null){
        projectIdControl = new FormControl("",
                                      Validators.compose([ 
                                            Validators.pattern(/[A-Za-z0-9]/),
                                            Validators.required
                                      ]));
     }
  
    const projectNameControl = new FormControl("",
                                      Validators.compose([ 
                                            Validators.maxLength(25),
                                            Validators.minLength(5),
                                            Validators.pattern(/[A-Za-z0-9]/),
                                            Validators.required
                                      ]));
                                      
    const projectDescriptionControl = new FormControl("", Validators.required)

    this.projectForm = new FormGroup({
      projectId: projectIdControl,
      projectName: projectNameControl,
      projectDescription: projectDescriptionControl
   });

   if(this.currentProject != null && this.currentProject.id!=undefined){
    var i = true; 
   }
  }

  addNext() {
    (this.projectForm.controls['steps'] as FormArray).push(this.createStep());
  }

  deleteStep(index) {
    (this.projectForm.controls['steps'] as FormArray).removeAt(index);
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

  submitProject() {
    this.area = "progress";

    if(this.currentProject != null && this.currentProject.id!=undefined){
      this.projectCreateService.updateProject(
        this.currentProject.id,
        this.projectForm.get('projectName').value,
        this.projectForm.get('projectDescription').value,
        (project: Project) : void=>  {
                                          this.project$ = project;
                                          console.log("---- request response: ----\n%s", project );
                                          console.log(Object.getOwnPropertyNames(project));
                                          console.log("---- project updated: ----\n%s", this.project$.id );
                                          this.area = "detail";
                                          this.createProject.emit(project);                                       
                                      }
      );
    }
    else{
        this.projectCreateService.addProject(
          this.projectForm.get('projectId').value,
          this.projectForm.get('projectName').value, 
          this.projectForm.get('projectDescription').value,
          (project: Project) : void=>  {
                                            this.project$ = project;
                                            this.area = "detail";
                                            this.createProject.emit(project);
                                            this.globals.currentProjectId = this.project$.id;
                                            window.history.replaceState({}, '','/project/'+this.project$.id);
                                        }
        );      
    }    
  }

  cancel() {
    this.createProject.emit(null);
  }

  ngOnInit() {
    this.area = "form";
    this.items = this.projectForm.get('steps') as FormArray;

    if(this.currentProject!= null && this.currentProject.id!=undefined){
      this.title = 'Update Test';
      this.buttonLabel = 'Update';
      this.projectFormLabel = 'Test ' + this.currentProject.id;
      this.projectForm.get('projectName').setValue(this.currentProject.name);
      this.projectForm.get('projectDescription').setValue(this.currentProject.description);     
    }
  }
}