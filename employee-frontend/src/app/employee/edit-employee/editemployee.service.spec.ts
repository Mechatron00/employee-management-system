import { TestBed } from '@angular/core/testing';

import { EditemployeeService } from './editemployee.service';

describe('EditemployeeService', () => {
  let service: EditemployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditemployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
