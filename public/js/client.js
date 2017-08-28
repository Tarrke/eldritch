var socket = io.connect('http://127.0.0.1:4433');
var pseudo = prompt("Quel est votre pseudo ?");
socket.emit('new_client', pseudo);
console.log('New client: ' + pseudo);
document.title = pseudo + ' - ' + document.title;

// Nouveau message
socket.on('message', function(data){
    insertMessage(data.pseudo, data.message)
})

// Nouveau client
socket.on('new_client', function(pseudo) {
    console.log("event new_client");
    newPlayer(pseudo);
    console.log("end event new_client");
});

// Deconnexion
socket.on('client_leave', function( pseudo ) {
    lostPlayer(pseudo);
});

socket.on('already_used', function() {
    console.log('pseudo already in use !');
    pseudo = prompt('Pseudo déjà utilisé');
    socket.emit('new_client', pseudo);
});

// Get clients list
socket.on('client_list', function( clients ) {
    console.log('Clients: ' + clients);
    if( document.getElementById('cList') !== null ) {
        document.getElementById('zone_clients').removeChild(document.getElementById('cList'));
    }
    var p = document.createElement("p");
    p.setAttribute("id", "cList");
    p.append(clients[0]);
    console.log("getting to for");
    cLen = clients.length;
    console.log(cLen);
    for( i = 1; i < cLen; ++i) {
        console.log("inside for");
        p.append(', ' + clients[i]);
    }
    document.getElementById('zone_clients').append(p);
});

// Envoie du formulaire
document.getElementById('form_client').onsubmit = function(event) {
    event.preventDefault();
    console.log('Call submit form');
    var message = document.getElementById('message').value;
    socket.emit('message', message);
    insertMessage(pseudo, message);
    document.getElementById('message').value = '' ;
    document.getElementById('message').focus();
    console.log('Return from submit form');
    return false; // Permet de bloquer l'envoi classique...
}


// Ajoute un message à la zone de texte :
function insertMessage(pseudo, message) {
    console.log('Call insertMessage');
    var p = document.createElement("p");
    var s = document.createElement("strong");
    s.append(pseudo);
    p.append(s);
    p.append(decodeHTML(message));
    document.getElementById('zone_chat').prepend(p);
    console.log('End insertMessage');
}

// Ajoute le message de nouveau venu :
function newPlayer(pseudo) {
    console.log('Call newPlayer');
    var p = document.createElement("p");
    var s = document.createElement("em");
    s.append(pseudo + ' a rejoint la discussion.');
    p.append(s);
    document.getElementById('zone_chat').prepend(p);
    console.log('End newPlayer');
}

// Ajoute le message de départ :
function lostPlayer(pseudo) {
    console.log('Call newPlayer');
    var p = document.createElement("p");
    var s = document.createElement("em");
    s.append(pseudo + ' a quitté la discussion.');
    p.append(s);
    document.getElementById('zone_chat').prepend(p);
    console.log('End newPlayer');
}

function decodeHTML(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
