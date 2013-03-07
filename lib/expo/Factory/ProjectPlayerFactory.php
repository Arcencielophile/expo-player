<?php

namespace expo\Factory;

require_once __DIR__.'/../Tools/Tools.php';
use expo\Tools\Tools;

require_once __DIR__.'/ThemeFactory.php';
require_once __DIR__.'/ProjectFactory.php';

require_once __DIR__.'/../Player/DefaultPlayer.php';
require_once __DIR__.'/../Player/DeckjsPlayer.php';
require_once __DIR__.'/../Player/ImpressjsPlayer.php';
require_once __DIR__.'/../Player/TurnjsPlayer.php';

/**
 * ProjectPlayerFactory
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
abstract class ProjectPlayerFactory
{
    /**
     * Create a Project Player
     *
     * @param string $rdata_src
     * @param string $remote_srv
     * @return ProjectPlayer
     */
    static public function createPlayer($src, $remote_srv)
    {
        if(!Tools::isValidURL($src)) {
            throw new \Exception(sprintf('%s is not a valid url', $src));
        }

        if(!$xml = simplexml_load_string(file_get_contents($src))) {
            throw new \Exception(sprintf('%s is not a valid xml', $src));
        }

        $theme = ThemeFactory::getInstance($xml->theme, self::getDataPath($src));

        $dataAttrs = $xml->data->attributes();
        $projectSrc = self::getDataPath($src).'/'.html_entity_decode($dataAttrs['path'], ENT_NOQUOTES, 'UTF-8');
        $project = ProjectFactory::getInstance($projectSrc);

        $className = sprintf(
            '%s%sPlayer',
            'expo\Player\\',
            ucfirst(strtolower($theme->getDisplayPlayerName()))
        );

        $player = new $className($project, $theme, $remote_srv);

        return $player;
    }

    static public function getDataPath($src)
    {
        $parseUrl = parse_url($src);
        $path = explode('/', $parseUrl['path']);
        unset($path[count($path)-1]);
        $parseUrl['path'] = implode('/', $path);

        return http_build_url('', $parseUrl);
    }
}
