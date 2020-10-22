import { TestBed, async } from '@angular/core/testing';
import { ProjectsListComponent } from './projects-list.component';

describe('ProjectsListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectsListComponent
      ],
    }).compileComponents();
  }));

  it('should render the projects list component', () => {
    const fixture = TestBed.createComponent(ProjectsListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the project lists table', () => {
    const fixture = TestBed.createComponent(ProjectsListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('th').textContent).toContain('Project');
    expect(compiled.querySelector('th').textContent).toContain('Description');
    expect(compiled.querySelector('th').textContent).toContain('Status');
  });
});