/*
 * mean2upyun
 * https://github.com/caomulaodao/mean2upyun
 *
 * Copyright (c) 2014 laodao
 * Licensed under the MIT license.
 */

'use strict';
var upyunUrl = "http://yiye-static.b0.upaiyun.com";
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    replace:{
        repHTML:{
            src:['test/packages/*/server/views/**/*.html'],
            overwrite: true,
            replacements: [{
                from: /\/.+?\/assets\/img\/.+?\.(jpg|jpeg|gif|png|ico)/g,
                to: function (matchedWord, index, fullText, regexMatches) {
                    console.log(matchedWord);
                    return upyunUrl+matchedWord;   //
                }
            },{
                from: /\/bower_components\/.+?\/.+?\.(css|js)/g,
                to: function (matchedWord, index, fullText, regexMatches) {
                    return upyunUrl+matchedWord;   //
                }
            },{
                from: /\/.+\/assets\/.+?\/.+?\.(css|js)/g,
                to: function (matchedWord, index, fullText, regexMatches) {
                    return upyunUrl+matchedWord;   //
                }
            }]
        },
        repCSS:{
            src:['test/packages/*/public/assets/css/*.css'],
            overwrite: true,
            replacements: [{
                from: /\/.+?\/assets\/img\/.+?\.(jpg|jpeg|gif|png|ico)/g,
                to: function (matchedWord, index, fullText, regexMatches) {
                    return upyunUrl+matchedWord;   //
                }
            }]
        }
    },
    // Configuration to be run (and then tested).
    mean2upyun: {
        options: {
        },
        update:{
            options: {
            },
            files: {
                'upyun': ['test/packages/*/public/**/*']
            }
        }

    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  //文本替换
  grunt.loadNpmTasks('grunt-text-replace');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('dest', ['replace','mean2upyun']);


};
