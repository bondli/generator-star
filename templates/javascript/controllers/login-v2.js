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
        .controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$cookies', '$http', 'Apimap', function ($rootScope, $scope, $location, $cookies, $http, Apimap){

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

        //获取头像
        $scope.userAvatar = function () {
            var userId = $cookies.unb || 1;
            return 'https://wwc.alicdn.com/avatar/getAvatar.do?userId='+userId+'&width=40&height=40&type=sns';
        };

        //左侧收缩
        $scope.toggleSidebar = function(){
            $rootScope.systemData.navBarClose = !!!$rootScope.systemData.navBarClose;
        };

        //监听302重新登录
        $scope.$on('gotoLogin', function () {
            //先保存到浏览器端，保证登录完后可以回调上次的hash
            var curHash = $location.path();
            window.localStorage && window.localStorage.setItem('o2osellerLogintoHash', curHash);
            location.href = $scope.getLoginHref();
        });

        var isloading = false;
        $scope.menusShowHide = false;
        $scope.queryMenuSetItem = function(item) {
            //修改默认的文本
            $scope.menukey = item.title;
            if(item.url){
                window.location.href = item.url;
            }
            return $scope.menusShowHide = false;
        };
        //执行搜索
        $scope.queryMenu = function(){
            if(!$scope.menukey || isloading){
                return;
            }
            isloading = true;

            $http.get(Apimap.menu, {params: {'key': $scope.menukey}}).success(function(res){
                isloading = false;
                if (res.dataList.length == 0){
                    $scope.menusShowHide = false;
                    return;
                }

                $scope.menusShowHide = true;

                var datalist = res.dataList,
                    list = [],
                    count = 0,
                    max = 10;

                for (var i = datalist.length - 1; i >= 0; i--){
                    if(count >= max){ //只取10条记录
                        return;
                    }
                    list.push({
                        'url': datalist[i].url,
                        'title': datalist[i].title
                    });
                    count++;
                }

                $scope.menuItems = list;

            }).error(function(e){
                isloading = false;
                $scope.menusShowHide = false;
            });
        };

    }]);
});
