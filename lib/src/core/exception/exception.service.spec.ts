import { ErrorHandler } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import * as StackTrace from 'stacktrace-js';

import { SjExceptionService } from './exception.service';
import { SjLoggerService } from '../logger/logger.service';

describe('Service: SjExceptionService', () => {
  let service: SjExceptionService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [SjExceptionService, SjLoggerService]
    });
  });

  beforeEach(
    inject([SjExceptionService], (exceptionSrv: SjExceptionService) => {
      service = exceptionSrv;
    })
  );

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  // it('should handle error', () => {
  //   const error = new Error('Oops!');
  //   spyOn(StackTrace, 'fromError');
  //   expect(() => {
  //     service.handleError(error);
  //   }).toThrowError('Oops!');
  //   expect(StackTrace.fromError).toHaveBeenCalled();
  // });
});
