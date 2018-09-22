import { HueApi } from "node-hue-api";
import { merge } from "rxjs";
import { tap } from "rxjs/operators";

import { GrovePi } from "../grove/grove";
import { turnedOff, turnedOn } from "../light.const";

import { LightSwitch } from "./switch.model";

export const startSwitch = (ipaddress: string, username: string, lightSwitches: LightSwitch[]) => {
	const grove = new GrovePi();
	const hue = new HueApi(ipaddress, username);

	return merge(...lightSwitches.map(item => grove.read(item.switchPort)))
		.pipe(
			tap(({ pin, value }) => {
				const lightSwitch = lightSwitches.find(item => item.switchPort === pin);

				if (!lightSwitch || !hue) {
					return;
				}

				lightSwitch.lightIndex.forEach(lightIndex => hue!.setLightState(lightIndex, value ? turnedOff : turnedOn));
			})
		);
};