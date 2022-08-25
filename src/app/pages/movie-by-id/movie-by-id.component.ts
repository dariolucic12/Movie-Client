import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie';
import { ImdbApiService } from '../../services/imdb-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Watchlist } from 'src/app/models/watchlist.model';
import { ReviewService } from 'src/app/services/review.service';


@Component({
  selector: 'app-movie-by-id',
  templateUrl: './movie-by-id.component.html',
  styleUrls: ['./movie-by-id.component.scss']
})
export class MovieByIdComponent implements OnInit {

  constructor(private movieService: ImdbApiService,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, 
    private watchlistService: WatchlistService,
    private reviewService: ReviewService,
    private jwtHelper: JwtHelperService) { }

    movieData: Movie = {
      id: '',
      title: '',
      originalTitle: '',
      fullTitle: '',
      type: '',
      year: '',
      image: '',
      releaseDate: '',
      runtimeMins: '',
      runtimeStr: '',
      plot: '',
      plotLocal: '',
      plotLocalIsRtl: false,
      awards: '',
      directors: '',
      directorList: [],
      writers: '',
      writerList: [],
      stars: '',
      starList: [],
      actorList: [],
      genres: '',
      genreList: [],
      companies: '',
      companyList: [],
      countries: '',
      countryList: [],
      languages: '',
      languageList: [],
      contentRating: '',
      imDbRating: '',
      imDbRatingVotes: '',
      metacriticRating: '',
      boxOffice: undefined,
      keywords: '',
      keywordList: [],
      similars: []
    };
    movieId: string = "";
    movieTitle: string = "";
    movieImage: string = "";
    moviePlot: string= "";
    imdbRating: number = 0;
    movieRuntime: string = "";
    numberOfVotes: string = "";
    genre: string = "";
    director: string = "";
    movieAwards: string = "";

    commentForm?: FormGroup;
    submitted: Boolean = false;

    rating: number = 0;

    isOnWatchlist: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      console.log("param je: " + param.get('id'))
      var id = param.get('id');

      this.getMovieById(id!);
      console.log("muvi dejta je: " + this.movieData)
    });
    
    this.checkIfMovieIsOnWatchlist();

    this.createForm();

    console.log("id filma je: " + this.movieId)
  }

  getMovieById(id: string){
    this.movieService.getMovieById(id).subscribe((data) => {
      this.movieData = data;
      this.movieId = data.id;
      this.movieTitle = data.fullTitle;
      this.movieImage = data.image;
      this.moviePlot = data.plot;
      this.imdbRating = parseFloat(data.imDbRating);
      this.movieRuntime = data.runtimeMins;
      this.numberOfVotes = data.imDbRatingVotes;
      this.genre = data.genres;
      this.director = data.directors;
      this.movieAwards = data.awards;

      this.checkIfMovieIsOnWatchlist();
      this.checkIfMovieIsRated();
    })
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  onSubmitComment() {
    this.submitted = true;
    if(this.commentForm!.invalid) {
      return false;
    } else {
      //commentTxt: this.commentForm.controls['comment'].value,

      return true;
      //salji komentar
    }
  }

  getUserId(): string {
    var userId;
    const token = localStorage.getItem("token");
    if (token == null) {
      console.log("Token incorrect")
      return '';
    } else {
      const decodedToken = this.jwtHelper.decodeToken(token);
      var key: string[] = Object.values(decodedToken);
      console.log(key);
      userId = `${key[0][0]}`

      return userId;
    }
  }

  addToWatchlist(){
    var watchlist = {
      userID: this.getUserId(),
      movieId: this.movieId,
      fullTitle: this.movieTitle,
      image: this.movieImage,
      imDbRating: this.imdbRating.toString(),
      imDbRatingCount: this.numberOfVotes
    }

    this.watchlistService.addToWatchlist(watchlist).subscribe();
    this.isOnWatchlist = true;
  }

  deleteFromWatchlist(){
    var userId = this.getUserId();

    this.watchlistService.getWatchlistOfUser(userId).subscribe((data) => {
      for(var lista in data){
        if(data[lista].movieId === this.movieId){
          this.watchlistService.deleteFromWatchlist(data[lista].id!).subscribe();
        } 
      }    
    })
    // var watchlist = {
    //   userID: this.getUserId(),
    //   movieId: this.movieId,
    //   fullTitle: this.movieTitle,
    //   image: this.movieImage,
    //   imDbRating: this.imdbRating.toString(),
    //   imDbRatingCount: this.numberOfVotes
    // }

    // this.watchlistService.addToWatchlist(watchlist).subscribe();
    this.isOnWatchlist = false;
  }

  checkIfMovieIsOnWatchlist(){
    var userId = this.getUserId();

    this.watchlistService.getWatchlistOfUser(userId).subscribe((data) => {
      for(var lista in data){
        if(data[lista].movieId === this.movieId){
          this.isOnWatchlist = true;
          return;
        } else {
          this.isOnWatchlist = false;
        }
      }    
    })
  }

  checkIfMovieIsRated(){
    var userId = this.getUserId();

    this.reviewService.getReviewOfUser(userId).subscribe((data) => {
      for(var lista in data){
        if(data[lista].movieId === this.movieId){
          if(this.rating != null){
            this.rating = data[lista].rating ?? 0;
          }
          return;
        } 
      }    
    })
  }

  addUpdateRating(){
    var review = {
      userId: this.getUserId(),
      movieId: this.movieId,
      rating: this.rating,
      comment: undefined,
      fullTitle: this.movieTitle,
      image: this.movieImage,
      imDbRating: this.imdbRating.toString(),
      imDbRatingCount: this.numberOfVotes
    }

    if(review.rating == 0) return;
    this.reviewService.addReview(review).subscribe();
  }

}
