import {Component, ViewChild, ElementRef, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Project} from '../project';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() currentProject: Project;
  @Output() goback = new EventEmitter<boolean>();
  @Output() goTestcasesList = new EventEmitter<Project>();

  edit = true;
  buttonLabel$ = "edit";
  nameControl: FormControl = new FormControl('', Validators.minLength(2));
  statusControl: FormControl = new FormControl('', Validators.minLength(2));
  descriptionControl: FormControl = new FormControl('', Validators.minLength(2));
  project = null;

  @ViewChild('logo') logoImage: ElementRef;
  
  constructor(
    private router: Router,
  ){
    console.log("editform: " + this.currentProject)
  }

  ngOnInit(): void {
    this.edit = true;
    this._disableForm();
  }

  ngOnChanges() {
    if (this.currentProject) {
      this.nameControl.setValue(this.currentProject.name);
      this.statusControl.setValue("Closed");
      this.logoImage.nativeElement.setAttribute('src',this.currentProject.icon);
    }  
  }

  switchEdit() {
    this.edit= !this.edit;
    if(this.edit){
      this.buttonLabel$ = "edit";
      this._disableForm();
    } else{
      this.buttonLabel$ = "save";
      this._enableForm();
    }
  }

  cancel() {
    this.nameControl.setValue(this.currentProject.name);
    this.statusControl.setValue("Closed");
    this._disableForm();
  } 

  private _disableForm() { 
    this.nameControl.disable();
    this.statusControl.disable();
    this.descriptionControl.disable();
  }

  private _enableForm() { 
    this.nameControl.enable();
    this.statusControl.enable();
    this.descriptionControl.enable();
  }

  gotoProjectList(){
    this.goback.emit(true); 
  }

  gotoTestcasesList(){
    this.goTestcasesList.emit(this.currentProject); 
  }
}