import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Storage }    from '@ionic/storage';

/*
  Generated class for the EventsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventsService {

  constructor(private api: ApiService,
              private storage: Storage) {
    
  }

  nearby(lat, lng): Promise<any> {
    return this.api.get('events/nearby', { lng: lng, lat: lat, scope: 1500 });
  }

  list(lat, lng, pageNo: number): Promise<any> {
    return this.api.get('events/list', { lat: lat, lng: lng, page: pageNo });
  }

  getEvent(eventId: number): Promise<any> {
    return this.api.get(`events/${eventId}/body`, {});
  }

}
