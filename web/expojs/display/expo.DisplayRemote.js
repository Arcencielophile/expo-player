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

    this.toKeep = function(value) {
        if(value == null) {
            return this.keep;
        } else {
            this.keep = value;
        }
    };

    /* Proxies */
    this.getFollower = function() { 
        return this.getPresentation().getFollower();
    };

    /* Synchronization */
    this.synchronize = function(remoteData) {
        console.log('DisplayRemote:synchronize('+remoteData+')');
        // Update owner data
        this.owner = new User(remoteData.owner.ip, remoteData.owner.email, remoteData.owner.name);
    };

    /* Listener */
    this.addRemoteListeners = function() {
        console.log('DisplayRemote:addRemoteListeners()');
        var remote = this;
        var id = remote.getRoomName();

        socket.on('next', function(data) {
            remote.getPresentation().next();
        });

        socket.on('previous', function(data) {
            remote.getPresentation().previous(); 
        });

        socket.on('goto', function(data) { 
            remote.getPresentation().goto(data.position);
        });

        socket.on('update_option', function(data) {
            console.log('update_option');
            console.log(data);
            if(data.option == 'player-information') {
                remote.getPresentation().showPlayerInformation(data.show);
            } else if(data.option == 'project-information') {
                remote.getPresentation().showProjectInformation(data.show);
            } else if(data.option == 'share') {
                remote.getPresentation().showShareContent(data.show);
            } else if(data.option == 'pages') {
                remote.getPresentation().showPagesMenu(data.show);
            }
        });
    };

    this.removeRemoteListeners = function() {
        console.log('DisplayRemote:removeRemoteListeners()');
        socket.removeAllListeners('next');
        socket.removeAllListeners('previous');
        socket.removeAllListeners('goto');
        socket.removeAllListeners('update_show_player_information');
        socket.removeAllListeners('update_show_project_information');
        socket.removeAllListeners('update_show_share_content');
        socket.removeAllListeners('update_show_pages_menu');
    };

    /* Actions */
    this.enabled = function(socket) {
        console.log('DisplayRemote:enabled()');
        this.socket = socket;
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
};
