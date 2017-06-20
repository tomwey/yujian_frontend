import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';
import { ApiService } from "../api-service";
import { UtilsServiceProvider } from "../utils-service/utils-service";

/*
  Generated class for the WechatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WechatProvider {
  eventId: number = 0;
  token: string = null;
  constructor(private api: ApiService,
              private utils: UtilsServiceProvider) {

  }

  config(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.utils.getWXConfig(url)
        .then(data => {
          wx.config(data);
          wx.ready(() => {
            // console.log('ready...');
            resolve(true);
          });
          wx.error(error => {
            // console.log('error ' + error);
            reject(error);
          });
        })
        .catch(error => reject(error));
    });
  }

  share(url: string, token: string, eventId: number = 0): Promise<any> {
    this.eventId = eventId;
    this.token = token;
    return new Promise((resolve, reject) => {
      this.utils.getShareConfig(url, token, eventId)
        .then(data => {
          wx.config(data.config);
          wx.ready(() => {
            // console.log('ready...');
            // resolve(true);
            this.shareAll(data.content)
              .then(result => {
                resolve(result);
              })
              .catch(error=>reject(error));
          });
          wx.error(error => {
            // console.log('error ' + error);
            reject(error);
          });
        })
        .catch(error => reject(error));
    });
  }

  private _sendShareLog(type: string, state: string) {
    // alert(type + ' ' + state);
    if (this.token && this.eventId !== 0) {
      // 发送分享日志
      this.utils.postShareStat(this.token, this.eventId).then(d=>{

      }).catch(e => {});
    }
  }

  /**
   * 分享到微信朋友圈，微信好友，QQ, QQ控件
   * @param params 分享内容 { title: '', desc: '', link: '', img_url: '' }
   */
  shareAll(params: any = { title: '', desc: '', link: '', img_url: '' }): Promise<any> {
    let promises: any[] = [];
    
    promises.push(this.shareTimeline(params));
    promises.push(this.shareFriend(params));
    promises.push(this.shareQQ(params));
    promises.push(this.shareQQZone(params));

    return Promise.all(promises);
  }

  /**
   * 分享到微信朋友圈
   * @param params 分享内容 { title: '', link: '', img_url: '' }
   */
  shareTimeline(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      wx.onMenuShareTimeline({
        title: params.title,
        link: params.link,
        imgUrl: params.img_url,
        success: () => {
          this._sendShareLog('微信朋友圈', 'ok');
          resolve(true);
        },
        cancel: () => {
          resolve(false);
        },
        fail: (error) => {
          this._sendShareLog('微信朋友圈', JSON.stringify(error));
          reject(error);
        }
      });
    });
  }

  /**
   * 分享给微信朋友
   * @param params 分享内容 { title: '', desc: '', link: '', img_url: '' }
   */
  shareFriend(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      wx.onMenuShareAppMessage({
        title: params.title, // 分享标题
        desc: params.desc,   // 分享描述
        link: params.link,   // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: params.img_url, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: () => { 
          // 用户确认分享后执行的回调函数
          this._sendShareLog('微信朋友', 'ok');
          resolve(true);
        },
        cancel: () => { 
          // 用户取消分享后执行的回调函数
          resolve(false);
        },
        fail: (error) => {
          this._sendShareLog('微信朋友', JSON.stringify(error));
          reject(error);
        }
      });
    });
  }

  /**
   * 分享给QQ
   * @param params 分享内容 { title: '', desc: '', link: '', img_url: '' }
   */
  shareQQ(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      wx.onMenuShareQQ({
          title: params.title, // 分享标题
          desc: params.desc, // 分享描述
          link: params.link, // 分享链接
          imgUrl: params.img_url, // 分享图标
          success: () => { 
            // 用户确认分享后执行的回调函数
            this._sendShareLog('QQ', 'ok');
            resolve(true);
          },
          cancel: () => { 
            // 用户取消分享后执行的回调函数
            resolve(false);
          },
          fail: (error) => {
            this._sendShareLog('QQ', JSON.stringify(error));
            reject(error);
          }
      });
    });
  }

  /**
   * 分享给QQ空间
   * @param params 分享内容 { title: '', desc: '', link: '', img_url: '' }
   */
  shareQQZone(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      wx.onMenuShareQZone({
          title: params.title, // 分享标题
          desc: params.desc, // 分享描述
          link: params.link, // 分享链接
          imgUrl: params.img_url, // 分享图标
          success: () => { 
            // 用户确认分享后执行的回调函数
            resolve(true);
            this._sendShareLog('QQZone', 'ok');
          },
          cancel: () => { 
              // 用户取消分享后执行的回调函数
              resolve(false);
          },
          fail: (error) => {
            this._sendShareLog('QQZone', JSON.stringify(error));
          }
      });
    });
  }

}
