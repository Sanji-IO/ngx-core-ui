import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Session } from '../models/session';
import { UserProfile } from '../models/user';

const INIT_SESSION_STATE = {
  user: {},
  token: null
};

@Injectable()
export class SjSessionService {
  private _localStorageKey = 'session';
  private _sessionState$: BehaviorSubject<Session> = new BehaviorSubject<Session>(INIT_SESSION_STATE);

  constructor(private storage: LocalStorageService, private jwtHelperService: JwtHelperService) {
    this._initializeState();

    this.storage.observe(this._localStorageKey).subscribe(() => this._initializeState());
  }

  private _initializeState() {
    this._sessionState$.next(this._loadState());
  }

  private _loadState(): Session {
    let state = this.storage.retrieve(this._localStorageKey) as Session;

    if (!state) {
      state = INIT_SESSION_STATE;
    }

    return state;
  }

  private _onIsSignedInChange(): Observable<Session> {
    return (
      this.state$
        .distinctUntilChanged(
          (previous: Session, next: Session) => this._isSignedIn(previous) === this._isSignedIn(next)
        )
        /* Skip the current behaviour subject value and wait for a change. */
        .skip(1)
    );
  }

  private _saveState(state: Session) {
    this.storage.store(this._localStorageKey, state);
  }

  private _isSignedIn(state: Session) {
    return state.token !== null;
  }

  get state$() {
    return this._sessionState$.asObservable().filter(state => state !== null);
  }

  getToken(): Observable<string | null | undefined> {
    return this.state$.first().map((state: Session) => state.token);
  }

  getUser(): Observable<UserProfile | undefined> {
    return this.state$.first().map(state => state.user);
  }

  updateState(session: Session) {
    const state = Object.assign({}, this._sessionState$.getValue(), session);

    this._sessionState$.next(state);
    this._saveState(state);
  }

  isSignedIn() {
    return this.state$.first().map(state => this._isSignedIn(state));
  }

  isTokenExpired() {
    return this.jwtHelperService.isTokenExpired();
  }

  onSignin() {
    return this._onIsSignedInChange().filter(state => this._isSignedIn(state));
  }

  onSignout() {
    return this._onIsSignedInChange().filter(state => !this._isSignedIn(state));
  }
}
