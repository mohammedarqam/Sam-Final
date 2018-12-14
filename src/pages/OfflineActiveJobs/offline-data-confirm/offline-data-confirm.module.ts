import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfflineDataConfirmPage } from './offline-data-confirm';

@NgModule({
  declarations: [
    OfflineDataConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(OfflineDataConfirmPage),
  ],
})
export class OfflineDataConfirmPageModule {}
