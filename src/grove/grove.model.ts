export const enum Command {
	read = 1,
	write = 2
}

export interface BufferBytes {
	command: 1 | 2;
	pin: number;
	value?: boolean | 0;
	unknown?: 0;
}