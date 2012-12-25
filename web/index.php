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

      $(document).ready(function() {
        var projectId = '<?php echo $projectPlayer->getProject()->getIdentifier(); ?>';
        var player = <?php echo $projectPlayer->getJsPlayer(); ?>;
        var displayPresentation = new DisplayPresentation(socket, projectId, player, null);
        displayPresentation.init();
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
      <a id="more" href="#project-information" class="button" title="Project Information">+</a>
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
        <?php if($projectPlayer->isRemoteAlive()): ?>
        <li>
          <a href="#" class="button" id="sync" title="Synchronize the presentation">Sync</a>
          <div class="content">
            <div>
              <div class="create-remote">
                <label>Create a remote</label>
                <p>Scan or click on the following QRCode</p>
                <a href="<?php echo $expo_srv ?>/remote.php?<?php echo $projectPlayer->getRemoteParameters(); ?>" target="_blank" id="qrcode"></a>
              </div>
              <div class="join-live">
                <label>Join presentation</label>
                <ul>
                </ul>
                <label>As username</label>
                <input id="usernameInput" type="text" name="username" placeholder="anonymous" />
              </div>
            </div>
          </div>
        </li>
        <?php endif; ?>
        <li class="hidden-phone">
          <a class="button" href="#" title="Previous" id="previous-page">&lt;</a>
        </li>
        <li>
          <a class="button" href="#" title="Current" id="current-page"></a>
          <div class="content visible-desktop">
            <ul>
              <?php foreach($projectPlayer->getPages() as $k => $page): ?>
              <li>
                <a class="button" href="#<?php echo $page->getId()?>" title="<?php echo $page->getTitle() ?>">
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
