'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator() {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.setupEnv = function setupEnv() {
  var join = path.join;

  this.sourceRoot(join(__dirname, '../templates/common/root'));
  this.copy('.editorconfig');
  this.copy('.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.directory('test');

  this.sourceRoot(join(__dirname, '../templates/common'));
  var appPath = this.options.appPath;
  var copy = function (dest, rename) {
    if(rename != undefined){
      this.copy(join('app', dest), join(appPath, rename));
    }
    else {
      this.copy(join('app', dest), join(appPath, dest));
    }
  }.bind(this);

  if(this.options.theme != ''){
    var theme = this.options.theme;
    copy('views/main-'+theme+'.html', 'views/main.html');
    copy('views/partials-'+theme+'/header.html', 'views/partials/header.html');
    copy('views/partials-'+theme+'/sidebar.html', 'views/partials/sidebar.html');
    copy('views/partials-'+theme+'/footer.html', 'views/partials/footer.html');
  }
  else {
    copy('views/main.html');
    copy('views/partials/header.html');
    copy('views/partials/sidebar.html');
    copy('views/partials/footer.html');
  }

  copy('data/nav.json');
  copy('data/menu.json');
  copy('data/submit.json');

};
