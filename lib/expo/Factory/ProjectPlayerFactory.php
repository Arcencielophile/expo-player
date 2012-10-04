<?php

namespace expo\Factory;

require_once __DIR__.'/../Player/DeckjsProjectPlayer.php';
use expo\Player\DeckjsProjectPlayer;
require_once __DIR__.'/../Player/ImpressjsProjectPlayer.php';
use expo\Player\ImpressjsProjectPlayer;
require_once __DIR__.'/../Player/TurnjsProjectPlayer.php';
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
    static public function createPlayer($project, $playerName)
    {
        $className = sprintf(
            '%s%sProjectPlayer',
            'expo\Player\\',
            ucfirst(strtolower($playerName))
        );

        $player = new $className($project);

        return $player;
    }
}
