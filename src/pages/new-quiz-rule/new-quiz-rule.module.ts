import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewQuizRulePage } from './new-quiz-rule';

@NgModule({
  declarations: [
    NewQuizRulePage,
  ],
  imports: [
    IonicPageModule.forChild(NewQuizRulePage),
  ],
  exports: [
    NewQuizRulePage
  ]
})
export class NewQuizRulePageModule {}
