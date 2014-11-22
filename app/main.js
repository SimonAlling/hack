var Phone = require("phone");
var phone = new Phone();

var settings = {
  tickrate = 120; // bpm
};

var lastAlpha = 0;

function msInterval(tickrate) {
  return (tickrate / 60) * 1000;
}

var refreshInterval = msInterval(settings.tickrate);

FULLTILT.getDeviceOrientation({type: "game"})
  .then(function(deviceOrientation) {
    deviceOrientation.listen(function() {
      // do things with deviceOrientation
      var euler = deviceOrientation.getScreenAdjustedEuler();

      lastAlpha = euler.alpha;

      console.log("alpha: " + euler.alpha);
    });
  })
  .catch(function(error) {
    console.log(error);
  });

document.body.appendChild(phone.element);

// window.addEventListener("click", function() {
//   phone.setAngle((phone.getAngle() + 45) % 360);
// }, true)

function tick() {
  phone.setAngle(randomAngle());
}

// Beat:
window.setInterval(refreshInterval, tick);

function draw() {
  phone.redraw(lastAlpha);
}

requestAnimationFrame(draw);