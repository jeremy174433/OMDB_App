import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { Camera, CameraOptions } from '@ionic-native/camera';
import {BddProvider} from "../../providers/bdd/bdd";

/**
 * Generated class for the MoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html',
})

export class MoviePage {

  id: number;
  moviedetails = [];
  public myAngularxQrCode: string = null;
  public photos : any;
  myPictures: string;
  show: boolean ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private camera: Camera, private alertCtrl : AlertController , private BddProvider: BddProvider) {
    this.myAngularxQrCode = 'this.moviedetails.Website';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoviePage');
  }

  ionViewWillEnter(){// on vérifie si ce film est deja en favoris
    this.BddProvider.id = this.navParams.get('id')
    const promise = this.BddProvider.verification_favoris()
    promise.then(boolean_bdd => {
      if ( boolean_bdd == true ){
        this.show = true }
      else {
        this.show = false }
    })}

  ngOnInit() {
    this.http.get('http://www.omdbapi.com/?apikey=76b9cca4&i=' + this.navParams.get('id'))
      .subscribe((data: MovieDetails[]) => {
        this.moviedetails = data;
        console.log(this.moviedetails);
      });



      this.photos = [];
  }

  openCamera() {
    let confirm = this.alertCtrl.create({
      title: 'Open the camera ?',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');

            const options: CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.FILE_URI,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE
            }

            this.camera.getPicture(options).then((imageData) => {
              this.myPictures = 'data:image/jpeg;base64,' + imageData;
            }, (err) => {
              console.log(err);
            });
          }
        }
      ]
    });
    confirm.present();
  }

  ajout_en_bdd(  MovieTitle , MoviePoster , MovieID){this.show = true ; this.BddProvider.ajout_en_bdd( MovieTitle , MoviePoster , MovieID ) ;}

  supprimer_de_bdd( MovieID){this.show = false ; this.BddProvider.supprimer_de_bdd(MovieID )}


}
