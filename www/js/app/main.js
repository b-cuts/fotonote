define(["jquery", "backbone", "underscore", "./JQMConfig", "jquerymobile", "localstorage", "templates", "./AppRouter", "./Storage"], 
    function ($, Backbone, _, jqmConfig, jqm, BackboneLocalStorage, templates, AppRouter, Storage) {
  Backbone.$ = $;
  $(function() {
    app = new AppRouter();
    Backbone.history.start();
    console.log("started");
  });
});
