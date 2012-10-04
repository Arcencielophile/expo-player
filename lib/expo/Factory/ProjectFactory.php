<?php

namespace expo\Factory;

require_once __DIR__.'/../Model/Project.php';
use expo\Model\Project;
require_once __DIR__.'/../Model/Author.php';
use expo\Model\Author;
require_once __DIR__.'/../Model/SocialLink.php';
use expo\Model\SocialLink;
require_once __DIR__.'/../Model/Target.php';
use expo\Model\Target;
require_once __DIR__.'/../Model/ProjectPage.php';
use expo\Model\ProjectPage;

/**
 * Project
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
abstract class ProjectFactory
{
    /**
     * Initiate a Project
     * Return a created project based on a src (url, or xml string)
     *
     * @param string $src
     * @return Project
     */
    static public function initProject($src)
    {
        $xml = null;
        if(self::isValidURL($src))
            $xml = file_get_contents($src);

        if(empty($xml) || !self::isValidXML($xml))
            return null;

        $xmlProject = new \SimpleXMLElement($xml);
        $project = new Project();

        $project->setName(html_entity_decode($xmlProject->name, ENT_NOQUOTES, 'UTF-8'));
        $project->setSummary(html_entity_decode($xmlProject->summary, ENT_NOQUOTES, 'UTF-8'));
        $project->setDate(html_entity_decode($xmlProject->date, ENT_NOQUOTES, 'UTF-8'));
        $project->setLogo(html_entity_decode($xmlProject->logo, ENT_NOQUOTES, 'UTF-8'));

        foreach($xmlProject->tag as $xmlTag)
            $project->addTag(html_entity_decode($xmlTag, ENT_NOQUOTES, 'UTF-8'));

        foreach($xmlProject->author as $xmlAuthor) {
            $author = new Author();
            $author->setName(html_entity_decode($xmlAuthor->name, ENT_NOQUOTES, 'UTF-8'));
            $author->setEmail(html_entity_decode($xmlAuthor->email, ENT_NOQUOTES, 'UTF-8'));
            $author->setWebsite(html_entity_decode($xmlAuthor->website, ENT_NOQUOTES, 'UTF-8'));
            foreach($xmlAuthor->social_link as $xmlSocialLink) {
                $attrs = $xmlSocialLink->attributes();
                $socialLink = new SocialLink();
                $socialLink->setUri(html_entity_decode($attrs['uri'], ENT_NOQUOTES, 'UTF-8'));
                $author->addSocialLink($socialLink);
            }

            $project->addAuthor($author);
        }

        foreach($xmlProject->target as $xmlTarget) {
            $target = new Target();
            $target->setName(html_entity_decode($xmlTarget->name, ENT_NOQUOTES, 'UTF-8'));
            $target->setWebsite(html_entity_decode($xmlTarget->website, ENT_NOQUOTES, 'UTF-8'));

            $project->addTarget($target);
        }

        foreach($xmlProject->page as $xmlPage) {
            $page = new ProjectPage();
            $page->setTitle(html_entity_decode($xmlPage->title, ENT_NOQUOTES, 'UTF-8'));
            $page->setDescription(html_entity_decode($xmlPage->description, ENT_NOQUOTES, 'UTF-8'));
            $page->setContent(html_entity_decode($xmlPage->content, ENT_NOQUOTES, 'UTF-8'));

            $project->addPage($page);
        }

        return $project;
    }

    static function isValidURL($url)
    {
        return preg_match('|^http(s)?://[a-z0-9-]+(.[a-z0-9-]+)*(:[0-9]+)?(/.*)?$|i', $url);
    }

    static function isValidXML($xml)
    {
        return true;
    }
}
