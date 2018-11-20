/**
 * Auth nieyalan
 * Date 2018-10-15
 */
define(['angular', 'jquery', 'lodash', 'ngDirective', 'httpMethod'], function (angular, $, _) {
    angular
        .module('indexModule', ['ngDirective', 'httpMethod'])
        .run(['$rootScope', function ($rootScope) {
            $rootScope.myCheck = '首页';
        }])
        .controller('indexCtrl', ['$scope', '$rootScope', 'httpMethod', 'JqueryDialog', '$window', '$log', function ($scope, $rootScope, httpMethod, JqueryDialog, $window, $log) {

            $scope.menuInfo = [{
                'menuPath': '../page1/page1.html',
                'resourceId': '500',
                'dispOrder': 0,
                'parentResourceId': '',
                'resourceName': '首页'
            }, {
                'menuPath': '../page2/page2.html',
                'resourceId': '501',
                'dispOrder': 1,
                'parentResourceId': '',
                'resourceName': '图形化报表'
            }, {
                'menuPath': '../page3/page3.html',
                'resourceId': '502',
                'dispOrder': 1,
                'parentResourceId': '',
                'resourceName': '固化报表'
            }];

            //获取用户信息
            var param = {
                'sysMenuTypeCd': '2'
            };
            httpMethod.loadUserInfo(param).then(function (rsp) {
                $log.log('调用获取用户信息接口成功.');
                if (rsp.success) {
                    $scope.userInfo = rsp.data.userInfo;
                    var menuInfoList = rsp.data.menuInfo;
                    menuInfoList.sort(function (a, b) {
                        return a.orderSeq - b.orderSeq;
                    });
                    $scope.menuInfo[2].menuInfoList = menuInfoList;
                } else {
                    $window.location.href = '/psm/login.jsp';
                }
            }, function () {
                $log.log('调用获取用户信息接口失败.');
            });

            $scope.loginOut = function () {
                JqueryDialog.confirm('提示', '您确定要退出账户吗？', function () {
                    httpMethod.loginOut().then(function (rsp) {
                        if (rsp.success) {
                            $window.location.href = '/psm/login.jsp';
                        } else {
                            JqueryDialog.error('提示', '用户退出失败!');
                        }
                    }, function () {

                    });
                });
            };

            //跳转进销存
            $scope.redirectToVisualReport = function () {
                $window.location.href = '/psm/index.jsp';
            }
        }])

        // tabs标签
        .controller('tabsCtrl', ['$scope', '$rootScope', '$log', '$sce', function ($scope, $rootScope, $log, $sce) {
            var tabs = [];
            tabs[0] = {
                title: '首页',
                url: $sce.trustAsResourceUrl('../page1/page1.html'),
                id: '500',
                data: null
            };
            var maxSize = 8; // 最多打开8个标签页
            $scope.tabs = tabs;
            $scope.selectedIndex = 0;
            /**
             * 添加Tab标签
             * @title 标签名称
             * @view URL
             * @id DOM的ID
             * @data 传递给DOM的数据
             */
            $scope.addTab = function (title, view, id, data) {
                $rootScope.myCheck = title;
                var isHas = tabs.some(function (item, index) {
                    return item.title === title
                });
                if (!isHas) {
                    if (tabs.length >= maxSize) {
                        $scope.removeTab(0);
                    }
                    var index = tabs.push({
                        title: title,
                        url: $sce.trustAsResourceUrl(view),
                        id: id || '',
                        data: data || ''
                    });
                    $scope.changeTab(index - 1);
                } else {
                    var selectedIndex;
                    tabs.map(function (item, index) {
                        if (item.title === title) {
                            selectedIndex = index;
                        }
                    });
                    tabs[selectedIndex] = {
                        title: title,
                        url: $sce.trustAsResourceUrl(view),
                        id: id || '',
                        data: data || ''
                    };
                    $scope.changeTab(selectedIndex);
                }
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };
            /**
             * 删除Tab标签
             * @index 需要删除的索引
             */
            $scope.removeTab = function (index) {
                var i = index === undefined ? $scope.selectedIndex : index;
                if (i <= $scope.selectedIndex) {
                    $scope.changeTab($scope.selectedIndex ? $scope.selectedIndex - 1 : $scope.selectedIndex);
                }
                tabs.splice(i, 1);

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };
            /**
             * 切换展示的Tab索引
             * @index 切换后的索引值
             */
            $scope.changeTab = function (selectedIndex) {
                $scope.selectedIndex = selectedIndex;
            };
        }])

        .directive('tabsContentDirective', function () {
            return {
                restrict: 'E',
                template: '<div class="tabs-content" ng-show="$index===selectedIndex" ng-repeat="tab in tabs">' +
                '<iframe ng-src="{{tab.url}}" id="{{tab.id}}" data="{{tab.data}}" class="iframe-box" frameborder="0"></iframe>' +
                '</div>',
                link: function ($scope, iElm, iAttrs) {
                    $('.tab-container').height(document.documentElement.clientHeight - 50);
                    $('.tabs-content').height(document.documentElement.clientHeight - 50);
                }
            };
        })
});
