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

    $('#qrcode').qrcode({
        width: 42,
        height: 42,
        text : "http://remote.exp-o.fr"
    });
    $('#qrcode+.content').qrcode({
        width: 256,
        height: 256,
        text : "http://remote.exp-o.fr"
    });

    $('#help').click(function(event) {
        if (playerState != 'init') {
            event.preventDefault();
            updatePlayerState('init');
        }
    });
});
