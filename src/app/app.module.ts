import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { BoxofficePage } from '../pages/boxoffice/boxoffice';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MoviePage } from '../pages/movie/movie';
import { FavoritesPage } from '../pages/favorites/favorites';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MoviesProvider } from '../providers/movies/movies';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { BddProvider } from '../providers/bdd/bdd';
import { IonicStorageModule } from "@ionic/storage";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { TheMovieDbProvider } from '../providers/the-movie-db/the-movie-db';

@NgModule({
  declarations: [
    MyApp,
    BoxofficePage,
    HomePage,
    TabsPage,
    MoviePage,
    FavoritesPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    QRCodeModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BoxofficePage,
    HomePage,
    TabsPage,
    MoviePage,
    FavoritesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MoviesProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BddProvider,
    BarcodeScanner,
    TheMovieDbProvider
  ]
})
export class AppModule {}
