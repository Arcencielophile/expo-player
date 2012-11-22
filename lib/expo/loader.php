<?php

  include_once '../config/config.inc.php';

  require_once '../lib/expo/Factory/ThemeLoader.php';
  require_once '../lib/expo/Factory/ProjectFactory.php';
  require_once '../lib/expo/Factory/ProjectPlayerFactory.php';

  use expo\Factory\ThemeLoader;
  use expo\Factory\ProjectFactory;
  use expo\Factory\ProjectPlayerFactory;

  $theme = ThemeLoader::load($expo_theme_src);

  $data = isset($_GET['data']) ? urldecode($_GET['data']) : $theme->getDefaultData();

  $projectPlayer = ProjectPlayerFactory::createPlayer(
      ProjectFactory::initProject($data),
      $theme
  );

?>
