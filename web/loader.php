<?php

require_once '../lib/Hipy/Factory/ProjectFactory.php';

use Hipy\Factory\ProjectFactory;

$project = ProjectFactory::initProject('http://local.hipy-player/data.xml/sample.xml');

var_dump($project);

?>
