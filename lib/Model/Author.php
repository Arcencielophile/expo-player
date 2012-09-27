<?php

namespace Hipy\Player\Model;

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

  protected $social_links = array();

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
   * Get SocialLinks
   *
   * @return mixed
   */
  public function getSocialLinks()
  {
    return $this->social_links;
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

  /**
   * Set SocialLinks
   *
   * @param mixed $social_links
   * @return Author
   */
  public function setSocialLinks($social_links)
  {
    $this->social_links = $social_links;

    return $this;
  }


  /**
   * Add SocialLink
   *
   * @param SocialLink $social_link
   * @return Author
   */
  public function addSocialLink($social_link)
  {
    $this->social_links[] = $social_link;

    return $this;
  }
}
