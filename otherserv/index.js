'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createOtherservFiles = function createOtherservFiles() {
  this.otherTemplate(
    this.name,
    'service'
  );
};

// Re-write the main app module to account for our new dependency
Generator.prototype.injectDependenciesToApp = function () {
  angularUtils.injectIntoFile(
    this.env.options.appPath,
    'services/' + this.name.toLowerCase(),
    this.classedName + 'Service',
    this.scriptAppName + '.services.' + this.classedName
  );
};
