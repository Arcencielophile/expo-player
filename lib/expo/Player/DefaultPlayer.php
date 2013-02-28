<?php

namespace expo\Player;

require_once __DIR__.'/ProjectPlayer.php';
use expo\Player\ProjectPlayer;

/**
 * DefaultPlayer
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
class DefaultPlayer extends ProjectPlayer
{
    public function getCss()
    {
        return array();
    }

    public function getJs()
    {
        return array("expojs/display/player/expo.DefaultPlayer.js");
    }
}
