import { Observable } from 'rxjs/Observable';

export abstract class SjRestBaseService {
  abstract get(url: string): Observable<any>;
  abstract put(url: string, payload: {}): Observable<any>;
  abstract post(url: string, payload: {}): Observable<any>;
  abstract delete(url: string, payload: any): Observable<any>;
}
