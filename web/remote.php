<?php $srv = '192.168.0.14'; ?>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <title>Expo REMOTE</title>
    <link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css" />
    <script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
    <script src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>

    <script src="expojs/control/expo.Owner.js"></script>
    <script src="expojs/control/expo.Follower.js"></script>
    <script src="expojs/control/expo.ControledPresentation.js"></script>
    <script src="expojs/control/expo.ControlRemote.js"></script>
    <script src="expojs/control/expo.ControlManager.js"></script>
    <script src="http://<?php echo $srv ?>:2890/socket.io/socket.io.js"></script>
    <script>
      var socket = io.connect('http://<?php echo $srv ?>:2890/expo');
      var owner = new Owner(null);
      var manager = new ControlManager(socket, '<?php echo $_GET['project_id'] ?>', 1, 10, owner);
      </script>
    </head>

    <body>

        <div data-role="page">

            <div data-role="header" data-position="fixed">
                <h1>Expo Remote</h1>
                <a href="#options" data-icon="gear" class="ui-btn-right">Options</a>
            </div>

            <div data-role="content">

                <div class="main">
                  <h2>Device Motion</h2>
                  <table>
                    <tr>
                      <td>Event Supported</td>
                      <td id="dmEvent"></td>
                    </tr>
                    <tr>
                      <td>accelerationIncludingGravity</td>
                      <td id="moAccel"></td>
                    </tr>
                    <tr>
                      <td>Calculated Left-Right Tilt</td>
                      <td id="moCalcTiltLR"></td>
                    </tr>
                    <tr>
                      <td>Calculated Front-Back Tilt</td>
                      <td id="moCalcTiltFB"></td>
                    </tr>
                  </table>
                </div>

            </div>

            <div data-role="footer">
                <div data-role="navbar">
                    <ul>
                        <li>
                            <a href="#previous" data-role="button" data-icon="arrow-l">Previous</a>
                        </li>
                        <li>
                            <a href="#info" data-role="button" data-icon="info">info</a>
                        </li>
                        <li>
                            <a href="#next" data-role="button" data-icon="arrow-r">Next</a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

        <script type="text/javascript">
          $(document).ready(function(){
            $('a[href="#previous"]').click(function(event) {
                event.preventDefault();
                manager.previous();
            });
            $(document).bind('swiperight', function(event) {
                event.preventDefault();
                manager.previous();
            });

            $('a[href="#info"]').click(function(event) { manager.toggleInfo(); });

            $('a[href="#next"]').click(function(event) {
                event.preventDefault();
                manager.next();
            });
            $(document).bind('swipeleft', function(event) {
                event.preventDefault();
                manager.next();
            });

            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', deviceMotionHandler, false);
            } else {
                document.getElementById("dmEvent").innerHTML = "Not supported on your device.";
            }
          });

          function deviceMotionHandler(eventData) {
              // Grab the acceleration including gravity from the results
              var acceleration = eventData.accelerationIncludingGravity;

              // Display the raw acceleration data
              var rawAcceleration = "[" +  Math.round(acceleration.x) + ", " + 
                Math.round(acceleration.y) + ", " + Math.round(acceleration.z) + "]";

              // Z is the acceleration in the Z axis, and if the device is facing up or down
              var facingUp = -1;
              if (acceleration.z > 0) {
                facingUp = +1;
              }
              
              // Convert the value from acceleration to degrees acceleration.x|y is the 
              // acceleration according to gravity, we'll assume we're on Earth and divide 
              // by 9.81 (earth gravity) to get a percentage value, and then multiply that 
              // by 90 to convert to degrees.
              var tiltLR = Math.round(((acceleration.x) / 9.81) * -90);
              var tiltFB = Math.round(((acceleration.y + 9.81) / 9.81) * 90 * facingUp);

              // Display the acceleration and calculated values
              document.getElementById("moAccel").innerHTML = rawAcceleration;
              document.getElementById("moCalcTiltLR").innerHTML = tiltLR;
              document.getElementById("moCalcTiltFB").innerHTML = tiltFB;

              // Apply the 2D rotation and 3D rotation to the image
              //var rotation = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB) + "deg)";
              //document.getElementById("imgLogo").style.webkitTransform = rotation;

              if(tiltLR > 55 && 58 > tiltLR) {
                  manager.next();
              }
              if(tiltLR < -55 && -58 < tiltLR) {
                  manager.previous();
              }
            }
        </script>
    </body>
</html>

