# RequireJS-based Karma generator [![Build Status](https://travis-ci.org/aaronallport/generator-karma-require.png?branch=master)](https://travis-ci.org/aaronallport/generator-karma-require)

Maintainer: [Aaron Allport](https://github.com/aaronallport)

See the [Karma documentation](http://karma-runner.github.com/) for more info.


## Why Karma?

Karma runs the tests in the browser, but reports them in the CLI. This greatly improves your workflow by giving you constant, accurate feedback on the status of your tests.

PhantomJS is a great option too, but it has the one drawback that it won't expose browser inconsistencies.

## Why generator-karma-require?

I needed Karma configuration that plays nicely with RequireJS, that I could spin up automatically after running another RequireJS-based generator. This is designed to address that problem.


## Usage

Install it globally `npm install -g generator-karma-require`.

Running `yo karma-require` will generate two files for your project: `karma.conf.js` and `karma-e2e.conf.js`. It will then install the npm dependencies.

Note that you'll need to update your `Gruntfile.js`. If you're using Karma through the [AngularJS-RequireJS generator](https://github.com/aaronallport/generator-angular-require), all of the configuration is done for you.


## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

* `--test-framework=[framework]`

  Defaults to `mocha`. Can be switched for another supported testing framework like `jasmine` or `qunit`. The entry "requirejs" is included by default and cannot be changed unless you manually edit the generated configration files once they are created.

* `--coffee`

  Enable support for tests written in CoffeeScript.

* `--travis`

  Enable [Travis CI](https://travis-ci.org/) config generation.
  
  
## Configuration

Karma can be configured by editing `karma.conf.js`. See the documentation page on the [config file](http://karma-runner.github.com/0.10/config/configuration-file.html) for an exhaustive list of options.


## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)


## License

[BSD license](http://opensource.org/licenses/bsd-license.php)


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/aaronallport/generator-karma-require/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

