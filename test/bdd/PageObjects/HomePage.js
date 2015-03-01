var webdriver = require('selenium-webdriver'),
    until = webdriver.until,
    By = webdriver.By,
    should = require('chai').should(),
    Storage = require('./Storage');
    www = 'file://' + process.cwd() + '/www/';

function HomePage(driver) {
  this.driver = driver;
  this.storage = new Storage(driver);
}

function hasLinkWith(text) {
  return function(noteItem) {
    return noteItem.isElementPresent(By.linkText(text));
  };
}

HomePage.prototype = {
    start : function () {
      var driver = this.driver;
      
      driver.get(www + 'index.html');
      this.wait();
      this.storage.clear();
      this.storage.isEmpty();

      return this;
    },
    
    wait : function() {
      var driver = this.driver;
      
      driver.wait(until.elementLocated(By.className('home-page')),
          2000, 'Timeout waiting for HomePage');

      return this;      
    },
    
    addNote : function() {
      var driver = this.driver;
      
      driver.findElement(By.id('nav-add')).click();
      
      return this;
    },
    
    editNote : function(title) {
      var driver = this.driver;
      
      driver.findElement(By.linkText(title)).click();
      
      return this;
    },
    
    deleteNote : function(title) {
      var driver = this.driver;
      var noteItems = driver.findElements(By.className("note-item"));
      
      webdriver.promise.filter(noteItems, hasLinkWith(title)).then(function(found) {
        var noteItem = found[0];
        return noteItem.findElement(By.className("note-item-delete")).click();
      });
      
      return this;
    },
    
    hasNote : function(noteText) {
      var driver = this.driver;
      
      driver.findElement(By.className('note-item'))
        .then(function(element){
          element.getText().then(function(text) {
            text.should.be.equal(noteText);
          });
        });
      
      return this;
    },
    
    hasNoNote : function(text) {
      var driver = this.driver;
      
      driver.findElements(By.className('note-item'))
        .then(function(notes) {
          webdriver.promise.filter(notes, hasLinkWith(text)).then(function(found) {
            found.length.should.equal(0, 'Note with text="' + text + '" found');
          });
        });
      
      return this;
    },
}
module.exports = HomePage;
