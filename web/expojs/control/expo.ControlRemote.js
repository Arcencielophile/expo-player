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

    this.showInfo = false;

    this.init = function() {
        console.log('ControlRemote:init()');
        this.remoteListeners();
    }

    /* Event Listeners */
    this.remoteListeners = function() {
        console.log('ControlRemote:remoteListeners()');
        remote = this;

        this.socket.on('set_remote_id', function (data) {
            console.log('set_remote_id ('+data+')');
            console.log(data);
            remote.setId(data.id);
            remote.connected = true;
            remote.setRoomName(data.roomName);
            remote.updateUserNameLabel();

            $.mobile.changePage('#home');
        });
        
        this.socket.on('update_followers', function (data) {
            remote.updateFollowers(data);
        });

        this.socket.emit('new_remote', {projectId: this.getPresentation().getId(), owner: this.getOwner()});
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
    this.isShowInfo         = function() { return this.showInfo; }
    this.isConnected        = function() { return this.connected; }

    /* Setters */
    this.setId              = function(id) { this.id = id; }
    this.setRoomName        = function(roomName) { this.roomName = roomName; }
    this.setPosition        = function(position) { this.position = position; }
    this.setStatus          = function(status) { this.status = status; }
    this.setOwner           = function(owner) { this.owner = owner; }
    this.setPresentation    = function(presentation) { this.presentation = presentation; }
    this.setFollowers       = function(followers) { this.followers = followers; }
    this.setShowInfo        = function(showInfo) { this.showInfo = showInfo; }

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

                $('#current_page').html(this.position);
            }
        } else {
            console.log('Missing id');
        }
    }
    
    this.toggleInfo = function() {
        if(this.isConnected()) {
            console.log('ControlRemote:toggleInfo');
            this.setShowInfo(!this.isShowInfo());
            this.socket.emit('update_show_project_information', {roomName:this.getRoomName(), show:this.isShowInfo()});
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
        if($('#username')) {
            $('#username').attr('value', remote.getOwner().getName());
            $('#username').attr('placeholder', '#'+remote.getId());
        }
        if($('a[href="#user"] .ui-btn-text')) {
            $('a[href="#user"] .ui-btn-text').empty().append(manager.remote.getOwner().getName()+'#'+manager.remote.getId());
        }
    }

    this.updateFollowers = function(followers) {
        this.followers = followers;
        console.log('ControlRemote:updateFollowers('+this.followers+')');
        console.log(this.followers);
        $('a[href="#followers"] .ui-btn-text').empty().append(this.followers.length);
        
        $('#followersList').empty();
        var list = '';
        for(i=0; i < this.followers.length; i++) {
            var follower = this.followers[i];
            list += '<li><h3 class="ui-li-heading">'+follower.name+'</h3><p class="ui-li-desc">'+follower.ip+'</p></li>';
        }
        $('#followersList').html(list);
    }

    this.disconnect = function() {
        console.log('ControlRemote:disconnect()');
        this.socket.emit('byebye');
    }
}
