define(['angular'], function (angular) {
    'use strict';

    /**
     * @ngdoc function
     * @name <%= scriptAppName %>.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Controller of the <%= scriptAppName %>
     */
    angular.module('<%= scriptAppName %>.controllers.LoginCtrl', [])
        .controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$cookies', function ($rootScope, $scope, $location, $cookies){

        //只有本地开发的时候才执行
        if($rootScope.systemData.renderByNode == false){
            //获取用户登录信息
            if(typeof($cookies._nk_) !== 'undefined' &&  $cookies._nk_ !== ''){//可验证
                $scope.isLogin = true;

                var nickName = (decodeURIComponent($cookies._nk_)),
                    newNickName = '';

                eval('newNickName = "' + nickName + '"');
                $scope.nickName = newNickName;

            }else{
                $scope.isLogin = false;
            }
        }

        //登录信息
        var protocol = window.location.protocol,
            isDaily = (window.location.href.indexOf('taobao.net') === -1) ? false : true,
            urlPre = isDaily ? protocol+'//login.daily.taobao.net/' : protocol+'//login.taobao.com/',
            loginPre = urlPre + 'member/',
            loginFrom = 'from=opopen',
            redirectURL = 'redirectURL=' + encodeURIComponent($location.absUrl());

        //登录链接
        $scope.getLoginHref = function(){
            return loginPre + 'login.jhtml?' + loginFrom + '&' + redirectURL;
        };

        //退出链接
        $scope.getLogoutHref = function(){
            return loginPre + 'logout.jhtml?' + loginFrom + '&' + redirectURL;
        };

        //退出登录
        $scope.loginOut = function () {
            location.href = $scope.getLogoutHref();
        };

        //监听302重新登录
        $scope.$on('gotoLogin', function () {
            //先保存到浏览器端，保证登录完后可以回调上次的hash
            var curHash = $location.path();
            window.localStorage && window.localStorage.setItem('o2osellerLogintoHash', curHash);
            location.href = $scope.getLoginHref();
        });

    }]);
});
