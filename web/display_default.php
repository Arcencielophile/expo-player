<?php
  include_once 'config.inc.php';

  require_once '../lib/expo/Factory/ProjectFactory.php';
  require_once '../lib/expo/Factory/ProjectPlayerFactory.php';

  use expo\Factory\ProjectFactory;
  use expo\Factory\ProjectPlayerFactory;

  $projectPlayer = ProjectPlayerFactory::createPlayer(
      ProjectFactory::initProject('http://player.expo/data.xml/hikarinoki.xml'),
      'deckjs',
      'lumiere'
  );
?>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title><?php echo $projectPlayer->getProject()->getName(); ?> - expo</title>

    <link rel="stylesheet" type="text/css" href="/bootstrap/docs/assets/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="/bootstrap/docs/assets/css/bootstrap-responsive.css" />
    <?php $projectPlayer->loadCss() ?>
    <link rel="stylesheet" type="text/css" href="/expojs/themes/<?php echo $projectPlayer->getTheme() ?>/display/style.css" />

    <?php //<script src="http://code.jquery.com/jquery-1.8.2.min.js"></script> ?>
    <script type="text/javascript" src="/deckjs/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="/jquery-qrcode/jquery.qrcode.min.js"></script>
    <script type="text/javascript" src="/jquery-qrcode/src/qrcode.js"></script>

    <script type="text/javascript" src="/bootstrap/docs/assets/js/bootstrap.js"></script>
    <?php $projectPlayer->loadJs() ?>

    <script type="text/javascript" src="/expojs/display/expo.ActiveDisplayRemote.js"></script>
    <script type="text/javascript" src="/expojs/display/expo.DisplayManager.js"></script>
    <script type="text/javascript" src="/expojs/display/expo.DisplayPresentation.js"></script>
    <script type="text/javascript" src="/expojs/display/expo.DisplayRemote.js"></script>
    <script type="text/javascript" src="/expojs/display/expo.Follower.js"></script>
    <script type="text/javascript" src="/expojs/display/expo.Owner.js"></script>
    <script src="http://<?php echo $srv ?>:2890/socket.io/socket.io.js"></script>
    <script>
      var socket = io.connect('http://<?php echo $srv ?>:2890/expo');
      $(document).ready(function() {
        var projectId = '<?php echo $projectPlayer->getProject()->getIdentifier(); ?>';
        var player = <?php echo $projectPlayer->getJsPlayer(); ?>;
        var displayManager = new DisplayManager(socket, projectId, player, null);

        $('.join-live ul li a').live('click', function(event) {
            event.preventDefault();
            displayManager.setActiveRemote(new DisplayRemote($(this).attr('href')));
        });
      });
    </script>

  </head>

  <body>

    <div id="player-information">
      <div class="row-fluid">
        <div class="span6 start">
          <div>
            <a href="#" id="play" title="Play">Play</a>
          </div>
        </div>
        <div class="span6 controls">
          <div>
            <p>Use your keyboard</p>
            <ul>
              <li><label>Previous</label><span title="Up">&uarr;</span><span title="Left">&larr;</span></li>
              <li><label>Next</label><span title="Down">&darr;</span><span title="Right">&rarr;</span></li>
              <li><label>Thumbs</label><span title="M">M</span></li>
              <li><label>Full screen</label><span title="F11">F11<span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div id="project-information">
      <a href="#project-information" class="button more" title="Project Information">+</a>
      <div class="content">
        <div class="title">
          <h1><?php echo $projectPlayer->getProject()->getName(); ?></h1>
          <p class="date"><?php echo $projectPlayer->getProject()->getDate() ?></p>
        </div>
        <div class="summary">
          <?php echo $projectPlayer->getProject()->getSummary(); ?>
        </div>
        <div class="authors">
          <?php foreach($projectPlayer->getProject()->getAuthors() as $author): ?>
          <div>
            <a href="mailto:<?php echo $author->getEmail(); ?>" title="<?php echo $author; ?>">
              <?php echo $author; ?>
            </a>
            <ul class="social_networks">
              <?php foreach($author->getSocialLinks() as $sl): ?>
              <li>
                <a href="<?php echo $sl ?>" target="_blank"><?php echo $sl ?></a>
              </li>
              <?php endforeach; ?>
            </ul>
          </div>
          <?php endforeach; ?>
        </div>
        <div class="targets">
          <?php foreach($projectPlayer->getProject()->getTargets() as $target): ?>
          <a href="<?php echo $target->getWebsite(); ?>" title="<?php echo $target; ?>" target="_blank">
            <?php echo $target; ?>
          </a>
          <?php endforeach; ?>
        </div>
        <div class="actions">
          <ul>
            <li>
              <a href="#" class="button" id="help" title="Show help">i</a>
            </li>
            <li>
              <a href="#" class="button" id="home" title="Go back home">H</a>
            </li>
            <li>
              <a href="#" class="button" id="share" title="Share">*S*</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <nav>
      <ul>
        <li>
          <a href="#" class="button" id="sync" title="Synchronize the presentation">Sync</a>
          <div class="content visible-desktop">
            <div>
              <div class="create-remote">
                <label>Create a remote</label>
                <p>Scan or click on the following QRCode</p>
                <a href="http://<?php echo $srv ?>/remote.php?<?php echo $projectPlayer->getRemoteParameters(); ?>" target="_blank" id="qrcode"></a>
              </div>
              <div class="join-live">
                <label>Join a live presentation</label>
                <ul>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li class="hidden-phone">
          <a class="button" href="#" title="Previous" id="previous-page">&lt;</a>
        </li>
        <li>
          <a class="button" href="#" title="Current" id="current-page"></a>
          <div class="content visible-desktop">
            <ul>
              <?php foreach($projectPlayer->getPages() as $k => $page): ?>
              <li>
                <a class="button" href="#<?php echo $page->getId() ?>" title="<?php echo $page->getTitle() ?>">
                  <?php echo $k+1 ?>
                </a>
              </li>
              <?php endforeach; ?>
            </ul>
          </div>
        </li>
        <li class="hidden-phone">
          <a class="button" href="#" title="Next" id="next-page">&gt;</a>
        </li>
      </ul>
    </nav>

    <article id="container" class="row-fluid">

      <?php foreach($projectPlayer->getPages() as $page): ?>
        <section class="slide span12 fx-horizontal" id="<?php echo $page->getId() ?>">
          <h2><?php echo $page->getTitle() ?></h2>
          <?php if($page->getDescription()): ?>
          <div class="description"><?php echo $page->getDescription() ?></div>
          <?php endif; ?>
          <?php echo $page->getContent() ?>
        </section>
      <?php endforeach; ?>

    </article>

  </body>
</html>
