import { Component } from '@angular/core';
import { ProfilePage } from '../../MainTabs/profile/profile';
import { ReportsPage } from '../../MainTabs/reports/reports';
import { ActiveJobsPage } from '../../MainTabs/active-jobs/active-jobs';
import { FollowUpPage } from '../../MainTabs/follow-up/follow-up';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ReportsPage;
  tab2Root = ActiveJobsPage;
  tab3Root = FollowUpPage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
