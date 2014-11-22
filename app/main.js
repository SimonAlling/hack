var hello = require("hello");
var Phone = require("phone");

hello();

console.log(FULLTILT);

var phone = new Phone();

document.body.appendChild(phone.element);

window.addEventListener("click", function() {
  phone.setRotation((phone.rotation + 45) % 360);
}, true)
