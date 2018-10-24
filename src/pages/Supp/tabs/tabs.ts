import { Component } from '@angular/core';
import { HomePage } from '../../MainTabs/home/home';
import { ExplorePage } from '../../MainTabs/explore/explore';
import { NavigatePage } from '../../MainTabs/navigate/navigate';
import { NotificationsPage } from '../../MainTabs/notifications/notifications';
import { ProfilePage } from '../../MainTabs/profile/profile';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ExplorePage;
  tab3Root = NavigatePage;
  tab4Root = NotificationsPage;
  tab5Root = ProfilePage;

  constructor() {

  }
}
