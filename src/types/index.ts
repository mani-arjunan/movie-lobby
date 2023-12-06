export type Movies = {
	id?: string,
	title: string;
	rating: number;
	streamLink: string;
	genre: string;
}

export type MoviesByTitle = Omit<Movies, 'genre' | 'rating' | 'streamLink'>

export type MoviesByGenre = Omit<Movies, 'title' | 'rating' | 'streamLink'>
