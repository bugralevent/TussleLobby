module.exports = function(){

  this.players = [];
  this.connectionLimit = 4;
  this.mapID = 0;
  this.name = "";
  this.id = "";
  this.isStarted = false;
  this.owner =  null;

  var connectionCount = 0;

  this.playersCount = function playersCount(){
    return connectionCount;
  };
  this.isAvaiable = function isAvaiable(){
    if(this.playersCount() !== this.connectionLimit && this.isStarted === false)
      return true;
    else
      return false;
  };
  this.connect = function connect(player, owner){
    if(this.isAvaiable()){
      this.players[connectionCount] = player;
      connectionCount += 1;
      this.owner = ( owner !== false) ? player:null;
      return true;
    }else
      return false;
  };
  this.disconnect = function disconnect(player){
    if(connectionCount > 0){
      var index = findByID(this.players,player.id);
      if(index === null)
        return false;
      this.players.splice(index, 1);
      connectionCount -= 1;
      if(this.owner.id === player.id && connectionCount > 0)
        this.owner = this.players[0];
      player.disconnectRoom();
      return true;
    }else
      return false;
  };
  this.isReady = function isReady(){
    if(connectionCount === this.connectionLimit && this.owner !== null)
      return true;
    else
      return false;
  };

  function findByID(searchIn,searchID){
    for(var i = 0; i < searchIn.length; i++){
      if(searchIn[i].id === searchID){
        return i;
      }
    }
    return null;
  }
  function findByName(searchIn, searchName){
    for(var i = 0; i < searchIn.length; i++){
      if(searchIn[i].name === searchName){
        return i;
      }
    }
    return null;
  }
};
