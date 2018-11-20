/**
 * 公共的require配置
 */

require.config({
    baseUrl: '../../resources/js',
    urlArgs: 'v=20180717',
    paths: {
        'angular': './angular.min',
        'jquery': './jquery.min',
        'lodash': './lodash.min',
        'ui-bootstrap-tpls': './ui-bootstrap-tpls-2.1.3',
        'mock': './mock',
        'mockData': './mockData',
        'httpServer': './httpServer',
        'httpMethod': './httpMethod',
        'ngDirective': './ngDirective',
        'echarts': './echarts',
        'china': './china',
        'ngEcharts': './ngEcharts',
        'ngMapDrill': './ngMapDrill',
        'highcharts': './highcharts',
        'highcharts-3d': './highcharts-3d',
        'ngHighCharts': './ngHighCharts',
        'jqueryDialog': './jquery.dialog',
        'ngJqueryDialog': './ngJqueryDialog',
        'scrollbar': './jquery.scrollbar',
        'moment': './moment',
        'ngStorage': './ngStorage.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'ui-bootstrap-tpls': {
            deps: ['angular']
        },
        'httpServer': {
            deps: ['angular'],
            exports: 'httpServer'
        },
        'httpMethod': {
            deps: ['angular', 'httpServer'],
            exports: 'httpMethod'
        },
        'ngDirective': {
            deps: ['angular', 'ui-bootstrap-tpls']
        },
        'ngEcharts': {
            deps: ['angular', 'echarts']
        },
        'highcharts-3d': {
            deps: ['highcharts']
        },
        'ngHighCharts': {
            deps: ['angular', 'highcharts-3d', 'highcharts']
        },
        'jqueryDialog': {
            deps: ['jquery']
        },
        'ngJqueryDialog': {
            deps: ['jquery', 'angular', 'jqueryDialog']
        },
        'scrollbar': {
            deps: ['jquery']
        },
        'moment': {
            init: function (moment) {
                return moment;
            }
        },
        'ngStorage': {
            deps: ['angular']
        }
    }
});

require(['jquery'], function ($) {
    var currentPage = $('#page').attr('current-page');
    var targetModule = $('#page').attr('target-module');

    // mockData 加载与否决定是否启用模拟数据
    require(['angular', 'mockData', currentPage], function (angular) {
        angular.bootstrap(document, [targetModule]);
    });
});
