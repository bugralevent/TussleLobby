module.exports = function(){

    this.name = "";
    this.id = "";
    this.room = null;
    this.socket = null;
    
    var _inGame = false;
    var _inRoom = false;

    this.inGame = function inGame(){
      return _inGame;
    };
    this.inRoom = function inRoom(){
      return _inRoom;
    };
    this.connectRoom = function connectRoom(room){
      this.room = room;
      _inRoom = true;
    };
    this.disconnectRoom = function disconnectRoom(){
      this.room = null;
      _inRoom = false;
    };
};
