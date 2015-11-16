/*jshint unused: vars */
require.config({
    paths: {

    },
    shim: {
        'angular' : {'exports' : 'angular'},
        //'jquery': {'exports': 'jquery'},
        'angular-cookies': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-bootstrap': [
            'angular'
        ],
        'angular-ui-router': [
            'angular'
        ],
        'angular-i18n': [
            'angular'
        ],
        /*'angular-file-upload': [
            'angular'
        ],*/
        'star-ui': [
            'angular'
        ],
        'project.tpl': [
            'angular'
        ]
    },
    priority: [
        'angular'
    ]
});

var console = console || {log: function(){}};

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = 'NG_DEFER_BOOTSTRAP!';

require([
    'angular',
    'app',
    'angular-cookies',
    'angular-sanitize',
    'angular-ui-router',
    'angular-bootstrap',
    'angular-i18n',
    //'angular-file-upload',
    //'ng-img-crop',
    'star-ui',
    'project.tpl'
], function(angular, app, ngCookies, ngSanitize) {
    'use strict';
    var $html = angular.element(document.getElementsByTagName('html')[0]);

    angular.element().ready(function() {
        angular.resumeBootstrap([app.name]);
    });
});
