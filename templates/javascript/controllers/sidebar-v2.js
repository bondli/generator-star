define(['angular'], function (angular) {
    'use strict';

    /**
     * @ngdoc function
     * @name <%= scriptAppName %>.controller:SidebarCtrl
     * @description
     * # SidebarCtrl
     * Controller of the <%= scriptAppName %>
     */
    angular.module('<%= scriptAppName %>.controllers.SidebarCtrl', [])
        .controller('SidebarCtrl', ['$rootScope', '$scope', '$http', 'Apimap', '$location',
        function($rootScope, $scope, $http, Apimap, $location){

        //定义项目中内部controller也要使菜单高亮
        var menuList = {
            'detail' : 'list',
            'edit' : 'list'
        };

        //只有本地开发的时候才需要发请求获取
        if($rootScope.systemData.renderByNode == false){
            $http.get(Apimap.nav).success(function(data){
                $scope.navList = data.dataList || [];
                //解决可能会有部分模块用户因权限看不到带来前端显示的菜单bug
                $scope.currList = [];
                for(var i in $scope.navList){
                    if($scope.navList[i].isCurrent == true){
                        $scope.currList = $scope.navList[i].subList;
                    }
                }
            }).error(function(){});
        }

        //获取当前url的hash值
        var getRoute = function(path){
            var pathArr = path.substring(1).split('/'),
                hash = pathArr[0];

            if(menuList[hash]){
                return menuList[hash];
            }
            else{
                return hash;
            }
        };

        $rootScope.oActive = getRoute($location.url());
        $rootScope.$on('$locationChangeSuccess',function(){
            var routeHash = getRoute($location.url());
            if(menuList[routeHash]){
                $rootScope.oActive = menuList[routeHash];
            }
            else{
                $rootScope.oActive = routeHash;
            }
        });

        //获取url上的hash值
        $scope.getHash = function(url){
            var urlArr = url.split('#');
            if(urlArr[1]){
                var tmp = urlArr[1].split('/');
                return tmp[1];
            }
            else{
                return '';
            }
        };

    }]);
});
