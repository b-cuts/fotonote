define([ "backbone", "underscore", "localstorage", "./Note"], function(Backbone, _, localstorage, Note) {
  return Backbone.Collection.extend({
    
    model: Note,
    
    localStorage: new Backbone.LocalStorage("Note")
  });
});