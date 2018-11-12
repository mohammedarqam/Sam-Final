import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/Supp/tabs/tabs';
import { LoginPage } from '../pages/Auths/login/login';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(
  public platform: Platform, 
  public statusBar: StatusBar, 
  public db : AngularFireDatabase,
  public splashScreen: SplashScreen
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  
  }

}
