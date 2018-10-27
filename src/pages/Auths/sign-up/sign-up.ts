import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Tabs } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import firebase from 'firebase';
import { TabsPage } from '../../Supp/tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  phone : string;
  otp : string;

  confirmR : any;

  @ViewChild(Slides) slides: Slides;
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;

  constructor(
  public navCtrl: NavController,
  public toastCtrl : ToastController,
  public alertCtrl : AlertController,
  ) {
  }
  ionViewDidEnter(){
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{
      'size' : 'invisible'
    });
  }
  ionViewDidLoad() {
    this.slides.lockSwipes(true);
  }
  signIn(){
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+91" + this.phone;
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then( confirmationResult => {
        this.confirmR  = confirmationResult;
    }).then(()=>{
      this.gtSecond();
    }).catch(function (error) {
      console.error("SMS not sent", error);
    });
  
  }

  checkPhone(){
    if(this.phone.length==10){
      this.signIn()
    }else{
      this.presentToast("Enter a valid Phone Number");
    }    
  }

  checkOtp(){
    this.VerifyOTP();
    // if(this.otp){
    //   this.VerifyOTP();
    // }else{
    //   this.presentToast("Enter  avlid OTP");
    // }    
  }

  VerifyOTP(){
    this.confirmR.confirm(this.otp).then(()=>{
      this.navCtrl.setRoot(TabsPage);
    }).catch(function (error) {
      var msg = error.msg;
      this.presentToast(msg);
    });  

  }


  gtSecond(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1, 500);
    this.slides.lockSwipes(true);
  }
  gtFirst(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0, 500);
    this.slides.lockSwipes(true);
  }

  //Toast Function
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      position : "top",
      duration: 4000,
      showCloseButton: false,
    });
    toast.present();
  }

}

