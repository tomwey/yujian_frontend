import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
// import { RedPacketService } from '../../providers/red-packet-service';
import { EventsService } from '../../providers/events-service';
import { HBDetailPage } from '../hb-detail/hb-detail';

@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html'
})
export class ExplorePage {

  hbData: any = [];
  pageNo: number = 1;
  eventsData: any = []; 
  constructor(public navCtrl: NavController,
              private toolService: ToolService,
              // private hbService: RedPacketService,
              private events: EventsService,
              ) {
      
  }

  ionViewDidLoad() {
    this.reload();
  }

  doRefresh($event) {
    $event.complete();
  }

  reload() {
    this.toolService.showLoading('拼命加载中...');
    this.events.list(0,0,this.pageNo).then(data => {
      this.eventsData = data;
      console.log(data);
      this.toolService.hideLoading();
    }).catch(error => {
      this.toolService.hideLoading();
      setTimeout(() => {
        this.toolService.showToast(error);
      }, 20);
    });
    // this.hbService.hbList().then(data => {
    //   this.hbData = data
    //   this.toolService.hideLoading();
    // }).catch(err => {
    //   this.toolService.hideLoading();
    //   this.toolService.showToast('加载失败了！');
    // });
  }

  gotoDetail(event) {
    console.log(event);
    // this.navCtrl.push(HBDetailPage, { item: hb });
  }

}
