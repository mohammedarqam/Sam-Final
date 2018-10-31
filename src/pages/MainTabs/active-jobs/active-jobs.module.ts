import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiveJobsPage } from './active-jobs';

@NgModule({
  declarations: [
    ActiveJobsPage,
  ],
  imports: [
    IonicPageModule.forChild(ActiveJobsPage),
  ],
})
export class ActiveJobsPageModule {}
