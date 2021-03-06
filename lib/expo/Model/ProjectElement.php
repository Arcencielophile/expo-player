<?php

namespace expo\Model;

/**
 * ProjectElement
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
class ProjectElement
{
    protected $title;

    protected $description;

    protected $content;

    protected $effects = array();

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
     * Get Title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Get Description
     *
     * @return string
     */
    public function getDescription()
    {
        return trim($this->description);
    }

    /**
     * Get Content
     *
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Get Effects
     *
     * @return mixed
     */
    public function getEffects()
    {
        return $this->effects;
    }

    /**********
     * Setters
     **********/

    /**
     * Set Title
     *
     * @param string $title
     * @return ProjectElement
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Set Description
     *
     * @param string $description
     * @return ProjectElement
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Set Content
     *
     * @param string $content
     * @return ProjectElement
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Set Effects
     *
     * @param mixed $effects
     * @return ProjectElement
     */
    public function setEffects($effects)
    {
        $this->effects = $effects;

        return $this;
    }

    /**
     * Add Effect
     *
     * @param ProjectElementFx $effect
     * @return ProjectElement
     */
    public function addEffect($effect)
    {
        $this->effects[] = $effect;

        return $this;
    }

    static public function slugify($text)
    {
        // replace non letter or digits by -
        $text = preg_replace('~[^\\pL\d]+~u', '-', $text);

        // trim
        $text = trim($text, '-');

        // transliterate
        if (function_exists('iconv')) {
            $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
        }

        // lowercase
        $text = strtolower($text);

        // remove unwanted characters
        $text = preg_replace('~[^-\w]+~', '', $text);

        if (empty($text)) {
            return 'n-a';
        }

        return $text;
    }

    /**
     * Get identifier
     *
     * @return string
     */
    public function getId()
    {
        return self::slugify($this->getTitle());
    }
}
