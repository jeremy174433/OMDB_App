import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MoviePage } from '../pages/movie/movie';
import { FavoritesPage } from '../pages/favorites/favorites';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { MoviesProvider } from '../providers/movies/movies';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { MoviedetailsProvider } from '../providers/moviedetails/moviedetails';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    MoviePage,
    FavoritesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    QRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    MoviePage,
    FavoritesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MoviesProvider,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MoviedetailsProvider
  ]
})
export class AppModule {}
