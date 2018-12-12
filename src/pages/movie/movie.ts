import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MoviesProvider } from "../../providers/movies/movies";
import { Observable } from "rxjs/Observable";

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
  websiteMovie: string;
  moviedetails: MovieDetails;
  public myAngularxQrCode: string = null;
  public photos : any;
  myPictures: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private http: HttpClient, 
    private camera: Camera, 
    private alertCtrl : AlertController,
    private MoviesProvider: MoviesProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoviePage');
  }

  ngOnInit() {
    this.getMovieDetails().subscribe(
      (data: MovieDetails) => {
        console.log(data)
        this.moviedetails =
        { // we need to specify for each property the data to use
          Title: data['Title'],
          Year: data['Year'],
          Rated: data['Rated'],
          Released: data['Released'],
          Runtime: data['Runtime'],
          Genre: data['Genre'],
          Director: data['Director'],
          Writer: data['Writer'],
          Actors: data['Actors'],
          Plot: data['Plot'],
          Language: data['Language'],
          Country: data['Country'],
          Awards: data['Awards'],
          Poster: data['Poster'],
          MetaScore: data['MetaScore'],
          imdbRating: data['imdbRating'],
          imdbVotes: data['imdbVotes'],
          imdbId: data['imdbId'],
          Type: data['Type'],
          DVD: data['DVD'],
          BoxOffice: data['BoxOffice'],
          Production: data['Production'],
          Website: data['Website'],
          Response: data['Response']
        }
        console.log('Website: ' + data['Website'], ' Runtime: ' + data['Runtime'])
        this.myAngularxQrCode = data['Website'];
      },
      (error) => {
        console.log(error)
      }
    );
    this.photos = [];
  }

  public getMovieDetails(): Observable<MovieDetails> {
    return this.http.get<MovieDetails>
    ('http://www.omdbapi.com/?apikey=76b9cca4&i=' + this.navParams.get('id'))
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


}