import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfflineLoadingPage } from './offline-loading';

@NgModule({
  declarations: [
    OfflineLoadingPage,
  ],
  imports: [
    IonicPageModule.forChild(OfflineLoadingPage),
  ],
})
export class OfflineLoadingPageModule {}
