import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, Events, Content, Platform, App } from 'ionic-angular';
import { PartinsService } from '../../providers/partins-service';
import { ToolService } from '../../providers/tool-service';
import { UserService } from '../../providers/user-service';
import { BadgesService } from '../../providers/badges-service';

/**
 * Generated class for the PartinDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-partin-detail',
  templateUrl: 'partin-detail.html',
})
export class PartinDetailPage {

  partin: any = null;

  answer: string = '';
  position: any = null;
  earns: any = [];
  
  pageNo: number = 1;
  pageSize: number = 20;
  totalPage: number = 1;
  hasMore: boolean = false;

  hasLoaded: boolean = false;
  
  disableCommit: boolean = false;
  commitButtonText: string = '';

  // 提交按钮点击跳转去分享
  commitToShare: boolean = false;

  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private partins: PartinsService,
    private toolService: ToolService,
    private modalCtrl: ModalController,
    private users: UserService,
    private noti: Events,
    private platform: Platform,
    private badges: BadgesService,
    private app: App,
  ) {
    this.partin = this.navParams.data;
  }

  ionViewDidLoad() {

    if (this.platform.is('mobileweb') && this.platform.is('ios')) {
      this.content.enableJsScroll();
    }

    // this.noti.subscribe('hb:opened', () => {
    //   this.loadEvent(false);
    // });
  }

  // ionViewWillUnload() {
  //   // console.log('unload......');
  //   // 取消事件监听
  //   this.noti.unsubscribe('hb:opened');
  // }

  ionViewDidEnter() {
    if (!this.hasLoaded) {
      this.hasLoaded = true;
      this.loadEvent();
    }
  }

  openOwnerInfo(): void {

     this.navCtrl.push('HBOwnerTimelinePage', { owner: this.partin.owner, 
       hbId: this.partin.id });
  }

  gotoReport(): void {
    let modal = this.modalCtrl.create('ReportPage', { eventId: this.partin.id });
    modal.present();
  }

  loadEvent(needAddViewCount: boolean = true): void {
    this.toolService.showLoading('拼命加载中...');
    this.partins.getEvent(this.partin.id, needAddViewCount)
      .then(data => {
        setTimeout(() => {
          // console.log(data);
          this.partin = data;
          if (needAddViewCount) {
            this.partin.view_count += 1;
          }
          this.toolService.hideLoading();

          this.disableCommit = !!this.partin.disable_text
          this.commitButtonText = this.partin.disable_text ? 
            this.partin.disable_text : this.partin.rule.action;
        }, 0);
        
        // this.loadEventEarns();
        // console.log(data);
      })
      .catch(error => {
        // this.commitToShare = false;

        this.toolService.hideLoading();
        setTimeout(() => {
          this.toolService.showToast(error);
        }, 200);
      });
  }

  commit(): void {
    if (this.partin.rule_type === 'quiz' && this.answer === '') {
      this.toolService.showToast('必须选择一个答案');
      return;
    } 

    if (this.partin.rule_type === 'sign' && this.answer === '') {
      this.toolService.showToast('口令不能为空');
      return;
    }

    // 准备参数
    let payload;
    if (this.partin.rule_type === 'quiz') {
      let answers = this.partin.rule.answers;
      // let answerOption = answers.indexOf(this.answer);
      payload = { hb: this.partin, answer: this.answer, location:  null };
    }  else if ( this.partin.rule_type === 'sign' ) { 
      payload = { hb: this.partin, answer: this.answer, location:  null };
    } else if ( this.partin.rule_type === 'checkin' ) {
      payload = { hb: this.partin, location:  null };
    }

    this.commitData(payload);
  }

  commitData(payload): void {
    
    this.toolService.showLoading('提交中...');
    this.partins.commit(payload)
      .then(data => {
        
        if (data.card) {
          this.badges.incrementCurrentBadge();
        }

        this.gotoSuccessPage({ code: 0, message: 'ok', result: data.result, partin: data.partin });
        this.toolService.hideLoading();
      })
      .catch(error => {

        this.toolService.hideLoading();
        this.gotoSuccessPage({ code: -1001, message: error.message || 'Oops, 服务器出错了, 我们正在处理...', 
          result: null, partin: this.partin });
      });
  }

  gotoSuccessPage(data): void {
    // console.log(data);

    // this.viewController.dismiss();
    // this.app.getRootNavs()[0].push('EventResult', data);
    // this.navCtrl.push('PartinResultPage', data);
    this.app.getRootNavs()[0].push('PartinResultPage', data);
  }

}
