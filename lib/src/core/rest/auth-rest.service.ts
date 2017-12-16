import { HttpClient, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SjRestConfig } from '../models/rest';
import { SjRestBaseService } from './base.service';

export class SjAuthRestService extends SjRestBaseService {
  constructor(private http: HttpClient, private config: SjRestConfig) {
    super();
  }

  private formatError(error: HttpErrorResponse) {
    return Observable.throw(error);
  }

  get(url: string): Observable<any> {
    return this.http.get(`${this.config.basePath}${url}`).catch(this.formatError);
  }

  put(url: string, payload: {} | any[] = {}): Observable<any> {
    return this.http.put(`${this.config.basePath}${url}`, payload).catch(this.formatError);
  }

  post(url: string, payload: {} | any[] = {}): Observable<any> {
    return this.http.post(`${this.config.basePath}${url}`, payload).catch(this.formatError);
  }

  delete(url: string, payload: {} | any[] = []): Observable<any> {
    return this.http.request('DELETE', url, { body: payload }).catch(this.formatError);
  }

  upload(url: string, payload: any, method = 'POST'): Observable<HttpEvent<any>> {
    return this.http
      .request(method, url, { body: payload, reportProgress: true, observe: 'events' })
      .catch(this.formatError);
  }
}
