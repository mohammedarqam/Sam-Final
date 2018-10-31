import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataConfirmPage } from './data-confirm';

@NgModule({
  declarations: [
    DataConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(DataConfirmPage),
  ],
})
export class DataConfirmPageModule {}
