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
};

DisplayPresentation.prototype.init = function() {
  console.log('DisplayPresentation:init()');
  this.eventListeners();
  this.remoteListeners();
  this.setState('init');
}

/* Event Listeners */

DisplayPresentation.prototype.eventListeners = function() {

  // enter, space, page down, right arrow, down arrow
  next = [13, 32, 34, 39, 40],
  // backspace, page up, left arrow, up arrow
  previous = [8, 33, 37, 38]
  // escape
  listen = [27]

  $(document).keypress(function(event) {
    event.preventDefault();
    if(jQuery.inArray(event.keyCode, listen) != -1) {
      this.setState('pending');
    } else if(jQuery.inArray(event.keyCode, next) != -1) {
      this.next();
    } else if(jQuery.inArray(event.keyCode, next) != -1) {
      this.previous();
    }
  });

  $('#play').click(function() {
    event.preventDefault();
    this.play();
  });

  $('#help').click(function() {
    event.preventDefault();
    this.help();
  });

  $('#previous-page').click(function() {
    event.preventDefault();
    this.previous();
  });

  $('#next-page').click(function(){
    event.preventDefault();
    this.next();
  });

  // TODO: Goto

  $('#project-information > a').toggleContent({'on-visible': '-'});
  $('#current-page').toggleContent({'on-visible': '°°°'});
  $('#sync').toggleContent({'on-visible': '°°°'});
}

/* Remote Listeners */

DisplayPresentation.prototype.remoteListeners = function() {
  console.log('DisplayPresentation:remoteListeners()');
  id = presentation.getProjectId();

  presentation = this;
  this.socket.on('remote_list['+id+']', function(remotes) {
    presentation.updateRemotes(remotes);
  });

  this.socket.emit('list_remote', { project_id: this.projectId });
}

/* Getters */

DisplayPresentation.prototype.getProjectId = function() {
  return this.projectId;
}

DisplayPresentation.prototype.getRemotes = function() {
  return this.remotes;
}

DisplayPresentation.prototype.getState = function() {
  return this.state;
}

/* Setters */

DisplayPresentation.prototype.setFollower = function(follower) {
  this.follower = follower;
}

DisplayPresentation.prototype.setState = function(state) {
  if(this.state != state) {
    $('body').removeClass(this.state);
    this.state = state;
    $('body').addClass(this.state);
  }
}

/* Actions */

DisplayPresentation.prototype.updateRemotes = function(remotes) {
  this.remotes = remotes;
  console.log('DisplayPresentation:updateRemotes('+remotes+')');
}

DisplayPresentation.prototype.play = function() {
  console.log('DisplayPresentation:play()');
  this.setState('pending');
  //this.player.play();
}

DisplayPresentation.prototype.help = function() {
  console.log('DisplayPresentation:help()');
  this.setState('init');
  //this.player.help();
}

DisplayPresentation.prototype.next = function() {
  console.log('DisplayPresentation:next()');
  this.setState('pending');
  this.player.next();
}

DisplayPresentation.prototype.previous = function() {
  console.log('DisplayPresentation:previous()');
  this.setState('pending');
  this.player.previous();
}

DisplayPresentation.prototype.goto = function(position) {
  console.log('DisplayPresentation:goto('+position+')');
  this.setState('pending');
  this.player.goto(position);
}

DisplayPresentation.prototype.showInfo = function(show) {
  console.log('DisplayPresentation:showInfo('+show+')');
}

/* Others */

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
