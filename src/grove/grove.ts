import { existsSync } from "fs";
import { openSync, I2cBus } from "i2c-bus";
import { interval, Observable } from "rxjs";
import { distinctUntilChanged, filter, map, tap } from "rxjs/operators";

import { BufferBytes, Command } from "./grove.model";

export class GrovePi {
	readonly address = 0x04;
	readonly bytesLength = 4;
	readonly paths = [
		"/dev/i2c-0",
		"/dev/i2c-1"
	];

	isInit = false;
	isHalt = false;
	ifBusy = false;
	bus: I2cBus | undefined;

	constructor() {
		const busNumber = this.paths.findIndex(existsSync);

		if (!busNumber) {
			throw new Error("Bus number not identified.");
		}

		this.bus = openSync(busNumber);
	}

	destroy() {
		if (this.bus) {
			this.bus.closeSync();
		}
	}

	read(pin: number): Observable<{ value: number; pin: number; }> {
		return interval(500).pipe(
			filter(() => !!this.bus),
			tap(() => this.write({ command: Command.read, pin })),
			map(() => {
				const buffer = Buffer.alloc(1);
				const status = this.bus!.i2cReadSync(this.address, buffer.length, buffer);

				return status > 0 ? buffer[0] : undefined;
			}),
			filter(value => value !== undefined),
			distinctUntilChanged(),
			map((value: number) => ({ value, pin }))
		);
	}

	private write(bytes: BufferBytes): boolean {
		if (!this.bus) {
			return false;
		}

		const buffer = new Buffer([bytes.command, bytes.pin, bytes.value, bytes.unknown]);

		return this.bus.i2cWriteSync(this.address, buffer.length, buffer) > 0;
	}
}