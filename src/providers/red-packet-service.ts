import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiService } from './api-service';
import { UserService } from './user-service';

/*
  Generated class for the RedPacketService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RedPacketService {

  constructor(public http: Http, 
              private api: ApiService,
              private userService: UserService) {
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

  // 抢红包
  grab(token: string, hbid: number) {
    return this.api.post('hb/grab', { token: token, hbid: hbid });
  }

  // 拆红包
  open(token: string, hbid: number, adid: number = -1) {
    return this.api.post('hb/open', { token: token, hbid: hbid, adid: adid });
  }

  // 获取红包详情
  getHBResult(hbid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.token().then(token => {
        this.api.get('hb/results', { token: token, hbid: hbid })
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  }
}
