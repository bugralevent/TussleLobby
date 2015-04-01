var http= require('http');
var Q = require('q');
var io = require('socket.io');
var port = 7330;
var player = require('./player.js');
var lobby = require('./roomManager.js');
var md5 = require('./md5.js');
var md5Class = new md5();
var server = http.createServer(function(req, res){
	res.writeHead(200,{'Content-Type': 'text/html'});
	res.end('');
});
server.listen(7330);
var socket = io.listen(server,{ log: false });
var manager = new lobby();
socket.on('connection', function(client){
		client.on('login', function(data){
			var _player = new player();
			_player.id = randomID();
			_player.name = data.name;
			_player.socket = client;
			manager.create('test', 0, _player);
			manager.connect(_player);
		});
});

function randomID(){
	return md5Class.hash((new Date().toString() + new Date().getMilliseconds() + Math.random()).toString());
}
