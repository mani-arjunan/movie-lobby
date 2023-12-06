const chalk = require('chalk')

export const logger = {
	info: (message: string, ...args: unknown[]) => {
		console.info(chalk.green(message, args.join('').toString()))
	},
	log: (message: string, ...args: unknown[]) => {
		console.log(message, args.join('').toString());
	},
	error: (message: string, ...args: unknown[]) => {
		console.error(chalk.red(message, args.join('').toString()));
	}
}
