<?php

namespace Hipy\Player\Model;

/**
 * Target
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
class Target
{
  protected $name;

  protected $website;

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
   * Get Name
   *
   * @return string
   */
  public function getName()
  {
    return $this->name;
  }

  /**
   * Get Website
   *
   * @return string
   */
  public function getWebsite()
  {
    return $this->website;
  }

  /**********
   * Setters
   **********/

  /**
   * Set Name
   *
   * @param string $name
   * @return Target
   */
  public function setName($name)
  {
    $this->name = $name;

    return $this;
  }

  /**
   * Set Website
   *
   * @param string $website
   * @return Target
   */
  public function setWebsite($website)
  {
    $this->website = $website;

    return $this;
  }
}
