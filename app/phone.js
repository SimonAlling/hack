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
  this.angle = 0;
  this.tolerance = options.tolerance || 10;
}

Phone.prototype.redraw = function(alpha) {
  this.refreshScore(alpha);
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

function modulo(a, b) {
  return (+a % (b = +b) + b) % b;
}

Phone.prototype.refreshScore = function(lastAlpha) {
  this.scoreElement.textContent = this.score;
  this.scoreElement.style.transform = "rotate(" + ((this.angle) % 360) + "deg)";
};


function isAngleBetween(angle, start, end) {
  if (end < start) {
    // End time is before start time
    return (angle < end || angle >= start);
  } else {
    // End time is after start time
    return (angle < end && angle >= start);
  }
}

Phone.prototype.isEqualRotation = function(rotation) {
  return isAngleBetween(
    rotation,
    modulo(this.angle - this.tolerance, 360),
    modulo(this.angle + this.tolerance, 360)
  );
  // return (
  //   rotation >= modulo(this.angle - this.tolerance, 360) &&
  //   rotation <= modulo(this.angle + this.tolerance, 360)
  // );
};

module.exports = Phone;
