


var settings = {
  tickrate: 20, // bpm
  tolerance: 10
};


var audioContext;
window.addEventListener('load', initAudio, false);
function initAudio() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    audioContext = new AudioContext();
  }
  catch(e) {
    console.log('Web Audio API is not supported in this browser');
  }
}

var Phone = require("phone");
var phone = new Phone({ tolerance: settings.tolerance });

var randomAngle = require("randomAngle");

var lastAlpha = 0;

var lightGreen = "rgba(60, 192, 40, 0.4)";
var green = "rgba(0, 128, 0, 1)";
var red = "rgba(200, 0, 0, 0.5)";
var white = "white";

function msInterval(tickrate) {
  return (1 / (tickrate / 60)) * 1000;
}

function bodyBackground(c) {
  document.body.style.backgroundColor = c;
}

var refreshInterval = msInterval(settings.tickrate);

FULLTILT.getDeviceOrientation({type: "game"})
  .then(function(deviceOrientation) {
    deviceOrientation.listen(function() {
      // do things with deviceOrientation
      var euler = deviceOrientation.getScreenAdjustedEuler();

      lastAlpha = euler.alpha;

  console.log(lastAlpha, phone.getAngle());
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
  if (phone.isEqualRotation(lastAlpha)) {
    phone.incrementScore();
    phone.glow(true);
  }
  phone.setAngle(randomAngle());
  phone.glow(false);
}

// Beat:
var timer = setInterval(tick, refreshInterval);

function draw() {
  phone.redraw(lastAlpha);

  bodyBackground(phone.isEqualRotation(lastAlpha) ? lightGreen : white);

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);