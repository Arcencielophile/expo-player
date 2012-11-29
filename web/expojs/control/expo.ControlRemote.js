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

var ControlRemote = function (socket, position, status) {
    this.id = 0;
    this.roomName = null;
    this.position = position;
    
    if(!status) { this.status = {'showInfo': 0} } 
    else { this.status = status; }
    
    this.owner = null;
    this.presentation = null;
    this.followers = new Array();
    this.socket = socket;
    
    this.init = function() {
        console.log('ControlRemote:init()');
        this.eventListeners();
        this.remoteListeners();
    }
    
    /* Event Listeners */
    this.eventListeners = function() {
        var remote = this;
        $('a[href="#previous"]').click(function(event) {
            event.preventDefault();
            remote.previous();
        });
        $(document).bind('swiperight', function(event) {
            event.preventDefault();
            remote.previous();
        });

        $('a[href="#info"]').click(function(event) { manager.toggleInfo(); });

        $('a[href="#next"]').click(function(event) {
            event.preventDefault();
            remote.next();
        });
        $(document).bind('swipeleft', function(event) {
            event.preventDefault();
            remote.next();
        });
    }
    
    this.remoteListeners = function() {
        console.log('ControlRemote:remoteListeners()');
        remote = this;

        this.socket.on('set_remote_id', function (data) {
            console.log('set_remote_id ('+data+')');
            console.log(data);
            remote.setId(data.id);
            remote.setRoomName(data.roomName);
            $('a[href="#name"] .ui-btn-text').empty().append('#'+remote.getId());
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
    this.getUserName        = function() { return this.userName; }

    /* Setters */
    this.setId              = function(id) { this.id = id; }
    this.setRoomName        = function(roomName) { this.roomName = roomName; }
    this.setPosition        = function(position) { this.position = position; }
    this.setStatus          = function(status) { this.status = status; }
    this.setOwner           = function(owner) { this.owner = owner; }
    this.setPresentation    = function(presentation) { this.presentation = presentation; }
    this.setFollowers       = function(followers) { this.followers = followers; }
    this.setUserName        = function(userName) { this.userName = userName; }

    // Methodes
    this.next = function() {
        this.goto(this.position + 1);
    }

    this.previous = function() {
        this.goto(this.position - 1);
    }

    this.goto = function(position) {
        if(this.getRoomName() != null) {
            if(position < 1) position = 1;
            if(position > this.presentation.getPagesNumber()) position = this.presentation.getPagesNumber();
            
            this.position = position;
            console.log('ControlRemote:goto position: '+this.position+' for roomName: '+this.getRoomName());
            this.socket.emit('goto', {roomName:this.getRoomName(), position: this.position});
            
            $('#current_page').html(this.position);
        }else {
            console.log('Missing id');
        }
    }

    this.changeUserName = function(userName) {
        if(this.getRoomName() != null) {
            this.setUserName(userName);
            this.socket.emit('change_user_name', {roomName:this.getRoomName(), userName: this.getUserName()});
        }
    }
    
    /*
    this.updateStatus = function(status) {  
        console.log('ControlRemote:updateStatus('+status+')');
        console.log(status);
        this.status = status;
        if(this.getId() != -1) {
            this.socket.emit('update_status', {project_id: this.presentation.getId(), remote_id: this.getId(), status: this.status});
        }
    }
    */
    
    this.updateStatusWithKey = function(key, value) {
        this.status[key] = value;
        this.updateStatus(this.status);
    }
    
    this.updateFollowers = function(followers) {
        this.followers = followers;
        console.log('ControlRemote:updateFollowers('+this.followers+')');
        console.log(this.followers);
        $('a[href="#followers"] .ui-btn-text').empty().append(this.followers.length);
    }
}
