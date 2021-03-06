var io = require('socket.io').listen(2890)
  , expoServer = require('expo').createInstance()
  , log4js = require('log4js');

// set up logger
log4js.replaceConsole();

io.set('transports', [
//    'websocket'
    'xhr-polling'
  , 'flashsocket'
  , 'htmlfile'
  , 'jsonp-polling'
]);

var expoSockets = io.of('/expo').on('connection', function (socket) {
    console.log('remote-srv: expo connection');

    // Call from a new display
    socket.on('list_remote', function (data) {
        console.log('remote-srv:list_remote for project: '+data.project_id);
        socket.join(data.project_id);
        socket.emit('remote_list', expoServer.getRemotesForProject(data.project_id));
    });

    socket.on('new_remote', function (data) {
        console.log('remote-srv:new_remote('+data+')');
        //Add remote to project
        var remote = expoServer.createRemote(socket.id, data);
        socket.set('roomName', remote.getRoomName(), function () {
            socket.emit('set_remote_id', remote);
            socket.join(remote.getRoomName());
            expoSockets.in(remote.getProjectId()).emit('remote_list', expoServer.getRemotesForProject(remote.getProjectId()));
        });
    });

    socket.on('goto', function (data) {
        console.log('remote-srv:goto('+data+')');
        console.log(data);
        var remote = expoServer.getRemoteByRoomName(data.roomName);
        remote.setPosition(data.position);
        expoSockets.in(remote.getRoomName()).emit('goto', {position: remote.getPosition()});
    });

    socket.on('update_show_project_information', function (data) {
        console.log('remote-srv:update_show_project_information('+data+')');
        console.log(data);
        var remote = expoServer.getRemoteByRoomName(data.roomName);
        remote.setShowProjectInformation(data.show);
        expoSockets.in(remote.getRoomName()).emit('update_show_project_information', {show: remote.isShowProjectInformation()});
    });

    socket.on('update_show_player_information', function (data) {
        console.log('remote-srv:update_show_player_information('+data+')');
        console.log(data);
        var remote = expoServer.getRemoteByRoomName(data.roomName);
        remote.setShowPlayerInformation(data.show);
        expoSockets.in(remote.getRoomName()).emit('update_show_player_information', {show: remote.isShowPlayerInformation()});
    });

    socket.on('update_show_share_content', function (data) {
        console.log('remote-srv:update_show_share_content('+data+')');
        console.log(data);
        var remote = expoServer.getRemoteByRoomName(data.roomName);
        remote.setShowShareContent(data.show);
        expoSockets.in(remote.getRoomName()).emit('update_show_share_content', {show: remote.isShowShareContent()});
    });

    socket.on('update_show_pages_menu', function (data) {
        console.log('remote-srv:update_show_pages_menu('+data+')');
        console.log(data);
        var remote = expoServer.getRemoteByRoomName(data.roomName);
        remote.setShowPagesMenu(data.show);
        expoSockets.in(remote.getRoomName()).emit('update_show_pages_menu', {show: remote.isShowPagesMenu()});
    });

    socket.on('update_owner', function (data) {
        console.log('remote-srv:update_owner('+data+')');
        console.log(data);
        var remote = expoServer.getRemoteByRoomName(data.roomName);
        remote.setOwner(data.user);
        expoSockets.in(remote.getProjectId()).emit('remote_list', expoServer.getRemotesForProject(remote.getProjectId()));
    });

    socket.on('update_follower', function (data) {
        console.log('remote-srv:update_follower('+data+')');
        console.log(data);
        var remotes = expoServer.getRemotesForProject(data.project_id);
        var i = 0;
        if(remotes) {
            while(i < remotes.length) {
                var remote = remotes[i];
                console.log(remote);
                var follower = expoServer.getFollowerForRoomNameById(remote.roomName, socket.id);
                if(follower) {
                    console.log(follower);
                    expoServer.updateFollower(follower, data.user);
                    follower.ip = socket.handshake.address.address;
                    console.log('send to '+remote.roomName);
                    expoSockets.in(remote.roomName).emit('update_followers', expoServer.getFollowersForRoomName(remote.roomName));
                }
                i++
            }
        }
    });

    socket.on('new_follower', function (data) {
        console.log('remote-srv:new_follower('+data+')');
        console.log(data);
        socket.join(data.roomName);
        var follower = expoServer.createFollower(data.roomName, socket.id, socket.handshake.address.address);
        data.follower.ip = socket.handshake.address.address;
        expoServer.updateFollower(follower, data.follower);
        expoSockets.in(data.roomName).emit('update_followers', expoServer.getFollowersForRoomName(data.roomName));
        
        var remote = expoServer.getRemoteByRoomName(data.roomName);
        if(remote != null) {
            socket.emit('goto', {position: remote.getPosition()});
            socket.emit('update_show_project_information', {show: remote.isShowProjectInformation()});
            socket.emit('update_show_player_information', {show: remote.isShowPlayerInformation()});
            socket.emit('update_show_share_content', {show: remote.isShowShareContent()});
            socket.emit('update_show_pages_menu', {show: remote.isShowPagesMenu()});
        }
    });

    socket.on('remove_follower', function (data) {
        console.log('remote-srv:remove_follower('+data+')');
        console.log(data);
        socket.leave(data.roomName);
        var follower = expoServer.removeFollower(data.roomName, socket.id);
        expoSockets.in(data.roomName).emit('update_followers', expoServer.getFollowersForRoomName(data.roomName));
    });

    socket.on('byebye', function () {
        console.log('remote-srv:byebye()');
        socket.disconnect();
    });

    socket.on('disconnect', function () {
        console.log('remote-srv:disconnect()');
        //If was a remote
        socket.get('roomName', function(err, roomName) {
            console.log('remote-srv:disconnect() get roomName('+roomName+')');
            if(roomName != null) {
                var remote = expoServer.getRemoteByRoomName(roomName);
                if(remote != undefined) {
                    expoServer.removeRemote(remote);
                    expoSockets.in(remote.getProjectId()).emit('remote_list', expoServer.getRemotesForProject(remote.getProjectId()));
                }
            }
        });
        //If was a display
        var roomNames = expoServer.getRoomNamesForFollowerId(socket.id);
        var i = 0;
        while(i < roomNames.length) {
            currentRoomName = roomNames[i];
            var follower = expoServer.removeFollower(currentRoomName, socket.id);
            expoSockets.in(currentRoomName).emit('update_followers', expoServer.getFollowersForRoomName(currentRoomName));
            i++;
        }
    });
});
