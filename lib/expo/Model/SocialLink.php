<?php

namespace expo\Model;

/**
 * SocialLink
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
class SocialLink
{
    protected $uri;

    /**
     * Constructor
     */
    public function __construct()
    {
    }

    public function __toString()
    {
        return $this->getUri();
    }

    /***********
     * Getters
     ***********/

    /**
     * Get Uri
     *
     * @return string
     */
    public function getUri()
    {
        return $this->uri;
    }

    /**********
     * Setters
     **********/

    /**
     * Set Uri
     *
     * @param string $uri
     * @return SocialLink
     */
    public function setUri($uri)
    {
        $this->uri = $uri;

        return $this;
    }

    /**
     * guessSocialNetworkName
     *
     * @return string
     */
    public function guessSocialNetworkName()
    {
        $matches = array();
        $domain = parse_url($this->getUri(), PHP_URL_HOST);
        preg_match ('#(www\.)?([^\.]+)\.#', $domain, $matches);

        return strtolower($matches[2]);
    }
}
