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
        $this->js = array(
            'header' => array(),
            'footer' => array()
        );
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
     * Init js
     *
     * @return string
     */
    public function initJs()
    {
        printf("
            <script type=\"text/javascript\">
                $('document').ready(function(){
                    %s
                });
            </script>",
            $this->getJsLoader()
        );
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

    /**
     * Get the player needed loader js
     *
     * @return string
     */
    abstract public function getJsLoader();
}
