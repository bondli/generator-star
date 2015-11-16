# AngularJS-RequireJS-Bootstrap Project Generator


> Yeoman generator for AngularJS using RequireJS and Bootstrap


## Usage

Install `generator-star`:
```
npm install -g generator-star
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo star`, optionally passing an app name:
```
yo star [app-name]
```

`grunt build` must be run before anything else due to dependency population in the RequireJS config and the like (this will be fixed in a future version).

Run `grunt` for building and `grunt serve` for preview


## Generators

Available generators:

* [star:controller](#controller)
* [star:directive](#directive)
* [star:filter](#filter)
* [star:route](#route)
* [star:service](#service)

**Note: Generators are to be run from the root directory of your app.**

