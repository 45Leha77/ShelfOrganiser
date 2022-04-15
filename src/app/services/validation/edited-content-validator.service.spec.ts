import { TestBed } from '@angular/core/testing';

import { EditedContentValidatorService } from './edited-content-validator.service';

describe('EditedContentValidatorService', () => {
  let service: EditedContentValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditedContentValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
