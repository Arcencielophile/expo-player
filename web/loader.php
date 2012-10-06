<?php
  require_once '../lib/expo/Factory/ProjectFactory.php';
  require_once '../lib/expo/Factory/ProjectPlayerFactory.php';

  use expo\Factory\ProjectFactory;
  use expo\Factory\ProjectPlayerFactory;

  $projectPlayer = ProjectPlayerFactory::createPlayer(
      ProjectFactory::initProject('http://player.expo/data.xml/sample.xml'),
      'deckjs'
  );
?>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>expo - <?php echo $projectPlayer->getProject()->getName(); ?></title>

    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap-responsive.css" />
    <?php $projectPlayer->loadCss() ?>
    <link rel="stylesheet" type="text/css" href="style.css" />

    <script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js'></script>
    <script type='text/javascript' src='js/expo.js'></script>

    <script type="text/javascript" src="bootstrap/js/bootstrap.js"></script>
    <?php $projectPlayer->loadJs('header') ?>

  </head>

  <body>

    <div id="player-information">
      <div class="row-fluid">
        <div class="span6 start">
          <div>
            <p>Play</p>
            <a href="#" title="Play">&gt;</a>
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
      <a href="#project-information" class="button" title="Project Information">+</a>
      <div class="content">
        <div class="title">
          <h1><?php echo $projectPlayer->getProject()->getName(); ?></h1>
        </div>
        <div class="summary">
          <p><?php echo $projectPlayer->getProject()->getSummary(); ?></p>
        </div>
        <div class="context">
          <p class="author">Author</p>
          <p class="date">Date</p>
        </div>
        <div class="social_network">
          <p>Social Links</p>
        </div>
      </div>
    </div>

    <nav>
      <ul>
        <li>
          <a class="button" href="#" title="Home">Home</a>
        </li>
        <li class="hidden-phone">
          <a class="button" href="#" title="Previous" id="previous-page">&lt;</a>
        </li>
        <li>
          <a class="button" href="#" title="Current" id="current-page"></a>
          <div class="content">
            <ul>
              <li>
                <a class="button" href="#" title="">i</a>
              </li>
              <li>
                <a class="button" href="#" title="">i</a>
              </li>
              <li>
                <a class="button" href="#" title="">i</a>
              </li>
              <li>
                <a class="button" href="#" title="">i</a>
              </li>
              <li>
                <a class="button" href="#" title="">i</a>
              </li>
              <li>
                <a class="button" href="#" title="">i</a>
              </li>
              <li>
                <a class="button" href="#" title="">i</a>
              </li>
              <li>
                <a class="button" href="#" title="">i</a>
              </li>
              <li>
                <a class="button" href="#" title="">i</a>
              </li>
              <li>
                <a class="button" href="#" title="">i</a>
              </li>
              <li>
                <a class="button" href="#" title="">i</a>
              </li>
              <li>
                <a class="button" href="#" title="">i</a>
              </li>
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
        <section class="slide span12 fx-vertical">
          <?php echo $page->getContent() ?>
        </section>
      <?php endforeach; ?>

    </article>

    <?php $projectPlayer->initJs() ?>

  </body>
</html>
