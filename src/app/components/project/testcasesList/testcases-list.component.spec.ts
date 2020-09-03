import { TestBed, async } from '@angular/core/testing';
import { TestcasesListComponent } from './testcases-list.component';

describe('ProjectsListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestcasesListComponent
      ],
    }).compileComponents();
  }));

  it('should create the app projects list', () => {
    const fixture = TestBed.createComponent(TestcasesListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
