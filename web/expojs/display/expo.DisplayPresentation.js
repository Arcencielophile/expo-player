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

var DisplayPresentation = function(socket, projectId, player, follower) {

    this.socket = socket;
    this.projectId = projectId;
    this.player = player;
    this.follower = follower;
    this.remotes = new Array();
    this.state = null;
    this.show = false;

    this.init = function() {
        console.log('DisplayPresentation:init()');
        if(!this.follower) {
            this.follower = new User();
            var username = $('#usernameInput').attr('value');
            if(!username) {
                username = $('#usernameInput').attr('placeholder');
            }
            this.follower.name = username;
        }
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
            presentation.goto(jQuery(this).html());
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

        jQuery('.join-live ul li a').live('click', function(event) {
            event.preventDefault();
            presentation.toggleRemote($(this).attr('href'));
        });

        jQuery('.join-live input[name="username"]').change(function(event){
            var name = jQuery('.join-live input[name="username"]').val();
            console.log('change username('+name+')');
            presentation.getFollower().name = name;
            presentation.socket.emit('update_follower', { project_id: presentation.getProjectId(), user: presentation.getFollower()});
        });
    };

    /* Remote Listeners */
    this.remoteListeners = function() {
        console.log('DisplayPresentation:remoteListeners()');
        var presentation = this;

        this.socket.on('remote_list',               function(remotes) { presentation.updateRemotes(remotes); });
        this.socket.on('update_show_info',          function(data) { presentation.showInfo(data.showInfo); });

        this.socket.emit('list_remote', { project_id: this.getProjectId() });
    };

    /* Getters */
    this.getProjectId        = function() { return this.projectId; };
    this.getRemotes          = function() { return this.remotes; };
    this.getFollower         = function() { return this.follower; };
    this.getState            = function() { return this.state; };
    this.isShowInfo          = function() { return this.show; };
    this.getRemoteByRoomName = function(roomName) {
        console.log('Display')
        var i = 0;
        while(i < this.remotes.length) {
            var currentRemote = this.remotes[i];
            console.log(currentRemote);
            if(currentRemote.getRoomName() == roomName) {
                return currentRemote;
            }
            i++;
        }

        return null;
    };

    /* Setters */
    this.setShowInfo  = function(show) { this.show = show; };
    this.setFollower  = function(follower) { this.follower = follower; };

    this.setState     = function(state) {
        if (this.state != state) {
            jQuery('body').removeClass(this.state);
            this.state = state;
            jQuery('body').addClass(this.state);
        }
    };

    /* Actions */
    this.toggleRemote = function(roomName) {
        console.log('DisplayManager:toggleRemote('+roomName+')');
        remote = this.getRemoteByRoomName(roomName);
        console.log('#'+roomName);
        if (remote.isActive()) {
            remote.disabled();
            jQuery('#'+roomName).removeClass('active');
        } else {
            remote.enabled(this.socket);
            jQuery('#'+roomName).addClass('active');
        }
    };

    this.updateRemote = function(remoteData) {
        var remote = this.getRemoteByRoomName(remoteData.roomName)
        if(remote) {
            remote.update(remoteData);
        } else {
            remote = new DisplayRemote(this, remoteData);
            this.addRemote(remote);
        }
        remote.toKeep(true);
    }

    this.addRemote = function(remote) {
        this.remotes.push(remote);
    }

    this.removeRemote = function(remote) {
        console.log('DisplayPresentation:removeRemote('+remote+')');
        if(this.remotes != undefined) {
            this.remotes.splice(this.remotes.indexOf(remote), 1);
        }
    };

    this.updateRemotes = function(remotesData) {
        if(remotesData != null) {
            var toKeep = new Array();
            for(i = 0; i < this.remotes.length; i++) {
                var current = this.remotes[i];
                current.toKeep(false);
            }

            for(i = 0; i < remotesData.length; i++) {
                this.updateRemote(remotesData[i]);
            }

            for(i = 0; i < this.remotes.length; i++) {
                var current = this.remotes[i];
                if(!current.toKeep()) {
                    this.removeRemote(current);
                }
            }
        } else {
            this.remotes = new Array();
        }

        console.log('DisplayPresentation:updateRemotes('+this.remotes+')');
        console.log(this.remotes);

        var remoteList = jQuery('.join-live ul');
        remoteList.empty();
        for(i=0; i < this.remotes.length; i++) {
            var remote = this.remotes[i];
            var username = '';
            if(remote.owner) {
                username = remote.owner.name;
            }
            var active = remote.isActive() ? ' class="active"' : '';
            remoteList.append('<li id="'+remote.getRoomName()+'"'+active+'><a href="'+remote.getRoomName()+'" title="Join '+username+'#'+remote.getId()+'">Join '+username+'#'+remote.getId()+'</a></li>');
        }
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
