


var settings = {
  tickrate: 40, // bpm
  tolerance: 15,
  totalTicks: 5
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
var phone = new Phone(settings);

var randomAngle = require("randomAngle");

var lastAlpha = 0;

var lightGreen = "rgba(60, 192, 40, 0.4)";
var green = "rgba(0, 128, 0, 1)";
var red = "rgba(200, 0, 0, 0.5)";
var transparent = "rgba(0, 0, 0, 0)";

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
  phone.incrementTicks();
  if (phone.isEqualRotation(lastAlpha)) {
    phone.incrementScore();
    phone.glow(true);
  } else {
    phone.glow(false);
  }
  phone.setAngle(randomAngle());
}

// Beat:
var timer = setInterval(tick, refreshInterval);

function draw() {
  phone.redraw(lastAlpha);

  bodyBackground(phone.isEqualRotation(lastAlpha) ? lightGreen : transparent);

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
