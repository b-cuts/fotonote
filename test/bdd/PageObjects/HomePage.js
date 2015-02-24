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

HomePage.prototype = {
    start : function () {
      var driver = this.driver;
      
      driver.get(www + 'index.html');
      this.wait();
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
    
    hasNote : function(noteText) {
      var driver = this.driver;
      
      driver.findElement(By.className('note-item'))
        .then(function(element){
          element.getText().then(function(text) {
            text.should.be.equal(noteText);
          });
        });
      
      return this;
    }
}
module.exports = HomePage;
