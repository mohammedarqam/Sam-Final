import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/Supp/tabs/tabs';
import { LoginPage } from '../pages/Auths/login/login';
import { LoginSplashPage } from '../pages/Auths/login-splash/login-splash';
import * as firebase from 'firebase';
import { SignUpPage } from '../pages/Auths/sign-up/sign-up';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SignUpPage;

  constructor(
  public platform: Platform, 
  public statusBar: StatusBar, 
  public splashScreen: SplashScreen
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      // firebase.auth().onAuthStateChanged((user)=>{
      //   if(user){
      //     firebase.database().ref("User Data/Users").child(user.uid).once("value",snap=>{
      //       if(snap.exists()){
      //         this.rootPage = TabsPage;
      //       }else{
      //         this.rootPage = LoginSplashPage;
      //       }
      //     })
      //   }
      // })

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  
  }

}
