define([ "backbone", "underscore"], function(Backbone, _) {
  
  return Backbone.Model.extend({
    defaults : {
      title : "",
      text : ""
    },
    
    constructor : function(attributes, options) {
      var attrs = attributes || {};
      options || (options = {});
      if (typeof attrs.title == "undefined") {
        attrs.title = attrs.text.substring(0, 12);
        if (attrs.text.length >= 12) {
          attrs.title = attrs.title + " ...";
        }
      }

      Backbone.Model.prototype.constructor.apply(this, [attrs, options]);
    }
  });
});
