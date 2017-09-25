import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
import { CardsService } from '../../providers/cards-service';

/**
 * Generated class for the MyCardsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-cards',
  templateUrl: 'my-cards.html',
})
export class MyCardsPage {

  errorOrEmptyMessage: string = '暂无数据';
  needShowEmptyResult: boolean = false;
  cardsData: any = [];

  firstLoaded: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private cards: CardsService,
              private toolService: ToolService,
            ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MyCardsPage');
  }

  ionViewDidEnter() {
    if (!this.firstLoaded) {
      this.firstLoaded = true;

      this.loadCards();
    }
  }

  loadCards(): void {
    this.toolService.showLoading('拼命加载中...');

    this.cards.getMyCards()
      .then(data => {
        this.cardsData = data;
        this.needShowEmptyResult = this.cardsData.length === 0;
        this.toolService.hideLoading();
      })
      .catch(error => {
        this.errorOrEmptyMessage = error.message || error;
        this.needShowEmptyResult = true;
        this.toolService.hideLoading();
      })
  }

  gotoCardDetail(card) {
    this.navCtrl.push('MyCardDetailPage', card);
  }
}
