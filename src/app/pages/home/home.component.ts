import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Top250Movie } from 'src/app/models/top250Movie.model';
import { ImdbApiService } from 'src/app/services/imdb-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['rank', 'title', 'imDbRating', 'imDbRatingCount'];
  top250Movies: Top250Movie[] = [];

  constructor( 
    private changeDetectorRefs: ChangeDetectorRef,
    private top250moviesService: ImdbApiService) { }

  ngOnInit(): void {
    this.getAllTop250Movies();
    
  }

  getAllTop250Movies(){
    this.top250moviesService.getTopMovies().subscribe((data: any) => {
      this.top250Movies = data.items;
      console.log(this.top250Movies);
      this.changeDetectorRefs.detectChanges();

      return data;
    });
  }
}
