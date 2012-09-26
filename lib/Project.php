<?php

/**
 * Project
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
class Project
{
  protected $name;

  protected $summary;

  protected $date;

  protected $logo;

  protected $tags = array();

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
   * Get Summary
   *
   * @return string
   */
  public function getSummary()
  {
    return $this->summary;
  }

  /**
   * Get Date
   *
   * @return DateTime
   */
  public function getDate()
  {
    return $this->date;
  }

  /**
   * Get Logo
   *
   * @return string
   */
  public function getLogo()
  {
    return $this->logo;
  }

  /**
   * Get Tags
   *
   * @return mixed
   */
  public function getTags()
  {
    return $this->tags;
  }

  /**********
   * Setters
   **********/

  /**
   * Set Name
   *
   * @param string $name
   * @return Project
   */
  public function setName($name)
  {
    $this->name = $name;

    return $this;
  }

  /**
   * Set Summary
   *
   * @param string $summary
   * @return Project
   */
  public function setSummary($summary)
  {
    $this->summary = $summary;

    return $this;
  }

  /**
   * Set Date
   *
   * @param DateTime $date
   * @return Project
   */
  public function setDate($date)
  {
    $this->date = $date;

    return $this;
  }

  /**
   * Set Logo
   *
   * @param string $logo
   * @return Project
   */
  public function setLogo($logo)
  {
    $this->logo = $logo;

    return $this;
  }

  /**
   * Set Tags
   *
   * @param mixes $tags
   * @return Project
   */
  public function setTags($tags)
  {
    $this->tags = $tags;

    return $this;
  }

  /**
   * Add Tag
   *
   * @param string $tag
   * @return Project
   */
  public function addTag($tag)
  {
    $this->tags[] = $tag;

    return $this;
  }
}
