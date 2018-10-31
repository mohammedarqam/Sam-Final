import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-report-details',
  templateUrl: 'report-details.html',
})
export class ReportDetailsPage {

  schoolkey = this.navParams.get("school");

  severe : number=0;
  moderate : number=0;
  mild : number=0;
  healthy : number=0;

  students : Array<any> = [];
  

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
    this.getSevere();
  }

  getSevere(){
    firebase.database().ref("Subs/Schools").child(this.schoolkey).child("Severity").child("Severely Anaemic").once("value",itemSnap=>{
      console.log(itemSnap.numChildren());
      this.severe = itemSnap.numChildren();
    })  
  }

}
