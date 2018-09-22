#!/usr/bin/env node
import * as program from "commander";
import { readFileSync } from "fs";
import * as nodeCleanup from "node-cleanup";
import { nupnpSearch } from "node-hue-api";
import { from } from "rxjs";
import { filter, first, map, switchMap } from "rxjs/operators";

import { startSwitch } from "./switch/switch.const";
import { SwitchData } from "./switch/switch.model";

let data: Partial<SwitchData> | undefined;

// Validation
program.option("-d, --data [value]", "Set data for lights")
	.parse(process.argv);

if (!program.data) {
	console.error("JSON data was not set!");
	process.exit(0);
}

try {
	data = JSON.parse(readFileSync(program.data, "utf8"));
} catch (e) {
	console.error("JSON file is empty!");
	process.exit(0);
}

if (!(data && data.username && data.bridgeId && data.switches && data.switches.length)) {
	console.error("Something is wrong with JSON data!");
	process.exit(0);
}

// Process Exit Checkup
nodeCleanup(() => {
	if (lights$$) {
		lights$$.unsubscribe();
	}

	return true;
});

// Light switch runner

const lights$$ = from(nupnpSearch())
	.pipe(
		map(bridges => bridges.find(bridge => bridge.id === data!.bridgeId)),
		filter(bridge => !!bridge),
		first(),
		switchMap(bridge => startSwitch(bridge!.ipaddress, data!.username!, data!.switches!))
	).subscribe();