import mongoose from "mongoose";

const { Schema, model } = mongoose;

const moviesSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	genre: {
		type: String,
		required: true,
	},
	streamLink: {
		type: String,
		required: true,
	},
});

export const Movies = model("movies", moviesSchema);
