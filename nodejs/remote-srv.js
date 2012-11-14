var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , expoServer = require('expo').createInstance();

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
        //Add remote to project
        var remote = expoServer.createRemote(data.project_id);
        socket.emit('set_remote_id', remote);
        //TODO create a room by presentation socket.join()
        socket.join(remote.getRoomName());
        expoSockets.in(remote.getProjectId()).emit('remote_list', expoServer.getRemotesForProject(remote.getProjectId()));
    });

    socket.on('goto', function (data) {
        console.log('remote-srv:goto('+data+')');
        console.log(data);
        expoSockets.in(data.roomName).emit('goto', {position: data.position});
    });

    socket.on('new_follower', function (data) {
        console.log('remote-srv:new_follower('+data+')');
        console.log(data);
        socket.join(data.roomName);
        //expo.Sockets.in(data.roomName).emit('update_followers', {});
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
