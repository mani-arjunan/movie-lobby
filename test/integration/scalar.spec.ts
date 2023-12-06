import { expect } from "chai";
import { Movies } from "../../src/types";
import { fetchHelper, deleteCollection } from "../test-helper";

describe("Basic Scalar tests", () => {
	after(async () => {
		await deleteCollection();
	});

	describe("Insert Movies", () => {
		it("should insert movies with valid client_id", async () => {
			const movies: Movies = {
				title: "Harry Potter",
				rating: 8,
				genre: "Magic",
				streamLink: "https://dummy.com/stream/harry-potter",
			};

			const { status, data } = await fetchHelper(
				"movies",
				"POST",
				{
					"content-type": "application/json",
					client_id: "ADMIN_KEY",
				},
				{ ...movies },
			);

			expect(status).to.equal(201);
			expect(data).to.equal("Movie Inserted");
		});

		it("should throw admin validation error on invalid client_id", async () => {
			const movies: Movies = {
				title: "Harry Potter",
				rating: 8,
				genre: "Magic",
				streamLink: "https://dummy.com/stream/harry-potter",
			};

			const { status, data } = await fetchHelper(
				"movies",
				"POST",
				{
					"content-type": "application/json",
					client_id: "DUMMY_KEY",
				},
				{ ...movies },
			);

			expect(status).to.equal(403);
			expect(data).to.equal("You don't have admin rights to use this API");
		});
	});

	describe("Get movies", async () => {
		it("should get all movies", async () => {
			const expectedMovies: Movies = {
				title: "Harry Potter",
				rating: 8,
				genre: "Magic",
				streamLink: "https://dummy.com/stream/harry-potter",
			};
			const { status, data } = await fetchHelper("movies", "GET");
			const normalizedData = JSON.parse(data as string).map((data: Movies) => {
				delete data.id;
				return data;
			});

			expect(status).to.equal(200);
			expect(normalizedData).to.include.deep.members([expectedMovies]);
		});
	});

	describe("Search movies", () => {
		it("should be able to search movies with title", async () => {
			const expectedMovies: Movies = {
				title: "Harry Potter",
				rating: 8,
				genre: "Magic",
				streamLink: "https://dummy.com/stream/harry-potter",
			};
			const { status, data } = await fetchHelper(
				"movies/search?title=Harry Potter",
				"GET",
			);
			const normalizedData = JSON.parse(data as string).map((data: Movies) => {
				delete data.id;
				return data;
			});

			expect(status).to.equal(200);
			expect(normalizedData).to.include.deep.members([expectedMovies]);
		});
	});
});
