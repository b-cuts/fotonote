var jsdom = require("mocha-jsdom"),
    should = require("chai").should(),
    sinon = require("sinon");

describe("PageView", function() {
  jsdom();
  var PageView, _, $;
  
  before(function() {
    $ = requirejs("jquery");
    _ = requirejs("underscore");
    PageView = requirejs("app/view/PageView");
  });
  
  
  describe("should render page using pageId template", function () {
    var view, templateSpy;
    
    var expectedHTML = "<div>Some HTML</div>";
    
    before(function(){
      templateSpy = _.templates["pageId"] = sinon.stub().returns(expectedHTML);
      var aView = PageView.extend({
        pageId : "pageId"
      });
      view = new aView();
      view.render();
    });
    
    it("should use template", function() {
      templateSpy.called.should.be.true;
    });
    
    it("should append html to View's element", function() {
      $(view.el).html().should.be.equal(expectedHTML);
    });
  });
});
