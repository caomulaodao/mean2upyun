/*
 * mean2upyun
 * https://github.com/caomulaodao/mean2upyun
 *
 * Copyright (c) 2014 laodao
 * Licensed under the MIT license.
 */

'use strict';


var UPYun = require('./lib/upyun').UPYun;

var fs =  require('fs');

// 初始化空间
var upyun = new UPYun("yiye-static", "username", "password");

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('mean2upyun', 'update mean of packages public file to upyun', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', ',
      asynNum: 0
    });
    var that = this;
    // Iterate over all specified file groups.
    var src = this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {

        if(grunt.file.isDir(filepath)){
        }else{
            updateFile(filepath,that)
        }
      });
    });
  });

};

function updateFile(filename,grunt){
    var asynDone = grunt.async();
    grunt.options.asynNum = grunt.options.asynNum + 1;
    var fileContent = fs.readFileSync(filename);
    var md5Str = md5(fileContent);
    upyun.setContentMD5(md5Str);
    upyun.setFileSecret('bac');
    upyun.writeFile(filename, fileContent, true, function(err, data){
        grunt.options.asynNum = grunt.options.asynNum -1;
        if (err) {
            console.log('err:'+filename+' because:'+JSON.stringify(err));
        }else{
            console.log('success:'+filename+' update');
        }
        if(grunt.options.asynNum === 0) asynDone();
    });
}


function md5(string) {
    var crypto = require('crypto');
    var md5sum = crypto.createHash('md5');
    md5sum.update(string, 'utf8');
    return md5sum.digest('hex');
}
