import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
// import { Storage }    from '@ionic/storage';
import { UserService } from './user-service';
import { QQMaps } from './qq-maps';

/*
  Generated class for the EventsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventsService {

  constructor(private api: ApiService,
              private user: UserService,
              private qqMaps: QQMaps) {
    
  }

  latest(token: string = null, loc: string = null): Promise<any> {
    return this.api.get(/*'events/latest'*/ 'hb/latest', { token: token, loc: loc });
  }

  explore(loc: string = null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.user.token().then(token => {
        this.api.get(/*'events/latest'*/ 'hb/explore', { token: token, loc: loc })
          .then(data => resolve(data))
          .catch(error => reject(error));
      }).catch(error => reject(error));
    });
    // return this.api.get(/*'events/latest'*/ 'hb/explore', { token: token, loc: loc });
  }

  share(loc: string = null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.user.token().then(token => {
        this.api.get(/*'events/latest'*/ 'hb/share', { token: token, loc: loc })
          .then(data => resolve(data))
          .catch(error => reject(error));
      }).catch(error => reject(error));
    });
    // return this.api.get(/*'events/latest'*/ 'hb/share', { token: token, loc: loc });
  }

  nearby(lat, lng): Promise<any> {
    return new Promise((resolve, reject) => {
      this.user.token().then(token => {
        this.api.get(/*'events/latest'*/ 'hb/nearby', { token: token, lat: lat, lng: lng })
          .then(data => resolve(data))
          .catch(error => reject(error));
      }).catch(error => reject(error));
    });
    // return this.api.get(/*'events/latest'*/ 'hb/share', { token: token, loc: loc });
  }
  
  // nearby(lat, lng): Promise<any> {
  //   return this.api.get('events/nearby', { lng: lng, lat: lat, scope: 1500 });
  // }

  list(lat, lng, pageNo: number, pageSize: number = 15): Promise<any> {
    return new Promise((resolve, reject) => {
      this.user.token().then(token => {
        this.api.get('hb/list', { loc: `${lng},${lat}`, page: pageNo, size: pageSize, token: token })
          .then(data => resolve(data))
          .catch(error => reject(error));
      }).catch(error => reject(error));
    });
  }

  republish(eventId, payload): Promise<any> {
    return new Promise((resolve, reject) => {
      this.user.token().then(token => {
        this.api.post(`hb/${eventId}/republish`, { token: token, payload: JSON.stringify(payload) })
          .then(data => resolve(data))
          .catch(error => reject(error));
      });
    });
  }

  getMyEvents(pageNo: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.user.token().then(token => {
        this.api.get('hb/my_list', { token: token, page: pageNo }).then(data => {
          resolve(data);
        }).catch(error=>reject(error));
      });
    });
  }

  getEventOwner(eventId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.user.token().then(token => {
        this.api.get(`events/eventId/owner_info`, { token: token })
          .then(data => resolve(data))
          .catch(error => reject(error));
      })
    });
  }

  getHBOwnerTimeline(hbId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.user.token().then(token => {
        this.api.get(`hb/${hbId}/owner_timeline`, { token: token })
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  }

  private _loadEvent(eventId: number, token: string, lat, lng, needWriteViewLog:boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get(`hb/${eventId}/body`, { token: token, loc: `${lng},${lat}`, t: needWriteViewLog ? 1 : 0 })
          .then(data => {
            resolve(data);
          })
          .catch(error => reject(error));
    });
  }
  getEvent(eventId: number, needWriteViewLog: boolean): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.user.token().then(token => {
        this.qqMaps.startLocating()
          .then(pos => {
            this._loadEvent(eventId, token, pos.lat, pos.lng, needWriteViewLog)
              .then(data => resolve(data))
              .catch(error => reject(error));
          })
          .catch(error => {
            this._loadEvent(eventId, token, 0, 0, needWriteViewLog)
              .then(data => resolve(data))
              .catch(error => reject(error));
          });
      }).catch(()=>{});
    } );
  }

  getEventEarns(eventId: number, pageNo: number, pageSize: number): Promise<any> {
    return this.api.get(`hb/${eventId}/earns`, { page: pageNo, size: pageSize });
  }

  like(eventId: number, loc: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.user.token().then(token => {
        this.qqMaps.startLocating().then(pos => {
          this.api.post(`hb/${eventId}/like`, { token: token, loc: `${pos.lng},${pos.lat}` })
          .then(data => {
            resolve(data);
          })
          .catch(error => reject(error));
        })
        .catch(error => {
          this.api.post(`hb/${eventId}/like`, { token: token, loc: null })
          .then(data => {
            resolve(data);
          })
          .catch(error => reject(error));
        });
      });
    });
  }

  private _commit(token, payload): Promise<any> {
    return new Promise((resolve, reject) => {
      let payloadJson = JSON.stringify({ answer: payload.answer, location: payload.location });
        console.log(payloadJson);
        this.api.post(`hb/${payload.hb.id}/commit`, 
                      { token: token, payload: payloadJson })
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          })
    });
  }
  commit(payload): Promise<any> {
    return new Promise((resolve, reject) => {
      this.user.token().then(token => {
        let hb = payload.hb;
        let reload: boolean = false;
        if (hb && hb.rule_type === 'checkin') {
          reload = true;
        }
        this.qqMaps.startLocating(reload)
          .then(pos => {
            payload.location = `${pos.lng},${pos.lat}`
            this._commit(token, payload)
              .then(data => resolve(data))
              .catch(error => reject(error));
          })
          .catch(error => {
            payload.location = '0,0'
            this._commit(token, payload)
              .then(data => resolve(data))
              .catch(error => reject(error));
          });
      }).catch(error => {
        reject(error);
      });
    });
  }

}
