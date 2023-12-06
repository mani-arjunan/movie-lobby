import { NextFunction, Request, Response } from "express";
import { environment } from "../environment";

export const validateIsAdmin = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const headers = req.headers;
	const { client_id } = headers;

	if (!client_id) {
		res.status(401);
		res.send("This operation requires admin permission");
		return;
	}
	if (client_id !== environment.ADMIN_KEY) {
		res.status(403);
		res.send("You don't have admin rights to use this API");
		return;
	}
	next();
	return;
};
