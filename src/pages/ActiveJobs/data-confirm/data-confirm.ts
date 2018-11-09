import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { TabsPage } from '../../Supp/tabs/tabs';
import { ReportDetailsPage } from '../../Reports/report-details/report-details';

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
    this.navCtrl.setRoot(TabsPage);
  }

  schoolReport(){
    this.navCtrl.push(ReportDetailsPage,{school : this.school.School});
  }

}
