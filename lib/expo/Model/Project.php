<?php

namespace expo\Model;

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

    protected $targets = array();

    protected $authors = array();

    protected $pages = array();

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

    /**
     * Get Targets
     *
     * @return mixed
     */
    public function getTargets()
    {
        return $this->targets;
    }

    /**
     * Get Authors
     *
     * @return mixed
     */
    public function getAuthors()
    {
        return $this->authors;
    }

    /**
     * Get Pages
     *
     * @return mixed
     */
    public function getPages()
    {
        return $this->pages;
    }

    /**
     * Get unique Identifier base on the name, date and author
     *
     * @return string
     */
     public function getIdentifier()
     {
        return md5(sprintf('%s-%s-%s',
            $this->getName(),
            $this->getDate(),
            serialize($this->getAuthors())
        ));
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
     * @param mixed $tags
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

    /**
     * Set Targets
     *
     * @param mixed $targets
     * @return Project
     */
    public function setTargets($targets)
    {
        $this->targets = $targets;

        return $this;
    }

    /**
     * Add Target
     *
     * @param Target $target
     * @return Project
     */
    public function addTarget($target)
    {
        $this->targets[] = $target;

        return $this;
    }

    /**
     * Set Authors
     *
     * @param mixed $authors
     * @return Project
     */
    public function setAuthors($authors)
    {
        $this->authors = $authors;

        return $this;
    }

    /**
     * Add Author
     *
     * @param Author $author
     * @return Project
     */
    public function addAuthor($author)
    {
        $this->authors[] = $author;

        return $this;
    }

    /**
     * Set Pages
     *
     * @param mixed $pages
     * @return Project
     */
    public function setPages($pages)
    {
        $this->pages = $pages;

        return $this;
    }

    /**
     * Add Page
     *
     * @param Page $page
     * @return Project
     */
    public function addPage($page)
    {
        $this->pages[] = $page;

        return $this;
    }

    public function countSlides()
    {
        return count($this->getPages());
    }
}
