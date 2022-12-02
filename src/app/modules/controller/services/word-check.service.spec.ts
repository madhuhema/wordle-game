import { TestBed } from '@angular/core/testing';

import { WordCheckService } from './word-check.service';

describe('WordCheckService', () => {
  let service: WordCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
