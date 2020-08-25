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
 
  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {}

  public onSelected(project: Project) {
      console.log(" selected project: " + project.name)
      this.myProject = project;
      this.isProjectslistVisible = false;
      this.isProjectdetailsVisible = true;
      this.isProjectcreateVisible = false;
  }

  public onCreate(refresh: boolean) {
    this.isProjectslistVisible = false;
    this.isProjectdetailsVisible = false;
    this.isProjectcreateVisible = true;
  }

  public onGoback(refresh: boolean) {
    this.isProjectslistVisible = true;
    this.isProjectdetailsVisible = false;
    this.isProjectcreateVisible = false;
  }
}