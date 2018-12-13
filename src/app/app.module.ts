import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Camera } from '@ionic-native/camera';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { NetworkProvider } from '../providers/network/network';
import { Network } from '@ionic-native/network';


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
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false
    }),
    ChartsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseCred),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NetworkProvider,
    Network,
  ]
})
export class AppModule {}
