import { Component, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Project} from './project';
import {Testcase} from './testcase';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
  activeProject:Project;
  activeTestcase:Testcase;
  isProjectslistVisible = true;
  isProjectdetailsVisible = false;
  isProjectcreateVisible = false;
  isTestcaseslistVisible = false;
  isTestcasedetailsVisible = false;
 
  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {}

  public onSelected(project: Project) {
      this.activeProject = project;
      this.isProjectslistVisible = false;
      this.isProjectdetailsVisible = true;
  }

  public onSelectedTestcase(testcase: Testcase) {
    this.activeTestcase = testcase;
    this.isTestcaseslistVisible = false;
    this.isTestcasedetailsVisible = true;
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

  public onGoBackProjectDetails(refresh: boolean) {
    this.isProjectdetailsVisible = true;
    this.isTestcaseslistVisible = false;
  }
}