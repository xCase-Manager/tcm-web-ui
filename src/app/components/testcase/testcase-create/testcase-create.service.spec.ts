import { TestBed, inject } from '@angular/core/testing';

import { TestcaseCreateService } from './testcase-create.service';

describe('ProjectCreateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestcaseCreateService]
    });
  });

  it('should be created', inject([TestcaseCreateService], (service: TestcaseCreateService) => {
    expect(service).toBeTruthy();
  }));
});
