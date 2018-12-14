import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfflineDataEntryPage } from './offline-data-entry';

@NgModule({
  declarations: [
    OfflineDataEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(OfflineDataEntryPage),
  ],
})
export class OfflineDataEntryPageModule {}
