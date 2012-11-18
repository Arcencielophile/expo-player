<?php
  // TODO: clean this part
  // For local configuration
  $src              = isset($_GET['src']) ? $_GET['src'] : 'data/expo/whatisexpo.xml';
  $srv              = '192.168.1.39';
  $data             = 'http://player.expo/' . $src;
  $expo_player_name = 'deckjs';
  $expo_theme       = 'lumiere';
?>
