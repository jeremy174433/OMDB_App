import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BddProvider} from "../../providers/bdd/bdd";
import {MoviePage} from "../movie/movie";

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  movies = [];


  constructor(public navCtrl: NavController, public navParams: NavParams , private BddProvider: BddProvider) {
  }

  ngOnInit() {


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  ionViewWillEnter(){  this.BddProvider.afficher_favoris().then(liste_favoris => {
    // @ts-ignore
    this.movies = liste_favoris })}

  detailsMovies (movie) {
    this.navCtrl.push(MoviePage, {
      id: movie.id
    });
  }

  tout_supprimer(){this.BddProvider.tout_supprimer()
  ; this.navCtrl.setRoot(this.navCtrl.getActive().component);}

}
