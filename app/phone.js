function Phone(options) {
  options = options || {}
  this.element = document.createElement("div");
  this.element.classList.add("phone");

  var homeButton = document.createElement("div");
  homeButton.classList.add("homeButton");
  this.element.appendChild(homeButton);
  this.angle = 0;
  this.tolerance = options.tolerance || 10
}

Phone.prototype.redraw = function(alpha) {
  this.element.style.transform = "rotate(" + ((alpha - this.angle) % 360) + "deg)";
};

Phone.prototype.setAngle = function(deg) {
  this.angle = deg;
};

Phone.prototype.getAngle = function() {
  return this.angle;
};

Phone.prototype.isEqualRotation = function(rotation) {
  return (
    rotation >= this.rotation - this.threshold &&
    rotation <= this.rotation + this.threshold
  );
};

module.exports = Phone;
