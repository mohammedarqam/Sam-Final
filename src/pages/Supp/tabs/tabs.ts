import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = "ReportsPage";
  tab2Root = "ActiveJobsPage";
  tab3Root = "FollowUpPage";
  tab4Root = "ProfilePage";

  constructor() {

  }
}
