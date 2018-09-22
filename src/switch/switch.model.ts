export interface SwitchData {
	username: string;
	bridgeId: string;
	switches: LightSwitch[];
}

export interface LightSwitch {
	switchPort: number;
	lightIndex: number[];
}