import { Component, Input, Output, AfterViewChecked, EventEmitter, Renderer2, ElementRef} from '@angular/core';
import { Testcase } from '../testcase';

@Component({
  selector: 'app-testcaseMenu',
  templateUrl: './testcaseMenu.component.html'
})
export class TestcaseMenuComponent implements AfterViewChecked{

  @Input() currentTestcase: Testcase;
  @Output() status = new EventEmitter<string>();

  constructor(
    private renderer: Renderer2, 
    private el: ElementRef
    ) {}

  ngAfterViewChecked() {
    /*
      change values styles of tabs to be centered 
    */
    //this.renderer.addClass(this.el.nativeElement, 'wild');
    var ele = document.querySelector(".formcontainer ul");
    if(ele != null){
      console.log('class name: ' + ele.className);
      //this.renderer.selectRootElement('.formcontainer ul');
      //this.renderer.setStyle(ele, 'padding-left', '200px');
      this.renderer.setStyle(ele, 'width', 'fit-content');
      this.renderer.setStyle(ele, 'display', 'block');
      this.renderer.setStyle(ele, 'margin-left', 'auto');
      this.renderer.setStyle(ele, 'margin-right', 'auto');
    }
  }
  
  public getStatus(status: string){
    this.status.emit(status);
    console.log("testcase menu - status: " + status);
  }
}