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

var ControlManager = function (socket, presentationId, position, pagesNumber, owner) {
    this.presentation = new ControledPresentation(presentationId, pagesNumber);
    this.remote = new ControlRemote(socket, position, null);
    this.remote.owner = owner ? owner : new User();
    this.remote.setPresentation(this.presentation);

    this.init = function () {
        this.remote.init();
    }

    /* Actions */
    this.next = function () {
        if(!this.remote) {
            console.log('No remote initialize');

            return false;
        }
        this.remote.next();
    }

    this.previous = function () {
        if(!this.remote) {
            console.log('No remote initialize');

            return false;
        }
        this.remote.previous();
    }

    this.toggleInfo = function () {
        if(!this.remote) {
            console.log('No remote initialize');

            return false;
        }
        //{'showInfo': 0}
        var showInfo = this.remote.getStatusWithKey("showInfo");
        if(showInfo == 0) {
            showInfo = 1;
        } else {
            showInfo = 0;
        }
        this.remote.updateStatusWithKey("showInfo", showInfo);
    }
}
