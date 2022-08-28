import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Watchlist } from 'src/app/models/watchlist.model';
import { WatchlistService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  displayedColumns: string[] = ['title', 'imDbRating', 'imDbRatingCount'];
  watchlist: Watchlist[] = [];

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private watchlistService: WatchlistService,
    private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.getWatchlistForUser();
  }

  getWatchlistForUser() {
    var userId;
    const token = localStorage.getItem("token");
    if (token == null) {
      console.log("Token incorrect")
    } else {
      const decodedToken = this.jwtHelper.decodeToken(token);
      var key: string[] = Object.values(decodedToken);
      console.log(key);
      userId = `${key[0][0]}`
      this.watchlistService.getWatchlistOfUser(userId).subscribe((data: any) => {
        this.watchlist = data;
        console.log(this.watchlist);
        this.changeDetectorRefs.detectChanges();

        return data;
      });
    }
  }
}
