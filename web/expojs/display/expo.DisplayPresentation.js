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
    this.isPlayerInformationVisible  = false;
    this.isProjectInformationVisible = false;
    this.isShareContentVisible = false;
    this.isPagesMenuVisible = false;

    this.init = function() {
        console.log('DisplayPresentation:init()');
        if(this.socket != null) {
            this.remoteListeners();
        }
    };

    this.bindWithView = function() {
        console.log('DisplayPresentation:bindWithView()');
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

        this.initQRCode();
        this.showPlayerInformation(false);
        this.showProjectInformation(false);
        this.showPagesMenu(false);
        this.showSync(false);
        this.showShareContent(false);
    }

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

        jQuery('#expo-player-play').click(function(event) {
            event.preventDefault();
            presentation.play();
        });

        jQuery('#expo-project-information').click(function(event) {
            event.preventDefault();
            presentation.showProjectInformation(!presentation.isShowProjectInformation());
        });

        jQuery('#expo-player-information').click(function(event) {
            event.preventDefault();
            presentation.showPlayerInformation(!presentation.isShowPlayerInformation());
        });

        jQuery('#expo-player-share').click(function(event) {
            event.preventDefault();
            presentation.showShareContent(!presentation.isShowShareContent());
        });

        jQuery('#expo-navigation-previous-page').click(function(event) {
            event.preventDefault();
            presentation.previous();
        });

        jQuery('#expo-navigation-next-page').click(function(event) {
            event.preventDefault();
            presentation.next();
        });

        jQuery('#expo-navigation-current-page').click(function(event) {
            event.preventDefault();
            presentation.showPagesMenu(!presentation.isShowPagesMenu());
        });

        jQuery('#expo-navigation-current-page-content > ul > li > a').click(function(event) {
            event.preventDefault();
            presentation.goto(jQuery(this).html());
        });

        jQuery('#expo-player-sync').click(function(event) {
            event.preventDefault();
            var visible = jQuery('#expo-player-sync-content').hasClass('visible');
            presentation.showSync(!visible);
        });

        jQuery('#expo-player-sync-content a[href="#expo-player-sync-content"]').click(function(event) {
            event.preventDefault();
            presentation.showSync(false);
        });

        jQuery('#expo-player-share-content a[href="#expo-player-share-content"]').click(function(event) {
            event.preventDefault();
            presentation.showShareContent(false);
        });

        jQuery('.join-live ul li').live('click', function(event) {
            event.preventDefault();
            presentation.toggleRemote($(this).attr('id'));
        });

        jQuery('.join-live input[name="username"]').change(function(event){
            var name = jQuery('.join-live input[name="username"]').val();
            console.log('change username('+name+')');
            presentation.getFollower().name = name;
            presentation.socket.emit('update_follower', { project_id: presentation.getProjectId(), user: presentation.getFollower()});
        });
    };

    /* Remote Listeners which are not dependante of a remote (inactive remote case) */
    this.remoteListeners = function() {
        console.log('DisplayPresentation:remoteListeners()');
        var presentation = this;

        this.socket.on('remote_list',                     function(remotes) { presentation.updateRemotes(remotes); });

        this.socket.emit('list_remote', { project_id: this.getProjectId() });
    };

    /* Getters */
    this.getProjectId             = function() { return this.projectId; };
    this.getRemotes               = function() { return this.remotes; };
    this.getFollower              = function() { return this.follower; };
    this.getState                 = function() { return this.state; };
    this.isShowPlayerInformation  = function() { return this.isPlayerInformationVisible; };
    this.isShowProjectInformation = function() { return this.isProjectInformationVisible; };
    this.isShowShareContent       = function() { return this.isShareContentVisible; };
    this.isShowPagesMenu          = function() { return this.isPagesMenuVisible; };
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
    this.setShowPlayerInformation   = function(show)      { this.isPlayerInformationVisible = show; };
    this.setShowProjectInformation  = function(show)      { this.isProjectInformationVisible = show; };
    this.setShowShareContent        = function(show)      { this.isShareContentVisible = show; };
    this.setShowPagesMenu           = function(show)      { this.isPagesMenuVisible = show; };
    this.setFollower                = function(follower)  { this.follower = follower; };

    this.setState = function(state) {
        if (this.state != state) {
            jQuery('body').removeClass(this.state);
            this.state = state;
            jQuery('body').addClass(this.state);
        }
    };

    /* Actions */
    this.toggleRemote = function(roomName) {
        console.log('DisplayPresentation:toggleRemote('+roomName+')');
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
        console.log('DisplayPresentation:updateRemote('+remoteData+')');
        var remote = this.getRemoteByRoomName(remoteData.roomName)
        if(remote) {
            remote.synchronize(remoteData);
        } else {
            remote = new DisplayRemote(this, remoteData);
            this.addRemote(remote);
        }
        remote.toKeep(true);
    }

    this.addRemote = function(remote) {
        console.log('DisplayPresentation:addRemote('+remote+')');
        this.remotes.push(remote);
    }

    this.removeRemote = function(remote) {
        console.log('DisplayPresentation:removeRemote('+remote+')');
        if(this.remotes != undefined) {
            this.remotes.splice(this.remotes.indexOf(remote), 1);
        }
    };

    this.updateRemotes = function(remotesData) {
        console.log('DisplayPresentation:updateRemotes('+remotesData+')');
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
            remoteList.append('<li id="'+remote.getRoomName()+'"'+active+'><a href="'+remote.getRoomName()+'" title="Join '+username+'#'+remote.getId()+'">'+username+'#'+remote.getId()+'</a></li>');
        }
    };

    this.initQRCode = function() {
        console.log('DisplayPresentation:initQRCode()');
        jQuery('#qrcode').qrcode({
            width: 280,
            height: 280,
            text : jQuery('#qrcode').attr('href')
        });
    };

    this.play = function() {
        console.log('DisplayPresentation:play()');
        this.showPlayerInformation(false);
    };

    this.next = function() {
        console.log('DisplayPresentation:next()');
        if(this.getState() == 'init') {
            this.play();
        } else {
            this.player.next();
        }
    };

    this.previous = function() {
        console.log('DisplayPresentation:previous()');
        if(this.getState() == 'init') {
            this.play();
        } else {
            this.player.previous();
        }
    };

    this.goto = function(position) {
        console.log('DisplayPresentation:goto('+position+')');
        this.setState('pending');
        this.player.goto(position);
    };

    this.showPlayerInformation = function(show) {
        console.log('DisplayPresentation:showPlayerInformation('+show+')');
        var infoButton = jQuery('#expo-player-information');
        var infoContent = jQuery('#expo-player-information-content');

        this.setShowPlayerInformation(show);
        if(show) {
            this.setState('init');
            infoButton.addClass('active');
            infoContent.addClass('visible');
        } else {
            this.setState('pending');
            infoButton.removeClass('active');
            infoContent.removeClass('visible');
        }
    };

    this.disconnect = function() {
        console.log('DisplayPresentation:disconnect()');
        this.socket.emit('byebye');
    };

    this.showProjectInformation = function(show) {
        console.log('DisplayPresentation:showProjectInformation('+show+')');
        var infoButton = jQuery('#expo-project-information');
        var infoContent = jQuery('#expo-project-information-content');

        this.setShowProjectInformation(show);
        if(show) {
            infoButton.addClass('active');
            infoContent.addClass('visible');
        } else {
            infoButton.removeClass('active');
            infoContent.removeClass('visible');
        }
    };

    this.showShareContent = function(show) {
        console.log('DisplayPresentation:showShareContent('+show+')');
        var shareButton = jQuery('#expo-player-share');
        var shareContent = jQuery('#expo-player-share-content');

        this.setShowShareContent(show);
        if(show) {
            this.backdrop();
            shareButton.addClass('active');
            shareContent.addClass('visible');
        } else {
            this.removeBackdrop();
            shareButton.removeClass('active');
            shareContent.removeClass('visible');
        }
    };

    this.showSync = function(show) {
        console.log('DisplayPresentation:showSync('+show+')');
        var syncButton = jQuery('#expo-player-sync');
        var syncContent = jQuery('#expo-player-sync-content');

        if(show) {
            this.backdrop();
            syncButton.addClass('active');
            syncContent.addClass('visible');
        } else {
            this.removeBackdrop();
            syncButton.removeClass('active');
            syncContent.removeClass('visible');
        }
    };

    this.showPagesMenu = function(show) {
        console.log('DisplayPresentation:showPagesMenu('+show+')'); 
        var pagesButton = jQuery('#expo-navigation-current-page');
        var pagesContent = jQuery('#expo-navigation-current-page-content');

        this.setShowPagesMenu(show);
        if(show) {
            pagesButton.addClass('active');
            pagesContent.addClass('visible');
        } else {
            pagesButton.removeClass('active');
            pagesContent.removeClass('visible');
        }
    };

    this.backdrop = function() {
        if(this.$backdrop === undefined) {
            this.$backdrop = $('<div class="modal-backdrop fade in" />').appendTo(document.body);
        }
    };

    this.removeBackdrop = function() {
        if(this.$backdrop !== undefined) {
            this.$backdrop.remove();
            this.$backdrop = undefined;
        }
    };
};
