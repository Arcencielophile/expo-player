var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , expoServer = require('expo').createInstance()
  , log4js = require('log4js');

// set up logger
log4js.replaceConsole();

server.listen(2890);

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

    socket.on('update_user', function (data) {
        console.log('remote-srv:update_user('+data+')');
        console.log(data);
        var remote = expoServer.getRemoteByRoomName(data.roomName);
        remote.setOwner(data.user);
        expoSockets.in(remote.getProjectId()).emit('remote_list', expoServer.getRemotesForProject(remote.getProjectId()));
    });

    socket.on('new_follower', function (data) {
        console.log('remote-srv:new_follower('+data+')');
        console.log(data);
        socket.join(data.roomName);
        var follower = expoServer.createFollower(data.roomName, socket.id);
        expoSockets.in(data.roomName).emit('update_followers', expoServer.getFollowersForRoomName(data.roomName));
        
        var remote = expoServer.getRemoteByRoomName(data.roomName);
        if(remote != null) {
            socket.emit('goto', {position: remote.getPosition()});
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
        socket.get('roomName', function(err, roomName) {
            console.log('remote-srv:disconnect() get roomName('+roomName+')');
            if(roomName != null) {
                var remote = expoServer.getRemoteByRoomName(roomName);
                if(remote != undefined) {
                    expoServer.removeRemote(remote);
                    expoSockets.in(remote.getProjectId()).emit('remote_list', expoServer.getRemotesForProject(remote.getProjectId()));
                }
            }
        })
    });

/*
  // Ajouter fonction update_status
  socket.on('update_status', function (data) {
    console.log('remote-srv:update_status :');
    console.log(data);
        display.emit('updateStatus['+data.project_id+'#'+data.remote_id+']', data.status);
    });
*/
});