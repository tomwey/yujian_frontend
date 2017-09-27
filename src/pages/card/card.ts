import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
import { CardsService } from '../../providers/cards-service';
import { CardDetailPage } from '../card-detail/card-detail'; 
import { BadgesService } from '../../providers/badges-service';

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

  firstLoaded: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    // private platform: Platform,
    // private content: Content,
    private cards: CardsService,
    private toolService: ToolService,
    private badges: BadgesService,
    // private events: Events,
  ) {}

  ionViewDidLoad() {
    // if (this.platform.is('mobileweb') && this.platform.is('ios')) {
    //   this.content.enableJsScroll();
    // }
    
    // this.events.subscribe(this.badges.CARD_BADGES_UPDATED_TOPIC, (count) => {
    //   if (count > 0) {
    //     this.loadCards();
    //   }
    // });
    
    // this.loadCards();

    // this.firstLoaded = true;
  }

  ionViewDidEnter() {
    if (!this.firstLoaded) {
      this.firstLoaded = true;
      this.badges.hideBadges();
      
      this.refresh();
    } else {
      this.badges.getCurrentBadges().then(badge => {
        let currentBadge = parseInt(badge || 0);
        if ( currentBadge > 0 ) {
          this.refresh();
        }
        this.badges.hideBadges();
      });
    }
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

            this.badges.saveCurrentBadge(data.total);
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
          this.badges.saveCurrentBadge(0);
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
