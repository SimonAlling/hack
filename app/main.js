var Phone = require("phone");
var phone = new Phone();

FULLTILT.getDeviceOrientation({type: "game"})
  .then(function(deviceOrientation) {
    deviceOrientation.listen(function() {
      // do things with deviceOrientation
      var euler = deviceOrientation.getScreenAdjustedEuler();

      phone.redraw(euler.alpha);

      console.log("alpha: " + euler.alpha);
    });
  })
  .catch(function(error) {
    console.log(error);
  });

document.body.appendChild(phone.element);

window.addEventListener("click", function() {
  phone.setAngle((phone.getAngle() + 45) % 360);
}, true)
