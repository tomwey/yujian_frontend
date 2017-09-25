import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
import { CardsService } from '../../providers/cards-service';

/**
 * Generated class for the UserCardsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-cards',
  templateUrl: 'user-cards.html',
})
export class UserCardsPage {

  type: number;
  cardID: number;
  title: string;

  usersData: any = [];
  
  hasMore: boolean  = false;
  pageNo: number    = 1;
  totalPage: number = 1;
  pageSize: number  = 20;
  
  errorOrEmptyMessage: string = '暂无数据';
  needShowEmptyResult: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toolService: ToolService,
    private cards: CardsService,
  ) {
    this.type = this.navParams.data.type;
    this.title = this.type === 0 ? '领取记录' : '使用记录';
    this.cardID = this.navParams.data.id;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad UserCardsPage');
  }

  ionViewDidEnter() {
    this.loadCardsUsers();
  }

  loadCardsUsers(): Promise<any> {
    return new Promise((resolve) => {
      if (this.pageNo === 1) {
        this.toolService.showLoading('拼命加载中...');
      }

      this.cards.getCardUsers(this.cardID, this.type, this.pageNo, this.pageSize)
        .then(data => {
          this.toolService.hideLoading();

          if (this.pageNo === 1) {
            this.usersData = data.data || data;
            this.needShowEmptyResult = this.usersData.length === 0;
          } else {
            let temp = this.usersData || [];
            this.usersData = temp.concat(data.data || data);

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

      this.loadCardsUsers().then(() => {
        e.complete();
      });

    }
  }
}
