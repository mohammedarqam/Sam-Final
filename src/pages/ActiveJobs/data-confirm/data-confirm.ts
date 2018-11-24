import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-data-confirm',
  templateUrl: 'data-confirm.html',
})
export class DataConfirmPage {
  sev =  this.navParams.get("sev");
  hbl = this.navParams.get("hbl");
  school = this.navParams.get("school");
  FollowUp = this.navParams.get("FollowUp")

  sevC  :string;
  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams) {
    switch (this.sev) {
      case 'Severely Anaemic': this.sevC = "s"
        break;
      case 'Moderately Anaemic': this.sevC = "mo"
        break;
      case 'Mildly  Anaemic': this.sevC = "mi"
        break;
      case 'Healthy': this.sevC = "h"
        break;
  }

  }

  anothrStudent(){
    this.navCtrl.pop();
  }

  done(){
    this.navCtrl.setRoot("TabsPage");
  }

  schoolReport(){
    this.navCtrl.push("ReportDetailsPage",{school : this.school.School});
  }

  lang : string = "English";
  LangLabel : string = "Language";
  pagetitle : string = "Profile";

  addStuBtn: string = "Add Another Student";
  SRoprtBtn: string = "View School Report";
  Done: string = "Done";
  nFUp : string = "Next Follow Up";


  changeLabels() {

    switch (this.lang) {
      case "English":
        this.LangLabel = "Language";
        this.pagetitle = "Student Analysis";
        this.addStuBtn = "Add Another Student";
        this.SRoprtBtn = "View School Report";
        this.Done = "Done";
        this.nFUp  = "Next Follow Up";
      

        break;
      case "Telugu":
        this.LangLabel = "భాషా";
        this.pagetitle = "విద్యార్థి విశ్లేషణ";
        this.addStuBtn = "మరో విద్యార్థిని జోడించు";
        this.SRoprtBtn = "స్కూల్ రిపోర్ట్ చూడండి";
        this.Done = "పూర్తి";
        this.nFUp  = "తదుపరి ఫాలో అప్";



        break;
    }
  }
}
