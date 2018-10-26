import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
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

  gtSignUp(){
    this.navCtrl.push(SignUpPage);
  }
  gtLogin(){
    this.navCtrl.push(LoginPage);
  }

}
