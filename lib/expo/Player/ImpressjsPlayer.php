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
        return array(
            "impressjs/js/impress.js",
            "expojs/display/player/expo.ImpressjsPlayer.js"
        );
    }
}

/* Todo to use impress */
/*
In impress.js file:

167    // CHECK SUPPORT
168    var body = document.body;
169    // Fix browser compatibility
170    var body = document.documentElement;

Then comment from l658 to l796
*/