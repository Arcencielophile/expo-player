<!DOCTYPE html>
<html>
  <head>
    <title>Player</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap-responsive.css" />

    <link rel="stylesheet" type="text/css" href="style.css" />
    <link rel="stylesheet" type="text/css" href="style_turn.css" />

    <script type="text/javascript" src="bootstrap/js/bootstrap.js"></script>
    <script type="text/javascript" src="deckjs/jquery-1.7.min.js"></script>
    <script type="text/javascript" src="turn.js/turn.min.js"></script>
  </head>

  <body>
    <?php
      $project_feed = file_get_contents('./data.xml/sample.xml');
      $project = new SimpleXMLElement($project_feed);
    ?>
    <div class="navbar">
      <div class="navbar-inner">
        <div class="container">
         <a class="brand" href="#"><?php echo $project->name; ?></a>
        </div>
      </div>
    </div>

    <article id="container" class="row-fluid">

      <?php foreach($project->page as $page): ?>
        <section class="slide span12 <?php echo $page->attributes()->effect ?>">
          <?php echo $page->content ?>
        </section>
      <?php endforeach; ?>

    </article>

    <div class="navbar navbar-fixed-bottom">
      <div class="navbar-inner">
        <div class="container">
         <a class="brand" href="#">Initiateurs du projet</a>
        </div>
      </div>
    </div>

    <script>
      $('document').ready(function() {
        $('.container').turn({gradients: true, acceleration: true});
      });
    </script>
  </body>
</html>
