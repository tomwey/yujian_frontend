import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LocationSearchProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationSearchProvider {

  constructor(public http: Http) {
    // console.log('Hello LocationSearchProvider Provider');
  }

// EJZBZ-VCM34-QJ4UU-XUWNV-3G2HJ-DWBNJ
  getSuggestions(keyword: string, city: string = '成都'): Promise<any> {
    let url = `http://apis.map.qq.com/ws/place/v1/suggestion/?region=${city}&keyword=${keyword}&key=EJZBZ-VCM34-QJ4UU-XUWNV-3G2HJ-DWBNJ`;
    return this.http.get(url).toPromise();
  }

}
