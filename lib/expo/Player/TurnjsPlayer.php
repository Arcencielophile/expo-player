<?php

namespace expo\Player;

require_once __DIR__.'/ProjectPlayer.php';
use expo\Player\ProjectPlayer;

/**
 * TurnjsProjectPlayer
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
class TurnjsPlayer extends ProjectPlayer
{
    public function getCss()
    {
        return array();
    }

    public function getJs()
    {
        return array(
            "turnjs/turn.min.js",
            "expojs/display/player/expo.TurnjsPlayer.js"
        );
    }
}
