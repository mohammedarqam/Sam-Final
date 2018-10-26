import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  phone : string;
  otp : string;

  @ViewChild(Slides) slides: Slides;
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;

  constructor(
  public navCtrl: NavController,
  public toastCtrl : ToastController,
  public alertCtrl : AlertController,
  ) {
  }
  ionViewDidEnter(){
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }
  ionViewDidLoad() {
    this.slides.lockSwipes(true);
  }




  // signIn(){
  //   const appVerifier = this.recaptchaVerifier;
  //   const phoneNumberString = "+91" + phoneNumber;
  //   firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
  //     .then( confirmationResult => {


  //       let prompt = this.alertCtrl.create({
  //       title: 'Enter the Confirmation code',
  //       inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
  //       buttons: [
  //         { text: 'Cancel',
  //           handler: data => { console.log('Cancel clicked'); }
  //         },
  //         { text: 'Send',
  //           handler: data => {
  //             confirmationResult.confirm(data.confirmationCode)
  //             .then(()=>{
  //               this.navCtrl.setRoot(UploadMPage);
  //             }).catch(function (error) {
  //               alert("Wrong Verification Code");
  //               this.navCtrl.setRoot();
  //             });
  //           }
  //         }
  //       ]
  //     }) ;
  //     prompt.present();
  //   }).catch(function (error) {
  //     console.error("SMS not sent", error);
  //   });
  
  // }























  checkPhone(){
    if(this.phone.length==10){
      this.gtSecond();
    }else{
      this.presentToast("Enter a valid Phone Number");
    }    
  }

  checkOtp(){

  }



  login(){
    
  }

  wrngPhone(){
    this.gtFirst();
    this.phone = null;
  }

//Support Functions

    //Slide functions
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
