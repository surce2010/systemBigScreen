/**
 * Auth heyue
 * Date 2018-11-08
 */
define(['angular', 'jquery', 'lodash', 'ngDirective', 'httpMethod'], function (angular, $, _) {
    angular
        .module('pageModule', ['ngDirective', 'httpMethod'])
        .run(['$rootScope', function ($rootScope) {
        }])
        .controller('pageCtrl', ['$rootScope', '$scope', '$log', 'httpMethod', function ($rootScope, $scope, $log, httpMethod) {

            var id = window.frameElement && window.frameElement.id || '',
                obj = parent.$('#' + id).attr('data');
            $scope.menuInfo = obj ? JSON.parse(obj) : {};
            $scope.menuInfoList = $scope.menuInfo.menuInfoList

            $scope.link = function (title, view, id, data) {
                parent.angular.element(parent.$('#tabs')).scope().addTab(title, view, id, JSON.stringify(data));
            };

        }])
});
