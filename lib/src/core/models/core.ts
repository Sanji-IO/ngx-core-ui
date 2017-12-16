import { SjRestConfig } from './rest';
import { SjRouteConfig } from './route';

export interface SjCoreConfig {
  auth?: string[];
  route?: SjRouteConfig;
  rest?: SjRestConfig;
}
