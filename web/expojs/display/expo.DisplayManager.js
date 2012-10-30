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

var DisplayManager = function(socket, projectId, player, follower) {
  this.presentation = new DisplayPresentation(socket, projectId, player);
  this.activeRemote = null;

  if(!follower) {
    this.presentation.setFollower(new Follower());
  } else {
    this.presentation.setFollower(follower);
  }

  this.setActiveRemote = function(remote) {
    console.log('DisplayManager:setActiveRemote('+remote+')');
    //TODO Ask Server to retrieve remote info (position, state)
    var position = 0;
    var status = {'showInfo': 0};

    this.activeRemote = new ActiveDisplayRemote(this.socket, this.presentation, remote, position, status);
    this.activeRemote.init();
  };

  this.stopActiveRemote = function() {
    console.log('DisplayManager:stopActiveRemote()');
    this.activeRemote = null;
  };

  this.presentation.init();
};



