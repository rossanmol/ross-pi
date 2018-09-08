var GrovePi = require('node-grovepi').GrovePi
var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var host = "192.168.0.3";
var username = "zmgQCvF36lLcE9e0DVu2oibx8OceSFlotNPD152G";
var api = new HueApi(host, username);

var turnedOn = lightState.create().on().white(100, 100);
var turnedOff = lightState.create().off();

let updateLights = (state: any) => {
	api.setLightState(1, state);
	api.setLightState(2, state);
	api.setLightState(3, state);
};


var Commands = GrovePi.commands
var Board = GrovePi.board
var DigitalButtonSensor = GrovePi.sensors.DigitalButton;


var board = new Board({
    debug: true,
    onError: function(err: any) {
      console.log('Something wrong just happened')
      console.log(err)
    },
    onInit: function(res: any) {
      if (res) {

		var red = new GrovePi.sensors.base.Digital(15);
        red.on('change', function(isTurnedOff: any) {
			updateLights(isTurnedOff ? turnedOff : turnedOn);
		});
		red.watch();
      }
    }
  })

  board.init();
