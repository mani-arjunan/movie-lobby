import { shutDownSystem, startupSystem } from "../src/app";

export async function mochaGlobalSetup(): Promise<void> {
	await startupSystem();
}

export async function mochaGlobalTeardown(): Promise<void> {
	await shutDownSystem();
}
