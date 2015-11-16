'use strict';
var path = require('path');
var chalk = require('chalk');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);

  var bower = require(path.join(process.cwd(), 'bower.json'));
  var match = require('fs').readFileSync(
    path.join(this.env.options.appPath, 'scripts/app.js'), 'utf-8'
  ).match(/\.state/);

  if (
    bower.dependencies['angular-ui-router'] ||
    bower.devDependencies['angular-ui-router'] ||
    match !== null
  ) {
    this.foundWhenForRoute = true;
  }

  this.hookFor('star:controller');
  this.hookFor('star:view');
};

util.inherits(Generator, ScriptBase);

Generator.prototype.rewriteAppJs = function () {
  if (!this.foundWhenForRoute) {
    this.on('end', function () {
      this.log(chalk.yellow(
        '\nangular-ui-route is not installed. Skipping adding the route to scripts/app.js'
      ));
    });
    
    return;
  }

  this.uri = this.name;
  if (this.options.uri) {
    this.uri = this.options.uri;
  }

  var config = {
    file: path.join(
      this.env.options.appPath,
      'scripts/app.js'),
    needle: '.state(\'index\', {',
    splicable: [
      "    url: '/" + this.uri + "',",
      "    templateUrl: 'views/" + this.name.toLowerCase() + ".html',",
      "    controller: '" + this.classedName + "Ctrl'"
    ]
  };

  config.splicable.unshift(".state('" + this.uri + "', {");
  config.splicable.push("})");

  angularUtils.rewriteFile(config);
};
