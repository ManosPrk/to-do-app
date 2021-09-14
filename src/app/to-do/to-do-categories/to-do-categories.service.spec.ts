import { TestBed } from '@angular/core/testing';

import { ToDoCategoriesService } from './to-do-categories.service';

describe('ToDoCategoriesService', () => {
  let service: ToDoCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
