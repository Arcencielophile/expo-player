<?php

namespace expo\Factory;

require_once __DIR__.'/../Player/DeckjsPlayer.php';
use expo\Player\DeckjsProjectPlayer;
require_once __DIR__.'/../Player/ImpressjsPlayer.php';
use expo\Player\ImpressjsProjectPlayer;
require_once __DIR__.'/../Player/TurnjsPlayer.php';
use expo\Player\TurnjsProjectPlayer;

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
     * Return a created project player based on a project object
     *
     * @param Project $project
     * @param string $playerName
     * @return ProjectPlayer
     */
    static public function createPlayer($project, $playerName, $theme)
    {
        $className = sprintf(
            '%s%sPlayer',
            'expo\Player\\',
            ucfirst(strtolower($playerName))
        );

        $player = new $className($project, $theme);

        return $player;
    }
}
