define(["backbone", "jquery", "./view/HomeView", "./view/NoteView", "./Storage"],
    function(Backbone, $, HomeView, NoteView, Storage) {
  return Backbone.Router.extend({
    
    routes : {
      "" : "home",
      "add" : "add"
    },

    initialize : function() {
      this.firstPage = true;
      this.storage = new Storage();
    },
    
    home : function() {
      console.log('#home');
      var noteCollection = this.storage.noteCollection;
      
      this.changePage(new HomeView({
        noteCollection : noteCollection
      }));
    },
    
    add : function() {
      console.log('#add');
      var noteCollection = this.storage.noteCollection;
      
      this.changePage(new NoteView({
        noteCollection : noteCollection
        }));
    },


    addBackEventHandler : function() {
      $('.back').on('click', function(event) {
        window.history.back();
        return false;
      });
    },
    
    changePage : function(page) {
      $(page.el).attr('data-role', 'page');
      page.render();
      $('body').append($(page.el));
      this.addBackEventHandler();
      var transition = $.mobile.defaultPageTransition;
      if (this.firstPage) {
        transition = 'none';
        this.firstPage = false;
      }
      $.mobile.changePage($(page.el), {
        changeHash : false,
        transition : transition
      });
      $(page.el).trigger('create');
    }

  });
});
