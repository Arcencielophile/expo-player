<?php

/**
 * Author
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
class Author
{
  protected $name;

  protected $email;

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
   * Get Email
   *
   * @return string
   */
  public function getEmail()
  {
    return $this->email;
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
   * @return Author
   */
  public function setName($name)
  {
    $this->name = $name;

    return $this;
  }

  /**
   * Set Email
   *
   * @param string $email
   * @return Author
   */
  public function setEmail($email)
  {
    $this->email = $email;

    return $this;
  }

  /**
   * Set Website
   *
   * @param string $website
   * @return Author
   */
  public function setWebsite($website)
  {
    $this->website = $website;

    return $this;
  }
}
