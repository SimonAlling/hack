var utils = require("utils");

function Phone(options) {
  options = options || {}

  this.element = document.createElement("div");
  this.element.classList.add("phone");

  var homeButton = document.createElement("div");
  homeButton.classList.add("homeButton");
  this.element.appendChild(homeButton);

  this.scoreElement = document.createElement("div");
  this.scoreElement.classList.add("score");
  this.element.appendChild(this.scoreElement);

  this.score = 0;
  this.ticks = 0;
  this.angle = 0;
  this.tolerance = options.tolerance || 10;
}

Phone.prototype.redraw = function(alpha) {
  this.refreshScore();
  this.element.style.transform = "rotate(" + ((alpha - this.angle) % 360) + "deg)";
};

Phone.prototype.setAngle = function(deg) {
  this.angle = deg;
};

Phone.prototype.getAngle = function() {
  return this.angle;
};

Phone.prototype.incrementScore = function() {
  this.score++;
};

Phone.prototype.incrementTicks = function() {
  this.ticks++;
};

Phone.prototype.refreshScore = function() {
  this.scoreElement.innerHTML = this.score + "<br><span>" + this.ticks + "</span>";
  this.scoreElement.style.transform = "rotate(" + (this.angle % 360) + "deg)";
};

Phone.prototype.isEqualRotation = function(rotation) {
  return utils.isValueBetween(
    rotation,
    utils.modulo(this.angle - this.tolerance, 360),
    utils.modulo(this.angle + this.tolerance, 360)
  );
};

Phone.prototype.glow = function(positive) {
  var glowMode = (positive ? "glow-positive" : "glow-negative");
  this.element.classList.remove("glow-positive", "glow-negative");
  this.element.offsetWidth = this.element.offsetWidth;
  this.element.classList.add(glowMode);
};

module.exports = Phone;
