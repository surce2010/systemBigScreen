/**
 * Auth heyue
 * Date 2018-11-08
 */
define(['angular', 'jquery', 'lodash', 'ngDirective', 'httpMethod', 'ngStorage'], function (angular, $, _) {
    angular
        .module('pageModule', ['ngDirective', 'httpMethod', 'ngStorage'])
        .run(['$rootScope', function ($rootScope) {
        }])
        .controller('pageCtrl', ['$rootScope', '$scope', '$log', 'httpMethod', '$sessionStorage', function ($rootScope, $scope, $log, httpMethod, $sessionStorage) {

            var id = window.frameElement && window.frameElement.id || '',
                obj = parent.$('#' + id).attr('data');
            $scope.menuInfo = obj ? JSON.parse(obj) : {};

            if($scope.menuInfo.resourceId){
                $sessionStorage['page3MenuInfo'] = JSON.stringify($scope.menuInfo);
            }else {
                $scope.menuInfo = $sessionStorage['page3MenuInfo'] ? JSON.parse($sessionStorage['page3MenuInfo']) : {};
            };

            $scope.menuInfoList = $scope.menuInfo.menuInfoList;

            $scope.link = function (title, view, id, data) {
                parent.angular.element(parent.$('#tabs')).scope().addTab(title, view, id, JSON.stringify(data));
            };

        }])
});
