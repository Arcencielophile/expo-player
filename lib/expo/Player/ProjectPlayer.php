<?php

namespace expo\Player;

require_once __DIR__.'/../Tools/Tools.php';
use expo\Tools\Tools;

/**
 * ProjectPlayer
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
abstract class ProjectPlayer
{
    protected $project;

    protected $theme;

    protected $css;

    protected $js;

    protected $remote_srv;

    protected $is_remote_alive;

    /**
     * Constructor
     *
     * @param Project $project
     * @param Theme $theme
     * @param string $remote_srv
     */
    public function __construct($project, $theme, $remote_srv = null)
    {
        $this->setProject($project);
        $this->setTheme($theme);
        $this->setRemoteSrv($remote_srv);
        $this->setIsRemoteAlive($remote_srv ?
            Tools::isUrlAlive($remote_srv.'/socket.io/socket.io.js') :
            false
        );
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
     * Get project theme
     *
     * @return Theme
     */
    public function getTheme()
    {
        return $this->theme;
    }

    /**
     * Set Theme
     *
     * @param Theme $theme
     */
    public function setTheme($theme)
    {
        $this->theme = $theme;
    }

    /**
     * Get remote srv
     *
     * @return string
     */
    public function getRemoteSrv()
    {
        return $this->remote_srv;
    }

    /**
     * Set remote srv
     *
     * @param string $remote_srv
     */
    public function setRemoteSrv($remote_srv)
    {
        $this->remote_srv = $remote_srv;
    }

    /**
     * Is remote alive
     *
     * @return boolean
     */
    public function isRemoteAlive()
    {
        return $this->is_remote_alive;
    }

    /**
     * Set is remote alive
     *
     * @param boolean $is_remote_alive
     */
    public function setIsRemoteAlive($is_remote_alive)
    {
        $this->is_remote_alive = $is_remote_alive;
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
     * Remote Parameters
     *
     * @return string Query string
     */
    public function getRemoteParameters()
    {
        $params = array(
            'project_id' => $this->getProject()->getIdentifier(),
            'project_name' => $this->getProject()->getName(),
            'project_count_slides' => $this->getProject()->countSlides(),
            'theme' => $this->getTheme()
        );

        return http_build_query($params);
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

        foreach($this->getTheme()->getDisplayCss() as $src) {
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

        foreach($this->getTheme()->getDisplayJs() as $src) {
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
     * Load needed remote scripts
     *
     * @return string
     */
    public function loadExpoJs()
    {
        $remoteJs = array(
            '/expojs/user/expo.User.js',
            '/expojs/display/expo.DisplayRemote.js',
            '/expojs/display/expo.DisplayPresentation.js'
        );

        if($this->isRemoteAlive()) {
            $remoteJs[] = $this->getRemoteSrv().'/socket.io/socket.io.js';
        }

        foreach($remoteJs as $src) {
            printf('<script type="text/javascript" src="%s"></script>%s', $src, PHP_EOL);
        }
    }

    /**
     * Load needed remote scripts
     *
     * @return string
     */
    public function initRemoteSocket()
    {
        if($this->isRemoteAlive()) {
            return "io.connect('".$this->getRemoteSrv()."/expo')";
        }

        return 'null';
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
