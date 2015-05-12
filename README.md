#act-copy

- WYSIWYG Copy Editor for Frontend
- Get/Post routes for saving copy live on site
- Gulp plugins for generating Copy Model and update seed

#Client js Examples:

```javascript

//only include this file if user is logged in

var actcopy = require('act-copy/client');
var $ = require('jquery');

$(document).ready(function() {
  actcopy.init();
});

```

#Route Examples:

```javascript

//in routes/index.js

var actcopy = require('act-copy/route')

exports = module.exports = function(app) {
  app.post('/copy', actcopy.post);
  app.get('/copy', actcopy.get);
}
```

#Gulp Examples:

```javascript

actcopy = require('act-copy/gulp')

gulp.task 'generate-copy', ->
  actcopy.createModel('copy/sv.yml','copy/Copy.js')

argv = require('yargs').argv

gulp.task 'copy-seed', =>
  if argv.copyv == undefined
    console.log 'Error:\n  no --copyv= parameter'
    return
  actcopy.createSeed('copy/sv.yml','updates/' + argv.copyv + '-copy.js')
```