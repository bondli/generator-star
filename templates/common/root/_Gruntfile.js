// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'build'
  };

  var comConfig = {
    filters: require('./component.json').components || [],
    dependencies: require('./component.json').dependencies || [],
    source: 'bower_components/star-ui/app',
    dist: 'bower_components/star-ui/build'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    comConfig : comConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css'
        ]
      },
      html2js:{
        files: ['<%%= yeoman.app %>/views/{,*/}*.html'],
        tasks: ['html2js:debug']
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/{,*/}*',
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Automatically inject Bower components into the app
    wiredep: {
      options: {
        cwd: ''
      },
      app: {
        src: ['<%%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        cacheDir: '.tmp',
        sassDir: '<%%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        javascriptsDir: '<%%= yeoman.app %>/scripts',
        fontsDir: '<%%= yeoman.app %>/styles/fonts',
        importPath: './bower_components',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          debugInfo: false
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%%= yeoman.app %>/index.html',
      options: {
        dest: '<%%= yeoman.dist %>'
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%%= yeoman.dist %>/styles/{,*/}*.css']
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>',
          src: ['views/{,*/}*.html'],
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '*.html',
            'views/{,*/}*.html',
            'bower_components/**/*',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: 'bower_components',
          src: 'requirejs/*.{js,swf,map}',
          dest: '<%%= yeoman.dist %>'
        }, {
          expand: true,
          cwd: 'bower_components/bootstrap/dist',
          src: 'fonts/*',
          dest: '<%%= yeoman.dist %>'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: ['compass:server'],
      test: ['compass'],
      dist: [
        'compass:dist'
      ]
    },

    /*/ Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },*/

    // Settings for grunt-bower-requirejs
    bower: {
      app: {
        rjsConfig: '<%%= yeoman.app %>/scripts/main.js',
        options: {
          exclude: ['requirejs', 'json3', 'es5-shim']
        }
      }
    },

    // generator you chiosed components.
    ngcom: {
      options: {
        'target': '<%%= comConfig.dist %>',
        'dependencies': comConfig.dependencies,
        'filters': comConfig.filters
      },
      files: ['<%%= comConfig.source %>/js/*.js']
    },

    replace: {
      // replace i18n path
      i18npath:{
        src: ['<%%= yeoman.app %>/scripts/main.js'], // source files array
        dest: '<%%= yeoman.app %>/scripts/',             // destination directory or file
        replacements: [{
          from: 'bower_components/angular-i18n/angular-i18n',                         // string replacement
          to: function(){
            return 'bower_components/angular-i18n/angular-locale_zh-cn';
          }
        }]
      },
      //fixed datapicker bug
      uibootstrap: {
        src: ['bower_components/angular-bootstrap/ui-bootstrap-tpls.js'],
        dest: 'bower_components/angular-bootstrap/',
        replacements: [{
          from: '$scope.$on(\'datepicker.focus\', focusElement);',                         // string replacement
          to: function(){
            return '//$scope.$on(\'datepicker.focus\', focusElement);';
          }
        }]
      },
      // hack requirejs path
      requirejs: {
        src: ['<%%= yeoman.dist %>/index.html'],
        dest: '<%%= yeoman.dist %>/',
        replacements: [{
          from: 'bower_components/requirejs/require.js',
          to: function(){
            return 'requirejs/require.js';
          }
        }]
      }
    },

    html2js: {
      options: {
        htmlmin: {
          collapseWhitespace: true
        },
        useStrict: true,
        rename: function(moduleName) {
          return moduleName.replace('../app/', '');
        }
      },
      debug: {
        module: 'project.tpl',
        src: ['<%%= yeoman.app %>/views/{,*/}*.html'],
        dest: '<%%= yeoman.app %>/scripts/project.tpl.js'
      },
      dist:{
        module: 'project.tpl',
        src: ['<%%= yeoman.app %>/views/{,*/}*.html'],
        dest: '<%%= yeoman.app %>/scripts/project.tpl.js'
      }
    },

    // r.js compile config
    requirejs: {
      dist: {
        options: {
          dir: '<%%= yeoman.dist %>/scripts/',
          modules: [{
            name: 'main'
          }],
          preserveLicenseComments: false, // remove all comments
          removeCombined: true,
          baseUrl: '<%%= yeoman.app %>/scripts',
          mainConfigFile: '<%%= yeoman.app %>/scripts/main.js',
          optimize: 'uglify2',
          uglify2: {
            mangle: false
          }
        }
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'ngcom',
      'replace:uibootstrap',
      'concurrent:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  /*
  grunt.registerTask('test', [
    'clean:server',
    'bower:app',
    'concurrent:test',
    'connect:test',
    'karma'
  ]);
  */

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'bower:app',
    'useminPrepare',
    'concurrent:dist',
    'ngcom',
    'html2js:dist',
    'concat',
    'copy:dist',
    'cssmin',
    'usemin',
    'replace:i18npath',
    'replace:uibootstrap',
    'requirejs:dist',
    'replace:requirejs',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'clean:server',
    'wiredep',
    'ngcom',
    'replace:uibootstrap',
    'concurrent:server',
    'connect:livereload',
    'watch'
  ]);
};
