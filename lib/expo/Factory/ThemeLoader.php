<?php

namespace expo\Factory;

require_once __DIR__.'/../Tools/Tools.php';
use expo\Tools\Tools;
require_once __DIR__.'/../Model/Theme.php';
use expo\Model\Theme;

/**
 * ThemeLoader
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
abstract class ThemeLoader
{
    /**
     * Load a Theme
     * Return a created theme based on a src (url, or xml string)
     *
     * @param string $src
     * @return Theme
     */
    static public function load($src)
    {
        if(!Tools::isValidURL($src)) {
            throw new \Exception(sprintf('%s is not a valid url', $src));
        }

        if(!$xmlTheme = simplexml_load_string(file_get_contents($src))) {
            throw new \Exception(sprintf('%s is not a valid xml', $src));
        }

        $theme = new Theme($src);

        $theme->setName(html_entity_decode($xmlTheme->theme->name, ENT_NOQUOTES, 'UTF-8'));
        $theme->setAuthor(html_entity_decode($xmlTheme->theme->author, ENT_NOQUOTES, 'UTF-8'));
        $theme->setUrl(html_entity_decode($xmlTheme->theme->url, ENT_NOQUOTES, 'UTF-8'));

        $displayAttrs = $xmlTheme->theme->display->attributes();
        $theme->setDisplayPlayerName(html_entity_decode($displayAttrs['player'], ENT_NOQUOTES, 'UTF-8'));

        foreach($xmlTheme->theme->display->css as $displayCss) {
            $attrs = $displayCss->attributes();
            $theme->addDisplayCss(html_entity_decode($attrs['path'], ENT_NOQUOTES, 'UTF-8'));
        }

        foreach($xmlTheme->theme->display->js as $displayJs) {
            $attrs = $displayJs->attributes();
            $theme->addDisplayJs(html_entity_decode($attrs['path'], ENT_NOQUOTES, 'UTF-8'));
        }

        foreach($xmlTheme->theme->remote->css as $remoteCss) {
            $attrs = $remoteCss->attributes();
            $theme->addRemoteCss(html_entity_decode($attrs['path'], ENT_NOQUOTES, 'UTF-8'));
        }

        foreach($xmlTheme->theme->remote->js as $remoteJs) {
            $attrs = $remoteJs->attributes();
            $theme->addRemoteJs(html_entity_decode($attrs['path'], ENT_NOQUOTES, 'UTF-8'));
        }

        return $theme;
    }
}
