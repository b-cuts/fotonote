var webdriver = require('selenium-webdriver'),
    until = webdriver.until,
    _ = require('lodash'),
    By = webdriver.By,
    should = require('chai').should();

function NotePage(driver) {
  this.driver = driver;
}

NotePage.prototype = {
    wait : function () {
      var driver = this.driver;
      
      driver.wait(until.elementLocated(By.className('note-page')),
          2000, 'Timeout waiting for NotePage');

      return this;
    },
    
    enterText : function() {
      var driver = this.driver, var_args = _.toArray(arguments);
      
      driver.findElement(By.id('note-text')).then(function(element) {
        driver.wait(until.elementIsVisible(element), 2000);
        element.sendKeys(var_args);
      });
      
      return this;
    },
    
    save : function() {
      var driver = this.driver;
      
      driver.findElement(By.id('nav-save')).click();
      
      return this;
    }
}
module.exports = NotePage;
