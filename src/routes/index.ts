import { Router } from "express";

import { moviesRoutes } from "./movies";

export function routes(): Router {
	const router = Router();

	router.use("/movies", moviesRoutes());

	return router;
}
