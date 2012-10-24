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

var DisplayPresentation = function(socket, projectId) {
  this.socket = socket;
  this.projectId = projectId;
  this.remotes = new Array();
  this.follower = null;

  this.listenRemoteList();
  this.socket.emit('list_remote', { project_id: this.projectId });
};

/* Listener */

DisplayPresentation.prototype.listenRemoteList = function() {
  presentation = this;
  console.log('DisplayPresentation:listenRemoteList('+presentation+')');
  id = presentation.getProjectId();

  this.socket.on('remote_list['+id+']', function(remotes) {
    presentation.updateRemotes(remotes);
  });
}

/* Getters */

DisplayPresentation.prototype.getProjectId = function() {
  return this.projectId;
}

DisplayPresentation.prototype.getRemotes = function() {
  return this.remotes;
}

/* Setters */

DisplayPresentation.prototype.setFollower = function(follower) {
  this.follower = follower;
}

/* Actions */

DisplayPresentation.prototype.updateRemotes = function(remotes) {
  this.remotes = remotes;
  console.log('DisplayPresentation:updateRemotes('+remotes+')');
}

DisplayPresentation.prototype.next = function() {
  console.log('DisplayPresentation:next()');
}

DisplayPresentation.prototype.previous = function() {
  console.log('DisplayPresentation:previous()');
}

DisplayPresentation.prototype.goto = function(position) {
  console.log('DisplayPresentation:goto('+position+')');
}

DisplayPresentation.prototype.showInfo = function(show) {
  console.log('DisplayPresentation:showInfo('+show+')');
}
