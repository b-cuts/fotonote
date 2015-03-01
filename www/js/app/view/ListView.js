define([ "backbone", "jquery", "underscore", "templates" ], function(Backbone, $, _, tmpl) {
  return Backbone.View.extend({
    tagName : 'ul',
    attributes : {
      "data-role" : "listview",
      "data-split-icon": "delete"
    },
    
    events : {
      "click .note-item-delete" : "deleteItem"
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
        listView.append(template(attrs));
      });
      this.container.html($(this.el));
      this.container.trigger('create');
      this.collection.bind('add', this.add, this);
      this.collection.bind('remove', this.remove, this);
      return this;
    },
    
    deleteItem : function(e) {
      var collection = this.collection;
      var itemId = e.currentTarget.id.substring(7);
      collection.remove(collection.get(itemId));
    },
    
    remove : function(item) {
      var listView = $("#" + this.id), itemId = item.get("id");
      
      item.destroy();
      listView.children().remove("#note-" + itemId);
      listView.listview('refresh');
    },
    
    add : function(item) {
      var listView = $("#" + this.id), template = this.template;
  
      item.save();
      var attrs = item.toJSON();
      listView.append(template(_.extend(attrs)));
      listView.listview('refresh');
    }
  });
});
