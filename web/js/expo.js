/* ===================================================
 * expo.js v1.0
 * ===================================================
 *   Web application following W3C standards to share, expose, presente
 *   artistic works, cultural projects, educational contents ...
 *   Copyright (C) 2012 Expo-Team
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * ========================================================== */

var playerState = 'init';

function updatePlayerState(state) {
    playerState = state;
    $('body').removeAttr('class');
    $('body').addClass(state);
}

function getElementPath(element)
{
    return "//" + $(element).parents().andSelf().map(function() {
        var $this = $(this);
        var tagName = this.nodeName;
        if ($this.siblings(tagName).length > 0) {
            tagName += "[" + $this.prevAll(tagName).length + "]";
        }
        return tagName;
    }).get().join("/").toUpperCase();
}

$.fn.toggleContent = function(options) {

    options = $.extend({}, {
        'on-visible': false
    }, options);

    var contents = new Array();
    $(this).click(function(event) {
        event.preventDefault();
        elemId = getElementPath(this);
        content = $(this).siblings('.content');
        parent = $(this).parent();
        if (contents[elemId] != "undefined" &&
            (contents[elemId] || contents[elemId] == $(this).html())) {
            parent.removeClass('visible');
            if (options['on-visible']) {
                $(this).empty().append(contents[elemId]);
            }
            contents[elemId] = false;
        } else {
            parent.addClass('visible');
            contents[elemId] = true;
            if (options['on-visible']) {
                contents[elemId] = $(this).html();
                $(this).empty().append(options['on-visible']);
            }
        }
    });
}

$('document').ready(function() {
    updatePlayerState('init');

    listen = [8, 13, 27, 32, 33, 34, 37, 38, 39, 40];

    $(document).keypress(function(event) {
        if (playerState != 'pending') {
            if(jQuery.inArray(event.keyCode, listen) != -1) {
              event.preventDefault();
              updatePlayerState('pending');
            }
        }
    });

    $('#previous-page').click(function(event) {
        if (playerState != 'pending') {
            event.preventDefault();
            updatePlayerState('pending');
        }
    });

    $('#next-page').click(function(event) {
        if (playerState != 'pending') {
            event.preventDefault();
            updatePlayerState('pending');
        }
    });

    $('#play').click(function(event) {
        if (playerState != 'pending') {
            event.preventDefault();
            updatePlayerState('pending');
        }
    });

    $('#help').click(function(event) {
        if (playerState != 'init') {
            event.preventDefault();
            updatePlayerState('init');
        }
    });

    $('#qrcode').qrcode({
        width: 160,
        height: 160,
        text : $('#qrcode').html()
    });

    $('#project-information > a').toggleContent({'on-visible': '-'});
    $('#current-page').toggleContent({'on-visible': '°°°'});
    $('#sync').toggleContent({'on-visible': '°°°'});
});
