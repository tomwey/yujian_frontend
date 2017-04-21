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
    console.log('Hello RedPacketService Provider');
  }

  nearby(lat, lng) {
    return this.api.get('hb/nearby', { lat: lat, lng: lng, scope: 100000 });
  }

}
