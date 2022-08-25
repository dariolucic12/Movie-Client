export interface Review {
    id?: number;
    userId: string;
    movieId: string;
    rating?: number;
    comment?: string;
    fullTitle: string;
    image: string;
    imDbRating: string;
    imDbRatingCount: string;
}
