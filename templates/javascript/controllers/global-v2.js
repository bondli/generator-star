define(['angular'], function (angular) {
    'use strict';

    /**
     * @ngdoc function
     * @name <%= scriptAppName %>.controller:GlobalCtrl
     * @description
     * # GlobalCtrl
     * Controller of the <%= scriptAppName %>
     */
    angular.module('<%= scriptAppName %>.controllers.GlobalCtrl', [])
        .controller('GlobalCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

        //显示toast事件
        $scope.$on('showToast', function (event, msg) {

            var msgObj = msg.split('|');
            $scope.toastType = msgObj[0];
            $scope.toastMsg = msgObj[1];

            $scope.toastshow = true;

            $timeout(function(){
                $scope.toastshow = false;
            },3000);

        });

        //重新登录
        $scope.$on('loginAgain', function (event, msg) {
            $scope.$broadcast('gotoLogin', msg);
        });

    }]);
});
