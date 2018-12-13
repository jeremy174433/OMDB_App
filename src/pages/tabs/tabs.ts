import { Component } from '@angular/core';

import { FavoritesPage } from '../favorites/favorites';
import { BoxofficePage } from '../boxoffice/boxoffice';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = FavoritesPage;
  tab3Root = BoxofficePage;

  constructor() {

  }
}
