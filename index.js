/**
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2014 Upstage.
 * Licensed under the MIT License (MIT).
 */

var _ = require('lodash');
var i18n = require('./lib/i18n');

var options = {
  stage: 'options:post:configuration'
};

/**
 * postprocess
 * @param  {Object}   params
 * @param  {Function} callback
 */
module.exports = function (params, callback) {
  'use strict';

  var grunt = params.grunt;

  grunt.verbose.subhead('Running:'.bold, '"assemble-contrib-i18n"');
  grunt.verbose.writeln('Stage:  '.bold, '"' + params.stage + '"\n');

  var opts = params.assemble.options.i18n;
  grunt.verbose.writeln('Options: '.bold, require('util').inspect(opts));

  if (opts) {
    var data = opts.data;
    var templates = opts.templates;

    var pages = {};
    if (templates) {
      pages = i18n(data, { templates: templates });
    } else {
      pages = i18n(data);
    }

    grunt.verbose.writeln('Pages: '.bold, require('util').inspect(pages));
    params.assemble.options.pages = pages; //_.extend({}, params.assemble.options.pages, pages);

  }

  callback();
};

module.exports.options = options;