'use strict';
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', 'echarts'], factory);
    } else if (typeof exports === 'object') {
        factory(require('angular'), require('echarts'));
        module.exports = 'ngEcharts';
    } else {
        // Browser globals (root is window), we don't register it.
        factory(root.angular);
    }
})(this, function (angular, echarts) {
    angular
        .module('ngEcharts', [])
        .directive('eChart', function () {
            return {
                restrict: 'EA',
                scope: {
                    options: '='
                },
                replace: true,
                template: '<div style="width:100%; height:100px;"></div>',
                link: function ($scope, element) {
                    $scope.options = {tooltip: {}, grid: {}, color: [], legend: {}, xAxis: [], yAxis: [], series: []};

                    var container = element.parent();
                    var resizeMainContainer = function () {
                        element[0].style.width = container.width() + 'px';
                        element[0].style.height = container.height() + 'px';
                    };
                    resizeMainContainer();
                    var myChart = echarts.init(element[0]);
                    $scope.$watch('options', function (newValue) {
                        myChart.setOption(newValue);
                    }, true);
                    window.addEventListener('resize', function () {
                        resizeMainContainer();
                        myChart.resize();
                    });
                }
            }
        })
});
