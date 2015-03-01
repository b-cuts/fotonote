;(function() {
  var undefined;

  var objectTypes = {
    'function': true,
    'object': true
  };

  var root = (objectTypes[typeof window] && window !== (this && this.window)) ? window : this;

  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  var _ = root._ || {};

  /*----------------------------------------------------------------------------*/

  var templates = {
    'home': {},
    'note-list-item': {},
    'note': {}
  };

  templates['home'] =   function(obj) {
    obj || (obj = {});
    var __t, __p = '';
    with (obj) {
    __p += '    <div data-role="header" class="ui-header">\n      <h1 class="ui-title">FotoNote</h1>\n      <div data-role="navbar">\n        <ul>\n          <li><a id="nav-add" href="#add">add</a></li>\n        </ul>\n      </div>\n    </div>\n    <div role="main" class="ui-content home-page">\n      <p>Welcome to FotoNote</p>\n      <div id="note-list"></div>\n    </div>\n';

    }
    return __p
  };

  templates['note-list-item'] =   function(obj) {
    obj || (obj = {});
    var __t, __p = '';
    with (obj) {
    __p += '<li id="note-' +
    ((__t = ( id )) == null ? '' : __t) +
    '" class="note-item">\n  <a href="#note/' +
    ((__t = ( id )) == null ? '' : __t) +
    '">' +
    ((__t = ( title )) == null ? '' : __t) +
    '</a>\n  <a href="#" class="note-item-delete" id="delete-' +
    ((__t = ( id )) == null ? '' : __t) +
    '">delete</a>\n</li>\n';

    }
    return __p
  };

  templates['note'] =   function(obj) {
    obj || (obj = {});
    var __t, __p = '';
    with (obj) {
    __p += '    <div data-role="header" class="ui-header">\n      <h1 class="ui-title">Note</h1>\n      <div data-role="navbar">\n        <ul>\n          <li><a id="nav-save" href="#">save</a></li>\n        </ul>\n      </div>\n    </div>\n    <div role="main" class="ui-content note-page">\n      <form id="new-event-form">\n        <div class="ui-field-contain" id="note-text-field">\n          <textarea cols="40" rows="8" name="note-text" id="note-text" value="' +
    ((__t = ( text )) == null ? '' : __t) +
    '">' +
    ((__t = ( text )) == null ? '' : __t) +
    '</textarea>\n        </div>\n      </form>\n    </div>\n';

    }
    return __p
  };

  /*----------------------------------------------------------------------------*/

  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    define(['underscore'], function(lodash) {
      _ = lodash;
      lodash.templates = lodash.extend(lodash.templates || {}, templates);
    });
  }
  else if (freeExports && freeModule) {
    _ = require('underscore');
    if (moduleExports) {
      (freeModule.exports = templates).templates = templates;
    } else {
      freeExports.templates = templates;
    }
  }
  else if (_) {
    _.templates = _.extend(_.templates || {}, templates);
  }
}.call(this));
