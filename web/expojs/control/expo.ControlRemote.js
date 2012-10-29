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

var ControlRemote = function (socket, remoteId, position, status) {
	this.id = remoteId;
	this.position = position;
	
	if(!status) {
		this.initStatus();
	} else {
		this.status = status;
	}
	
	this.owner = null;
	this.presentation = null;
	
	this.socket = socket;
}

// Getters
ControlRemote.prototype.getId = function(){
	return this.id;
}

ControlRemote.prototype.getPosition = function(){
	return this.position;
}

ControlRemote.prototype.getStatus = function(){
	return this.status;
}

ControlRemote.prototype.getOwner = function(){
	return this.owner;
}

ControlRemote.prototype.getPresentation = function(){
	return this.presentation;
}

// Setters
ControlRemote.prototype.setPosition = function(position){
	this.position = position;
}

ControlRemote.prototype.setStatus = function(status){
	this.status = status;
}

ControlRemote.prototype.setOwner = function(owner){
	this.owner = owner;
}

ControlRemote.prototype.setPresentation = function(presentation){
	this.presentation = presentation;
}

// Methodes
ControlRemote.prototype.next = function(){
	this.goto(this.position + 1);
}

ControlRemote.prototype.previous = function(){
	if(this.position > 0) {
		this.goto(this.position - 1);
	}
}

ControlRemote.prototype.goto = function(position){
	if(position >= 0)  {
		this.position = position;
		console.log("ControlRemote:goto("+this.position+")");
		socket.emit("goto_"+this.presentation.id, {position: this.position});
	}
}

ControlRemote.prototype.updateFollowers = function(followers){
	console.log("ControlRemote:updateFollowers("+followers+")");
}

ControlRemote.prototype.updateStatus = function(status){
	console.log("ControlRemote:updateStatus("+status+")");
}

ControlRemote.prototype.initStatus = function(){
	this.status = {"showInfo": 0};
}