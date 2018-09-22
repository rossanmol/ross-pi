import { existsSync } from "fs";
import { openSync, I2cBus } from "i2c-bus";

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

	read(pin: number): number | undefined {
		if (!this.bus) {
			return undefined;
		}

		this.write({ command: Command.read, pin });

		const buffer = Buffer.alloc(1);
		const ret = this.bus.i2cReadSync(this.address, buffer.length, buffer);
		return ret > 0 ? buffer[0] : undefined;
	}

	private write(bytes: BufferBytes): boolean {
		if (!this.bus) {
			return false;
		}

		const buffer = new Buffer([bytes.command, bytes.pin, bytes.value, bytes.unknown]);

		return this.bus.i2cWriteSync(this.address, buffer.length, buffer) > 0;
	}
}