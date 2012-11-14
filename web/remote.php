<?php $srv = '192.168.0.14'; ?>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expo REMOTE</title>
    <link rel="stylesheet" type="text/css" href="/bootstrap/docs/assets/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="/bootstrap/docs/assets/css/bootstrap-responsive.css" />

    <script type="text/javascript" src="/deckjs/jquery-1.7.2.min.js"></script>

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
      <div class="row-fluid">
        <button class="btn span4" type="button" id="previous"><i class="icon-chevron-left"></i>Previous</button>
        <button class="btn span4" type="button" id="info"><i class="icon-info-sign"></i></button>
        <button class="btn span4" type="button" id="next">Next <i class="icon-chevron-right"></i></button>
      </div>
      <script type="text/javascript">
        $(document).ready(function(){
          $('#previous').click(function(event) { manager.previous(); });
          $('#info').click(function(event) { manager.toggleInfo(); });
          $('#next').click(function(event) { manager.next(); });
        });
      </script>
    </body>
</html>
