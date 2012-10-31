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

var DeckjsPlayer = function() {

  this.init = function() {
    jQuery.deck.defaults = {
      classes: {
        after: 'deck-after',
        before: 'deck-before',
        childCurrent: 'deck-child-current',
        current: 'deck-current',
        loading: 'deck-loading',
        next: 'deck-next',
        onPrefix: 'on-slide-',
        previous: 'deck-previous'
      },

      selectors: {
        container: '#container',
        statusCurrent: '#current-page'
      },

      keys: {
        next: null,
        previous: null
      },

      touch: {
        swipeTolerance: 60
      }
    }

    jQuery.deck('.slide');
  };

  this.next = function() {
    console.log('DeckjsPlayer:next()');
    jQuery.deck('next');
  };

  this.previous = function() {
    console.log('DeckjsPlayer:previous()');
    jQuery.deck('prev');
  };

  this.goto = function(position) {
    console.log('DeckjsPlayer:goto('+position+')');
    jQuery.deck('go', position-1);
  };

};
