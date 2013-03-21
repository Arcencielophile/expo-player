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

var Remote = require('./expo.ServerRemote');
var User = require('./expo.ServerUser');

var ServerManager = module.exports = function() {
    this.remotes = new Array();
    this.followers = new Array();
    
    this.getRemotesForProject = function (projectId) {
        console.log('ServerManager:getRemotesForProject('+projectId+')');

        return this.remotes[projectId];
    };

    this.getRemoteByRoomName = function (roomName) {
        console.log('ServerManager:getRemoteByRoomName('+roomName+')');
        var projectId = roomName.split('_')[0];
        var goodRemote = null;
        var i = 0;
        if(this.remotes[projectId] != undefined) {
            while(i < this.remotes[projectId].length && goodRemote == null) {
                var currentRemote = this.remotes[projectId][i];
                if(currentRemote.getRoomName() == roomName) {
                    goodRemote = currentRemote;
                }
                i++;
            }
        }
        
        return goodRemote;
    };

    this.createRemote = function(socketId, remoteData) {
        console.log('ServerManager:createRemote('+socketId+', '+remoteData+')');
        var user = new User(socketId, remoteData.owner.ip, remoteData.owner.email, remoteData.owner.name);
        var remote = new Remote(this.generateRemoteId(remoteData.projectId), remoteData.projectId, user);
        this.addRemote(remote);
    
        return remote;
    };
    
    this.addRemote = function(remote) {
        console.log('ServerManager:addRemote('+remote+')');
        if(this.remotes[remote.getProjectId()] == undefined) {
            this.remotes[remote.getProjectId()] = new Array();
        }
        this.remotes[remote.getProjectId()].push(remote);
    };

    this.removeRemote = function(remote) {
        console.log('ServerManager:removeRemote('+remote+')');
        if(this.remotes[remote.getProjectId()] != undefined) {
            this.remotes[remote.getProjectId()].splice(this.remotes[remote.getProjectId()].indexOf(remote), 1);
        }
        
        delete this.followers[remote.getRoomName()];
    };
    
    this.generateRemoteId = function(projectId) {
        console.log('ServerManager:generateRemoteId('+projectId+')');
        var remoteId = 1;
        if(this.remotes[projectId] != undefined && this.remotes[projectId].length > 0) {
          //Project already exist
            remoteId = this.remotes[projectId][this.remotes[projectId].length - 1].getId();
            remoteId++;
        }

        return remoteId;
    };

    this.createFollower = function(roomName, followerId, ip) {
        console.log('ServerManager:createFollower('+roomName+', '+followerId+', '+ip+')');
        var follower = new User(followerId, ip);
        this.addFollower(roomName, follower);
    
        return follower;
    };

    this.addFollower = function(roomName, follower) {
        console.log('ServerManager:addFollower('+roomName+', '+follower+')');
        if(this.followers[roomName] == undefined) {
            this.followers[roomName] = new Array();
        }
       this.followers[roomName].push(follower);
    };

    this.removeFollower = function(roomName, followerId) {
        console.log('ServerManager:removeFollower('+roomName+', '+followerId+')');
        if(this.followers[roomName] != undefined) {
            var follower = this.getFollowerForRoomNameById(roomName, followerId);
            var index = this.followers[roomName].indexOf(follower);
            this.followers[roomName].splice(index, 1);
        }
    };

    this.getFollowersForRoomName = function (roomName) {
        console.log('ServerManager:getFollowersForRoomName('+roomName+')');
        
        return this.followers[roomName];
    };

    this.getFollowerForRoomNameById = function (roomName, followerId) {
        console.log('ServerManager:getFollowersForRoomName('+roomName+')');
        
        var i = 0;
        if(this.followers[roomName] != undefined) {
             while(i < this.followers[roomName].length) {
                var follower = this.followers[roomName][i];
                if(follower.id == followerId) {
                    return follower;
                }
                i++;
            }
        }
        
        return null;
    };

    this.getRoomNamesForFollowerId = function (followerId) {
        console.log('ServerManager:getRoomNamesForFollowerId('+followerId+')');
        
        var roomNames = new Array();
        for(roomName in this.followers) {
            var i = 0;
            if(this.followers[roomName] != undefined) {
                while(i < this.followers[roomName].length) {
                    var follower = this.followers[roomName][i];
                    console.log('ServerManager:follower.id : '+follower.id);
                    if(follower.id == followerId) {
                        console.log('ServerManager:match !');
                        roomNames[roomNames.length] = roomName;
                    }
                    i++;
                }   
            }
        }
        
        return roomNames;
    }

    this.updateFollower = function (follower, followerData) {
        follower.email = followerData.email;
        follower.ip = followerData.ip;
        follower.name = followerData.name;
    }
};  
