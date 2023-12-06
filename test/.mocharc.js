module.exports = {
	extension: ["ts"],
	loader: "ts-node/esm",
	ui: "bdd",
	require: ["dotenv/config", "./test/setup.ts"],
	recursive: true,
	timeout: "60000",
	exit: true,
};
