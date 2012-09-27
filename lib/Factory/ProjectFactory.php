<?php

namespace Hipy\Player\Factory;

/**
 * Project
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
abstract class ProjectFactory
{
  /**
   * Get Project
   * Return a created project based on a src (url, or xml string)
   *
   * @param string $src
   * @return Project
   */
  static public function getProject($src)
  {
    return new Project;
  }
}
