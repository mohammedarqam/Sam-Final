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

  sev = this.navParams.get("sev");
  hbl = this.navParams.get("hbl");
  school = this.navParams.get("school");
  FollowUp = this.navParams.get("FollowUp")


  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams) {
    console.log(this.sev);
    console.log(this.hbl);
  }

  anothrStudent(){
    this.navCtrl.pop();
  }

  done(){
    this.navCtrl.setRoot(TabsPage);
  }

  schoolReport(){
    this.navCtrl.push(ReportDetailsPage,{school : this.school});
  }

}
