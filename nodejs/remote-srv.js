var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(2890);

var projects = new Array();

io.sockets.on('connection', function (socket) {
    console.log('remote-srv:connection');

    socket.on('new_remote', function (data) {
        console.log('remote-srv:new_remote for project: '+data.project_id);

        var remote_id;
        if(projects[data.project_id] == undefined) {
            //New project
            remote_id = 1;
            projects[data.project_id] = new Array();
            projects[data.project_id].push(remote_id);
        } else {
            //Project already exist
            remote_id = projects[data.project_id][0]++;
            projects[data.project_id].push(remote_id);
        }

        //Add remote to project
        console.log(projects);

		socket.emit('set_remote_id', {remote_id: remote_id});
        socket.broadcast.emit('remote_list['+data.project_id+']', projects[data.project_id]);
    });

    socket.on('list_remote', function (data) {
        console.log('remote-srv:list_remote for project: '+data.project_id);
        socket.emit('remote_list['+data.project_id+']', projects[data.project_id]);
    });

    socket.on('goto', function (data) {
		console.log('remote-srv:goto position: '+data.position+' for project: '+data.project_id)+' for remote: '+data.remote_id;
        socket.broadcast.emit('goto['+data.project_id+'#'+data.remote_id+']', {position: data.position});
    });
});