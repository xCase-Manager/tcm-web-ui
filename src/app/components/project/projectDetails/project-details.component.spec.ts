import { TestBed, async } from '@angular/core/testing';
import { ProjectDetailsComponent } from './project-details.component';

describe('ProjectDetailsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectDetailsComponent
      ],
    }).compileComponents();
  }));

  it('should render the project details component', () => {
    const fixture = TestBed.createComponent(ProjectDetailsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the project details main elements', () => {
    const fixture = TestBed.createComponent(ProjectDetailsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    // title
    expect(compiled.querySelector('#projectTitle h2').textContent).toBeDefined();
    // description
    expect(compiled.querySelector('#description').textContent).toBeDefined();
    // status
    expect(compiled.querySelector('#status').textContent).not.toEqual('Choose...');
  });
});