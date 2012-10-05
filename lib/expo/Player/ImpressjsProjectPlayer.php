<?php

namespace expo\Player;

/**
 * ImpressjsProjectPlayer
 *
 * @see http://bartaz.github.com/impress.js/
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
class ImpressjsProjectPlayer extends ProjectPlayer
{
    public function getCss()
    {
        return array();
    }

    public function getJs($position = null)
    {
        return array();
    }

    public function getJsLoader()
    {
        return ("");
    }
}
