/**
 * Auth dingshaohua
 * Date 2018-10-10
 */
define(['angular', 'jquery', 'lodash', 'ngDirective', 'ngHighCharts', 'ngEcharts', 'scrollbar', 'ngMapDrill', 'httpMethod'], function (angular, $, _) {
    angular
        .module('pageModule', ['ngDirective', 'ngHighCharts', 'ngMapDrill', 'ngEcharts', 'httpMethod'])
        .controller('pageCtrl', ['$rootScope', '$scope', '$log', '$timeout', 'httpMethod', function ($rootScope, $scope, $log, $timeout, httpMethod) {
            //获取当前时间向前的12个月列表
            function getMonthList() {
                var now = new Date(), y, m;
                var arr = [];
                for (var i = 0; i < 12; i++) {
                    now.setDate(-1);
                    y = now.getFullYear();
                    m = now.getMonth() + 1;
                    var obj = {
                        key: y + '-' + (m < 10 ? '0' + m : m),
                        value: y + '-' + (m < 10 ? '0' + m : m)
                    };
                    arr.push(obj);
                }
                var lastMonth = '2018-04';
                var index = _.findIndex(arr, function (item) {
                    return item.key === lastMonth;
                });
                $scope.monthList = index > 0 ? arr.slice(0, index + 1) : arr;
                $scope.month = $scope.monthList[0];
            }

            getMonthList();

            httpMethod.queryIndexInfo().then(function (rsp) {
                $scope.indexInfoList = rsp.data; //指标类型列表
                $scope.indexInfo = $scope.indexInfoList[0];
            });

            httpMethod.getLoginUserCommonRegion().then(function (rsp) {
                var loginUserCommonRegion = rsp.data; //登录人地区信息
                $rootScope.userCommonRegionID = loginUserCommonRegion.common_region_id;
                $scope.commonRegionId = loginUserCommonRegion.common_region_id;

                httpMethod.queryHeadSaleStockInfo({
                    common_region_id: loginUserCommonRegion.common_region_id
                }).then(function (rsp) {
                    $scope.headSaleStockInfo = rsp.data; //头部进销存数据展示
                });

                if (loginUserCommonRegion.POST_ROLE_LEVEL === '1') {
                    $scope.level = 'china';
                    $scope.currentRegionName = '全国';
                    $scope.navigationList = [{
                        name: '全国',
                        commonRegionId: loginUserCommonRegion.common_region_id
                    }];
                } else if (loginUserCommonRegion.POST_ROLE_LEVEL === '2') {
                    $scope.level = loginUserCommonRegion.REGION_ALIAS_NAME;
                    $scope.currentRegionName = loginUserCommonRegion.REGION_ALIAS_NAME;
                    $scope.navigationList = [{
                        name: loginUserCommonRegion.REGION_ALIAS_NAME,
                        commonRegionId: loginUserCommonRegion.common_region_id
                    }];
                }
            });

            $scope.regionConfig = {
                chart: {
                    type: 'pie',
                    backgroundColor: 'rgba(0,0,0,0)',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    text: ''
                },
                legend: {
                    itemStyle: {
                        color: '#fff',
                        fontSize: '12px'
                    },
                    itemHoverStyle: {
                        color: '#ccc'
                    },
                    symbolHeight: 10,
                    symbolWidth: 10,
                    symbolRadius: 0
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.1f}%</b>'
                },
                colors: ['#e2bb5d', '#887cff', '#00b4ff', '#79ca69'],
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 15,
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    data: []
                }],
                credits: {
                    enabled: false
                }
            };
            $scope.tradeConfig = {
                chart: {
                    type: 'pie',
                    backgroundColor: 'rgba(0,0,0,0)',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    text: ''
                },
                legend: {
                    itemStyle: {
                        color: '#fff',
                        fontSize: '12px'
                    },
                    itemHoverStyle: {
                        color: '#ccc'
                    },
                    symbolHeight: 10,
                    symbolWidth: 10,
                    symbolRadius: 0
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.1f}%</b>'
                },
                colors: ['#e2bb5d', '#887cff', '#00b4ff', '#79ca69'],
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 15,
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    data: []
                }],
                credits: {
                    enabled: false
                }
            };

            $scope.navigationToggle = function (index) {
                $scope.level = $scope.navigationList[index].name === '全国' ? 'china' : $scope.navigationList[index].name;
                $scope.commonRegionId = $scope.navigationList[index].commonRegionId;
                $scope.currentRegionName = $scope.navigationList[index].name;
                $scope.navigationList.splice(index + 1);
            };

            $scope.queryIndexSeqGroupRegion = function (commonRegionId) {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    index_id: _.get($scope, 'indexInfo.INDEX_ID'),
                    common_region_id: commonRegionId || $scope.commonRegionId
                };
                httpMethod.queryIndexSeqGroupRegion(params).then(function (rsp) {
                    if (rsp.data.AREA_LEVEL) {
                        $scope.mapData = rsp.data.list || [];
                        $scope.indexSum = rsp.data.INDEX_SUM || 0;
                        $scope.indexSeqGroupRegionList = rsp.data.list || [];
                    } else {
                        $scope.indexSum = rsp.data.INDEX_SUM || 0;
                        $scope.indexSeqGroupRegionList = rsp.data.list || [];
                    }
                });
            };

            $scope.orderIndexGroupRegionList = [{
                name: '',
                value: 0
            }];
            $scope.queryOrderIndexGroupRegion = function (commonRegionId) {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    index_id: _.get($scope, 'indexInfo.INDEX_ID'),
                    common_region_id: commonRegionId || $scope.commonRegionId
                };
                httpMethod.queryOrderIndexGroupRegion(params).then(function (rsp) {
                    var orderIndexGroupRegionList = [];
                    _.forEach(rsp.data, function (item, index) {
                        if (index < 4) {
                            var obj = {
                                name: item.REGION_NAME,
                                y: item.INDEX_COUNT
                            };
                            orderIndexGroupRegionList.push(obj);
                        }
                    });
                    $scope.regionConfig.series[0].data = orderIndexGroupRegionList;
                });
            };

            $scope.businessIndexList = [{
                name: '',
                value: 0
            }];
            $scope.queryBusinessIndex = function (commonRegionId) {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    index_id: _.get($scope, 'indexInfo.INDEX_ID'),
                    common_region_id: commonRegionId || $scope.commonRegionId
                };
                httpMethod.queryBusinessIndex(params).then(function (rsp) {
                    var businessIndexList = [];
                    _.forEach(rsp.data, function (item, index) {
                        if (index < 4) {
                            var obj = {
                                name: item.BUSINESS_NAME,
                                y: item.INDEX_COUNT
                            };
                            businessIndexList.push(obj);
                        }
                    });
                    $scope.tradeConfig.series[0].data = businessIndexList;
                });
            };

            $scope.config = {};

            $scope.queryIndexGroupDay = function (commonRegionId) {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    index_id: _.get($scope, 'indexInfo.INDEX_ID'),
                    common_region_id: commonRegionId || $scope.commonRegionId
                };
                httpMethod.queryIndexGroupDay(params).then(function (rsp) {
                    var xaxis = [], indexGroupDayList = [];
                    _.forEach(rsp.data, function (item) {
                        xaxis.push(item.DAY.substr(8));
                        indexGroupDayList.push(item.INDEX_COUNT);
                    });

                    $scope.config.indexGroupDay = {
                        tooltip: {
                            show: true,
                            trigger: 'axis',
                            formatter: function (data) {
                                return data[0].value;
                            }
                        },
                        grid: {
                            left: '0',
                            top: '30',
                            right: '0',
                            bottom: '40'
                        },
                        color: ['#FBFD0A'],
                        legend: {
                            show: false
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    rotate: 0,
                                    interval: 0,
                                    textStyle: {
                                        color: '#fff'
                                    },
                                    formatter: function (data) {
                                        return data + '日';
                                    }
                                },
                                axisTick: {
                                    show: false
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#6382b0',
                                        width: 1
                                    }
                                },
                                data: xaxis
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                axisTick: {
                                    show: false
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: false
                                },
                                axisLine: {
                                    show: false
                                }
                            }
                        ],
                        series: [{
                            name: '',
                            type: 'line',
                            label: {
                                show: true,
                                textStyle: {
                                    color: '#fcfd08',
                                    fontSize: '12'
                                }
                            },
                            lineStyle: {
                                color: '#2ff2e2'
                            },
                            itemStyle: {
                                normal: {
                                    color: '#fbfd09'
                                }
                            },
                            data: indexGroupDayList
                        }]
                    }
                });
            };

            $scope.$watchGroup(['month.key', 'indexInfo.INDEX_ID'], function (newVal) {
                if (newVal[0] !== undefined && newVal[1] !== undefined) {
                    if ($scope.commonRegionId) {
                        $scope.queryIndexSeqGroupRegion();
                        $scope.queryOrderIndexGroupRegion();
                        $scope.queryBusinessIndex();
                        $scope.queryIndexGroupDay();
                    }
                }
            });

            $scope.$watch('commonRegionId', function (newValue) {
                if (newValue) {
                    if (_.get($scope, 'month.key') !== undefined && _.get($scope, 'indexInfo.INDEX_ID') !== undefined) {
                        $scope.queryIndexSeqGroupRegion(newValue);
                        $scope.queryOrderIndexGroupRegion(newValue);
                        $scope.queryBusinessIndex(newValue);
                        $scope.queryIndexGroupDay(newValue);
                    }
                }
            });

            $scope.$watch('indexInfo.INDEX_NAME', function (newValue) {
                if (newValue) {
                    $scope.wrapTitle = newValue + '指标排名';
                } else {
                    $scope.wrapTitle = '指标排名';
                }
            });
        }])
        .controller('topBandCtrl', ['$scope', '$rootScope', 'httpMethod', function ($scope, $rootScope, httpMethod) {
            $scope.selectIndex = 1;
            $scope.toggleShow = function (val) {
                $scope.selectIndex = val;
            };

            $scope.queryTop12Brand = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    common_region_id: $rootScope.userCommonRegionID
                };
                httpMethod.queryTop12Brand(params).then(function (rsp) {
                    $scope.top12BrandList = rsp.data || [];
                });
            };

            $scope.queryTop6GrowthBrand = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    common_region_id: $rootScope.userCommonRegionID
                };
                httpMethod.queryTop6GrowthBrand(params).then(function (rsp) {
                    $scope.top6GrowthBrand = rsp.data || [];
                });
            };

            $scope.queryTop6FeatureBrand = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    common_region_id: $rootScope.userCommonRegionID
                };
                httpMethod.queryTop6FeatureBrand(params).then(function (rsp) {
                    $scope.top6FeatureBrand = rsp.data || [];
                });
            };

            $rootScope.$watch('userCommonRegionID', function (newValue) {
                if (newValue) {
                    if (_.get($scope, 'month.key') !== undefined) {
                        $scope.queryTop12Brand();
                        $scope.queryTop6GrowthBrand();
                        $scope.queryTop6FeatureBrand();
                    }
                }
            });

            $scope.$watch('month.key', function (newValue) {
                if (newValue) {
                    if ($rootScope.userCommonRegionID) {
                        $scope.queryTop12Brand();
                        $scope.queryTop6GrowthBrand();
                        $scope.queryTop6FeatureBrand();
                    }
                }
            });
        }])
        .controller('topModelCtrl', ['$scope', '$rootScope', 'httpMethod', function ($scope, $rootScope, httpMethod) {
            $scope.selectIndex = 1;
            $scope.toggleShow = function (val) {
                $scope.selectIndex = val;
            };

            $scope.queryTop10SaleModel = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    common_region_id: $rootScope.userCommonRegionID
                };
                httpMethod.queryTop10SaleModel(params).then(function (rsp) {
                    $scope.top10SaleModel = rsp.data || [];
                });
            };

            $scope.queryTop10FznModel = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    common_region_id: $rootScope.userCommonRegionID
                };
                httpMethod.queryTop10FznModel(params).then(function (rsp) {
                    $scope.top10FznModel = rsp.data || [];
                });
            };

            $rootScope.$watch('userCommonRegionID', function (newValue) {
                if (newValue) {
                    if (_.get($scope, 'month.key') !== undefined) {
                        $scope.queryTop10SaleModel();
                        $scope.queryTop10FznModel();
                    }
                }
            });

            $scope.$watch('month.key', function (newValue) {
                if (newValue) {
                    if ($rootScope.userCommonRegionID) {
                        $scope.queryTop10SaleModel();
                        $scope.queryTop10FznModel();
                    }
                }
            });
        }])
        .controller('topChannelCtrl', ['$scope', '$rootScope', 'httpMethod', function ($scope, $rootScope, httpMethod) {
            $scope.queryInfoGroupChannelType = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    common_region_id: $rootScope.userCommonRegionID
                };
                httpMethod.queryInfoGroupChannelType(params).then(function (rsp) {
                    $scope.infoGroupChannelTypeList = rsp.data || [];
                });
            };

            $rootScope.$watch('userCommonRegionID', function (newValue) {
                if (newValue) {
                    if (_.get($scope, 'month.key') !== undefined) {
                        $scope.queryInfoGroupChannelType();
                    }
                }
            });

            $scope.$watch('month.key', function (newValue) {
                if (newValue) {
                    if ($rootScope.userCommonRegionID) {
                        $scope.queryInfoGroupChannelType();
                    }
                }
            });
        }])
});
