import * as nodeCleanup from "node-cleanup";

import { GrovePi } from "./grove/grove";

const grove = new GrovePi();

setInterval(() => {
	console.log("wow", grove.read(3));
}, 500);

nodeCleanup((exitCode, signal) => {
	console.log("reset", exitCode, signal);
	grove.destroy();
	return true;
});