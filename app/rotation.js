var promise = new FULLTILT.getDeviceOrientation({ 'type': 'game' });

var deviceOrientation;

promise
    .then(function(controller) {
      // Store the returned FULLTILT.DeviceOrientation object
      deviceOrientation = controller;
    })
    .catch(function(message) {
      console.error(message);
});

module.exports =  (function draw() {
    // If we have a valid FULLTILT.DeviceOrientation object then use it
    if (deviceOrientation) {

      // Obtain the *screen-adjusted* normalized device rotation
      // as Quaternion, Rotation Matrix and Euler Angles objects
      // from our FULLTILT.DeviceOrientation object
      var quaternion = deviceOrientation.getScreenAdjustedQuaternion();
      var matrix = deviceOrientation.getScreenAdjustedMatrix();
      var euler = deviceOrientation.getScreenAdjustedEuler();

      // Do something with our quaternion, matrix, euler objects...
      console.debug(quaternion);
      console.debug(matrix);
      console.debug(euler);

    }

    // Execute function on each browser animation frame
    requestAnimationFrame(draw);

  })();