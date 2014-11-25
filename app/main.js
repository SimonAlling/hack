var Phone = require("phone");
var utils = require("utils");

var settings = {
  bpm: 40,
  tolerance: 15
};

document.body.removeChild(document.getElementById("noscript"));

var phone = new Phone({tolerance: settings.tolerance});
var lastAlpha = 0;

function tick() {
  phone.incrementTicks();
  if (phone.isEqualRotation(lastAlpha)) {
    phone.incrementScore();
    phone.glow(true);
  } else {
    phone.glow(false);
  }
  phone.setAngle(utils.randomAngle());
  phone.rotateScore();
}

function draw() {
  phone.rotate(lastAlpha);
  document.documentElement.classList.toggle(
    "correctPosition", phone.isEqualRotation(lastAlpha)
  );
  requestAnimationFrame(draw);
}

FULLTILT.getDeviceOrientation({type: "game"})
  .then(function(deviceOrientation) {
    deviceOrientation.listen(function() {
      var euler = deviceOrientation.getScreenAdjustedEuler();
      lastAlpha = euler.alpha;
    });
    document.body.appendChild(phone.element);
    setInterval(tick, utils.msInterval(settings.bpm));
    draw();
  })
  .catch(function(error) {
    document.body.textContent = error;
  });
