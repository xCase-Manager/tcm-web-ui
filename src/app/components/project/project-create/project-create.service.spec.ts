import { TestBed, inject } from '@angular/core/testing';

import { ProjectCreateService } from './project-create.service';

describe('ProjectCreateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectCreateService]
    });
  });

  it('should be created', inject([ProjectCreateService], (service: ProjectCreateService) => {
    expect(service).toBeTruthy();
  }));
});
