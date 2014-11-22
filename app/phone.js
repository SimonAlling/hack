function Phone(options) {
  options = options || {}
  this.element = document.createElement("div");
  this.element.classList.add("phone");

  var homeButton = document.createElement("div");
  homeButton.classList.add("homeButton");
  this.element.insertBefore(homeButton, null);
  this.rotation = 0;
  this.threshold = options.threshold || 10
}


Phone.prototype.setRotation = function(deg) {
  this.rotation = deg;
  this.element.style.transform = "rotate(" + -deg + "deg)";
};

Phone.prototype.isEqualRotation = function(rotation) {
  return (
    rotation >= this.rotation - this.threshold &&
    rotation <= this.rotation + this.threshold
  )
};

module.exports = Phone;
