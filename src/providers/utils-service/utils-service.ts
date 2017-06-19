import { Injectable } from '@angular/core';
import { ApiService } from "../api-service";

/*
  Generated class for the UtilsServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UtilsServiceProvider {

  constructor(private api: ApiService) {
    // console.log('Hello UtilsServiceProvider Provider');
  }

  getWXConfig(url: string): Promise<any> {
    return this.api.get('util/wx_config', { url: url });
  }

  getShareConfig(url: string, token: string, eventId: number = 0): Promise<any> {
    return this.api.get('share/config', { url: url, token: token, event_id: eventId });
  }

  postShareStat(token: string, eventId: number): Promise<any> {
    return this.api.post('share/event', { token: token, event_id: eventId });
  }

}
