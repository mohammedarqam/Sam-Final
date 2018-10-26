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
import { LoginPage } from '../pages/Auths/login/login';
import { LoginSplashPage } from '../pages/Auths/login-splash/login-splash';
import { SignUpPage } from '../pages/Auths/sign-up/sign-up';


export const firebaseCred = {
  apiKey: "AIzaSyDfYGCZchTJHmNBlk4-T4-B24d7qtBs4LQ",
  authDomain: "posters-83a2e.firebaseapp.com",
  databaseURL: "https://posters-83a2e.firebaseio.com",
  projectId: "posters-83a2e",
  storageBucket: "posters-83a2e.appspot.com",
  messagingSenderId: "9709869347"
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
    LoginPage,
    LoginSplashPage,
    SignUpPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false
    }),
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
    LoginPage,
    LoginSplashPage,
    SignUpPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
