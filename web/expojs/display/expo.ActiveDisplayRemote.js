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

  this.init = function() {
    console.log('ActiveDisplayRemote:init()');
    this.listenRemoteActions();
  };

  /* Getters */
  this.getIdentifier    = function() { return this.getProjectId()+'#'+this.getRemoteId(); };
  this.getRemote        = function() { return this.remote; };
  this.getPosition      = function() { return this.position; };
  this.getStatus        = function() { return this.status; };
  this.getPresentation  = function() { return this.presentation; };

  /* Proxy */
  this.getProjectId = function() { return this.presentation.getProjectId(); };
  this.getRemoteId  = function() { return this.remote.getId(); };
  this.getOwner     = function() { return this.remote.getOwner(); };

  /* Listener */
  this.listenRemoteActions = function() {
    console.log('ActiveDisplayRemote:listenRemoteAction()');
    var activeRemote = this;
    var id = activeRemote.getIdentifier();

    this.socket.on('next['+id+']',          function(data) { activeRemote.next(); });
    this.socket.on('previous['+id+']',      function(data) { activeRemote.previous(); });
    this.socket.on('goto['+id+']',          function(data) { activeRemote.goto(data.position); });
    this.socket.on('updateStatus['+id+']',  function(data) { activeRemote.updateStatus(data); });
  };

  /* Actions */
  this.next = function() {
    console.log('ActiveDisplayRemote:next()');
  };

  this.previous = function() {
    console.log('ActiveDisplayRemote:previous()');
  };

  this.goto = function(position) {
    console.log('ActiveDisplayRemote:goto('+position+')');
    this.position = position;
  };

  this.updateStatus = function(status) {
    console.log('ActiveDisplayRemote:updateStatus('+status+')');
    this.status = status;
  };
};
