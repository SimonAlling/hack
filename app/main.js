var Phone = require("phone");

FULLTILT.getDeviceOrientation({type: "game"})
  .then(function(deviceOrientation) {
    deviceOrientation.listen(function() {
      // do things with deviceOrientation
      var euler = deviceOrientation.getScreenAdjustedEuler();

      console.log("alpha: " + euler.alpha);
      console.log(euler.beta);
      console.log(euler.gamma);
    });
  })
  .catch(function(error) {
    console.log(error);
  });

var phone = new Phone();

document.body.appendChild(phone.element);

window.addEventListener("click", function() {
  phone.setRotation((phone.rotation + 45) % 360);
}, true)