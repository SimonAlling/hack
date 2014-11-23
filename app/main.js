var Phone = require("phone");
var randomAngle = require("randomAngle");

var settings = {
  bpm: 40,
  tolerance: 15
};

var phone = new Phone({ tolerance: settings.tolerance });
document.body.appendChild(phone.element);

var lightGreen = "rgba(60, 192, 40, 0.4)";
var transparent = "rgba(0, 0, 0, 0)";

function msInterval(bpm) {
  return (1 / (bpm / 60)) * 1000;
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
setInterval(tick, msInterval(settings.bpm));

function draw() {
  phone.redraw(lastAlpha);
  bodyBackground(phone.isEqualRotation(lastAlpha) ? lightGreen : transparent);
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
