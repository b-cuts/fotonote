define([ "./PageView"], function(PageView) {
  return PageView.extend({
    pageId : "note",
    
    events : {
      "click #nav-save"  : "add",
    },
    
    constructor : function(options) {
      PageView.prototype.constructor.apply(this, arguments);
      
      this.noteId = options.noteId;
      this.editing = typeof options.noteId != "undefined";
      this.noteCollection = options.noteCollection;
      
      this.noteCollection.on("add", this.save)
    },
    
    initialize : function() {
      this.delegateEvents(this.events);
    },
    
    add : function() {
      var text = this.$("#note-text").val().trim();
      if (this.editing) {
        var note = this.noteCollection.get(this.noteId);
        note.set({text: text});
        note.save();
      } else {
        this.noteCollection.add({text : text});
      }
    },
    
    save : function(note) {
      note.save();
    },
    
    render : function() {
      var note = {text:''};
      if (this.editing) {
        note = this.noteCollection.get(this.noteId).toJSON();
      }
      PageView.prototype.render.apply(this, [note]);
      return this;
    }
  });
});