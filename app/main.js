var Phone = require("phone");
var randomAngle = require("randomAngle");

var settings = {
  tickrate: 40, // bpm
  tolerance: 15
};

var phone = new Phone({ tolerance: settings.tolerance });
document.body.appendChild(phone.element);

var lightGreen = "rgba(60, 192, 40, 0.4)";
var white = "white";

function msInterval(tickrate) {
  return (1 / (tickrate / 60)) * 1000;
}

function bodyBackground(c) {
  document.body.style.backgroundColor = c;
}

var lastAlpha = 0;

FULLTILT.getDeviceOrientation({type: "game"})
  .then(function(deviceOrientation) {
    deviceOrientation.listen(function() {
      var euler = deviceOrientation.getScreenAdjustedEuler();
      lastAlpha = euler.alpha;
    });
  })
  .catch(function(error) {
    console.log(error);
  });

function tick() {
  phone.incrementTicks();
  if (phone.isEqualRotation(lastAlpha)) {
    phone.incrementScore();
    phone.glow(true);
  } else {
    phone.glow(false);
  }
  phone.setAngle(randomAngle());
}
setInterval(tick, msInterval(settings.tickrate));

function draw() {
  phone.redraw(lastAlpha);
  bodyBackground(phone.isEqualRotation(lastAlpha) ? lightGreen : white);
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
