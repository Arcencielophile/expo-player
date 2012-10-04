<!DOCTYPE html>
<html>
  <head>
    <title>Player</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap-responsive.css" />

    <link rel="stylesheet" type="text/css" href="deckjs/core/deck.core.css" />
    <link rel="stylesheet" type="text/css" href="deckjs/extensions/hash/deck.hash.css" />
    <link rel="stylesheet" type="text/css" href="deckjs/extensions/menu/deck.menu.css" />
    <link rel="stylesheet" type="text/css" href="deckjs/extensions/goto/deck.goto.css" />
    <link rel="stylesheet" type="text/css" href="deckjs/extensions/status/deck.status.css" />
    <link rel="stylesheet" type="text/css" href="deckjs/extensions/navigation/deck.navigation.css" />
    <link rel="stylesheet" type="text/css" href="deckjs/extensions/scale/deck.scale.css" />

    <link rel="stylesheet" type="text/css" href="deckjs/themes/transition/custom/fade.css" />
    <link rel="stylesheet" type="text/css" href="deckjs/themes/transition/custom/horizontal.css" />
    <link rel="stylesheet" type="text/css" href="deckjs/themes/transition/custom/vertical.css" />
    <link rel="stylesheet" type="text/css" href="style.css" />

    <script type="text/javascript" src="bootstrap/js/bootstrap.js"></script>
    <script type="text/javascript" src="deckjs/jquery-1.7.min.js"></script>

    <script type="text/javascript" src="deckjs/modernizr.custom.js"></script>

    <!-- include source files here... -->
    <script type="text/javascript" src="deckjs/core/deck.core.js"></script>
    <script type="text/javascript" src="deckjs/extensions/hash/deck.hash.js"></script>
    <script type="text/javascript" src="deckjs/extensions/menu/deck.menu.js"></script>
    <script type="text/javascript" src="deckjs/extensions/goto/deck.goto.js"></script>
    <script type="text/javascript" src="deckjs/extensions/status/deck.status.js"></script>
    <script type="text/javascript" src="deckjs/extensions/navigation/deck.navigation.js"></script>
    <script type="text/javascript" src="deckjs/extensions/scale/deck.scale.js"></script>
  </head>

  <?php

    /**
     * Display the classes for a given slide node
     *
     * @param SimpleXMLElement slideAttributes
     * @return string
     */
    function displayClasses($slideAttributes)
    {
      $classes = array();
      foreach($slideAttributes as $key => $attribute) {
        if($key == 'effect') {
          $classes[] = $attribute;
        } elseif($key == 'visible-on') {
          $attributes = explode(' ', $attribute);
          $items = array();
          foreach($attributes as $item) {
            $items[] = 'visible-'.$item;
          }
          $classes = array_merge($classes, $items);
        } elseif($key == 'hidden-on') {
          $attributes = explode(' ', $attribute);
          $items = array();
          foreach($attributes as $item) {
            $items[] = 'hidden-'.$item;
          }
          $classes = array_merge($classes, $items);
        }
      }

      return implode(' ', $classes);
    }

  ?>

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

    <article class="deck-container row-fluid">

      <?php foreach($project->page as $page): ?>
        <section class="slide span12 <?php echo displayClasses($page->attributes()) ?>">
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
      $(function() {
        $.deck('.slide');
      });
    </script>
  </body>
</html>
