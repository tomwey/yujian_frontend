import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiService } from './api-service';

/*
  Generated class for the RedPacketService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RedPacketService {

  constructor(public http: Http, private api: ApiService) {
    // console.log('Hello RedPacketService Provider');
  }

  nearby(lat, lng) {
    return this.api.get('hb/nearby', { lat: lat, lng: lng, scope: 1500 });
  }

  hbBody(token: string, hbID: number) {
    return this.api.get('hb/body', { token: token, hbid: hbID });
  }

  hbList() {
    return this.api.get('hb/list', {lat: 0, lng: 0});
  }

  follow(token: string, merchId: number) {
    return this.api.post('follows', { token: token, merch_id: merchId });
  }

  unfollow(token: string, merchId: number) {
    return this.api.post('follows/' + merchId + '/cancel', { token: token });
  }
}
