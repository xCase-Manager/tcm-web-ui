import {Component, Renderer2, ViewChild, ElementRef, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Testcase} from '../testcase';

@Component({
  selector: 'app-testcasedetails',
  templateUrl: './testcase-details.component.html',
  styleUrls: ['./testcase-details.component.scss']
})
export class TestcaseDetailsComponent implements OnInit {
  @Input() currentTestcase: Testcase;
  @Output() goback = new EventEmitter<boolean>();
  @ViewChild('logo') logoImage: ElementRef;
  @ViewChild('testcaseTitle') testcaseTitle: ElementRef;

  edit = true;
  buttonLabel$ = "edit";
  nameControl: FormControl = new FormControl('', Validators.minLength(2));
  statusControl: FormControl = new FormControl('', Validators.minLength(2));
  descriptionControl: FormControl = new FormControl('', Validators.minLength(2));
  testcase = null;
  
  constructor(private renderer: Renderer2){}

  ngOnInit(): void {
    this.edit = true;
    this._disableForm();
  }

  ngOnChanges() {
    if (this.currentTestcase) {
      this.renderer.setProperty(this.testcaseTitle.nativeElement.children[0], 
        'innerHTML', "testcase " + this.currentTestcase.name);
      this.statusControl.setValue(this.currentTestcase.status);
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
    this.nameControl.setValue(this.currentTestcase.name);
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

  gotoTestcaseList(){
    this.goback.emit(true); 
  }
}