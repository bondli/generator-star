/*jshint unused: vars */
define(['angular']/*deps*/, function (angular)/*invoke*/ {
    'use strict';

    /**
     * @ngdoc overview
     * @name <%= scriptAppName %>
     * @description
     * # <%= scriptAppName %>
     *
     * Main module of the application.
     */
    return angular.module('<%= scriptAppName %>', [/*angJSDeps*/
        'ngCookies',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        //'angularFileUpload',
        //'ngImgCrop',
        'ui.star',
        'project.tpl'
    ])
    .factory('responseErrorHandel', ['$q', '$rootScope', function($q, $rootScope) {

        var responseErrorHandel = {
            request: function(config) {
                //在url 上默认添加tb_token;
                var inputs = document.getElementsByName('_tb_token_');
                var token = '_tb_token_=' + (inputs.length ? inputs[0].value : '');
                //tmpl 不添加改变
                if(config.url.indexOf('.html') === -1){
                    config.url += config.url.indexOf('?')===-1 ? '?' : '&';
                    config.url += token;
                    config.url += '&_input_charset=utf-8'; //设置中文编码

                    //允许跨域传cookies
                    config.withCredentials = true;
                }

                //请求开始时间
                config.startTime = new Date().getTime();

                return config;
            },
            response: function(response) {
                var data = response.data,
                    flag = 0;

                //只对接口做拦截
                if(response.config.url.indexOf('.html') === -1){
                    //登录态过期
                    if(data.errCode === 'never_login_error_code'){
                        $rootScope.$broadcast('loginAgain', 'error');
                    }
                    else if(data.errCode === 'never_entry_error_code'
                        || data.errCode === 'has_protocol_sigined'
                        || data.errCode === 'has_no_store'
                        || data.errCode === 'has_no_auth'
                        || data.errCode === 'user_status_error'
                    ){
                        $rootScope.$broadcast('showToast', 'error|' + (data.errMsg || '没有权限'));
                        setTimeout(function(){
                            window.location.href = data.errUrl || '/';
                        }, 2000);
                    }
                    else if(data.errCode && data.errCode != 0){
                        flag = 1;
                        $rootScope.$broadcast('showToast', 'error|' + (data.errMsg || '操作失败'));
                    }

                    //__WPO上报ajax返回码
                    typeof(__WPO)!=='undefined' && __WPO.retCode(
                        window.location.protocol + '//' + window.location.hostname + '/' + response.config.url,
                        true,
                        new Date().getTime() - response.config.startTime,
                        '获取数据成功-' + flag
                    );
                }

                return response;
            },
            //对异常错误信息的统一处理
            responseError: function(rejection) {
                $rootScope.$broadcast('showToast', 'error|' + '系统错误，请稍后再试');
                if(rejection.status === 0) {
                    //$rootScope.$broadcast('loginAgain', 'error');
                }

                //__WPO上报ajax返回码
                typeof(__WPO)!=='undefined' && __WPO.retCode(
                    window.location.protocol + '//' + window.location.hostname + '/' + response.config.url,
                    false,
                    new Date().getTime() - rejection.config.startTime,
                    '获取数据失败-' + rejection.status
                );

                return $q.reject(rejection);
            }
        };
        return responseErrorHandel;

    }])
    .config(['datepickerConfig', '$httpProvider', function(datepickerConfig, $httpProvider) {

        datepickerConfig.showWeeks = false;

        //设置默认http配置
        $httpProvider.defaults.headers = angular.extend($httpProvider.defaults.headers,{
            post: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            get: {
                'If-Modified-Since' : '0'
            }
        });

        $httpProvider.defaults.transformRequest = function (obj){
            var str = [];
            for(var p in obj){
                str.push( p + '=' + encodeURIComponent(obj[p]) );
            }
            return str.join('&');
        };

        //允许跨域传cookies
        $httpProvider.defaults.withCredentials = true;

        $httpProvider.interceptors.push('responseErrorHandel');

    }])
    .config(function ($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.otherwise('/index');
        $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        });

    });
});
