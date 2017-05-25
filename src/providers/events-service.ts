import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
// import { Storage }    from '@ionic/storage';
import { UserService } from './user-service';

/*
  Generated class for the EventsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventsService {

  constructor(private api: ApiService,
              private user: UserService) {
    
  }

  nearby(lat, lng): Promise<any> {
    return this.api.get('events/nearby', { lng: lng, lat: lat, scope: 1500 });
  }

  list(lat, lng, pageNo: number): Promise<any> {
    return this.api.get('events/list', { lat: lat, lng: lng, page: pageNo });
  }

  getMyEvents(pageNo: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.user.token().then(token => {
        this.api.get('events', { token: token, page: pageNo }).then(data => {
          resolve(data);
        }).catch(error=>reject(error));
      });
    });
  }

  getEvent(eventId: number): Promise<any> {
    return this.api.get(`events/${eventId}/body`, {});
  }

  getEventEarns(eventId: number, pageNo: number, pageSize: number): Promise<any> {
    return this.api.get(`events/${eventId}/earns`, { page: pageNo, size: pageSize });
  }

  like(eventId: number, loc: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.user.token().then(token => {
        this.api.post(`events/${eventId}/like`, { token: token, loc: loc })
          .then(data => {
            resolve(data);
          })
          .catch(error => reject(error));
      });
    });
  }

  commit(payload): Promise<any> {
    return new Promise((resolve, reject) => {
      this.user.token().then(token => {
        let payloadJson = JSON.stringify({ answer: payload.answer, location: payload.location });
        console.log(payloadJson);
        this.api.post(`events/${payload.event.id}/commit`, 
                      { token: token, payload: payloadJson })
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          })
      }).catch(error => {
        reject(error);
      });
    });
  }

}
