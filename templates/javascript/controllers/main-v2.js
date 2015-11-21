define(['angular'], function (angular) {
    'use strict';

    /**
     * @ngdoc function
     * @name <%= scriptAppName %>.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the <%= scriptAppName %>
     */
    angular.module('<%= scriptAppName %>.controllers.MainCtrl', [])
        .controller('MainCtrl', ['$scope', '$location', function ($scope, $location) {

            if(window.localStorage && window.localStorage.getItem('o2osellerLogintoHash')){
                var gotoHash = window.localStorage.getItem('o2osellerLogintoHash');
                //下面清除localstorage不一定成功，但是对程序没有影响
                window.localStorage.removeItem('o2osellerLogintoHash');
                $location.path(gotoHash);
            }
            else {
                //你的默认起始页
            }

    }]);
});
