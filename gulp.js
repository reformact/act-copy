var fs = require('fs');
var yaml = require('js-yaml');

module.exports = {
  createModel: function(importPath,exportPath){
    if(importPath === undefined){
      console.log('Error, no importPath')
      return
    }
    if(exportPath === undefined){
      console.log('Error, no exportPath')
      return
    }
    try {
      var doc = yaml.safeLoad(fs.readFileSync(importPath,'utf8'))
      var pre = "var keystone = require('keystone'), Types = keystone.Field.Types;\n";
      var pre2 = "var Copy = new keystone.List('Copy', { nocreate: true,nodelete: true });\n";

      var end = 'Copy.register();';
      var objStart = 'Copy.add({\n';
      var objEnd = '});\n';
      var str = '';
      var count = 0

      for(var key in doc){
        str += '  ' + key + ': {type: Types.Textarea, required: false }';
        if(count < Object.keys(doc).length - 1){
          str += ',\n';
        }
        else {
          str += '\n';
        }
        count++
      }
      var finalStr = pre + pre2 + objStart + str + objEnd + end;
      fs.writeFile(exportPath, finalStr, function(err){
        if(err){
          return console.log(err);
        }
        console.log('Wrote Copy.js');
      });
    }
    catch(e){
      console.log(e);
    }
  },
  createSeed: function(importPath,exportPath){
    if(importPath === undefined){
      console.log('Error, no importPath');
      return
    }
    if(exportPath === undefined){
      console.log('Error, no exportPath');
      return
    }
    var count, doc, e, end, filename, finalStr, key, pre, str, ver;

    try {
      doc = yaml.safeLoad(fs.readFileSync('copy/sv.yml', 'utf8'));
      pre = 'exports.create = {\n  Copy: [\n    {\n';
      end = '    }\n  ]\n}';
      count = 0;
      str = '';
      for (key in doc) {
        str += "      " + key + ": " + "'" + doc[key] + "'";
        if (count < Object.keys(doc).length - 1) {
          str += ',\n';
        } else {
          str += '\n';
        }
        count++;
      }
      finalStr = pre + str + end;
      filename = exportPath;
      fs.writeFile(filename, finalStr, function(err) {
        if (err) {
          return console.log(err);
        }
        return console.log('Wrote ' + filename);
      });
    } catch (_error) {
      e = _error;
      console.log(e);
    }
  }
}
