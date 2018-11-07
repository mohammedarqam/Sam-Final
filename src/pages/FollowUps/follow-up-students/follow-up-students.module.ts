import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowUpStudentsPage } from './follow-up-students';

@NgModule({
  declarations: [
    FollowUpStudentsPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowUpStudentsPage),
  ],
})
export class FollowUpStudentsPageModule {}
