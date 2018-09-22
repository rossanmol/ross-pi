
// import { GrovePi } from "node-grovepi";
// import { lightState, HueApi } from "node-hue-api";

// const GrovePi = require("node-grovepi").GrovePi;

// const host = "192.168.0.3";
// const username = "zmgQCvF36lLcE9e0DVu2oibx8OceSFlotNPD152G";
// const api = new HueApi(host, username);

// const turnedOn = lightState.create().on().white(100, 100);
// const turnedOff = lightState.create().off();

// const updateLights = (state: any) => {
// 	api.setLightState(1, state);
// 	api.setLightState(2, state);
// 	api.setLightState(3, state);
// };

// const board = new GrovePi.Board({
// 	debug: true,
// 	onError: (err: any) => console.log("Something wrong just happened", err),
// 	onInit (res: any) {
// 		if (res) {
// 			new GrovePi.sensors.base.Digital(3)
// 				.on("change", (isTurnedOff: boolean) => {
// 					console.log("wow", isTurnedOff);
// 					updateLights(isTurnedOff ? turnedOff : turnedOn);
// 				})
// 				.watch();
// 		}
// 	}
// });

// board.init();

// const abc = new GrovePi.Board();
// console.log(abc);