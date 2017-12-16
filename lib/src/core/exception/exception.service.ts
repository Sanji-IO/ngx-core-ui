import { Injectable, ErrorHandler, Injector } from '@angular/core';
import * as StackTrace from 'stacktrace-js';
import { StackFrame } from 'stacktrace-js';
import { SjLoggerService } from '../logger/logger.service';

@Injectable()
export class SjExceptionService implements ErrorHandler {
  constructor(private injector: Injector) {}
  handleError(error: Error) {
    const loggingService = this.injector.get(SjLoggerService);
    const message = error.message ? error.message : error.toString();
    const url = location.pathname;
    // get the stack trace, lets grab the last 10 stacks only
    StackTrace.fromError(error).then((stackframes: [StackFrame]) => {
      const stackString = stackframes.splice(0, 20).map(sf => sf.toString()).join('\n');
      loggingService.error(message, { url, stack: stackString });
    });
    throw error;
  }
}
