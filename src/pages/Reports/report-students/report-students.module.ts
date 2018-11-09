import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportStudentsPage } from './report-students';

@NgModule({
  declarations: [
    ReportStudentsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportStudentsPage),
  ],
})
export class ReportStudentsPageModule {}
