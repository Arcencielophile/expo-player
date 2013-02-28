<?php

namespace expo\Player;

require_once __DIR__.'/ProjectPlayer.php';
use expo\Player\ProjectPlayer;

/**
 * ImpressjsProjectPlayer
 *
 * @see http://bartaz.github.com/impress.js/
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
class ImpressjsPlayer extends ProjectPlayer
{
    public function getCss()
    {
        return array();
    }

    public function getJs()
    {
        return array();
    }
}
