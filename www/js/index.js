requirejs.config({
  baseUrl : 'js/libs',
  paths : {
    app : '../app',
    templates: "lodash.template.min",
    jquery: 'jquery/jquery-2.1.3.min',
    jquerymobile: "jquery/jquery.mobile-1.4.5.min",
    underscore: "lodash.min-3.3.0",
    backbone: "backbone-min-1.1.2",
    localstorage: "backbone.localStorage-min-1.1.16"
  }
});

requirejs([ 'app/main' ]);