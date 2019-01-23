import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class BddProvider {
  public TableauFavoris = [];
  public id ;

  constructor(public http: HttpClient, private storage: Storage) {
  }

  // cette méthode permet d'inserer un film avec son ID en bdd pour les favoris
  ajout_en_bdd(MovieTitle, MoviePoster, MovieID) {
    this.storage.get("favoris").then(value => {
      this.TableauFavoris = value
      if (this.TableauFavoris === null) {
          this.TableauFavoris = []}
      this.TableauFavoris.push({title: MovieTitle, poster: MoviePoster, id: MovieID})
      this.storage.set("favoris", this.TableauFavoris)
    })
  }

  supprimer_de_bdd( MovieID){
    this.storage.get("favoris").then(value => {
      this.TableauFavoris = value
      for ( var i = 0 ; i < this.TableauFavoris.length ; i++){
        if ( this.TableauFavoris[i].id == MovieID ) {
          console.log(" on supprimer" + this.TableauFavoris[i].title )
          this.TableauFavoris.splice(i , 1);
        }
        this.storage.set("favoris", this.TableauFavoris)
      }
    })
  }

  tout_supprimer() {
    console.log(" tout supprimer")
    this.TableauFavoris = []
    this.storage.set("favoris", this.TableauFavoris)}

  afficher_favoris() {

    return new Promise( (resolve  ) => this.storage.get("favoris").then(value => {
      resolve(value)})
    )
  }

  verification_favoris() {
     return new Promise((resolve, reject) => this.storage.get("favoris").then(value => {
      if (value != null) {
        resolve(value)
      } else {
        reject()
      }
    })).then(RetourPromise => {
        // @ts-ignore
        for (var i = 0; i < RetourPromise.length; i++) {
          if (RetourPromise[i].id == this.id) {
            return true
          }
        }
        return false
      }
    ).catch(error => {
      console.log(" aucune bdd crée ", error);
      return error
    })
  }
}