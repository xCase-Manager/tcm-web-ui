import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-projectcreate',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  @Output() goback = new EventEmitter<boolean>();

  projectForm: FormGroup;
  fileToUpload: File = null;
  
  nameControl: FormControl = new FormControl('', Validators.minLength(2));
  descriptionControl: FormControl = new FormControl('', Validators.minLength(2));
  importFile: FormControl = new FormControl('', Validators.required);
  
  constructor(){

    const projectIdControl = new FormControl(
      '', 
      Validators.compose([ 
        Validators.minLength(5),
        Validators.maxLength(5),
        Validators.pattern(/[A-Za-z0-9]/),
        Validators.required
      ])
    );

    const projectNameControl = new FormControl(
      '', 
      Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(40),
        Validators.pattern(/[A-Za-z0-9]/),
        Validators.required
      ])
    );

    const projectLogoFileControl = new FormControl(
      '', 
      Validators.required
    );

    const projectDescriptionControl = new FormControl(
      '', 
     null
    );

    this.projectForm = new FormGroup({
      projectId: projectIdControl,
      projectName: projectNameControl,
      projectLogoFile: projectLogoFileControl,
      projectDescription: projectDescriptionControl
   });
  }

  @ViewChild('labelImport')
  labelImport: ElementRef;

  ngOnInit(): void {}

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }

  import(): void {
    console.log('import ' + this.fileToUpload.name);
  }

  cancel() {
    this.goback.emit(true); 
  }

  create() {
    this.goback.emit(true); 
  }
}