<?php

namespace Hipy\Model;

require_once __DIR__.'/ProjectElement.php';
use Hipy\Model\ProjectElement;

/**
 * ProjectPage
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
class ProjectPage extends ProjectElement
{
  protected $elements = array();

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
   * Get Elements
   *
   * @return mixed
   */
  public function getElements()
  {
    return $this->elements;
  }

  /**********
   * Setters
   **********/

  /**
   * Set Elements
   *
   * @param mixed $elements
   * @return ProjectPage
   */
  public function setElements($elements)
  {
    $this->elements = $elements;

    return $this;
  }

  /**
   * Add Element
   *
   * @param ProjectElement $element
   * @return ProjectPage
   */
  public function addElement($element)
  {
    $this->elements[] = $element;

    return $this;
  }
}
