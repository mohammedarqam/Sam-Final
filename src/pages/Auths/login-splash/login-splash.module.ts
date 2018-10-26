import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginSplashPage } from './login-splash';

@NgModule({
  declarations: [
    LoginSplashPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginSplashPage),
  ],
})
export class LoginSplashPageModule {}
