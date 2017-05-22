import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolService } from "../../providers/tool-service";

/**
 * Generated class for the NewQuizRulePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-quiz-rule',
  templateUrl: 'new-quiz-rule.html',
})
export class NewQuizRulePage {
  checkedIdx: number = 0;
  event: any = null;
  rule:  any = { type: 'Quiz', question: '', answers: [], answer: 0 };
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private tool: ToolService) {
    this.event = this.navParams.data;

    if (this.event.rule && this.event.rule.type === 'Quiz') {
      this.rule = this.event.rule;
      this.checkedIdx = this.rule.answer;
    } else {
      this.rule.answers = [
                            { order: 'A', value: '' },
                            { order: 'B', value: '' },
                            { order: 'C', value: '' },
                            { order: 'D', value: '' },
                          ];
    }
  }

  saveRule(): void {
    if (this.checkedIdx === -1) {
      this.tool.showToast('必须指定一个正确答案');
      return;
    }
    this.rule.answer = this.checkedIdx;
    this.event.rule = this.rule;

    this.navCtrl.pop();
    // console.log(this.rule);
  }

}
