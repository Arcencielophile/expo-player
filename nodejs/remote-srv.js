var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(2890);

var projects = new Array();

io.sockets.on('connection', function (socket) {
    console.log('connection');

    socket.on('new_remote', function (data) {
        console.log(data.project_id);

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
        socket.broadcast.emit('remote_list['+data.project_id+']', projects[data.project_id]);

    });

    socket.on('list_remote', function (data) {
        console.log('list_remote for project: '+data.project_id);
        socket.emit('remote_list['+data.project_id+']', projects[data.project_id]);
    });
});
