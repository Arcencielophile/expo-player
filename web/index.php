<?php require_once '../lib/expo/loader.php'; ?>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title><?php echo $projectPlayer->getProject()->getName(); ?> - expo</title>

    <link rel="icon" type="image/png" href="<?php echo $projectPlayer->getProject()->getLogo(); ?>" />
    <link rel="stylesheet" type="text/css" href="/bootstrap/docs/assets/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="/bootstrap/docs/assets/css/bootstrap-responsive.css" />
    <?php $projectPlayer->loadCss() ?>

    <?php //<script src="http://code.jquery.com/jquery-1.8.2.min.js"></script> ?>
    <script type="text/javascript" src="/deckjs/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="/jquery-qrcode/jquery.qrcode.min.js"></script>
    <script type="text/javascript" src="/jquery-qrcode/src/qrcode.js"></script>

    <script type="text/javascript" src="/bootstrap/docs/assets/js/bootstrap.js"></script>
    <?php $projectPlayer->loadJs() ?>

    <?php $projectPlayer->loadExpoJs() ?>

    <script type="text/javascript">
      var socket = <?php echo $projectPlayer->initRemoteSocket(); ?>;

      var projectId = '<?php echo $projectPlayer->getProject()->getIdentifier(); ?>';
      var player = <?php echo $projectPlayer->getJsPlayer(); ?>;
      var displayPresentation = new DisplayPresentation(socket, projectId, player, null);
      displayPresentation.init();

      window.onbeforeunload = displayPresentation.disconnect;

      $(document).ready(function() {
        displayPresentation.bindWithView();
      });
      
    </script>
  </head>

  <body>

    <a href="#expo-project-information-content" id="expo-project-information" class="button" title="Project Information">+</a>
    <div id="expo-project-information-content">
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
            <?php if($author->getWebsite()): ?>
            <li class="rss">
              <a href="<?php echo $author->getWebsite(); ?>" target="_blank">
                <?php echo $author->getWebsite(); ?>
              </a>
            </li>
            <?php endif; ?>
            <?php foreach($author->getSocialLinks() as $sl): ?>
            <li class="<?php echo $sl->guessSocialNetworkName(); ?>">
              <a href="<?php echo $sl->getUri() ?>" target="_blank">
                <?php echo $sl->guessSocialNetworkName() ?>
              </a>
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
      <div class="tags">
        <ul>
          <?php foreach($projectPlayer->getProject()->getTags() as $tag): ?>
          <li>
            <a href="#<?php echo $tag; ?>" title="<?php echo $tag; ?>" target="_blank">
              <?php echo $tag; ?>
            </a>
          </li>
          <?php endforeach; ?>
        </ul>
      </div>
    </div>

    <a href="#expo-player-information-content" id="expo-player-information" class="button" title="Show help">i</a>
    <div id="expo-player-information-content">
      <div class="row-fluid">
        <div class="span6 start">
          <div>
            <a href="#" id="expo-player-play" title="Play">Play</a>
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

    <a href="" id="expo-navigation-home" class="button" title="Go back home">H</a>

    <a href="#expo-player-share-content" id="expo-player-share" class="button" title="Share">*S*</a>
    <div id="expo-player-share-content">
      <a href="#expo-player-share-content" title="Close">x</a>
      <div class="share">
        <label>Share with your network</label>
        <p>You can share this presentation with your network</p>
        <form action="#" method="get">
          <textarea name="message" placeholder="Write your comment here"></textarea>
          <div class="note">
            <p>
              <?php echo $projectPlayer->getProject()->getSummary(); ?>
            </p>
          </div>
          <ul>
            <li>
              <input type="radio" value="linkedin" name="social-network" id="social-network-linkedin" />
              <label for="social-network-linkedin">Linkedin</label>
            </li>
            <li>
              <input type="radio" value="twitter" name="social-network" id="social-network-twitter" />
              <label for="social-network-twitter">Twitter</label>
            </li>
            <li>
              <input type="radio" value="facebook" name="social-network" id="social-network-facebook" />
              <label for="social-network-facebook">Facebook</label>
            </li>
            <li>
              <input type="radio" value="googleplus" name="social-network" id="social-network-googleplus" />
              <label for="social-network-googleplus">GooglePlus</label>
            </li>
          </ul>
          <input type="hidden" value="<?php echo $projectPlayer->getProject()->getIdentifier(); ?>" name="project-id">
          <input type="submit" value="share" />
        </form>
      </div>
    </div>

    <?php if($projectPlayer->isRemoteAlive()): ?>
    <a href="#expo-player-sync-content" id="expo-player-sync" class="button" title="Synchronize the presentation">Sync</a>
    <div id="expo-player-sync-content">
      <a href="#expo-player-sync-content" title="Close">x</a>
      <div class="create-remote">
        <label>Create a remote</label>
        <p>Scan or click on the following QRCode</p>
        <a href="<?php echo $expo_srv ?>/remote.php?<?php echo $projectPlayer->getRemoteParameters(); ?>" target="_blank" id="qrcode"></a>
      </div>
      <div class="join-live">
        <label>Join presentation</label>
        <input id="usernameInput" type="text" name="username" placeholder="As username" />
        <ul>
        </ul>
      </div>
    </div>
    <?php endif; ?>

    <a href="#expo-navigation-previous-page" id="expo-navigation-previous-page" class="button hidden-phone" title="Previous">&lt;</a>

    <a href="#expo-navigation-current-page-content" id="expo-navigation-current-page" class="button" title="Current"></a>
    <div id="expo-navigation-current-page-content">
      <ul>
        <?php foreach($projectPlayer->getPages() as $k => $page): ?>
        <li>
          <a href="#<?php echo $page->getId()?>" class="button" title="<?php echo $page->getTitle() ?>">
            <?php echo $k+1 ?>
          </a>
        </li>
        <?php endforeach; ?>
      </ul>
    </div>

    <a href="#expo-navigation-next-page" id="expo-navigation-next-page" class="button hidden-phone" title="Next">&gt;</a>



    <div id="impress">
      <article id="container" class="row-fluid">

        <?php foreach($projectPlayer->getPages() as $k => $page): ?>
          <section class="slide span12 fx-horizontal step" id="<?php echo $page->getId() ?>" data-x="<?php echo 1000 * $k ?>" data-y="<?php echo -1000 * $k ?>">
            <h2><?php echo $page->getTitle() ?></h2>
            <?php if($page->getDescription()): ?>
            <div class="description"><?php echo $page->getDescription() ?></div>
            <?php endif; ?>
            <?php echo $page->getContent() ?>
          </section>
        <?php endforeach; ?>

      </article>
    </div>

  </body>
</html>
