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
    // this.reload();
    this.doRefresh(null);
  }

  doRefresh(refresher) {
    this.pageNo = 1;

    if (!refresher) {
      this.toolService.showLoading('拼命加载中...');
    }
    
    this.events.list(0,0,this.pageNo)
      .then(data => {
        this.eventsData = data;
        console.log(data);
        this.toolService.hideLoading();
        if (refresher) {
          // setTimeout( ()=>{
            refresher.complete();
          // }, 200);
        }
      }).catch(error => {
        this.toolService.hideLoading();
        if (refresher) {
          // setTimeout( ()=>{
            refresher.complete();
          // }, 200);
          // refresher.complete();
        }
        setTimeout(() => {
          this.toolService.showToast(error);
        }, 20);
      });
  }

  gotoDetail(event) {
    // console.log(event);
    this.navCtrl.push('EventDetailPage', event);
  }

}
