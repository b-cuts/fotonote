define([ "./PageView"], function(PageView) {
  return PageView.extend({
    pageId : "note",
    
    events : {
      "click #nav-save"  : "add",
    },
    
    constructor : function(options) {
      PageView.prototype.constructor.apply(this, arguments);
      
      this.noteCollection = options.noteCollection;
      
      this.noteCollection.on("add", this.save)
    },
    
    initialize : function() {
      this.delegateEvents(this.events);
    },
    
    add : function() {
      var text = this.$("#note-text");
      this.noteCollection.add({text : text.val().trim()});
    },
    
    save : function(note) {
      note.save();
    },
    
    render : function() {
      PageView.prototype.render.apply(this, [{text:''}]);
      return this;
    }
  });
});