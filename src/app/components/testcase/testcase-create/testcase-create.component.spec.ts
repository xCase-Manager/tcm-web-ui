import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcaseCreateComponent } from './testcase-create.component';

describe('TestcaseCreateComponent', () => {
  let component: TestcaseCreateComponent;
  let fixture: ComponentFixture<TestcaseCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcaseCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
