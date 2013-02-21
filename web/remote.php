<?php require_once '../lib/expo/loader.php'; ?>
<!DOCTYPE HTML>
<html lang="fr-FR">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Expo REMOTE</title>
  <link href="bootstrap/docs/assets/css/bootstrap.css" rel="stylesheet" media="screen">
  <link href="bootstrap/docs/assets/css/bootstrap-responsive.css" rel="stylesheet" media="screen">
  <link rel="stylesheet" type="text/css" href="/cdn/expo/css/expo_remote.css" />

  <script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
  <script type="text/javascript" src="bootstrap/docs/assets/js/bootstrap.js"></script>

  <script src="expojs/user/expo.User.js"></script>
  <script src="expojs/control/expo.ControledPresentation.js"></script>
  <script src="expojs/control/expo.ControlRemote.js"></script>
  <script src="expojs/control/expo.ControlManager.js"></script>
  <script src="<?php echo $expo_remote_srv ?>/socket.io/socket.io.js"></script>
  <script type="text/javascript">
    var socket = io.connect('<?php echo $expo_remote_srv ?>/expo');
    var owner = new User();
    var manager = new ControlManager(
      socket,
      '<?php echo $_GET['project_id']; ?>',
      1,
      <?php echo $_GET['project_count_slides']; ?>,
      owner
    );
    manager.init();
    
    $(document).ready(function(){ 
      manager.bindWithView();
    });
  </script>
</head>
<body>
  <div class="container-fluid">
    <div class="row-fluid">
      <div class="span6" id="expo-remote-base-control">
        <h1 class="span12">Name project</h1>
        <hr class="span12"/>
        <a id="expo-remote-previous"><span>PREVIOUS</span></a>
        <a id="expo-remote-current"><span>0</span></a>
        <a id="expo-remote-next"><span>NEXT</span></a>
        <input id="expo-remote-name" type="text" placeholder="#0" />
        <hr class="span12"/>
        <div id="expo-remote-followers-counter">0</div>
        <div class="footer visible-phone">
          <a id="show-advanced-control">^</a>
        </div>
      </div>

      <div class="span6" id="expo-remote-advanced-control">
        <div class="header visible-phone">
          <a id="hide-advanced-control">v</a>
        </div>
        <div id="expo-remote-goto">
          <ul>
            <?php for ($i = 1; $i <= $_GET['project_count_slides']; $i++): ?>
              <li><a href="#" data-goto="<?php echo $i; ?>"><?php echo $i; ?></a></li>
            <?php endfor ?>
          </ul>
        </div>
        <a id="expo-remote-project-information" href=""><span></span></a>
        <a id="expo-remote-player-information" href=""><span></span></a>
        <a id="expo-remote-share" href=""><span></span></a>
        <a id="expo-remote-pages" href=""><span></span></a>
      </div>
    </div>
  </div>

  <script type="text/javascript">
    $(document).ready(function(){
      $("#show-advanced-control").click(function(event){
        event.preventDefault();
        $("#expo-remote-advanced-control").addClass("visible");
      });

      $("#hide-advanced-control").click(function(event){
        event.preventDefault();
        $("#expo-remote-advanced-control").removeClass("visible");
      });
    });
  </script>

</body>
</html>
