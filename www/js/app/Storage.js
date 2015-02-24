define(["backbone", "jquery", "./model/NoteCollection"],
    function(Backbone, $, NoteCollection) {
  var Storage = function () {
    this.noteCollection = new NoteCollection();
  };
  
  Storage.prototype = {

  };
  
  return Storage;
});
