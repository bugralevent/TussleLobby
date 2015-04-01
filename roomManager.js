var room = require('./room.js');
var md5 = require('./md5.js');
var c = require('./cycle.js');
var md5Class = new md5();
var events = require('events');
var util = require('util');
module.exports = function(){

  this.eventEmitter = new events.EventEmitter();
  this.rooms = [];
  this.roomLimit = 64;
  this.players = [];
  this.playerLimit = 256;

  var index = 0;
  var playerIndex = 0;
  this.connect = function connect(player){
    if(this.playerLimit > (playerIndex + 1)){
      this.players[playerIndex] = player;
      playerIndex++;
      player.socket.emit('update-rooms',JSON.stringify(JSON.decycle(this.rooms)));
      return true;
    }
    return false;
  };
  this.disconnect = function disconnect(player){
    if(playerIndex !== 0){
      var index = findByID(this.players, player.id);
      if(removePlayer(index)){
        this.disconnectPlayer(player);
        playerIndex--;
        return true;
      }
      return false;
    }
    return false;
  };
  this.create = function create(name,mapID,owner){
    if(this.roomLimit > (index + 1)){
      var _room = new room();
      _room.id = randomID();
      _room.name = name;
      _room.mapID = mapID;
      _room.owner = owner;
      _room.connect(owner, true);
      this.rooms[index] = _room;
      index++;
      this.eventEmitter.emit('UpdatePlayers');
      return room;
    }
    return false;
  };
  this.connectToRoomByID = function connectToRoomByID(roomID, player){
    var index = findByID(this.rooms, roomID);
    return this.rooms[index].connect(player,false);
  };
  this.connectToRoomByName = function connectToRoomByName(roomName, player){
    var index = findByName(this.rooms, roomName);
    return this.rooms[index].connect(player,false);
  };
  this.disconnectPlayer = function disconnectPlayer(player){
    for(var i = 0; i < this.rooms.length; i++){
        if(find(this.rooms[i].players,player.id) !== null){
          this.rooms[i].disconnect(player);
          if(this.rooms[i].playersCount() === 0){
            if(removeRoom(i) === true)
            {
              this.eventEmitter.emit('UpdatePlayers');
            }
          }
          return true;
        }
    }
    return false;
  };
  this.playersNotInRoomOrGame = function playersNotInRoomOrGame(){
    var _players = [];
    var index = 0;
    for(var i = 0; i < this.players.length; i++){
      if(this.players[i].inGame() === false && this.players[i].inRoom() === false){
        _players[index] = this.players[i];
        index++;
      }
    }
    return _players;
  };
  this.removeRoomByID = function removeRoomByID(id){
    var index = findByID(this.rooms, id);
    var result = removeRoom(index);
    if(result === true){
      this.eventEmitter.emit('UpdatePlayers');
      return true;
    }
    return false;
  };
  this.removeRoomByName = function removeRoomByName(name){
    var index = findByName(this.rooms,name);
    var result = removeRoom(index);
    if(result === true){
      this.eventEmitter.emit('UpdatePlayers');
      return true;
    }
    return false;
  };
  function removePlayer(index){
    if(this.players.splice(index, 1).length > 0){
      return true;
    }
    return false;
  }
  function removeRoom(index){
    if(this.rooms.splice(index, 1).length > 0){
      return true;
    }
    return false;
  }
  function randomID(){
    return md5Class.hash((new Date().toString() + new Date().getMilliseconds() + Math.random()).toString());
  }
  function findByName(searchIn,searchName){
    for(var i = 0; i < searchIn.length;i++){
      if(searchIn[i].name == searchName){
        return i;
      }
    }
    return null;
  }
  function findByID(searchIn,searchID){
    for(var i = 0; i < searchIn.length; i++){
      if(searchIn[i].id == searchID){
        return i;
      }
    }
    return null;
  }



};
