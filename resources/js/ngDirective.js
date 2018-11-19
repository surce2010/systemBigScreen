'use strict';
angular
    .module('ngDirective', ['ui.bootstrap'])
    .run(function ($templateCache) {
        var select = '<div class="ng-select-box" ng-class="{disabled:allow || !list.length}"><input type="text" placeholder="请选择.." ng-model="value[selectName]" ng-click="showList()" readonly/><ul class="select-opt-list" ng-show="showOpt"><li ng-click="checkedItem(item)" ng-repeat="item in list" ng-bind="item[selectName]"></li></ul><span ng-click="delValue()" ng-show="isShow && !require">X</span><div ng-click="showList()" class="select-bg"></div></div>';
        var city = '<div class="ng-city-check"><input ng-click="cityCheck()" type="text" ng-class="{\'not-allow\': allow}" ng-model="checkedAreaName" placeholder="请选择..." readonly><div ng-click="cityCheck()" ng-disabled="allow" class="btn-location"></div><div class="city-check-box" ng-show="visible" ng-cloak><uib-tabset active="key"><uib-tab ng-repeat="(key, item) in nameList track by $index" index="$index" heading="{{item}}"><div class="city-content"><li class="city-item" ng-class="{current: $index === checkedIndexList[key]}" ng-repeat="opt in itemList[$index]" ng-click="handleSelectCity(key, $index, opt)">{{opt[name]}}</li></div></uib-tab></uib-tabset></div><span ng-click="delValue()" ng-show="require && value.commonRegionId">X</span></div>';
        var pages = '<div class="text-right page mt10">' +
            '<ul uib-pagination total-items="total" items-per-page="pageSize" ng-model="currentPage" max-size="maxSize || 4" ng-change="pageChanged()" class="pagination-sm" boundary-links="true" rotate="false" first-text="首页" last-text="尾页" previous-text="上一页" next-text="下一页"></ul>' +
            '<div class="page-num">共<span class="number" ng-bind="pageNum"></span>页，到第<input type="text" class="number" ng-model="pageTo">页</div><button class="confirm-btn" ng-click="confirmPage(pageTo)">确定</button></div>';
        var unit = '<div class="ng-unit-box" ng-class="{disabled: !list.length}">单位：<span class="value-box" ng-bind="value[selectName]" ng-click="showList()"></span><ul class="select-opt-list" ng-show="showOpt"><li ng-click="checkedItem(item)" ng-repeat="item in list" ng-bind="item[selectName]"></li></ul></div>';

        $templateCache.put('select.html', select);
        $templateCache.put('city.html', city);
        $templateCache.put('pages.html', pages);
        $templateCache.put('unit.html', unit);
    })
    .directive('ngSelect', function () {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                value: '=', //初始值
                selectId: '@', //下拉框对应Id
                selectName: '@', //下拉框显示名称
                list: '=', //下拉框列表信息
                allow: '=', //是否禁用下拉框
                require: '@' //是否可设置为空
            },
            templateUrl: 'select.html',
            link: function (scope, element, attr) {
                scope.$watch('value', function (newObj) {
                    if (newObj) {
                        scope.isShow = !scope.allow;
                    } else {
                        scope.isShow = false;
                    }
                });
                scope.showOpt = false;
                scope.delValue = function () {
                    scope.value = null;
                };
                scope.checkedItem = function (item) {
                    scope.value = item;
                    scope.showOpt = false;
                };
                scope.showList = function () {
                    if (!scope.allow && scope.list.length) {
                        scope.showOpt = !scope.showOpt;
                    }
                };
                angular.element('body').click(function (e) {
                    var flag = element[0].contains(e.target);
                    if (!flag) {
                        scope.showOpt = false;
                        scope.$apply();
                    }
                });
            }
        };
    })
    .directive('ngScrollBar', function () {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {},
            template: '<div><ng-transclude></ng-transclude></div>',
            link: function (scope, iElm, iAttrs) {
                var observer = new MutationObserver(function (mutationsList) {
                    for (var mutation of mutationsList) {
                        if (mutation.type === 'childList') {
                            setTimeout(function () {
                                iElm.scrollbar({
                                    direction: 'y',
                                    contentCls: 'scroll-content',
                                    trackCls: 'track'
                                });
                            }, 50);
                        }
                    }
                });
                observer.observe(iElm.find('.scroll-content')[0], {
                    attributes: true,
                    childList: true,
                    subtree: true
                });
            }
        };
    })
    .directive('ngXScrollBar', function () {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {},
            template: '<div><ng-transclude></ng-transclude></div>',
            link: function (scope, iElm, iAttrs) {
                setTimeout(function () {
                    iElm.scrollbar({
                        direction: 'x',
                        contentCls: 'scroll-content',
                        trackCls: 'track-x'
                    });
                }, 500);
            }
        };
    })
    .directive('ngRegionSelection', function () {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                value: '=', //选择的值
                list: '=', //地区列表
                name: '@', //地区名称
                code: '@', //地区Id
                nameList: '=', //标题名列表
                require: '=', /*是否可删除*/
                allow: '=' /*禁用标识*/
            },
            templateUrl: 'city.html',
            link: function (scope, element, attr) {
                scope.visible = false;
                scope.key = 0;
                scope.provinceIndex = '';
                scope.cityIndex = '';
                scope.areaId = '';
                scope.provinceName = '';
                scope.cityName = '';
                scope.checkedAreaName = '';

                scope.cityCheck = function () {
                    if (!scope.allow) {
                        scope.visible = !scope.visible;
                    }
                };
                scope.handleSelectCity = function (key, index, item) {
                    if ((scope.key + 1) < scope.itemList.length) {
                        scope.checkedIndexList[key] = index;
                        scope.checkedNameList[scope.key] = item.regionName;
                        _.map(scope.checkedIndexList, function (item, index) {
                            if (index > key) {
                                scope.checkedIndexList[index] = null;
                            }
                        });
                        _.map(scope.checkedNameList, function (item, index) {
                            if (index > key) {
                                scope.checkedNameList[index] = null;
                            }
                        });
                        _.map(scope.itemList, function (item, index) {
                            if (index > key) {
                                scope.itemList[index] = [];
                            }
                        });
                        scope.key = key + 1;
                        scope.itemList[scope.key] = item.childrenCommon;
                    } else {
                        scope.visible = false;
                        scope.checkedIndexList[scope.key] = index;
                        scope.checkedNameList[scope.key] = item.regionName;
                    }
                    scope.value = item;
                    scope.checkedAreaName = scope.checkedNameList.join(' ')
                };
                scope.delValue = function () {
                    scope.key = 0;
                    scope.value = null;
                    scope.checkedIndexList = new Array(scope.nameList.length);
                    scope.checkedNameList = new Array(scope.nameList.length);
                    scope.itemList = new Array(scope.nameList.length);
                    scope.itemList[0] = scope.list;
                    scope.checkedAreaName = '';
                };
                scope.$watch('nameList', function (newValue) {
                    if (newValue) {
                        scope.itemList = new Array(newValue.length);
                        scope.checkedIndexList = new Array(newValue.length);
                        scope.checkedNameList = new Array(newValue.length);
                        scope.itemList[0] = scope.list;
                    }
                });
                scope.firstTime = 1;
                scope.$watch('value', function (item) {
                    if (item && scope.firstTime === 1) {
                        scope.checkedAreaName = item[scope.name];
                        scope.firstTime++;
                    }
                });
                angular.element('body').click(function (e) {
                    var flag = element[0].contains(e.target);
                    if (!flag) {
                        scope.visible = false;
                        scope.$apply();
                    }
                });
            }
        };
    })
    .directive('ngPages', function () {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                pageSize: '=', //每页显示条数
                total: '=', //总条数
                currentPage: '=', //当前页的页码
                querySubmit: '&', //查询的方法
                maxSize: '=', //分页页码最大展示个数
                pageNum: '=' //总页数
            },
            templateUrl: 'pages.html',
            link: function (scope, iElm, iAttrs, controller) {
                scope.pageChanged = function () {
                    scope.querySubmit({
                        currentPage: scope.currentPage,
                        pageSize: scope.pageSize
                    });
                };
                scope.confirmPage = function (page) {
                    scope.currentPage = page;
                    scope.pageChanged();
                };
            }
        };
    })
    .directive('ngUnit', function () {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                value: '=', //初始值
                selectId: '@', //下拉框对应Id
                selectName: '@', //下拉框显示名称
                list: '=', //下拉框列表信息
                // allow: '=', //是否禁用下拉框
                // require: '@' //是否可设置为空
            },
            templateUrl: 'unit.html',
            link: function (scope, element, attr) {
                // scope.$watch('value', function (newObj) {
                //     if (newObj) {
                //         scope.isShow = !scope.allow;
                //     } else {
                //         scope.isShow = false;
                //     }
                // });
                scope.showOpt = false;
                // scope.delValue = function () {
                //     scope.value = null;
                // };
                scope.checkedItem = function (item) {
                    scope.value = item;
                    scope.showOpt = false;
                };
                scope.showList = function () {
                    if (scope.list.length) {
                        scope.showOpt = !scope.showOpt;
                    }
                };
                angular.element('body').click(function (e) {
                    var flag = element[0].contains(e.target);
                    if (!flag) {
                        scope.showOpt = false;
                        scope.$apply();
                    }
                });
            }
        };
    });

