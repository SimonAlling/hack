var hello = require("hello");
var Phone = require("phone");

hello();

FULLTILT.getDeviceOrientation({type: "game"})
  .then(function(deviceOrientation) {
    deviceOrientation.listen(function() {
      // do things with deviceOrientation
    });
  })
  .catch(function(error) {
  });

var phone = new Phone();

document.body.appendChild(phone.element);

window.addEventListener("click", function() {
  phone.setRotation((phone.rotation + 45) % 360);
}, true)
