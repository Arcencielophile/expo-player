<?php
  include_once '../config/config.inc.php';

  require_once '../lib/expo/Factory/ThemeLoader.php';
  require_once '../lib/expo/Factory/ProjectFactory.php';
  require_once '../lib/expo/Factory/ProjectPlayerFactory.php';
  require_once '../lib/expo/Tools/functions.php';

  use expo\Factory\ThemeLoader;
  use expo\Factory\ProjectFactory;
  use expo\Factory\ProjectPlayerFactory;

  $theme = ThemeLoader::load($expo_theme_src);

  try {
    $projectPlayer = ProjectPlayerFactory::createPlayer(
        ProjectFactory::initProject($expo_data_src),
        $theme
    );
  } catch(\Exception $e) {
    die($e->getMessage());
  }

?>
