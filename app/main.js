var Phone = require("phone");
var utils = require("utils");

var settings = {
  bpm: 40,
  tolerance: 15
};

var phone = new Phone({tolerance: settings.tolerance});
document.body.appendChild(phone.element);

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
  phone.setAngle(utils.randomAngle());
}
setInterval(tick, utils.msInterval(settings.bpm));

function draw() {
  phone.redraw(lastAlpha);
  document.documentElement.classList.toggle(
    "correctPosition", phone.isEqualRotation(lastAlpha)
  )
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
