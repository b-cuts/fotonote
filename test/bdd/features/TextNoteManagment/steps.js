var English = require('yadda').localisation.English,
    HomePage = require('../../PageObjects/HomePage'),
    NotePage = require('../../PageObjects/NotePage'),
    Storage = require('../../PageObjects/Storage'),
    should = require('chai').should(),
    webdriver = require('selenium-webdriver'),
    By = webdriver.By;

module.exports = (function() {
  var homePage, notePage, storage;
  var noteText;
  
  return English.library()
  
    .given('I am on the Home page', function(){
      homePage = new HomePage(this.driver);
      homePage.start();
    })
    
    .when('I add new note', function() {
      homePage.addNote();
      notePage = new NotePage(this.driver);
      notePage.wait();
    })
    
    .when('enter text "$text"', function(text) {
      notePage.enterText(text);
      noteText = text;
    })
    
    .when('save the note', function() {
      notePage.save();
      homePage.wait();
    })
    
    .then('the note is saved', function() {
      storage = new Storage(this.driver);
      storage.hasNote(noteText);
    })
    
    .then('the note is listed as "$title"', function(title) {
      homePage.wait();
      homePage.hasNote(title);
    });
})();