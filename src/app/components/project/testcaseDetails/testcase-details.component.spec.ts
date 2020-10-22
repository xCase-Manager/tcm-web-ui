import { TestBed, async } from '@angular/core/testing';
import { TestcaseDetailsComponent } from './testcase-details.component';

describe('TestcaseDetailsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestcaseDetailsComponent
      ],
    }).compileComponents();
  }));

  it('should render the testcase details component', () => {
    const fixture = TestBed.createComponent(TestcaseDetailsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the testcase details main elements', () => {
    const fixture = TestBed.createComponent(TestcaseDetailsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    // name
    expect(compiled.querySelector('#name').textContent).toBeDefined();
    // description
    expect(compiled.querySelector('#description').textContent).toBeDefined();
    // status
    expect(compiled.querySelector('#status').textContent).not.toEqual('Choose...');
  });
});