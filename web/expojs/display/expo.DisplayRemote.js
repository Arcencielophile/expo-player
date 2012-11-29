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

var DisplayRemote = function(presentation, remoteData) {
    this.socket = null;
    this.presentation = presentation;
    this.keep = true;

    this.id = remoteData.id;
    this.roomName = remoteData.roomName;
    this.projectId = remoteData.projectId;
    this.position = remoteData.position;
    this.owner = new User(remoteData.owner.ip, remoteData.owner.email, remoteData.owner.name);


    /* Getters */
    this.getId            = function() { return this.id; };
    this.getPresentation  = function() { return this.presentation; };
    this.getRoomName      = function() { return this.roomName; };
    this.getProjectId     = function() { return this.projectId; };
    this.getPosition      = function() { return this.position; };
    this.getOwner         = function() { return this.getOwner(); };
    this.isActive         = function() { return this.socket != null; };

    this.toKeep           = function(value) {
        if(value == null) {
            return this.keep;
        }else {
            this.keep = value;
        }
    };

    /* Proxies */
    this.getFollower      = function() { return this.getPresentation().getFollower(); };

    /* Listener */
    this.addRemoteListeners = function() {
        console.log('DisplayRemote:addRemoteListeners()');
        var remote = this;
        var id = remote.getRoomName();

        socket.on('next',          function(data) { remote.next(); });
        socket.on('previous',      function(data) { remote.previous(); });
        socket.on('goto',          function(data) { remote.goto(data.position); });
        socket.on('updateStatus',  function(data) { remote.updateStatus(data); });
    };

    this.removeRemoteListeners = function() {
        console.log('DisplayRemote:removeRemoteListeners()');

        socket.removeAllListeners('next');
        socket.removeAllListeners('previous');
        socket.removeAllListeners('goto');
        socket.removeAllListeners('updateStatus');
    };

    /* Actions */
    this.enabled = function(socket) {
        this.socket = socket;
        console.log('DisplayRemote:enabled()');
        this.addRemoteListeners();
        this.socket.emit('new_follower', {roomName: this.getRoomName(), follower: this.getFollower()});
    };
  
    this.disabled = function() {
        console.log('DisplayRemote:disabled()');
        if(this.isActive()) {
            this.removeRemoteListeners();
            this.socket.emit('remove_follower', {roomName: this.getRoomName()});
            this.socket = null;
        }
    };

    this.next = function() {
        console.log('DisplayRemote:next()');
        this.presentation.next();
    };

    this.previous = function() {
        console.log('DisplayRemote:previous()');
        this.presentation.previous();
    };

    this.goto = function(position) {
        console.log('DisplayRemote:goto('+position+')');
        this.position = position;
        this.presentation.goto(position);
    };

    this.updateStatus = function(status) {
        console.log('DisplayRemote:updateStatus('+status+')');
        this.status = status;
    };

    /* Other */
    this.update = function(remoteData) {
        this.owner = new User(remoteData.owner.ip, remoteData.owner.email, remoteData.owner.name);
    }
};
