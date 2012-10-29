<?php

namespace expo\Player;

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

    public function getJs($position = null)
    {
        return array(
            "turnjs/turn.min.js",
            "expojs/display/player/expo.TurnjsPlayer.js"
        );
    }
}
