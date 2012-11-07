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

var ServerManager = module.exports = function() {
	this.remotes = new Array();
	this.followers = new Array();
	
	this.getRemotesForProject = function (projectId) {
		console.log('ServerManager:getRemotesForProject('+projectId+')');
		
		return this.remotes[projectId];
	};

	this.createRemote = function(projectId) {
		console.log('ServerManager:createRemote('+projectId+')');
		var remote = new Remote(this.generateRemoteId(projectId), projectId);
	    this.addRemote(remote);
	
		return remote;
	};
	
	this.addRemote = function(remote) {
		console.log('ServerManager:addRemote('+remote+')');
		console.log(remote);
		if(this.remotes[remote.getProjectId()] == undefined) {
			this.remotes[remote.getProjectId()] = new Array();
		}
		this.remotes[remote.getProjectId()].push(remote);
	};
	
	this.generateRemoteId = function(projectId) {
		console.log('ServerManager:generateRemoteId('+projectId+')');
		var remoteId = 1;
		if(this.remotes[projectId] != undefined) {
	        //Project already exist
	        remoteId = this.remotes[projectId][this.remotes[projectId].length - 1].getId();
			remoteId++;
	    }
	
		return remoteId;
	};
};	