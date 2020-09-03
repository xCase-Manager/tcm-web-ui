import { Component, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Project} from './project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
  myProject:Project;
  isProjectslistVisible = true;
  isProjectdetailsVisible = false;
  isProjectcreateVisible = false;
  isTestcaseslistVisible = false;
 
  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {}

  public onSelected(project: Project) {
      this.myProject = project;
      this.isProjectslistVisible = false;
      this.isProjectdetailsVisible = true;
  }

  public onCreate(refresh: boolean) {
    this.isProjectslistVisible = false;
    this.isProjectcreateVisible = true;
  }

  public onGoback(refresh: boolean) {
    this.isProjectslistVisible = true;
    this.isProjectdetailsVisible = false;
    this.isProjectcreateVisible = false;
  }

  public onGoTestcasesList(project: Project) {
    this.isProjectdetailsVisible = false;
    this.isTestcaseslistVisible = true;
  }
}