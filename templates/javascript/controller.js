define(['angular'], function (angular) {
    'use strict';

    /**
     * @ngdoc function
     * @name <%= scriptAppName %>.controller:<%= classedName %>Ctrl
     * @description
     * # <%= classedName %>Ctrl
     * Controller of the <%= scriptAppName %>
     */
    angular.module('<%= scriptAppName %>.controllers.<%= classedName %>Ctrl', [])
        .controller('<%= classedName %>Ctrl', ['$scope','$http','Apimap','$timeout','$modal','utils', function ($scope,$http,Apimap,$timeout,$modal,utils) {
        <% if(classedName == 'main') { %>
            if(window.localStorage && window.localStorage.getItem('o2osellerLogintoHash')){
                var gotoHash = window.localStorage.getItem('o2osellerLogintoHash');
                //下面清除localstorage不一定成功，但是对程序没有影响
                window.localStorage.removeItem('o2osellerLogintoHash');
                $location.path(gotoHash);
            }
            else {
                //你的默认起始页
            }
        <% } else { %>
        document.title = '你的页面标题';
        <% } %>

    }]);
});
