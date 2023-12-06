const env = process.env;

export const environment = {
	PORT: env.PORT || 3000,
	DATABASE_URL:
		env.DATABASE_URL ||
		"mongodb+srv://itsmh0305:Mh030521!@movies-lobby-test.81lb3ew.mongodb.net/?retryWrites=true&w=majority",
	ADMIN_KEY: "ADMIN_KEY",
	TEST_DATABASE_URL:
		env.TEST_DATABASE_URL ||
		"mongodb+srv://itsmh0305:Mh030521!@movies-lobby-test.81lb3ew.mongodb.net/?retryWrites=true&w=majority",
};
