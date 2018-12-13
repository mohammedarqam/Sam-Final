import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireDatabase } from 'angularfire2/database';
import { NetworkProvider } from '../providers/network/network';
import { Network } from '@ionic-native/network';
import { LoginPage } from '../pages/Auths/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ="LoginPage";

  constructor(
  public platform: Platform, 
  public statusBar: StatusBar, 
  public events: Events,
  public network: Network,
  public db : AngularFireDatabase,
  public networkProvider: NetworkProvider,
  public splashScreen: SplashScreen
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.networkProvider.initializeNetworkEvents();

   this.events.subscribe('network:offline', () => {
       alert('network:offline ==> '+this.network.type);    
   });

   this.events.subscribe('network:online', () => {
       alert('network:online ==> '+this.network.type);        
   });

      // if (this.platform.is('tablet')) {
      //   this.rootPage = "LoginPage";
      // }else{
      //   this.rootPage = "PDetectPage";
      // }
  

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  
  }

}
