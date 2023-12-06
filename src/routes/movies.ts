import { Request, Response, Router } from "express";
import { validateIsAdmin } from "../validation/validate";
import { Movies, MoviesByGenre, MoviesByTitle } from "../types";
import {
	deleteMovie,
	findMoviesBasedOnParams,
	getMovies,
	insertMovies,
	updateMoviesBasedOnId,
} from "../services";
import { logger } from "../helpers/logger";
import { normalizeReponse } from "../helpers/normalize";

export function moviesRoutes(): Router {
	const router = Router();

	router.get("/", async (req: Request, res: Response) => {
		try {
			const movies = await getMovies();
			const normalizedMovies = movies.map((movie) => normalizeReponse(movie));
			res.status(200).send(normalizedMovies);
		} catch (e) {
			logger.error("", e);
			res.status(400).send("Server Error!");
		}
	});

	router.get("/search", async (req: Request, res: Response) => {
		try {
			const movies = await findMoviesBasedOnParams(
				req.query as MoviesByTitle | MoviesByGenre,
			);
			const normalizedMovies = movies.map((movie) => normalizeReponse(movie));
			res.status(200).send(normalizedMovies);
		} catch (e) {
			logger.error("", e);
			res.status(400).send("Server Error!");
		}
	});

	router.post("/", validateIsAdmin, async (req: Request, res: Response) => {
		try {
			await insertMovies(req.body as Movies);
			res.status(201).send("Movie Inserted");
		} catch (e) {
			logger.error("", e);
			res.status(400);
			res.send(`Insertion Error! ${e}`);
		}
	});

	router.put("/:id", validateIsAdmin, async (req: Request, res: Response) => {
		try {
			await updateMoviesBasedOnId(req.params.id, req.body);
			res.status(204).send("Movie Updated");
		} catch (e) {
			const error = e as Error;
			logger.error("", error);
			if (error.message.includes("Cast to ObjectId")) {
				res.status(422).send("Invalid Id Format");
				return;
			}
			if (error.message === "Movie not found") {
				res.status(400).send("Id not found!");
				return;
			}
			res.status(400);
			res.send(`Updation Error! ${e}`);
		}
	});

	router.delete(
		"/:id",
		validateIsAdmin,
		async (req: Request, res: Response) => {
			try {
				await deleteMovie(req.params.id);
				res.status(200).send("Movie Deleted");
			} catch (e) {
				const error = e as Error;
				logger.error("", error);
				if (error.message.includes("Cast to ObjectId")) {
					res.status(422).send("Invalid Id Format");
					return;
				}
				if (error.message === "Movie not found") {
					res.status(400).send("Id not found!");
					return;
				}
				res.status(400);
				res.send(`Deletion Error! ${e}`);
			}
		},
	);
	return router;
}
