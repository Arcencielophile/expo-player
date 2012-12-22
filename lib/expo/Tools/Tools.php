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

    static public function isUrlAlive($url)
    {
        $handle = curl_init($url);
        curl_setopt($handle,  CURLOPT_RETURNTRANSFER, TRUE);

        /* Get the HTML or whatever is linked in $url. */
        $response = curl_exec($handle);

        /* Check for 404 (file not found). */
        $httpCode = curl_getinfo($handle, CURLINFO_HTTP_CODE);

        if(in_array($httpCode, array(200, 301, 302))) {
            return true;
        }

        curl_close($handle);
        return false;
    }
}
