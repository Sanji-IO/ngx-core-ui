import { Route, Params } from '@angular/router';

export interface SjRouteConfig {
  defaultLoginRoute: string;
  loginSuccessRedirectRoute?: string;
  route?: Route | Route[];
}

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}
