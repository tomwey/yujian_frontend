import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/**
 * Generated class for the MyCardDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-card-detail',
  templateUrl: 'my-card-detail.html',
})
export class MyCardDetailPage {

  card: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.card = this.navParams.data;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MyCardDetailPage');
  }

  gotoUserCards(card, type): void {
    this.navCtrl.push('UserCardsPage', { id: card.id, type: type });
  }

}
