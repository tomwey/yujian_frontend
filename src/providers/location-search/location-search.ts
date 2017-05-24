import { Injectable } from '@angular/core';
import { ApiService } from '../api-service';

/*
  Generated class for the LocationSearchProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationSearchProvider {

  constructor(private api: ApiService) {
    // console.log('Hello LocationSearchProvider Provider');
  }

// EJZBZ-VCM34-QJ4UU-XUWNV-3G2HJ-DWBNJ
  getSuggestions(keyword: string, city: string = '成都'): Promise<any> {
    return this.api.get('qq/suggestion', { city: city, keyword: keyword });
  }

}
