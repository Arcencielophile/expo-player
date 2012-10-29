<?php

namespace expo\Player;

require_once __DIR__.'/ProjectPlayer.php';
use expo\Player\ProjectPlayer;

/**
 * DeckjsProjectPlayer
 *
 * @see http://imakewebthings.com/deck.js/docs/
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
class DeckjsProjectPlayer extends ProjectPlayer
{
    public function getCss()
    {
        return array(
            "deckjs/core/deck.core.css",
            "deckjs/extensions/hash/deck.hash.css",
            "deckjs/extensions/menu/deck.menu.css",
            "deckjs/extensions/goto/deck.goto.css",
            "deckjs/extensions/status/deck.status.css",
            "deckjs/extensions/navigation/deck.navigation.css",
            "deckjs/extensions/scale/deck.scale.css",
            "deckjs/themes/transition/custom/fade.css",
            "deckjs/themes/transition/custom/horizontal.css",
            "deckjs/themes/transition/custom/vertical.css"
        );
    }

    public function getJs()
    {
        return array(
            "deckjs/modernizr.custom.js",
            "deckjs/core/deck.core.js",
            "deckjs/extensions/hash/deck.hash.js",
            "deckjs/extensions/menu/deck.menu.js",
            "deckjs/extensions/goto/deck.goto.js",
            "deckjs/extensions/status/deck.status.js",
            "deckjs/extensions/navigation/deck.navigation.js",
            "deckjs/extensions/scale/deck.scale.js",
            "expojs/display/player/expo.DeckjsPlayer.js"
        );
    }
}
