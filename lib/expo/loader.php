<?php
  include_once '../config/config.inc.php';

  require_once '../lib/expo/Factory/ProjectPlayerFactory.php';
  require_once '../lib/expo/Tools/functions.php';

  use expo\Factory\ThemeLoader;
  use expo\Factory\ProjectFactory;
  use expo\Factory\ProjectPlayerFactory;

  try {
      $projectPlayer = ProjectPlayerFactory::createPlayer(
        $expo_data_src,
        $expo_remote_srv
      );
  } catch(\Exception $e) {
      die($e->getMessage());
  }
?>
