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

var ActiveDisplayRemote = function(socket, presentation, remote, position, status) {
  this.socket = socket;
  this.presentation = presentation;
  this.remote = remote;
  this.position = position;
  this.status = status;
  console.log('ActiveDisplayRemote:('+socket+','+presentation+','+remote+','+position+','+status+')');

  this.listenRemoteActions();
};

ActiveDisplayRemote.prototype.getIdentifier = function() {
  return this.getProjectId()+'#'+this.getRemoteId();
};

/* Listener */

ActiveDisplayRemote.prototype.listenRemoteActions = function() {
  activeRemote = this;
  console.log('ActiveDisplayRemote:listenRemoteAction('+activeRemote+')');
  id = activeRemote.getIdentifier();

  this.socket.on('next['+id+']', function(data) {
    activeRemote.next();
  });

  this.socket.on('previous['+id+']', function(data) {
    activeRemote.previous();
  });

  this.socket.on('goto['+id+']', function(data) {
    activeRemote.goto(data.position);
  });

  this.socket.on('updateStatus['+id+']', function(data) {
    activeRemote.updateStatus(data);
  });
};

/* Getters */

ActiveDisplayRemote.prototype.getRemote = function() {
  return this.remote;
};

ActiveDisplayRemote.prototype.getPosition = function() {
  return this.position;
};

ActiveDisplayRemote.prototype.getStatus = function() {
  return this.status;
};

ActiveDisplayRemote.prototype.getPresentation = function() {
  return this.presentation;
};

/* Proxy */

ActiveDisplayRemote.prototype.getProjectId = function() {
  return this.presentation.getProjectId();
};

ActiveDisplayRemote.prototype.getRemoteId = function() {
  return this.remote.getId();
};

ActiveDisplayRemote.prototype.getOwner = function() {
  return this.remote.getOwner();
};

/* Actions */

ActiveDisplayRemote.prototype.next = function() {
  console.log('ActiveDisplayRemote:next()');
};

ActiveDisplayRemote.prototype.previous = function() {
  console.log('ActiveDisplayRemote:previous()');
};

ActiveDisplayRemote.prototype.goto = function(position) {
  this.position = position;
  console.log('ActiveDisplayRemote:goto('+position+')');
};

ActiveDisplayRemote.prototype.updateStatus = function(status) {
  this.status = status;
  console.log('ActiveDisplayRemote:updateStatus('+status+')');
};
