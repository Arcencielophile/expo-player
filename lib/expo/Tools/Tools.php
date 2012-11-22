<?php

namespace expo\Tools;

/**
 * Tools
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
class Tools
{
    static public function isValidURL($url)
    {
        return preg_match('|^http(s)?://[a-z0-9-]+(.[a-z0-9-]+)*(:[0-9]+)?(/.*)?$|i', $url);
    }

    static public function isValidXML($xml)
    {
        return true;
    }

    static public function http_build_url($params)
    {
        return sprintf('%s://%s%s',
            $params['scheme'],
            $params['host'],
            implode('/', $params['path'])
        );
    }
}
