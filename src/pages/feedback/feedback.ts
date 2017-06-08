import { Component, ViewChild, ElementRef,Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { ApiService } from '../../providers/api-service';
import { ToolService } from '../../providers/tool-service';

/**
 * Generated class for the FeedbackPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  @ViewChild('fileInput') nativeFileInputBtn: ElementRef;

  files: any = [];
  feedback: any = { content: '', author: '' };
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private renderer: Renderer,
              private users: UserService,
              private api: ApiService,
              private tool: ToolService) {
  }

  send(): void {

    if (!this.feedback.content) {
      this.tool.showToast('反馈内容不能为空');
      return;
    }
    
    this.tool.showLoading('提交中...');

    let formData = new FormData();

    for (let i=0; i<this.files.length; i++) {
      formData.append('files[][file]', this.files[i]);
    }

    this.users.token().then(token => {
      formData.append("token", token);
      formData.append("content", this.feedback.content);
      formData.append("author", this.feedback.author);

      this.api.upload('feedbacks', formData).then(data => {
        // console.log(data);
        this.feedback = { content: '', author: '' };
        this.files = [];
        
        this.tool.hideLoading();

        setTimeout(() => {
          this.tool.showToast('提交成功');
        }, 200);

      }).catch(error => {
        this.tool.hideLoading();
        setTimeout(() => {
          this.tool.showToast(error);
        }, 200);
        console.log(error);
      });
    });
  }

  uploadFile() {
    let clickEvent: MouseEvent = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.nativeFileInputBtn.nativeElement, "dispatchEvent", [clickEvent]
    );
  }

  selectedFiles(event): void {
    let files: FileList = this.nativeFileInputBtn.nativeElement.files;
    console.log(files);

    this.files = files;
    // 封装FormData数据
  }

}
