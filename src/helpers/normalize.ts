import { Movies } from "../types";

export function normalizeReponse(
	data: Record<string, string | number>,
): Movies {
	return {
		title: data.title as string,
		genre: data.genre as string,
		streamLink: data.streamLink as string,
		id: data._id as string,
		rating: data.rating as number,
	};
}
