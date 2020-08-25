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

  it('should create the app projects list', () => {
    const fixture = TestBed.createComponent(ProjectsListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
