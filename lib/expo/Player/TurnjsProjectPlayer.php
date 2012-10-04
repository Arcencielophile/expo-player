<?php

namespace expo\Player;

/**
 * TurnjsProjectPlayer
 *
 * @author Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @copyright GNU GPLv3
 */
class TurnjsProjectPlayer extends ProjectPlayer
{
    public function getCss()
    {
        return array();
    }

    public function getJs($position = null)
    {
        return array("turn.js/turn.min.js");
    }

    public function getJsLoader()
    {
        return "$('document').ready(function() { 
            $('#container').turn({
              autoCenter: true,
              gradients: true,
              acceleration: true
            });
            $('#previous-page').click(function(){
              $('#container').turn('previous');
            });
            $('#next-page').click(function(){
              $('#container').turn('next');
            });

            $('#current-page').append(1);
            $('#container').bind('turning', function(event, page, view) {
              $('#current-page').empty();
              $('#current-page').append(page);
            });

            next = [13, 32, 34, 39, 40];
            previous = [8, 33, 37, 38];

            $(document).keypress(function(event) {
              if(jQuery.inArray(event.keyCode, previous) != -1) {
                event.preventDefault();
                $('#container').turn('previous');
              }
              if(jQuery.inArray(event.keyCode, next) != -1) {
                event.preventDefault();
                $('#container').turn('next');
              }
            });
        });";
    }
}
