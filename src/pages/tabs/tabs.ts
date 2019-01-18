import { Component } from '@angular/core';

import { FavoritesPage } from '../favorites/favorites';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = FavoritesPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
