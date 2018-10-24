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
import { HomePage } from '../pages/MainTabs/home/home';
import { TabsPage } from '../pages/Supp/tabs/tabs';
import { ExplorePage } from '../pages/MainTabs/explore/explore';
import { NavigatePage } from '../pages/MainTabs/navigate/navigate';
import { NotificationsPage } from '../pages/MainTabs/notifications/notifications';
import { ProfilePage } from '../pages/MainTabs/profile/profile';
export const firebaseCred = {
  apiKey: "AIzaSyBirqKnWOtxUKau3VYbS2AZN_1UnIubHoY",
  authDomain: "arqamtechweb.firebaseapp.com",
  databaseURL: "https://arqamtechweb.firebaseio.com",
  projectId: "arqamtechweb",
  storageBucket: "arqamtechweb.appspot.com",
  messagingSenderId: "1069269221821"
};
firebase.initializeApp(firebaseCred);


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ExplorePage,
    NavigatePage,
    NotificationsPage,
    ProfilePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseCred),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ExplorePage,
    NavigatePage,
    NotificationsPage,
    ProfilePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
