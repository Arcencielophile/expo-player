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
  <link rel="stylesheet" type="text/css" href="/cdn/expo/css/expo_remote-responsive.css" />

  <script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
  <script type="text/javascript" src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.js"></script>
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
        <div class="span12">
          <a id="expo-remote-previous"><span></span></a>
          <a id="expo-remote-current"><span>1</span></a>
          <a id="expo-remote-next"><span></span></a>
        </div>
        <div class="input-prepend input-append" id="expo-remote-name">
          <span class="add-on">name</span>
          <input type="text" placeholder="#0"/>
          <button class="btn" type="button">Ok</button>
        </div>
        <a href="#expo-remote-followers-content" id="expo-remote-followers-counter" class="span6 offset4">
          <span></span>0
        </a>
        
        <div class="footer visible-phone">
          <a id="show-advanced-control"></a>
        </div>
      </div>

      <div class="span6" id="expo-remote-advanced-control">
        <div class="header visible-phone">
          <a id="hide-advanced-control"></a>
        </div>
        <div id="expo-remote-goto">
          <ul>
            <?php for ($i = 1; $i <= $_GET['project_count_slides']; $i++): ?>
              <li><a href="#" data-goto="<?php echo $i; ?>"><?php echo $i; ?></a></li>
            <?php endfor ?>
          </ul>
        </div>
        <div id="expo-remote-button">
          <a id="expo-remote-project-information" href=""><span></span></a>
          <a id="expo-remote-player-information" href=""><span></span></a>
          <a id="expo-remote-share" href=""><span></span></a>
          <a id="expo-remote-pages" href=""><span></span></a>
        </div>
      </div>
    </div>
  </div>

  <div id="expo-remote-followers-content">
    <a href="#expo-remote-followers-content" title="Close">x</a>
    <div class="followers">
      <label>Here your follower</label>
      <div class="accordion" id="followers-list">
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

      $('a[href="#expo-remote-followers-content"]').on('click', function () {
          if( $('#expo-remote-followers-content').hasClass('visible')) {
            $('#expo-remote-followers-content').removeClass('visible')
          } else {
            $('#expo-remote-followers-content').addClass('visible')
          }
      });
    });
  </script>

</body>
</html>
