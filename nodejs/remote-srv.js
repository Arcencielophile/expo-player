var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , expoServer = require('expo').createInstance()
  , log4js = require('log4js');

// set up logger
log4js.replaceConsole();

server.listen(2890);

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
        console.log("DEBUG");
        console.log(remote);
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

    socket.on('update_show_info', function (data) {
        console.log('remote-srv:update_show_info('+data+')');
        console.log(data);
        var remote = expoServer.getRemoteByRoomName(data.roomName);
        remote.setShowInfo(data.showInfo);
        expoSockets.in(remote.getRoomName()).emit('update_show_info', {showInfo: remote.isShowInfo()});
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
            socket.emit('update_show_info', {showInfo: remote.isShowInfo()});
        }
    });

    socket.on('remove_follower', function (data) {
        console.log('remote-srv:remove_follower('+data+')');
        console.log(data);
        socket.leave(data.roomName);
        var follower = expoServer.removeFollower(data.roomName, socket.id);
        expoSockets.in(data.roomName).emit('update_followers', expoServer.getFollowersForRoomName(data.roomName));
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
