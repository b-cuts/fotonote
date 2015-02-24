var Yadda = require('yadda'),
    webdriver = require('selenium-webdriver'),
    fs = require('fs'),
    featuresDir = process.cwd() + '/test/bdd/features/',
    browser = 'phantomjs';
    
var driver;

Yadda.plugins.mocha.StepLevelPlugin.init({language: Yadda.localisation.English});

fs.readdirSync(featuresDir).forEach(function(dir) {
  var featureDir = featuresDir + dir;
  if (fs.statSync(featureDir).isDirectory() && (true || featureDir.indexOf('TextNoteManagment') > -1)) {
    new Yadda.FeatureFileSearch(featureDir).each(function(file) {
 
      if (true || file.indexOf('TextNoteManagment') > -1) {
        featureFile(file, function(feature) {
          
          var library = require(featureDir + '/steps');
    
          scenarios(feature.scenarios, function(scenario) {
            if ((true || scenario.title == 'Creating new text note without a title')) {
              
              before(function() {
                driver = new webdriver.Builder().usingServer()
                    .withCapabilities({
                      'browserName' : browser
                    }).build();
              });
              
              steps(scenario.steps, function(step, done) {
                executeInFlow(function() {
                  new Yadda.Yadda(library, {driver: driver}).yadda(step);
                }, done);
              });
              
              after(function(done) {
                driver.quit().then(done);
              });
            }
          });
          
        });
      }
    });
  }
});

function executeInFlow(fn, done) {
  webdriver.promise.controlFlow().execute(fn).then(function() {
    done();
  }, done);
}