<?php

namespace expo\Model;

require_once __DIR__.'/../Tools/Tools.php';
use expo\Tools\Tools;

/**
 * Theme
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
class Theme
{
    protected $data;

    protected $name;

    protected $author;

    protected $url;

    protected $display_player_name;

    protected $display_css;

    protected $display_js;

    protected $remote_css;

    protected $remote_js;

    public function __construct($data)
    {
        $this->setData($data);
        $this->setDisplayCss(array());
        $this->setDisplayJs(array());
        $this->setRemoteCss(array());
        $this->setRemoteJs(array());
    }

    /***********
     * Getters
     ***********/

    /**
     * Get theme data
     *
     * @return string
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Get theme name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Get theme author
     *
     * @return string
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * Get theme url
     *
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Get theme display player name
     *
     * @return string
     */
    public function getDisplayPlayerName()
    {
        return $this->display_player_name;
    }

    /**
     * Get theme display css
     *
     * @return array
     */
    public function getDisplayCss()
    {
        return $this->display_css;
    }

    /**
     * Get theme display js
     *
     * @return array
     */
    public function getDisplayJs()
    {
        return $this->display_js;
    }

    /**
     * Get theme remote css
     *
     * @return array
     */
    public function getRemoteCss()
    {
        return $this->remote_css;
    }

    /**
     * Get theme remote js
     *
     * @return array
     */
    public function getRemoteJs()
    {
        return $this->remote_js;
    }

    /***********
     * Setters
     ***********/

    /**
     * Set theme data
     *
     * @param string $data
     * @return Theme
     */
    public function setData($data)
    {
        $this->data = $data;

        return $this;
    }

    /**
     * Set theme name
     *
     * @param string $name
     * @return Theme
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Set theme author
     *
     * @param string $author
     * @return Theme
     */
    public function setAuthor($author)
    {
        $this->author = $author;

        return $this;
    }

    /**
     * Set theme url
     *
     * @param string $url
     * @return Theme
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get theme display player name
     *
     * @param string $display_player_name
     * @return Theme
     */
    public function setDisplayPlayerName($display_player_name)
    {
        $this->display_player_name = $display_player_name;

        return $this;
    }

    /**
     * Get theme display css
     *
     * @param array $display_css
     * @return Theme
     */
    public function setDisplayCss($display_css)
    {
        $this->display_css = $display_css;

        return $this;
    }

    /**
     * Get theme display js
     *
     * @param array $display_js
     * @return Theme
     */
    public function setDisplayJs($display_js)
    {
        $this->display_js = $display_js;

        return $this;
    }

    /**
     * Get theme remote css
     *
     * @param array $remote_js
     * @return Theme
     */
    public function setRemoteCss($remote_css)
    {
        $this->remote_css = $remote_css;

        return $this;
    }

    /**
     * Get theme remote js
     *
     * @param array $remote_js
     * @return Theme
     */
    public function setRemoteJs($remote_js)
    {
        $this->remote_js = $remote_js;

        return $this;
    }

    /**
     * Add display css
     *
     * @param string $src
     */
    public function addDisplayCss($src)
    {
        $this->display_css[] = $this->getAssetAbsolutePath($src);
    }

    /**
     * Add display js
     *
     * @param string $src
     */
    public function addDisplayJs($src)
    {
        $this->display_js[] = $this->getAssetAbsolutePath($src);
    }

    /**
     * Add remote css
     *
     * @param string $src
     */
    public function addRemoteCss($src)
    {
        $this->remote_css[] = $this->getAssetAbsolutePath($src);
    }

    /**
     * Add remote js
     *
     * @param string $src
     */
    public function addRemoteJs($src)
    {
        $this->remote_js[] = $this->getAssetAbsolutePath($src);
    }

    /**
     * Get theme path
     *
     * @return string
     */
    public function getThemePath()
    {
        $parseUrl = parse_url($this->getData());
        $path = explode('/', $parseUrl['path']);
        unset($path[count($path)-1]);
        $parseUrl['path'] = $path;

        return Tools::http_build_url($parseUrl);
    }

    /**
     * Get theme asset absolute path
     *
     * @param $asset
     * @return string
     */
    public function getAssetAbsolutePath($asset)
    {
        return sprintf('%s/%s', $this->getThemePath(), $asset);
    }
}
