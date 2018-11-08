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

            $scope.link = function (title, view, id, data) {
                parent.angular.element(parent.$('#tabs')).scope().addTab(title, view, id, JSON.stringify(data));
            };

            httpMethod.index().then(function(rsp){
            	$scope.menuInfoList = rsp.data.menuInfo;
            })

        }])
});
