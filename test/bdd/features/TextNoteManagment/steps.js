var English = require('yadda').localisation.English,
    HomePage = require('../../PageObjects/HomePage'),
    NotePage = require('../../PageObjects/NotePage'),
    Storage = require('../../PageObjects/Storage'),
    expect = require('chai').expect,
    should = require('chai').should(),
    webdriver = require('selenium-webdriver'),
    By = webdriver.By;

module.exports = (function() {
  var homePage, notePage, storage;
  var noteText;
  
  return English.library()
  
    .given('I am on the Home page', function(){
      storage = new Storage(this.driver);
      homePage = new HomePage(this.driver);
      homePage.start();
    })
    
    .given('a text note "$text" is on the list', function(text) {
      storage.addNote(text).then(function(note) {
        expect(note).to.exist;
        expect(note).to.have.property('text', text);
      });
    })
    
    .when('I add new note', function() {
      homePage.addNote();
      notePage = new NotePage(this.driver);
      notePage.wait();
    })
    
    .when('I edit a text note "$title"', function(title) {
      homePage.editNote(title);
      notePage = new NotePage(this.driver);
      notePage.wait();
    })
    
    .when('enter text "$text"', function(text) {
      notePage.enterText(text);
      noteText = text;
    })
    
    .when('prepend text with "$text"', function(text) {
      notePage.enterText(webdriver.Key.HOME, text);
      noteText = text;
    })
    
    .when('save the note', function() {
      notePage.save();
      homePage.wait();
    })
    
    .when('I delete a text note "$title"', function(title) {
      homePage.deleteNote(title);
      noteText = title.substring(0, title.length - 4);
    })
    
    .then('the note is saved', function() {
      storage.hasNote(noteText);
    })
    
    .then('the note is deleted', function() {
      storage.hasNoNote(noteText);
    })
    
    .then('there is no note listed as "$title"', function(title) {
      homePage.hasNoNote(title);
    })
    
    .then('the note is listed as "$title"', function(title) {
      homePage.wait();
      homePage.hasNote(title);
    });
})();