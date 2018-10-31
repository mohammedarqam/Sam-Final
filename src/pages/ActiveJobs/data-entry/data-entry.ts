import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-data-entry',
  templateUrl: 'data-entry.html',
})
export class DataEntryPage {

  skl = this.navParams.get("school");

  sname : string;
  pname : string;
  mobile : string;
  dob : string;
  class : string;
  height: string;
  weight: string;
  hbl: string;
  aadhar:string;
  address:string;
  cmmu:string;


  age : number;

  constructor(
  public navCtrl: NavController, 
  public toastCtrl : ToastController,
  public navParams: NavParams
  ) {
    // console.log(this.skl);
  }


  checkData(){
    if(this.sname){
      if(this.pname){
        if(this.mobile.length==10){
          if(this.age>0){
            if(this.class){
              if(this.height){
                if(this.weight){
                  if(this.hbl){
                    if(this.aadhar.length==12){
                      if(this.address){
                        if(this.cmmu){
                          this.enterData();
                        }else{this.presentToast("Enter community");}
                      }else{this.presentToast("Enter Address");}              
                    }else{this.presentToast("Aadhar Number Not Valid");}
                  }else{this.presentToast("Enter HB Level");}
                }else{this.presentToast("Enter Weight");}
              }else{this.presentToast("Enter Height");}
            }else{this.presentToast("Enter class");}
          }else{this.presentToast("Age not Valid");}
        }else{this.presentToast("Mobile Number not Valid");}
      }else{this.presentToast("Enter Parent Name");}
    }else{this.presentToast("Enter Student Name");}
  }

  enterData(){
    firebase.database().ref("Students").push({
      StudentName : this.sname,
    }).then(()=>{
      this.presentToast("Student Entered");
    })
  }












  calcAge(){
   this.age = moment().diff(this.dob, 'years',false);
  }
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
