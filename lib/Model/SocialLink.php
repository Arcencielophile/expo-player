<?php

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
}
