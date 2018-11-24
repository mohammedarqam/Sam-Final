import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportDetailsPage } from './report-details';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    ReportDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportDetailsPage),
    ChartsModule,
  ],
})
export class ReportDetailsPageModule {}
