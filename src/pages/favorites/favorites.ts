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

  movies: any = [];
  isMovies: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams , private BddProvider: BddProvider) {
  }

  ngOnInit() {
  }

  ionViewWillEnter(){ 
    this.BddProvider.afficher_favoris().then(liste_favoris => {
    this.movies = liste_favoris;
    console.log(this.movies.length);
    this.movies.length > 0 ? this.isMovies = true : this.isMovies = false;
    })
  }

  detailsMovies (movie) {
    this.navCtrl.push(MoviePage, {
      id: movie.id
    });
  }

  tout_supprimer() {
    this.BddProvider.tout_supprimer(); 
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

}