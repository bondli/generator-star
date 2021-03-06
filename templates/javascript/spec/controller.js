/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
    'use strict';

    describe('Controller: <%= classedName %>Ctrl', function () {

        // load the controller's module
        beforeEach(module('<%= scriptAppName %>.controllers.<%= classedName %>Ctrl'));

        var <%= classedName %>Ctrl,
            scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            <%= classedName %>Ctrl = $controller('<%= classedName %>Ctrl', {
                $scope: scope
            });
        }));

        it('should attach a list of awesomeThings to the scope', function () {
            expect(scope.awesomeThings.length).toBe(3);
        });

    });
});
