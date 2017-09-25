import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform, Content } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
import { CardsService } from '../../providers/cards-service';
import { CardDetailPage } from '../card-detail/card-detail'; 

/**
 * Generated class for the CardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {

  cardsData: any = [];
  
  @ViewChild(Content) content: Content;

  errorOrEmptyMessage: string = '暂无数据';
  needShowEmptyResult: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform,
    // private content: Content,
    private cards: CardsService,
    private toolService: ToolService,
  ) {}

  ionViewDidLoad() {
    if (this.platform.is('mobileweb') && this.platform.is('ios')) {
      this.content.enableJsScroll();
    }

    this.doRefresh(null);
  }

  refresh(): void {
    this.doRefresh(null);
  }

  doRefresh(refresher): void {
    if (!refresher) {
      this.toolService.showLoading('拼命加载中...');
    }

    this.cards.getUserCards()
      .then(data => {
        this.toolService.hideLoading();

        let tmpData = data.data || data;
        if (tmpData.length === 0) {
          this.needShowEmptyResult = true;
        } else {
          this.needShowEmptyResult = false;

          this.cardsData = tmpData;
        }

        console.log(tmpData);
      })
      .catch(error => {
        this.errorOrEmptyMessage = error.message || error;

        this.needShowEmptyResult = true;

        this.toolService.hideLoading();
      });
  }

  gotoCardDetail(card): void {
    this.navCtrl.push(CardDetailPage, card);
  }

}
