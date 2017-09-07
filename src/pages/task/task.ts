import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
import { EventsService } from '../../providers/events-service';
import { EventDetailPage } from "../event-detail/event-detail";
import { OfferwallChannelService } from "../../providers/offerwall-channel-service";
// import { DomSanitizer } from "@angular/platform-browser";

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
  hbList: any  = [];
  chnList: any = [];
  errorOrEmptyMessage: string = '暂无数据';
  needShowEmptyResult: boolean = false;

  hasMore: boolean = false;
  pageNo: number = 1;
  pageSize: number = 20;
  totalPage: number = 1;

  @ViewChild('pageSlider') pageSlider: Slides;
  tabs: any = '0';
  selectTab(index) {
    this.pageSlider.slideTo(index);
  }

  changeWillSlide($event) {
    this.tabs = $event._snapIndex.toString();

    this.startLoadData();

  }
   
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private events: EventsService,
              private toolService: ToolService,
              private offerwall: OfferwallChannelService,
              // private sanitizer: DomSanitizer,
            ) 
  {
    // this.browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.browser.url);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TaskPage');
    // this.refresh();
  }

  ionViewDidEnter() {
    this.loadChannels();
  }

  startLoadData() {
    if (this.tabs === '0') {
      this.loadChannels();      
    } else if ( this.tabs === '1' ) {
      this.refresh();
    }
  }

  loadChannels(): void {
    this.toolService.showLoading('拼命加载中...');
    this.needShowEmptyResult = false;

    this.offerwall.getChannels()
      .then(data => {
        this.chnList = data;

        this.needShowEmptyResult = this.chnList.length === 0;
        this.errorOrEmptyMessage = '暂无数据';

        this.toolService.hideLoading();
      })
      .catch(error => {
        this.toolService.hideLoading();

        this.needShowEmptyResult = true;

        this.errorOrEmptyMessage = error.message || error;

      });
  }

  refresh(): void {
    this.pageNo = 1;
    this.loadTaskHB();
  }

  gotoHBDetail(hb): void {
    this.navCtrl.push(EventDetailPage, hb);
  }

  gotoChannel(chn): void {
    window.location.href = chn.task_url;
  }

  loadTaskHB(): Promise<any> {
    return new Promise((resolve) => {
      if (this.pageNo === 1) {
        this.toolService.showLoading('拼命加载中...');
        this.needShowEmptyResult = false;
      }

      this.events.getTaskList(this.pageNo, this.pageSize)
        .then(data => {
          // console.log(data);
          this.toolService.hideLoading();

          if (this.pageNo === 1) {
            this.hbList = data.data || data;
            // console.log(data.data);
            this.needShowEmptyResult = this.hbList.length === 0;
            this.errorOrEmptyMessage = '暂无数据';

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

          if (this.pageNo === 1) {
            this.needShowEmptyResult = true;
            
            this.errorOrEmptyMessage = error;
          }

          // setTimeout(() => {
          //   this.toolService.showToast(error);
          // }, 100);

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
