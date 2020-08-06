import { Component, Input, Output, AfterViewChecked, EventEmitter, Renderer2, ElementRef} from '@angular/core';
import { Project } from '../project';

@Component({
  selector: 'app-projectMenu',
  templateUrl: './projectMenu.component.html'
})
export class ProjectMenuComponent implements AfterViewChecked{

  @Input() currentProject: Project;
  @Output() status = new EventEmitter<string>();

  constructor(
    private renderer: Renderer2, 
    private el: ElementRef
    ) {}

  ngAfterViewChecked() {
    var ele = document.querySelector(".formcontainer ul");
    if(ele != null){
      this.renderer.setStyle(ele, 'width', 'fit-content');
      this.renderer.setStyle(ele, 'display', 'block');
      this.renderer.setStyle(ele, 'margin-left', 'auto');
      this.renderer.setStyle(ele, 'margin-right', 'auto');
    }
  }
  
  public getStatus(status: string){
    this.status.emit(status);
  }
}