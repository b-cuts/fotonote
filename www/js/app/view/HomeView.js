define([ "./PageView", "./ListView"], function(PageView, ListView) {
  return PageView.extend({
    pageId : "home",
    
    constructor : function(options) {
      PageView.prototype.constructor.apply(this, arguments);
      this.noteCollection = options.noteCollection;
    },
    
    render : function() {
      PageView.prototype.render.apply(this, arguments);
      this.noteListView = new ListView({
        id : "note-list-view",
        itemTemplateId : "note-list-item",
        inset : false,
        collection: this.noteCollection,
        container : this.$("#note-list"),
        });
      this.noteListView.render();
      return this;
    }
  });
});