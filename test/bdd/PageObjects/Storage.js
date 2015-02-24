var webdriver = require('selenium-webdriver'),
    until = webdriver.until,
    By = webdriver.By,
    should = require('chai').should();

function Storage(driver) {
  this.driver = driver;
}

Storage.prototype = {
    isEmpty : function() {
      this.getNotes().then(function(notes) {
        should.exist(notes);
        notes.length.should.equal(0);
      });
    },
    
    hasNote : function(text) {
      var driver = this.driver;
      
      this.getNotes().then(function(notes) {
        should.exist(notes);
        
        notes.length.should.be.at.least(1);
      });
      
      return this;
    },
    
    getNotes : function() {
      var driver = this.driver;
      
      return driver.executeScript(function() {
        if (typeof window.wrappedJSObject != 'undefined') {
          app = window.wrappedJSObject.app;
        }
        app.storage.noteCollection.fetch();
        return app.storage.noteCollection.toJSON();
      });
    }
}
module.exports = Storage;
