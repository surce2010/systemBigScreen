'use strict';
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', 'highcharts', 'highcharts-3d'], factory);
    } else if (typeof exports === 'object') {
        factory(require('angular'), require('highcharts'), require('highcharts-3d'));
        module.exports = 'ngHighCharts';
    } else {
        // Browser globals (root is window), we don't register it.
        factory(root.angular);
    }
})(this, function (angular) {
    angular
        .module('ngHighCharts', [])
        .directive('highCharts', function () {
            return {
                restrict: 'EA',
                scope: {
                    config: '='
                },
                link: function ($scope, element) {
                    $scope.$watch('config', function (newValue) {
                        $(element).highcharts(newValue);
                    }, true);
                }
            }
        })
});
