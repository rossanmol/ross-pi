import { lightState } from "node-hue-api";

export const turnedOn = lightState.create()
	.on()
	.white(100, 100);

export const turnedOff = lightState.create()
	.off();