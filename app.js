var express = require('express');
var app = express();

app.use(express.static('public'));

var server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Permet de bloquer les caractère HTML
    fs = require('fs');

var clients = [];

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket, pseudo) {
	// Un nouveau client arrive on broadcast le pseudo
    socket.on('new_client', function(pseudo) {
        pseudo = ent.encode(pseudo);
        if( clients.indexOf(pseudo) !== -1 ) {
            // On a déjà un player de ce nom là...
            console.log("Pseudo already in use...");
            socket.emit('already_used');
            return false;
        }
        console.log('New client ' + pseudo);
        socket.pseudo = pseudo;
        clients.push(pseudo);
        socket.emit('client_list', clients);
        socket.broadcast.emit('client_list', clients);
		socket.broadcast.emit('new_client', pseudo);
		socket.emit('new_client', pseudo);
	});

    // Deconnexion :
    socket.on('disconnect', function() {
        console.log('disconnected : ' + socket.pseudo);
        console.log(clients);
        while(clients.indexOf(socket.pseudo) !== -1) {
            clients.splice(clients.indexOf(socket.pseudo), 1);
        }
        console.log(clients);
        socket.broadcast.emit('client_list', clients);
        socket.broadcast.emit('client_leave', socket.pseudo);
    });

	socket.on('message', function(message) {
        console.log('Got message from ' + socket.pseudo + ' : ' + message);
		message = ent.encode(message);
		socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
	});
});


server.listen(4433);
