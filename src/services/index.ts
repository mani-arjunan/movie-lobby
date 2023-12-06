import { Movies as MoviesI, MoviesByGenre, MoviesByTitle } from "../types";
import { Movies } from "../schemas/movies";

export const insertMovies = async (movies: MoviesI): Promise<void> => {
	const moviesToInsert = new Movies({
		title: movies.title,
		rating: movies.rating,
		genre: movies.genre,
		streamLink: movies.streamLink,
	});

	await moviesToInsert.save();
};

export const getMovies = async (): Promise<Array<MoviesI>> => {
	return await Movies.find({});
};

export const findMoviesBasedOnParams = async (
	moviesQuery: MoviesByTitle | MoviesByGenre,
): Promise<Array<MoviesI>> => {
	const searchQuery = (moviesQuery as MoviesByTitle).title
		? {
			title: (moviesQuery as MoviesByTitle).title,
		}
		: {
			genre: (moviesQuery as MoviesByGenre).genre,
		};

	return await Movies.find({ ...searchQuery });
};

const findMovie = async (id: string): Promise<MoviesI | null> => {
	const whereClause = { _id: id };
	const findMovie = await Movies.findOne({ ...whereClause });

	return findMovie;
};

export const updateMoviesBasedOnId = async (
	id: string,
	movies: MoviesI,
): Promise<MoviesI | null> => {
	const whereClause = { _id: id };

	if (!(await findMovie(id))) {
		throw new Error("Movie not found");
	}

	return await Movies.findOneAndUpdate(whereClause, { ...movies });
};

export const deleteMovie = async (id: string): Promise<void> => {
	const whereClause = { _id: id };

	if (!(await findMovie(id))) {
		throw new Error("Movie not found");
	}

	await Movies.deleteOne(whereClause);
};
