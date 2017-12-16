import '../rx-imports';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SjRestConfig } from '../models/rest';
import { SjAuthRestService } from './auth-rest.service';

const SJ_REST_CONFIG = new InjectionToken<SjRestConfig>('sjRestConfig');

describe('Service: SjAuthRestService', () => {
  let service: SjAuthRestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: SJ_REST_CONFIG, useValue: { basePath: '' } },
        {
          provide: SjAuthRestService,
          useFactory: (http: HttpClient, config) => {
            return new SjAuthRestService(http, config);
          },
          deps: [HttpClient, SJ_REST_CONFIG]
        }
      ]
    });
  });

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(SjAuthRestService);
  });

  test('it should provide get request with auth.', () => {
    const mockRes = { foo: 'bar' };
    service.get('/api/v1/test').subscribe(data => {
      expect(data).toEqual(mockRes);
    });
    httpMock.expectOne('/api/v1/test').flush(mockRes);
    httpMock.verify();
  });

  test('it should return error if get request failed.', () => {
    service.get('/api/v1/test').subscribe(
      () => {},
      (res: HttpErrorResponse) => {
        expect(typeof res.status === 'number').toBeTruthy();
        expect(res.error.message).toBe('Get data failed');
      }
    );
    httpMock.expectOne('/api/v1/test').flush({ message: 'Get data failed' }, { status: 401, statusText: 'Forbidden' });
    httpMock.verify();
  });

  test('it should provide post request with auth.', () => {
    const mockRes = { foo: 'bar' };
    service.post('/api/v1/test', mockRes).subscribe(data => {
      expect(data).toEqual(mockRes);
    });
    const testReq: TestRequest = httpMock.expectOne('/api/v1/test');
    expect(testReq.request.body).toEqual(mockRes);
    testReq.flush(mockRes);
    httpMock.verify();
  });

  test('it should return error if post request failed.', () => {
    const mockRes = { foo: 'bar' };
    service.post('/api/v1/test', mockRes).subscribe(
      () => {},
      (res: HttpErrorResponse) => {
        expect(typeof res.status === 'number').toBeTruthy();
        expect(res.error.message).toBe('Post data failed');
      }
    );
    httpMock.expectOne('/api/v1/test').flush({ message: 'Post data failed' }, { status: 401, statusText: 'Forbidden' });
    httpMock.verify();
  });

  test('it should provide put request with auth.', () => {
    const mockRes = { foo: 'bar' };
    service.put('/api/v1/test', mockRes).subscribe(data => {
      expect(data).toEqual(mockRes);
    });
    const testReq: TestRequest = httpMock.expectOne('/api/v1/test');
    expect(testReq.request.body).toEqual(mockRes);
    testReq.flush(mockRes);
    httpMock.verify();
  });

  test('it should return error if put request failed.', () => {
    const mockRes = { foo: 'bar' };
    service.put('/api/v1/test', mockRes).subscribe(
      () => {},
      (res: HttpErrorResponse) => {
        expect(typeof res.status === 'number').toBeTruthy();
        expect(res.error.message).toBe('Put data failed');
      }
    );
    httpMock.expectOne('/api/v1/test').flush({ message: 'Put data failed' }, { status: 401, statusText: 'Forbidden' });
    httpMock.verify();
  });

  test('it should provide delete request with auth.', () => {
    const mockRes = { foo: 'bar' };
    service.delete('/api/v1/test', mockRes).subscribe(data => {
      expect(data).toEqual(mockRes);
    });
    const testReq: TestRequest = httpMock.expectOne('/api/v1/test');
    expect(testReq.request.body).toEqual(mockRes);
    testReq.flush(mockRes);
    httpMock.verify();
  });

  test('it should return error if delete request failed.', () => {
    const mockRes = { foo: 'bar' };
    service.delete('/api/v1/test', mockRes).subscribe(
      () => {},
      (res: HttpErrorResponse) => {
        expect(typeof res.status === 'number').toBeTruthy();
        expect(res.error.message).toBe('Delete data failed');
      }
    );
    httpMock
      .expectOne('/api/v1/test')
      .flush({ message: 'Delete data failed' }, { status: 401, statusText: 'Forbidden' });
    httpMock.verify();
  });
});
