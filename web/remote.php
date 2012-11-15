<?php $srv = '192.168.0.12'; ?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

        <title>Expo REMOTE</title>
        <link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css" />
        <link rel="stylesheet" type="text/css" href="/expojs/themes/<?php echo $_GET['theme'] ?>/remote/style.css" />
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
            var manager = new ControlManager(
                socket,
                '<?php echo $_GET['project_id']; ?>',
                1,
                <?php echo $_GET['project_count_slides']; ?>,
                owner
            );

            $(document).ready(function(){ manager.init(); });
        </script>
    </head>

    <body>

        <div data-role="page">

            <div data-role="header" data-position="fixed">
                <h1>Expo Remote - <?php echo $_GET['project_name'] ?></h1>
                <a href="#options" data-icon="gear" class="ui-btn-right">Options</a>
            </div>

            <div data-role="content">

                <div class="ui-grid-b">
                    <div class="ui-block-a">
                        <a href="#previous" data-role="button" data-icon="arrow-l">Previous</a>
                    </div>
                    <div class="ui-block-b">
                        <div class="pager">
                            <span id="current_page">1</span> / <span id="total_page"><?php echo $_GET['project_count_slides']; ?></span>
                        </div>
                    </div>
                    <div class="ui-block-c">
                        <a href="#next" data-role="button" data-icon="arrow-r">Next</a>
                    </div>
                </div>

                <hr />

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

            <div data-role="footer" data-position="fixed">
                <a href="#info" data-role="button" data-icon="info">info</a>
                <a href="#followers" data-role="button" data-icon="star">0</a>
            </div>

        </div>

    </body>
</html>

