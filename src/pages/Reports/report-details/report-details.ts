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
  totStu : number = 0;
public doughnutChartLabels:string[] = ['Severely Anaemic', 'Moderately Anaemic','Healthy','Mildly Anaemic'];
public doughnutChartData:number[] = [0,0,0,0];
public doughnutChartType:string = 'doughnut';
public doughnutLegend : boolean = true;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
    this.getData();
  }

  getData(){
    firebase.database().ref("Counters/Schools").child(this.schoolkey).child("Severity").child("Severely Anaemic").once("value",itemSnap=>{
      this.severe = itemSnap.numChildren();
    }).then(()=>{
      firebase.database().ref("Counters/Schools").child(this.schoolkey).child("Severity").child("Moderately Anaemic").once("value",itemSnap=>{
        this.moderate = itemSnap.numChildren();
      }).then(()=>{
        firebase.database().ref("Counters/Schools").child(this.schoolkey).child("Severity").child("Mildly  Anaemic").once("value",itemSnap=>{
          this.mild = itemSnap.numChildren();
        }).then(()=>{
          firebase.database().ref("Counters/Schools").child(this.schoolkey).child("Severity").child("Healthy").once("value",itemSnap=>{
            this.healthy = itemSnap.numChildren();
          }).then(()=>{
            this.doughnutChartData = [this.severe,this.moderate,this.healthy,this.mild]
            this.totStu = this.severe+this.moderate+this.healthy+this.mild;
          })  
      
        })  
      })  
  
    })
  }
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }
  viewStudents(seves){
    this.navCtrl.push("ReportStudentsPage",{seves : seves,schoolkey : this.schoolkey})
  }
}
