define(['angular'], function (angular) {
    'use strict';

    /**
     * @ngdoc service
     * @name <%= scriptAppName %>.Apimap
     * @description
     * # Apimap
     * Service in the <%= scriptAppName %>.
     */
    angular.module('<%= scriptAppName %>.services.Apimap', []).service('Apimap', function Apimap() {
        var protocol = window.location.protocol,
            //port = window.location.port,
            isDaily = (window.location.href.indexOf('taobao.net') === -1) ? false : true,
            apiUrlPre = isDaily ? protocol + '//o2oseller.daily.taobao.net/' : protocol + '//o2oseller.taobao.com/',
            curHost = window.location.hostname;

        if(curHost === '127.0.0.1' || curHost === 'localhost'){
            return {
                //通用接口，无需修改
                'nav' : 'data/nav.json',
                'uploadbyCorp' : 'data/submit.json',
                'upload' : 'data/submit.json',
                //你的接口
                'todo' : 'data/todo.do'
            };
        }
        return {
            //通用接口，无需修改
            'nav' : apiUrlPre + 'common/OpMenuAction.action?action=/common/OpMenuAction&event_submit_doLeftList=1&key=info',
            'uploadbyCorp' : apiUrlPre + 'common/OpImageAction.action?action=/common/OpImageAction&event_submit_doUploadString=1',
            'upload' : apiUrlPre + 'common/OpImageUpload.do',
            //你的接口
            'todo' : apiUrlPre + 'todo/todo.do'
        };
    });
});
