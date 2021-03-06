/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
    'use strict';

    describe('Directive: <%= cameledName %>', function () {

        // load the directive's module
        beforeEach(module('<%= scriptAppName %>.directives.<%= classedName %>'));

        var element,
            scope;

        beforeEach(inject(function ($rootScope) {
            scope = $rootScope.$new();
        }));

        it('should make hidden element visible', inject(function ($compile) {
            element = angular.element('<<%= _.dasherize(name) %>></<%= _.dasherize(name) %>>');
            element = $compile(element)(scope);
            expect(element.text()).toBe('this is the <%= cameledName %> directive');
        }));

    });
});
