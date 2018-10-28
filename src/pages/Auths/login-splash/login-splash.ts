import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-login-splash',
  templateUrl: 'login-splash.html',
})
export class LoginSplashPage {

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
  }

  gtLogin(){
    this.navCtrl.push(LoginPage);
  }

}
