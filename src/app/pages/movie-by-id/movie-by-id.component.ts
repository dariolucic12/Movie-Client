import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie';
import { ImdbApiService } from '../../services/imdb-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-movie-by-id',
  templateUrl: './movie-by-id.component.html',
  styleUrls: ['./movie-by-id.component.scss']
})
export class MovieByIdComponent implements OnInit {

  constructor(private movieService: ImdbApiService,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }

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

    rating: number = 3;

    isOnWatchlist: boolean = true;


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      console.log("param je: " + param.get('id'))
      var id = param.get('id');

      this.getMovieById(id!);
      console.log("muvi dejta je: " + this.movieData)
    });

    this.createForm();


  }

  getMovieById(id: string){
    this.movieService.getMovieById(id).subscribe((data) => {
      this.movieData = data;
      this.movieTitle = data.fullTitle;
      this.movieImage = data.image;
      this.moviePlot = data.plot;
      this.imdbRating = parseFloat(data.imDbRating);
      this.movieRuntime = data.runtimeMins;
      this.numberOfVotes = data.imDbRatingVotes;
      this.genre = data.genres;
      this.director = data.directors;
      this.movieAwards = data.awards;
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


}
