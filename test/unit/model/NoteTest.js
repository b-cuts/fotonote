var jsdom = require("mocha-jsdom"),
    should = require("chai").should();

describe("Note", function() {
  jsdom();
  var Note;
  
  before(function() {
    Note = requirejs("app/model/Note");
  });
  
  
  describe("should create with title based on shortened text", function () {
    var note;
    before(function(){
      note = new Note({text: "Very long text with more than 12 characters"});
    });
    
    it("title should have 16 characters", function() {
      note.get("title").length.should.equal(16);
    });
    
    it("title should end with space and 3 dots", function() {
      note.get("title").should.have.string(" ...");
    });
  });
});
