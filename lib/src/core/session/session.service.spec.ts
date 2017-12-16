import { TestBed } from '@angular/core/testing';

import { SjSessionModule } from './session.module';
import { SjSessionService } from './session.service';

describe('Service: SjSessionService', () => {
  let service: SjSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SjSessionModule]
    });
  });

  beforeEach(() => {
    service = TestBed.get(SjSessionService);
  });

  test('should be injected', () => {
    expect(service).toBeDefined();
  });
});
