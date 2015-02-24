define([ "backbone", "jquery", "underscore", "templates" ], function(Backbone, $, _, tmpl) {
  return Backbone.View.extend({
    tagName : 'ul',
    attributes : {
      "data-role" : 'listview'
    },
  
    constructor : function(options) {
      this.id = options.id;
      this.itemTemplateId = options.itemTemplateId;
      this.container = options.container;
      this.collection = options.collection;

      Backbone.View.prototype.constructor.apply(this, arguments);
    },

    initialize : function() {
      this.template = _.templates[this.itemTemplateId];
    },
  
    render : function() {
      var template = this.template, listView = $(this.el);
      
      $(this.el).empty();
      this.collection.fetch();
      this.collection.forEach(function(item) {
        var attrs = item.toJSON();
        console.log(attrs);
        listView.append(template(attrs));
      });
      this.container.html($(this.el));
      this.container.trigger('create');
      return this;
    }
  });
});
