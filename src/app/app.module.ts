import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { TabsPage } from '../pages/Supp/tabs/tabs';
import { ProfilePage } from '../pages/MainTabs/profile/profile';
import { LoginPage } from '../pages/Auths/login/login';
import { LoaderPage } from '../pages/Supp/loader/loader';
import { ActiveJobsPage } from '../pages/MainTabs/active-jobs/active-jobs';
import { FollowUpPage } from '../pages/MainTabs/follow-up/follow-up';
import { ReportsPage } from '../pages/MainTabs/reports/reports';
import { DataEntryPage } from '../pages/ActiveJobs/data-entry/data-entry';
import { Camera } from '@ionic-native/camera';
import { DataConfirmPage } from '../pages/ActiveJobs/data-confirm/data-confirm';
import { ReportDetailsPage } from '../pages/Reports/report-details/report-details';
import { ChangePassPage } from '../pages/Auths/change-pass/change-pass';
import { CamsPage } from '../pages/cams/cams';
import { FollowUpStudentsPage } from '../pages/FollowUps/follow-up-students/follow-up-students';
import { StudentDetailsPage } from '../pages/FollowUps/student-details/student-details';
import { ChartsModule } from 'ng2-charts';
import { ReportStudentsPage } from '../pages/Reports/report-students/report-students';
import { AddFollowUpPageModule } from '../pages/FollowUps/add-follow-up/add-follow-up.module';
import { AddFollowUpPage } from '../pages/FollowUps/add-follow-up/add-follow-up';


export const firebaseCred = {
  apiKey: "AIzaSyD_YDbb3sjzzqVc-N1cWBbWi9lJKYImzkQ",
  authDomain: "samatha-app.firebaseapp.com",
  databaseURL: "https://samatha-app.firebaseio.com",
  projectId: "samatha-app",
  storageBucket: "samatha-app.appspot.com",
  messagingSenderId: "1080627282737"
};
firebase.initializeApp(firebaseCred);


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ProfilePage,
    LoginPage,
    LoaderPage,
    ActiveJobsPage,
    FollowUpPage,
    ReportsPage,
    DataEntryPage,
    DataConfirmPage,
    ReportDetailsPage,
    ChangePassPage,
    CamsPage,
    FollowUpStudentsPage,
    StudentDetailsPage,
    ReportStudentsPage,
    AddFollowUpPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false
    }),
    ChartsModule,
    AngularFireModule.initializeApp(firebaseCred),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ProfilePage,
    LoginPage,
    LoaderPage,
    ActiveJobsPage,
    FollowUpPage,
    ReportsPage,
    DataEntryPage,
    DataConfirmPage,
    ReportDetailsPage,
    ChangePassPage,
    CamsPage,
    FollowUpStudentsPage,
    StudentDetailsPage,
    ReportStudentsPage,
    AddFollowUpPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
