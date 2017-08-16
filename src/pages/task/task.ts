import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
import { EventsService } from '../../providers/events-service';
import { EventDetailPage } from "../event-detail/event-detail";

/**
 * Generated class for the TaskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
  hbList: any = [];

  errorOrEmptyMessage: string = '暂无数据';
  needShowEmptyResult: boolean = false;

  hasMore: boolean = false;
  pageNo: number = 1;
  pageSize: number = 20;
  totalPage: number = 1;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private events: EventsService,
              private toolService: ToolService,
            ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TaskPage');
    this.refresh();
  }

  refresh(): void {
    this.pageNo = 1;
    this.loadTaskHB();
  }

  gotoHBDetail(hb): void {
    this.navCtrl.push(EventDetailPage, hb);
  }

  loadTaskHB(): Promise<any> {
    return new Promise((resolve) => {
      if (this.pageNo === 1) {
        this.toolService.showLoading('拼命加载中...');
      }

      this.events.getTaskList(this.pageNo, this.pageSize)
        .then(data => {
          // console.log(data);
          this.toolService.hideLoading();

          if (this.pageNo === 1) {
            this.hbList = data.data || data;
            // console.log(data.data);
            this.needShowEmptyResult = this.hbList.length === 0;
          } else {
            let temp = this.hbList || [];
            this.hbList = temp.concat(data.data || data);
          }
          
          this.totalPage = Math.floor((data.total + this.pageSize - 1) / this.pageSize); 
          this.hasMore = this.totalPage > this.pageNo;

          resolve();
        })
        .catch(error => {
          // console.log(error);
          this.toolService.hideLoading();
          setTimeout(() => {
            this.toolService.showToast(error);
          }, 100);

          resolve();
        });
    });

  }

  doInfinite(e): void {
    if (this.pageNo < this.totalPage) {
      this.pageNo ++;

      this.loadTaskHB().then(() => {
        e.complete();
      });

    }
  }

}
