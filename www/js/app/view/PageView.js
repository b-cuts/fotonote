define([ "backbone", "jquery", "underscore", "templates" ], function(Backbone, $, _, tmpl) {
  return Backbone.View.extend({

    pageId : "",
    
    template : function() {return _.templates[this.pageId]},

    render : function(item) {
      $('div[data-role="page"]').on('pagehide', function(event, ui) {
        $(event.currentTarget).remove();
      });
      
      $(this.el).html(this.template()(item));
      return this;
    }
  });
});