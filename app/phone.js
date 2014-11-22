function Phone() {
  this.element = document.createElement("div");
  this.element.classList.add("phone");

  var homeButton = document.createElement("div");
  homeButton.classList.add("homeButton");
  this.element.insertBefore(homeButton, null);
  this.rotation = 0;
}


Phone.prototype.setRotation = function(deg) {
  this.rotation = deg;
  this.element.style.transform = "rotate(" + deg + "deg)";
};

module.exports = Phone;