var webdriver = require('selenium-webdriver'),
    until = webdriver.until,
    By = webdriver.By,
    _ = require('lodash'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

function Storage(driver) {
  this.driver = driver;
}

Storage.prototype = {
    
    clear : function() {
      var driver = this.driver;
      
      return driver.executeScript(function() {
        if (typeof window.wrappedJSObject != 'undefined') {
          app = window.wrappedJSObject.app;
        }
        app.storage.noteCollection.localStorage._clear();
        app.storage.noteCollection.fetch();
        return;
      });
    },
    
    isEmpty : function() {
      this.getNotes().then(function(notes) {
        should.exist(notes);
        notes.length.should.equal(0);
      });
    },
    
    addNote : function(text) {
      var driver = this.driver;
      
      return driver.executeScript(function() {
        if (typeof window.wrappedJSObject != 'undefined') {
          app = window.wrappedJSObject.app;
        }
        var note = app.storage.noteCollection.add({text: arguments[0]});
        note.save();
        return note.toJSON();
      }, text);
    },
    
    hasNote : function(text) {
      var driver = this.driver;
      
      this.getNotes().then(function(notes) {
        should.exist(notes);
        
        notes.length.should.be.at.least(1);
        
        var matchingNotes = 
          _.filter(notes, function(note) {return note.text.indexOf(text) > -1});
        
        matchingNotes.length.should.equal(1, 'Note with text="' + text + '" not found');
      });
      
      return this;
    },
    
    hasNoNote : function(text) {
      var driver = this.driver;
      
      this.getNotes().then(function(notes) {
        should.exist(notes);
        
        var matchingNotes = 
          _.filter(notes, function(note) {return note.text.indexOf(text) > -1});
        
        matchingNotes.length.should.equal(0, 'Note with text="' + text + '" found');
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
