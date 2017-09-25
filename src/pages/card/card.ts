import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
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

  hasMore: boolean  = false;
  pageNo: number    = 1;
  totalPage: number = 1;
  pageSize: number  = 20;

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
    // if (this.platform.is('mobileweb') && this.platform.is('ios')) {
    //   this.content.enableJsScroll();
    // }

    this.loadCards();
  }

  refresh(): void {
    this.pageNo = 1;
    this.loadCards();
  }

  loadCards(): Promise<any> {
    return new Promise((resolve) => {
      if (this.pageNo === 1) {
        this.toolService.showLoading('拼命加载中...');
      }

      this.cards.getUserCards(this.pageNo, this.pageSize)
        .then(data => {
          this.toolService.hideLoading();

          if (this.pageNo === 1) {
            this.cardsData = data.data || data;
            this.needShowEmptyResult = this.cardsData.length === 0;
          } else {
            let temp = this.cardsData || [];
            this.cardsData = temp.concat(data.data || data);

            this.needShowEmptyResult = false;
          }

          this.totalPage = Math.floor((data.total + this.pageSize - 1) / this.pageSize); 
          this.hasMore = this.totalPage > this.pageNo;

          resolve();
        })
        .catch(error => {
          this.toolService.hideLoading();

          if (this.pageNo === 1) {
            this.needShowEmptyResult = true;
            this.errorOrEmptyMessage = error.message || error;
          } else {
            this.needShowEmptyResult = false;
            setTimeout(() => {
              this.toolService.showToast(error.message || error);
            }, 100);
          }

          resolve();
        });
    });
  }

  doInfinite(e): void {
    if (this.pageNo < this.totalPage) {
      this.pageNo ++;

      this.loadCards().then(() => {
        e.complete();
      });

    }
  }

  gotoCardDetail(card): void {
    this.navCtrl.push(CardDetailPage, card);
  }

}
