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

  location: any = null;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private locationSearch: LocationSearchProvider) {
    this.location = this.navParams.data;
  }

  selectLocation(loc): void {
    this.location.address = loc.title;
    this.location.latLng  = `${loc.location.lat},${loc.location.lng}`;
    this.navCtrl.pop();
  }

  onInput(event): void {
    this.shouldShowCancel = true;
    if (this.keyword.length == 0) {
      this.locations = [];
      return;
    } 
    
    this.locationSearch.getSuggestions(this.keyword)
      .then(data => {
        // console.log(data);
        this.locations = data.data || data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  onCancel(event): void {
    this.shouldShowCancel = false;
    this.locations = [];
  }

}
