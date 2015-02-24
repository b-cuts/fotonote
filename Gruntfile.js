module.exports = function(grunt) {

  // Load plugins
  grunt.loadNpmTasks('grunt-cordova-ng');
  grunt.loadNpmTasks('grunt-lodash');
  grunt.loadNpmTasks('grunt-mocha-test');
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    lodash : {
      'templates' : {
        dest : 'www/js/libs/lodash.template.js',
        options : {
          template : 'www/js/app/templates/*.jst',
          moduleId : 'underscore'
        }
      }
    },
    
    mochaTest : {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results-unit.txt',
          quiet: false
        },
        src: ['test/unit/**/*Test.js']
      },
      
      bdd: {
        options: {
          timeout: 20000,
          reporter: 'spec',
          captureFile: 'results-bdd.txt',
          quiet: false
        },
        src: ['test/bdd/test-selenium.js']
      }
    }
  });
  
  grunt.registerTask('default', ['build']);

  grunt.registerTask('build', ['templates', 'test-unit', 'mochaTest:bdd']);
  
  grunt.registerTask('templates', ['lodash:templates']);
  
  grunt.registerTask('test-unit', 'Unit tests', function () {
    /*Global for all tests*/
    localStorage = require('localStorage');
    requirejs = require("requirejs");
    requirejs.config({
      nodeRequire: require,
      baseUrl : "./www/js/libs",
      paths : {
        app : '../app',
        templates: "lodash.template.min",
        jquery: 'jquery/jquery-2.1.3.min',
        jquerymobile: "jquery/jquery.mobile-1.4.5.min",
        underscore: "lodash.min-3.3.0",
        backbone: "backbone-min-1.1.2",
        localstorage: "backbone.localStorage-min-1.1.16"
      }
    });
    
    grunt.task.run('mochaTest:test');
  });
  
  grunt.registerTask('help', '', function() {
    grunt.log.writeln("FotoNote");
  });
};