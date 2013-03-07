<?php

namespace expo\Factory;

require_once __DIR__.'/../Model/Theme.php';
use expo\Model\Theme;

/**
 * ThemeFactory
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
abstract class ThemeFactory
{
    /**
     * Create a Theme
     * Return a created theme based on a xml string
     *
     * @param string $xml
     * @return Theme
     */
    static public function getInstance($xml, $path)
    {
        $theme = new Theme($path);

        $theme->setName(html_entity_decode($xml->name, ENT_NOQUOTES, 'UTF-8'));
        $theme->setAuthor(html_entity_decode($xml->author, ENT_NOQUOTES, 'UTF-8'));
        $theme->setUrl(html_entity_decode($xml->url, ENT_NOQUOTES, 'UTF-8'));

        $displayAttrs = $xml->display->attributes();
        $theme->setDisplayPlayerName(html_entity_decode($displayAttrs['player'], ENT_NOQUOTES, 'UTF-8'));

        foreach($xml->display->css as $displayCss) {
            $attrs = $displayCss->attributes();
            $theme->addDisplayCss(html_entity_decode($attrs['path'], ENT_NOQUOTES, 'UTF-8'));
        }

        foreach($xml->display->js as $displayJs) {
            $attrs = $displayJs->attributes();
            $theme->addDisplayJs(html_entity_decode($attrs['path'], ENT_NOQUOTES, 'UTF-8'));
        }

        foreach($xml->remote->css as $remoteCss) {
            $attrs = $remoteCss->attributes();
            $theme->addRemoteCss(html_entity_decode($attrs['path'], ENT_NOQUOTES, 'UTF-8'));
        }

        foreach($xml->remote->js as $remoteJs) {
            $attrs = $remoteJs->attributes();
            $theme->addRemoteJs(html_entity_decode($attrs['path'], ENT_NOQUOTES, 'UTF-8'));
        }

        return $theme;
    }
}
