'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var wiredep = require('wiredep');
var chalk = require('chalk');

var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

  this.option('app-suffix', {
    desc: 'Allow a custom suffix to be added to the module name',
    type: String,
    required: 'false'
  });
  this.env.options['app-suffix'] = this.options['app-suffix'];
  this.scriptAppName = this.appname + angularUtils.appName(this);

  args = ['main'];

  if (typeof this.env.options.appPath === 'undefined') {
    this.option('appPath', {
      desc: 'path/to/app is now accepted to choose where to write the files.'
    });

    this.env.options.appPath = this.options.appPath;

    if (!this.env.options.appPath) {
      try {
        this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
      } catch (e) {}
    }

    this.env.options.appPath = this.env.options.appPath || 'app';
    this.options.appPath = this.env.options.appPath;
  }

  this.appPath = this.env.options.appPath;

  this.env.options.theme = this.options.theme || '';

  this.hookFor('star:common', {
    args: args
  });

  this.hookFor('star:main', {
    args: args
  });

  /*this.hookFor('star:controller', {
    args: args
  });*/
  this.hookFor('star:otherctrl', {
    args: ['main']
  });

  this.hookFor('star:otherctrl', {
    args: ['global']
  });

  this.hookFor('star:otherctrl', {
    args: ['login']
  });

  this.hookFor('star:otherctrl', {
    args: ['sidebar']
  });

  this.hookFor('star:otherserv', {
    args: ['apimap']
  });

  this.on('end', function () {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      skipMessage: this.options['skip-message'],
      callback: this._injectDependencies.bind(this)
    });

  });

  this.pkg = require('../package.json');
  this.sourceRoot(path.join(__dirname, '../templates/common'));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function welcome() {
  if (!this.options['skip-welcome-message']) {
    this.log(yosay());
    this.log(
      chalk.magenta(
        'Out of the box I include Bootstrap and some AngularJS recommended modules.' +
        '\n'
      )
    );
  }

  if (this.options.minsafe) {
    this.log.error(
      'The --minsafe flag has been removed. For more information, see' +
      '\nhttps://github.com/yeoman/generator-angular#minification-safe.' +
      '\n'
    );
  }
};

Generator.prototype.readIndex = function readIndex() {
  var theme = this.options.theme;
  if(theme != undefined && theme != ''){
    this.indexFile = this.engine(this.read('app/index-'+theme+'.html'), this);
  }
  else {
    this.indexFile = this.engine(this.read('app/index.html'), this);
  }
};

Generator.prototype.bootstrapFiles = function bootstrapFiles() {
  var cssFile = 'styles/main.scss';
  this.copy(
    path.join('app', cssFile),
    path.join(this.appPath, cssFile)
  );
  var cssCommonFile = 'styles/common.scss';
  this.copy(
    path.join('app', cssCommonFile),
    path.join(this.appPath, cssCommonFile)
  );
};

Generator.prototype.createIndexHtml = function createIndexHtml() {
  this.indexFile = this.indexFile.replace(/&apos;/g, "'");
  this.write(path.join(this.appPath, 'index.html'), this.indexFile);
};

Generator.prototype.packageFiles = function packageFiles() {
  this.template('root/_bowerrc', '.bowerrc');
  this.template('root/_bower.json', 'bower.json');
  this.template('root/_package.json', 'package.json');
  this.template('root/_Gruntfile.js', 'Gruntfile.js');
  this.template('root/_component.json', 'component.json');
  this.template('root/_README.md', 'README.md');
  this.template('root/_changelog.md', 'changelog.md');

  // RequireJS Test config
  this.template('../../templates/common/scripts/main.js', path.join(this.appPath, 'scripts/main.js'));
  // RequireJS Test config
  this.template('../../templates/common/scripts/test-main.js', 'test/test-main.js');

};

Generator.prototype.showGuidance = function showGuidance() {
  var guidance =
    '\nNow that everything is set up, you\'ll need to execute a build. ' +
    '\nThis is done by running' +
    '\n  grunt build' +
    '\n' +
    '\nWork with your files by using' +
    '\n  grunt serve' +
    '\n' +
    '\nThis sets a watch on your files and also opens your project in ' +
    '\na web browser using live-reload, so that any changes you make are ' +
    '\ninstantly visible.'

  console.log(guidance);
};

// This can probably be done-away with
Generator.prototype._injectDependencies = function _injectDependencies() {
  if (this.options['skip-install']) {
    this.log(
      'After running `npm install & bower install`, inject your front end dependencies' +
      '\ninto your source code by running:' +
      '\n' +
      '\n' + chalk.yellow.bold('grunt wiredep')
    );
  } else {
    wiredep({
      directory: 'bower_components',
      bowerJson: JSON.parse(fs.readFileSync('./bower.json')),
      ignorePath: new RegExp('^(' + this.appPath + '|..)/'),
      src: 'app/index.html',
      fileTypes: {
        html: {
          replace: {
            css: '<link rel="stylesheet" href="{{filePath}}">'
          }
        }
      }
    });
  }
};
