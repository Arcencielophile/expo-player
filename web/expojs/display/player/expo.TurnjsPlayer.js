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

var TurnjsPlayer = function() {};

TurnjsPlayer.prototype.init = function() {
  jQuery('#container').turn({
    autoCenter: true,
    gradients: true,
    acceleration: true
  });

  jQuery('#current-page').append(1);

  jQuery('#container').bind('turning', function(event, page, view) {
    jQuery('#current-page').empty();
    jQuery('#current-page').append(page);
  });
};

TurnjsPlayer.prototype.next = function() {
  jQuery('#container').turn('next');
};

TurnjsPlayer.prototype.previous = function() {
  jQuery('#container').turn('previous');
};

TurnjsPlayer.prototype.goto = function(position) {
  jQuery('#container').turn('page', position);
};
