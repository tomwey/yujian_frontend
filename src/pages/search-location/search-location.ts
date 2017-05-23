import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationSearchProvider } from "../../providers/location-search/location-search";

/**
 * Generated class for the SearchLocationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-location',
  templateUrl: 'search-location.html',
})
export class SearchLocationPage {

  shouldShowCancel: boolean = false;
  keyword: string = '';
  locations: any = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private locationSearch: LocationSearchProvider) {
  }

  onInput(event): void {
    this.shouldShowCancel = true;
    if (this.keyword.length == 0) return;
    
    this.locationSearch.getSuggestions(this.keyword)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onCancel(event): void {
    this.shouldShowCancel = false;
  }

}
