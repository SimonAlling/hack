var utils = require("utils");

function Phone(options) {
  options = options || {}

  this.angle = 0;
  this.tolerance = options.tolerance || 10;

  this.element = document.createElement("div");
  this.element.classList.add("phone");

  this.scoreElement = document.createElement("div");
  this.scoreElement.classList.add("score");
  this.scoreElement.dataset.score = 0;
  this.scoreElement.dataset.ticks = 0;
  this.element.appendChild(this.scoreElement);
}

Phone.prototype.rotate = function(alpha) {
  this.element.style.transform = "rotate(" + (alpha - this.angle) + "deg)";
};

Phone.prototype.rotateScore = function() {
  this.scoreElement.style.transform = "rotate(" + this.angle + "deg)";
};

Phone.prototype.setAngle = function(angle) {
  this.angle = angle;
};

Phone.prototype.getAngle = function() {
  return this.angle;
};

Phone.prototype.incrementScore = function() {
  this.scoreElement.dataset.score++;
};

Phone.prototype.incrementTicks = function() {
  this.scoreElement.dataset.ticks++;
};

Phone.prototype.isEqualRotation = function(rotation) {
  return utils.isValueBetween(
    rotation,
    utils.modulo(this.angle - this.tolerance, 360),
    utils.modulo(this.angle + this.tolerance, 360)
  );
};

Phone.prototype.glow = function(positive) {
  this.element.classList.remove("glow-positive", "glow-negative");
  this.element.offsetWidth = this.element.offsetWidth; // Force animation.
  this.element.classList.add(positive ? "glow-positive" : "glow-negative");
};

module.exports = Phone;
