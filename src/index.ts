import { startupSystem } from "./app";
import { logger } from "./helpers/logger";

const { error } = logger;

startupSystem().catch(error);
