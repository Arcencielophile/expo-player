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

var ControlRemote = function (socket, position) {
    this.id = 0;

    this.connected = false;

    this.roomName = null;
    this.position = position;

    this.owner = new User();
    this.presentation = null;
    this.followers = new Array();
    this.socket = socket;

    this.showProjectInformation = false;
    this.showPlayerInformation = false;
    this.showShareContent = false;
    this.showPagesMenu = false;

    this.init = function() {
        console.log('ControlRemote:init()');
        this.remoteListeners();
        window.onbeforeunload = this.disconnect;
    }

    /* Remote Listeners */
    this.remoteListeners = function() {
        console.log('ControlRemote:remoteListeners()');
        remote = this;

        this.socket.on('connect', function(){
            // waiting for connect send by server-side.
            console.log('Remote connected');
            remote.socket.emit('new_remote', {projectId: remote.getPresentation().getId(), owner: remote.getOwner()});

        });

        this.socket.on('set_remote_id', function (data) {
            console.log('set_remote_id ('+data+')');
            console.log(data);
            remote.setId(data.id);
            remote.connected = true;
            remote.setRoomName(data.roomName);
            remote.updateUserNameLabel();
        });
        
        this.socket.on('update_followers', function (data) {
            remote.updateFollowers(data);
        });
    }

    /* Event Listeners */
    this.eventListeners = function() {
        console.log('ControlRemote:eventListeners()');
        remote = this;

        $('#expo-remote-previous').on('click', function(event) {
            event.preventDefault();
            remote.previous();
        });
        $(document).on('swiperight', function(event) {
            event.preventDefault();
            remote.previous();
        });

        $('#expo-remote-next').on('click', function(event) {
            console.log('next');
            event.preventDefault();
            remote.next();
        });
        $(document).on('swipeleft', function(event) {
            event.preventDefault();
            remote.next();
        });

        $('#expo-remote-project-information').on('click', function(event) {
            event.preventDefault();
            remote.toggleProjectInformation();
        });

        $('#expo-remote-player-information').on('click', function(event) {
            event.preventDefault();
            remote.togglePlayerInformation();
        });

        $('#expo-remote-share').on('click', function(event) {
            event.preventDefault();
            remote.toggleShareContent();
        });

        $('#expo-remote-pages').on('click', function(event) {
            event.preventDefault();
            remote.togglePagesMenu();
        });

        $('#expo-remote-name').on('keypress', function(event) {
            if(event.keyCode == 13) {
                remote.changeUserName($('#expo-remote-name > input').val());
            }
        });

        $('#expo-remote-name > button').on('click', function(event) {
            event.preventDefault();
            remote.changeUserName($('#expo-remote-name > input').val());
        });

        $('#expo-remote-goto a').on('click', function(event) {
            event.preventDefault();
            remote.goto($(this).attr('data-goto'));
        });

        /*$(document).on('pagechange', function(event, data) {
            if(data.toPage[0].id == 'user' || data.toPage[0].id == 'home') {
                remote.updateUserNameLabel();
                remote.updateFollowers(remote.getFollowers());
            }
        });*/

        this.updateUserNameLabel();
    }

    /* Getters */
    this.getId              = function() { return this.id; }
    this.getRoomName        = function() { return this.roomName; }
    this.getPosition        = function() { return this.position; }
    this.getStatus          = function() { return this.status; }
    this.getStatusWithKey   = function(key) { return this.status[key]; }
    this.getOwner           = function() { return this.owner; }
    this.getPresentation    = function() { return this.presentation; }
    this.getFollowers       = function() { return this.followers; }
    this.isConnected        = function() { return this.connected; }
    this.isShowProjectInformation  = function() { return this.showProjectInformation; };
    this.isShowPlayerInformation   = function() { return this.showPlayerInformation; };
    this.isShowShareContent        = function() { return this.showShareContent; };
    this.isShowPagesMenu           = function() { return this.showPagesMenu; };

    /* Setters */
    this.setId              = function(id) { this.id = id; }
    this.setRoomName        = function(roomName) { this.roomName = roomName; }
    this.setPosition        = function(position) { this.position = position; }
    this.setStatus          = function(status) { this.status = status; }
    this.setOwner           = function(owner) { this.owner = owner; }
    this.setPresentation    = function(presentation) { this.presentation = presentation; }
    this.setFollowers       = function(followers) { this.followers = followers; }
    this.setShowProjectInformation = function(showProjectInformation) { this.showProjectInformation = showProjectInformation; };
    this.setShowPlayerInformation  = function(showPlayerInformation) { this.showPlayerInformation = showPlayerInformation; };
    this.setShowShareContent       = function(showShareContent) { this.showShareContent = showShareContent; };
    this.setShowPagesMenu          = function(showPagesMenu) { this.showPagesMenu = showPagesMenu; };

    // Methodes
    this.next = function() {
        this.goto(this.position + 1);
    }

    this.previous = function() {
        this.goto(this.position - 1);
    }

    this.goto = function(position) {
        if(this.getRoomName() != null) {
            if(this.isConnected()) {
                if(position < 1) position = 1;
                if(position > this.presentation.getPagesNumber()) position = this.presentation.getPagesNumber();

                this.position = position;
                console.log('ControlRemote:goto position: '+this.position+' for roomName: '+this.getRoomName());
                this.socket.emit('goto', {roomName:this.getRoomName(), position: this.position});

                $('#expo-remote-current').html('<span>'+this.position+'</span>');
            }
        } else {
            console.log('Missing id');
        }
    }
    
    this.toggleProjectInformation = function() {
        if(this.isConnected()) {
            console.log('ControlRemote:toggleProjectInformation');
            this.setShowProjectInformation(!this.isShowProjectInformation());
            this.socket.emit('update_show_project_information', {roomName:this.getRoomName(), show:this.isShowProjectInformation()});
        }
    }

    this.togglePlayerInformation = function() {
        if(this.isConnected()) {
            console.log('ControlRemote:togglePlayerInformation');
            this.setShowPlayerInformation(!this.isShowPlayerInformation());
            this.socket.emit('update_show_player_information', {roomName:this.getRoomName(), show:this.isShowPlayerInformation()});
        }
    }

    this.toggleShareContent = function() {
        if(this.isConnected()) {
            console.log('ControlRemote:toggleShareContent');
            this.setShowShareContent(!this.isShowShareContent());
            this.socket.emit('update_show_share_content', {roomName:this.getRoomName(), show:this.isShowShareContent()});
        }
    }

    this.togglePagesMenu = function() {
        if(this.isConnected()) {
            console.log('ControlRemote:togglePagesMenu');
            this.setShowPagesMenu(!this.isShowPagesMenu());
            this.socket.emit('update_show_pages_menu', {roomName:this.getRoomName(), show:this.isShowPagesMenu()});
        }
    }

    this.changeUserName = function(userName) {
        if(this.getRoomName() != null) {
            console.log('ControlRemote:changeUserName');
            this.getOwner().setName(userName);
            this.updateUser();
        }
    }

    this.updateUser = function() {
        console.log('ControlRemote:updateUser');
        this.socket.emit('update_owner', {roomName:this.getRoomName(), user: this.getOwner()});
    }

    this.updateUserNameLabel = function() {
        console.log('ControlRemote:updateUserNameLabel');
        if($('#expo-remote-name')) {
            $('#expo-remote-name > input').val('');
            $('#expo-remote-name > input').val(remote.getOwner().getName());
            
            $('#expo-remote-name > input').attr('placeholder', '#'+remote.getId());
        }
        /*if($('a[href="#user"] .ui-btn-text')) {
            $('a[href="#user"] .ui-btn-text').empty().append(manager.remote.getOwner().getName()+'#'+manager.remote.getId());
        }*/
    }

    this.updateFollowers = function(followers) {
        this.followers = followers;
        console.log('ControlRemote:updateFollowers('+this.followers+')');
        console.log(this.followers);
        $('#expo-remote-followers-counter').empty().append(this.followers.length);

        var collapseInId = '';
        if ($('div.in')) {
            var id = $('div.in').attr('id');
            if (id) {
                collapseInId = id;
            }
        }
        console.log('collapseInId: '+collapseInId);

        var list = '';
        for(i=0; i < this.followers.length; i++) {
            var follower = this.followers[i];
            list += '<div class="accordion-group">';
            list +=     '<div class="accordion-heading">';
            list +=         '<a class="accordion-toggle" data-toggle="collapse" data-parent="#followers-list" href="#collapse'+follower.id+'">';
            list +=         follower.name;
            list +=         '</a>';
            list +=     '</div>';
            if (collapseInId == ('collapse'+follower.id)) {
                list += '<div id="collapse'+follower.id+'" class="accordion-body collapse in">';
            } else {
                list += '<div id="collapse'+follower.id+'" class="accordion-body collapse">';
            }
            list +=         '<div class="accordion-inner">';
            list +=             '<dl class="dl-horizontal">';
            list +=                 '<dt>ip:</dt>';
            list +=                 '<dd>'+follower.ip+'</dd>';
            list +=                 '<dt>email:</dt>';
            list +=                 '<dd>'+follower.email+'</dd>';
            list +=                 '<dt>id:</dt>';
            list +=                 '<dd>'+follower.id+'</dd>';
            list +=             '</dl>';
            list +=         '</div>';
            list +=     '</div>';
            list += '</div>';
        }
        $('#followers-list').html(list);
    }

    this.disconnect = function() { 
        console.log('ControlRemote:disconnect() : '+this.socket);
        this.socket.emit('byebye');
    }
}
