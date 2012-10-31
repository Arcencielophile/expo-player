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
	this.id = -1;
	this.position = position;
	
	if(!status) { this.status = {'showInfo': 0} } 
	else { this.status = status; }
	
	this.owner = null;
	this.presentation = null;
	this.socket = socket;
	
	this.init = function() {
		console.log('ControlRemote:init()');
		this.remoteListeners();
	}
	
	this.remoteListeners = function() {
		console.log('ControlRemote:remoteListeners()');
		remote = this;

		this.socket.on('set_remote_id', function (data) {
			console.log('set_remote_id for remote_id: '+data.remote_id);
	    	remote.id = data.remote_id;
			//When we received a remote_id we finish initialize
			this.socket.on('update_followers['+remote.presentation.getId()+'_'+remote.getId()+']', function (data) {
		    	remote.updateFollowers(data);
			});
		});
		
		this.socket.emit('new_remote', {project_id: remote.presentation.getId()});
	}
	
	  /* Getters */
	this.getId 				= function() { return this.id; }
	this.getPosition 		= function() { return this.position; }
	this.getStatus 			= function() { return this.status; }
	this.getOwner 			= function() { return this.owner; }
	this.getPresentation 	= function() { return this.presentation; }

	/* Setters */
	this.setPosition 		= function(position) { this.position = position; }
	this.setStatus 			= function(status) { this.status = status; }
	this.setOwner 			= function(owner) { this.owner = owner; }
	this.setPresentation 	= function(presentation) { this.presentation = presentation; }

	// Methodes
	this.next = function(){
		this.goto(this.position + 1);
	}

	this.previous = function(){
		this.goto(this.position - 1);
	}

	this.goto = function(position){
		if(this.getId() > -1) {
			if(position < 1) position = 1;
			if(position > this.presentation.getPagesNumber()) position = this.presentation.getPagesNumber();
			
			this.position = position;
			console.log('ControlRemote:goto position: '+this.position+' for project: '+this.presentation.getId())+' for remote: '+this.getId();
			this.socket.emit('goto', {project_id: this.presentation.getId(), remote_id: this.getId(), position: this.position});
		}else {
			console.log('Missing id');
		}
	}

	this.updateFollowers = function(followers){
		console.log('ControlRemote:updateFollowers('+followers+')');
	}

	this.updateStatus = function(status){
		console.log('ControlRemote:updateStatus('+status+')');
		if(this.getId() > -1) {
			this.socket.emit('updateStatus['+this.presentation.getId()+'_'+this.getId()+']', status);
		}
	}
}
