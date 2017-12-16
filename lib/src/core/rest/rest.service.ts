import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SjRestConfig } from '../models/rest';
import { SjRestBaseService } from './base.service';

export class SjRestService extends SjRestBaseService {
  constructor(private http: Http, private config: SjRestConfig) {
    super();
  }

  private formatError(error: any) {
    return Observable.throw(error);
  }

  get(url: string): Observable<any> {
    return this.http
      .get(`${this.config.basePath}${url}`)
      .map((res: Response) => res.json())
      .catch(this.formatError);
  }

  put(url: string, data: {} | any[] = {}) {
    return this.http
      .put(`${this.config.basePath}${url}`, JSON.stringify(data))
      .map((res: Response) => res.json())
      .catch(this.formatError);
  }

  post(url: string, data: {} | any[] = {}) {
    return this.http
      .post(`${this.config.basePath}${url}`, JSON.stringify(data))
      .map((res: Response) => res.json())
      .catch(this.formatError);
  }

  delete(url: string, data: {} | any[] = []) {
    return this.http
      .delete(`${this.config.basePath}${url}`, JSON.stringify(data))
      .map((res: Response) => res.json())
      .catch(this.formatError);
  }
}
