import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  displayedColumns: string[] = ['rank', 'title', 'imDbRating', 'imDbRatingCount', 'rating'];
  reviews: Review[] = [];

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private reviewService: ReviewService,
    private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.getReviewForUser();
  }
  getReviewForUser() {
    var userId;
    const token = localStorage.getItem("token");
    if (token == null) {
      console.log("Token incorrect")
    } else {
      const decodedToken = this.jwtHelper.decodeToken(token);
      var key: string[] = Object.values(decodedToken);
      console.log(key);
      userId = `${key[0][0]}`
      this.reviewService.getReviewOfUser(userId).subscribe((data: any) => {
        this.reviews = data;
        console.log(this.reviews);
        this.changeDetectorRefs.detectChanges();

        return data;
      });
    }
  }

}
