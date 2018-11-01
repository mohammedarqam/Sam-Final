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
  
public doughnutChartLabels:string[] = ['Severely Anaemic', 'Moderately Anaemic','Mildly Anaemic','Healthy'];
public doughnutChartData:number[] = [0,0,0,0];
public doughnutChartType:string = 'doughnut';
public doughnutLegend : boolean = true;


  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
    this.getSevere();
    this.getModerate();
    this.getMild();
    this.getHEalthy();
  }

  getSevere(){
    firebase.database().ref("Subs/Schools").child(this.schoolkey).child("Severity").child("Severely Anaemic").once("value",itemSnap=>{
      this.severe = itemSnap.numChildren();
      
    })
  }
  getModerate(){
    firebase.database().ref("Subs/Schools").child(this.schoolkey).child("Severity").child("Moderately Anaemic").once("value",itemSnap=>{
      this.moderate = itemSnap.numChildren();
    })  
  }
  getMild(){
    firebase.database().ref("Subs/Schools").child(this.schoolkey).child("Severity").child("Mildly  Anaemic").once("value",itemSnap=>{
      this.mild = itemSnap.numChildren();
    })  
  }
  getHEalthy(){
    firebase.database().ref("Subs/Schools").child(this.schoolkey).child("Severity").child("Healthy").once("value",itemSnap=>{
      this.healthy = itemSnap.numChildren();
    })  
  }
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }

}
