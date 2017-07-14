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

  saveToken(token: string) {
    return this.storage.set('token', token);
  }

  token(): Promise<any> {
    return new Promise((resolve) => {
      this.storage.get('token').then( val => {
        resolve('018c1807003a4602886b8761e28c0848');
        //resolve(val);
        // if (!val) {
        //   // resolve('0c323d8d38744df5a2257a09442c755a');//测试账号
        //   resolve('605c28475de649628bba70458145f1d0');
        // } else {
        //   resolve(val);
        // }
      } );
    });
  }

  bindAccount(code: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.post('account/bind', { code: code })
        .then(data => {
          this.storage.set('token', data.token).then(data=>{
            resolve(data);
          }).catch(error=>reject(error));
        })
        .catch(error=>reject(error));
    });
  }

  // 获取红包历史
  getHBHistory(pageNo: number, pageSize: number = 20): Promise<any> {
    return new Promise((resolve, reject) => {
      this.token().then(token => {
        this.api.get('user/event_earns', { token: token, page: pageNo, size: pageSize }).then(data => {
          resolve(data);
        }).catch(error => {
          reject(error);
        });
      });
    });
  }

  // 获取用户个人信息
  loadUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.token().then(token => {
        this.api.get('user/me', { token: token })
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  }

  loadTrades(pageNo: number, pageSize: number = 20): Promise<any> {
    return new Promise((resolve, reject) => {
      this.token().then(token => {
        this.api.get('user/trades', { token: token, page: pageNo, size: pageSize })
          .then(data => {
            resolve(data);
          })
          .catch(error => {
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

  // 处理用户会话
  handleSession(action: string, loc: string = null, network: string = null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.token().then(token => {
        if (token) {
          if (action === 'end') {
            this.storage.get('session_id').then(sid => {
              if (!sid) {
                resolve(false);
              } else {
                this.api.post('user/session/end', { token: token, sid: sid, loc: loc, network: network })
                  .then(data => {
                    // if (data.sid === sid)
                    //   this.storage.remove('session_id');
                    resolve(true);
                  })
                  .catch(error => reject(error));
              }
            });
          } else {
            this.api.post('user/session/begin', { token: token, loc: loc, network: network })
              .then(data => {
                if (data.sid)
                  this.storage.set('session_id', data.sid);
                resolve(true);
              })
              .catch(error => reject(error));
          }
        } else {
          resolve(false);
        }
      });
    });
  }

}
