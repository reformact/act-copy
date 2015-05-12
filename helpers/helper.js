exports = module.exports = {
  init: function(){
    this.applyBind();
  },

  applyBind: function(){
    if (!Function.prototype.bind) { // check if native implementation available
      Function.prototype.bind = function(){ 
        var fn = this, args = Array.prototype.slice.call(arguments),
            object = args.shift(); 
        return function(){ 
          return fn.apply(object, 
            args.concat(Array.prototype.slice.call(arguments))); 
        }; 
      };
    }
  },
  exists: function(val){
    var exists = false;
    if(val === undefined){
      return false;
    }
    else if(val === null){
      return false;
    }
    else {
      return val;
    }
  }
}