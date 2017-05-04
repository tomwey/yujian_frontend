import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Storage } from '@ionic/storage';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {
  // authToken: string = '';
  constructor(private api: ApiService,
              private storage: Storage) {
    // console.log('Hello UserService Provider');
    
  }

  token(): Promise<any> {
    return new Promise((resolve) => {
      this.storage.get('token').then( val => {
        if (!val) {
          resolve('605c28475de649628bba70458145f1d0');
        } else {
          resolve(val);
        }
      } );
    });
  }

  // 获取红包历史
  getHBHistory(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.token().then(token => {
        this.api.get('hb/histories', { token: token }).then(data => {
          resolve(data);
        }).catch(error => {
          reject(error);
        });
      });
    });
  }

  // 获取关注的商家
  getFollowedMerchants(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.token().then(token => {
        this.api.get('follows', { token: token }).then(data => {
          resolve(data);
        }).catch(error => {
          reject(error);
        });
      });
    });
  }

}
