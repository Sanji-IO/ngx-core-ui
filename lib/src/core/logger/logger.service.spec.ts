import { TestBed, inject } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SjLoggerService } from './logger.service';

describe('Service: SjLoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [SjLoggerService]
    });
  });

  it(
    'should be injected',
    inject([SjLoggerService], (service: SjLoggerService) => {
      expect(service).toBeTruthy();
      expect(service.toastr instanceof ToastrService).toBeTruthy();
    })
  );

  it(
    'should return current debug status',
    inject([SjLoggerService], (service: SjLoggerService) => {
      expect(service.getDebugStatus()).toBeFalsy();
    })
  );

  it(
    'should have debug flag to enable console log',
    inject([SjLoggerService], (service: SjLoggerService) => {
      service.debug(true);
      expect(service.getDebugStatus()).toBeTruthy();
    })
  );

  it(
    'should provide error api function',
    inject([SjLoggerService], (service: SjLoggerService) => {
      service.debug(true);
      spyOn(service.toastr, 'error');
      spyOn(console, 'error');
      service.error('boom!');
      expect(service.toastr.error).toHaveBeenCalledWith('[Error]: boom!');
      expect(console.error).toHaveBeenCalled();
    })
  );

  it(
    'should provide info api function',
    inject([SjLoggerService], (service: SjLoggerService) => {
      service.debug(true);
      spyOn(service.toastr, 'info');
      spyOn(console, 'info');
      service.info('boom!');
      expect(service.toastr.info).toHaveBeenCalledWith('[Info]: boom!');
      expect(console.info).toHaveBeenCalled();
    })
  );

  it(
    'should provide success api function',
    inject([SjLoggerService], (service: SjLoggerService) => {
      service.debug(true);
      spyOn(service.toastr, 'success');
      spyOn(console, 'info');
      service.success('boom!');
      expect(service.toastr.success).toHaveBeenCalledWith('[Success]: boom!');
      expect(console.info).toHaveBeenCalled();
    })
  );

  it(
    'should provide warn api function',
    inject([SjLoggerService], (service: SjLoggerService) => {
      service.debug(true);
      spyOn(service.toastr, 'warning');
      spyOn(console, 'info');
      service.warn('boom!');
      expect(service.toastr.warning).toHaveBeenCalledWith('[Warning]: boom!');
      expect(console.info).toHaveBeenCalled();
    })
  );

  it(
    'should provide log function when enable debug flag.',
    inject([SjLoggerService], (service: SjLoggerService) => {
      service.debug(true);
      spyOn(console, 'log');
      service.log('boom!');
      expect(console.log).toHaveBeenCalled();
    })
  );
});
