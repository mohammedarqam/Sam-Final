import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfflineActiveJobsPage } from './offline-active-jobs';

@NgModule({
  declarations: [
    OfflineActiveJobsPage,
  ],
  imports: [
    IonicPageModule.forChild(OfflineActiveJobsPage),
  ],
})
export class OfflineActiveJobsPageModule {}
