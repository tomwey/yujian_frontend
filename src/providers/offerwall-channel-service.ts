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
export class OfferwallChannelService {

  constructor(private api: ApiService,
              private user: UserService,
              ) {
    
  }

  getChannels(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.user.token().then(token => {
        this.api.get('offerwall/channels', { token: token, os: 'iOS' })
          .then(data => resolve(data))
          .catch(error => reject(error));
      });
    });
  }

}
