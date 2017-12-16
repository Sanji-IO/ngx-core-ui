import { InjectionToken } from '@angular/core';
import { tick, fakeAsync, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import '../rx-imports';
import { SjRestConfig } from '../models/rest';
import { SjRestService } from './rest.service';

const SJ_REST_CONFIG = new InjectionToken<SjRestConfig>('sjRestConfig');

describe('Service: SjRestService', () => {
  let service: SjRestService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        { provide: SJ_REST_CONFIG, useValue: { basePath: '' } },
        {
          provide: Http,
          useFactory: (mockbackend, options) => {
            return new Http(mockbackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: SjRestService,
          useFactory: (http, config) => {
            return new SjRestService(http, config);
          },
          deps: [Http, SJ_REST_CONFIG]
        }
      ]
    });
  });

  beforeEach(() => {
    backend = TestBed.get(MockBackend);
    service = TestBed.get(SjRestService);
  });

  test('it should provide get request without auth.', () => {
    const mockRes = {
      foo: 'bar'
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockRes) })));
    });

    service.get('/api/v1/test').subscribe(data => {
      expect(data).toEqual(mockRes);
    });
  });

  test('it should provide post request without auth.', () => {
    const mockRes = {
      foo: 'bar'
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockRes) })));
    });

    service.post('/api/v1/test', mockRes).subscribe(data => {
      expect(data).toEqual(mockRes);
    });
  });

  test('it should provide put request without auth.', () => {
    const mockRes = {
      foo: 'bar'
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockRes) })));
    });

    service.put('/api/v1/test', mockRes).subscribe(data => {
      expect(data).toEqual(mockRes);
    });
  });

  test('it should provide delete request without auth.', () => {
    const mockRes = {
      foo: 'bar'
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockRes) })));
    });

    service.delete('/api/v1/test', mockRes).subscribe(data => {
      expect(data).toEqual(mockRes);
    });
  });
});
