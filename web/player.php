<?php ?>


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

    <script type="text/javascript" src="deckjs/modernizr.custom.js"></script>
    <script type="text/javascript" src="bootstrap/js/bootstrap.js"></script>
    <script type="text/javascript" src="deckjs/jquery-1.7.min.js"></script>

    <!-- include source files here... -->
    <script type="text/javascript" src="deckjs/core/deck.core.js"></script>
    <script type="text/javascript" src="deckjs/extensions/hash/deck.hash.js"></script>
    <script type="text/javascript" src="deckjs/extensions/menu/deck.menu.js"></script>
    <script type="text/javascript" src="deckjs/extensions/goto/deck.goto.js"></script>
    <script type="text/javascript" src="deckjs/extensions/status/deck.status.js"></script>
    <script type="text/javascript" src="deckjs/extensions/navigation/deck.navigation.js"></script>
    <script type="text/javascript" src="deckjs/extensions/scale/deck.scale.js"></script>
  </head>

  <body>
	<div class="navbar">
	    <div class="navbar-inner">
		    <div class="container">
			   <a class="brand" href="#">HiPy Player</a>
		    </div>
	    </div>
    </div>
    
    

    <div class="navbar navbar-fixed-bottom">
    	<div class="navbar-inner">
		    <div class="container">
			   <a class="brand" href="#">Initiateurs du projet</a>
		    </div>
	    </div>
    </div>


    <article>

      <section class="slide">
        toto
      </section>

      <section class="slide">
        titi
      </section>

    </article>

    <script>
      $(function() {
        $.deck('.slide');
      });
    </script>
  </body>
</html>
