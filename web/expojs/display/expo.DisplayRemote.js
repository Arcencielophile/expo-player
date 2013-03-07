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
    this.active = false;
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
    this.getOwner         = function() { return this.getOwner; };
    this.isActive         = function() { return this.active; };

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

        socket.on('next', this.nextFromServer);
        socket.on('previous', this.previousFromServer);
        socket.on('goto', this.gotoFromServer);
        socket.on('update_show_player_information', this.showPlayerInformationFromServer);
        socket.on('update_show_project_information', this.showProjectInformationFromServer);
        socket.on('update_show_share_content', this.showShareContentFromServer);
        socket.on('update_show_pages_menu', this.showPagesMenuFromServer);
    };

    this.nextFromServer = function (data) {
        remote.getPresentation().next();
    }
    this.previousFromServer = function (data) {
        remote.getPresentation().previous();
    }
    this.gotoFromServer = function(data) {
        remote.getPresentation().goto(data.position);
    }
    this.showPlayerInformationFromServer = function(data) {
        remote.getPresentation().showPlayerInformation(data.show);
    }
    this.showProjectInformationFromServer = function(data) {
        remote.getPresentation().showProjectInformation(data.show);
    }
    this.showShareContentFromServer = function(data) {
        remote.getPresentation().showShareContent(data.show);
    }
    this.showPagesMenuFromServer = function(data) {
        remote.getPresentation().showPagesMenu(data.show);
    }

    this.removeRemoteListeners = function() {
        console.log('DisplayRemote:removeRemoteListeners()');

        socket.removeListener('next', this.nextFromServer);
        socket.removeListener('previous', this.previousFromServer);
        socket.removeListener('goto', this.gotoFromServer);
        socket.removeListener('update_show_player_information', this.showPlayerInformationFromServer);
        socket.removeListener('update_show_project_information', this.showProjectInformationFromServer);
        socket.removeListener('update_show_share_content', this.showShareContentFromServer);
        socket.removeListener('update_show_pages_menu', this.showPagesMenuFromServer);
    };

    /* Actions */
    this.enabled = function(socket) {
        console.log('DisplayRemote:enabled()');
        this.socket = socket;
        this.addRemoteListeners();
        this.socket.emit('new_follower', {roomName: this.getRoomName(), follower: this.getFollower()});
        this.active = true;
    };

    this.disabled = function() {
        console.log('DisplayRemote:disabled()');
        if(this.isActive()) {
            this.removeRemoteListeners();
            this.socket.emit('remove_follower', {roomName: this.getRoomName()});
            this.active = false;
        }
    };
};
