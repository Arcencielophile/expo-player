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

var ControlManager = function (url, presentationId, remoteId, position, owner) {
	var socket = io.connect(url);
	
	var presentation = new ControledPresentation(presentationId);
	var remote = new ControlRemote(socket, remoteId, position, null);
	
	if(!owner) {
		remote.setOwner(new Owner());
	} else {
		remote.setOwner(owner);
	}
	
	remote.setPresentation(presentation);
	
	this.remote = remote;
}

ControlManager.prototype.next = function () {
	if(!this.remote) {
		console.log("No remote initialize");
		return false;
	}
	this.remote.next();
}

ControlManager.prototype.previous = function () {
	if(!this.remote) {
		console.log("No remote initialize");
		return false;
	}
	this.remote.previous();
}