<?php

namespace expo\Player;

/**
 * ProjectPlayer
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
abstract class ProjectPlayer
{
    protected $project;

    protected $css;

    protected $js;

    /**
     * Constructor
     *
     * @param Project $project
     */
    public function __construct($project)
    {
        $this->setProject($project);
        $this->css = array();
        $this->js = array();
    }

    /**
     * Get Project
     *
     * @return Project
     */
    public function getProject()
    {
        return $this->project;
    }

    /**
     * Set Project
     *
     * @param Project $project
     */
    public function setProject($project)
    {
        $this->project = $project;
    }

    /**
     * Get all the project pages
     *
     * @return mixed
     */
    public function getPages()
    {
        return $this->getProject()->getPages();
    }

    /**
     * Load css
     *
     * @return string
     */
    public function loadCss()
    {
        foreach($this->getCss() as $src) {
            printf('<link rel="stylesheet" type="text/css" href="%s" />%s', $src, PHP_EOL);
        }
    }

    /**
     * Load js
     *
     * @return string
     */
    public function loadJs()
    {
        foreach($this->getJs() as $src) {
            printf('<script type="text/javascript" src="%s"></script>%s', $src, PHP_EOL);
        }
    }

    /**
     * Get the js player
     *
     * @return string
     */
    public function getJsPlayer()
    {
        return sprintf('new %s()', join('', array_slice(explode('\\', get_class($this)), -1)));
    }

    /**
     * Get the player needed css
     *
     * @return mixed
     */
    abstract public function getCss();

    /**
     * Get the player needed js
     *
     * @return mixed
     */
    abstract public function getJs();
}
