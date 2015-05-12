var bodyparser = require('body-parser');
var keystone = require('keystone');

exports = module.exports = {
  post: function(req,res){
    if (!req.user) {
      res.send('Not logged in!');
      res.status(403);
      return;
    }
    var postedCopy = req.body.copy;

    var Copy = keystone.list('Copy');
    var q = keystone.list('Copy').model.find();
    q.exec(function(err,results){
      var latestCopy = results[results.length-1];
      onGetCurrentCopy(latestCopy);
    });

    function onGetCurrentCopy(latestCopy){
      for(var key in postedCopy){
        if(postedCopy[key] !== ''){
          var str = postedCopy[key];
          latestCopy[key] = str;
        }
      }
      latestCopy.save(function(err){
        if(err){
          console.log('Act Copy - Post - Error')
          console.log(err);
          res.send('error');
          res.status(505);
        }
        else {
          console.log('Act Copy - Post - Success')
          res.send('ok');
          res.status(200);
        }
      });
    }
  },
  get: function(req,res){
    var q = keystone.list('Copy').model.find();
    q.exec(function(err,results){
      res.send(results[results.length-1]);
      res.status(200);
    });
  }
}
