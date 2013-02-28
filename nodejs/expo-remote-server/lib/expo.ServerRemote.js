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

var ServerRemote = module.exports = function (id, projectId, user) {
    this.id = id;
    this.projectId = projectId;
    this.roomName = this.projectId + '_' + this.id;
    this.position = 1;
    this.owner = user;
    this.showProjectInformation = false;
    this.showPlayerInformation = false;
    this.showShareContent = false;
    this.showPagesMenu = false;
    
    /* Getters */
    this.getId                     = function() { return this.id; };
    this.getProjectId              = function() { return this.projectId; };
    this.getRoomName               = function() { return this.roomName; };
    this.getPosition               = function() { return this.position; };
    this.getOwner                  = function() { return this.owner; };
    this.isShowProjectInformation  = function() { return this.showProjectInformation; };
    this.isShowPlayerInformation   = function() { return this.showPlayerInformation; };
    this.isShowShareContent        = function() { return this.showShareContent; };
    this.isShowPagesMenu           = function() { return this.showPagesMenu; };
    
    /* Setters */
    this.setPosition               = function(position) { this.position = position; };
    this.setOwner                  = function(owner) { this.owner = owner; };
    this.setShowProjectInformation = function(showProjectInformation) { this.showProjectInformation = showProjectInformation; };
    this.setShowPlayerInformation  = function(showPlayerInformation) { this.showPlayerInformation = showPlayerInformation; };
    this.setShowShareContent       = function(showShareContent) { this.showShareContent = showShareContent; };
    this.setShowPagesMenu          = function(showPagesMenu) { this.showPagesMenu = showPagesMenu; };
};