import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SjLoggerService {
  private enableDebug = false;
  constructor(public toastr: ToastrService) {}

  debug(enable: boolean) {
    this.enableDebug = enable;
  }

  getDebugStatus() {
    return this.enableDebug;
  }

  error(message: string, data?: any) {
    this.toastr.error(`[Error]: ${message}`);
    if (this.getDebugStatus()) {
      console.error(`🔥  ${message}`, data);
    }
  }

  info(message: string, data?: any) {
    this.toastr.info(`[Info]: ${message}`);
    if (this.enableDebug) {
      console.info(`ℹ️  ${message}`, data);
    }
  }
  success(message: string, data?: any) {
    this.toastr.success(`[Success]: ${message}`);
    if (this.enableDebug) {
      console.info(`✅  ${message}`, data);
    }
  }

  warn(message: string, data?: any) {
    this.toastr.warning(`[Warning]: ${message}`);
    if (this.enableDebug) {
      console.info(`⚠️  ${message}`, data);
    }
  }

  log(...args: any[]) {
    if (this.enableDebug) {
      console.log.apply(window, ['📢'].concat(args));
    }
  }
}
