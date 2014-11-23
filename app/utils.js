exports.randomAngle = function() {
  return Math.floor(Math.random() * 360);
};

exports.msInterval = function(bpm) {
  return (1 / (bpm / 60)) * 1000;
};

exports.isValueBetween = function(value, start, end) {
  return (start <= end
    ? value >= start && value <= end
    : value >= start || value <= end
    );
}

exports.modulo = function(a, b) {
  return (+a % (b = +b) + b) % b;
}
