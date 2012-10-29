<?php

namespace expo\Player;

/**
 * TurnjsProjectPlayer
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
class TurnjsProjectPlayer extends ProjectPlayer
{
    public function getCss()
    {
        return array();
    }

    public function getJs($position = null)
    {
        return array("turn.js/turn.min.js");
    }
}
