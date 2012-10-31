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

var DisplayPresentation = function(socket, projectId, player) {

  this.socket = socket;
  this.projectId = projectId;
  this.player = player;
  this.remotes = new Array();
  this.follower = null;
  this.state = null;
  this.show = false;

  this.init = function() {
    console.log('DisplayPresentation:init()');
    this.player.init();
    this.eventListeners();
    this.remoteListeners();
    this.setState('init');
  };

  /* Event Listeners */
  this.eventListeners = function() {
    console.log('DisplayPresentation:eventListeners()');
    var presentation = this;

    // space, enter, page down, right arrow, down arrow
    var next = [13,32,34,39,40];
    // backspace, page up, left arrow, up arrow
    var previous = [8,33,37,38];
    // escape
    var listen = [27];

    jQuery(document).keydown(function(event) {
      if(jQuery.inArray(event.which, listen) >= 0) {
        event.preventDefault();
        presentation.setState('pending');
      } else if(jQuery.inArray(event.which, next) >= 0) {
        event.preventDefault();
        presentation.next();
      } else if(jQuery.inArray(event.which, previous) >= 0) {
        event.preventDefault();
        presentation.previous();
      }
    });

    jQuery('#play').click(function(event) {
      event.preventDefault();
      presentation.play();
    });

    jQuery('#help').click(function(event) {
      event.preventDefault();
      presentation.help();
    });

    jQuery('#previous-page').click(function(event) {
      event.preventDefault();
      presentation.previous();
    });

    jQuery('#next-page').click(function(event) {
      event.preventDefault();
      presentation.next();
    });

    jQuery('#current-page + .content > ul > li > a').click(function(event) {
      event.preventDefault();
      presentation.goto(jQuery(this).html() - 1);
    });

    jQuery('#project-information > a').click(function(event) {
      event.preventDefault();
      presentation.showInfo(!presentation.isShowInfo());
    });

    jQuery('#current-page').toggleContent({'text-visible': '°°°'});

    jQuery('#sync').toggleContent({
        'text-visible': '°°°',
        'on-visible': function() {
            jQuery('#qrcode').qrcode({
                width: 160,
                height: 160,
                text : jQuery('#qrcode').attr('href')
            });
        },
        'on-hide': function() {
            jQuery('#qrcode').empty();
        }
    });
  };

  /* Remote Listeners */
  this.remoteListeners = function() {
    console.log('DisplayPresentation:remoteListeners()');
    var presentation = this;

    this.socket.on('remote_list['+this.getProjectId()+']', function(remotes) {
      presentation.updateRemotes(remotes);
    });

    this.socket.emit('list_remote', { project_id: this.getProjectId() });
  };

  /* Getters */
  this.getProjectId = function() { return this.projectId; };
  this.getRemotes   = function() { return this.remotes; };
  this.getState     = function() { return this.state; };
  this.isShowInfo   = function() { return this.show; };

  /* Setters */
  this.setShowInfo  = function(show) { this.show = show; };
  this.setFollower  = function(follower) { this.follower = follower; };

  this.setState     = function(state) {
    if(this.state != state) {
      jQuery('body').removeClass(this.state);
      this.state = state;
      jQuery('body').addClass(this.state);
    }
  };

  /* Actions */
  this.updateRemotes = function(remotes) {
    this.remotes = remotes;
    console.log('DisplayPresentation:updateRemotes('+remotes+')');
    
  };

  this.play = function() {
    console.log('DisplayPresentation:play()');
    this.setState('pending');
    //this.player.play();
  };

  this.help = function() {
    console.log('DisplayPresentation:help()');
    this.setState('init');
    //this.player.help();
  };

  this.next = function() {
    console.log('DisplayPresentation:next()');
    this.setState('pending');
    this.player.next();
  };

  this.previous = function() {
    console.log('DisplayPresentation:previous()');
    this.setState('pending');
    this.player.previous();
  };

  this.goto = function(position) {
    console.log('DisplayPresentation:goto('+position+')');
    this.setState('pending');
    this.player.goto(position);
  };

  this.showInfo = function(show) {
    console.log('DisplayPresentation:showInfo('+show+')');
    var info = jQuery('#project-information');

    if(show) {
      this.setShowInfo(true);
      info.addClass('visible');
    } else {
      this.setShowInfo(false);
      info.removeClass('visible');
    }
  };

};

/* Others */

function getElementPath(element)
{
    return "//" + jQuery(element).parents().andSelf().map(function() {
        var $this = jQuery(this);
        var tagName = this.nodeName;
        if ($this.siblings(tagName).length > 0) {
            tagName += "[" + $this.prevAll(tagName).length + "]";
        }
        return tagName;
    }).get().join("/").toUpperCase();
}

$.fn.toggleContent = function(options) {

    options = $.extend({}, {
        'text-visible': false,
        'on-visible': function(){},
        'on-hide': function(){},
    }, options);

    var contents = new Array();
    jQuery(this).click(function(event) {
        event.preventDefault();
        elemId = getElementPath(this);
        parent = jQuery(this).parent();
        if (contents[elemId] != "undefined" &&
            (contents[elemId] || contents[elemId] == jQuery(this).html())) {
            parent.removeClass('visible');
            if (options['text-visible']) {
                jQuery(this).empty().append(contents[elemId]);
            }
            options['on-hide'].call();
            contents[elemId] = false;
        } else {
            parent.addClass('visible');
            contents[elemId] = true;
            if (options['text-visible']) {
                contents[elemId] = jQuery(this).html();
                jQuery(this).empty().append(options['text-visible']);
            }
            options['on-visible'].call();
        }
    });
};
