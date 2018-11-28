/**
 * Auth dingshaohua
 * Date 2018-06-29
 */
define(['angular', 'jquery', 'lodash', 'ngDirective', 'ngHighCharts', 'ngEcharts', 'httpMethod'], function (angular, $, _) {
    angular
        .module('pageModule', ['ngDirective', 'ngHighCharts', 'ngEcharts', 'httpMethod'])
        .run(['$rootScope', function ($rootScope) {
        }])
        .controller('pageCtrl', ['$rootScope', '$scope', '$log', '$interval', 'httpMethod', function ($rootScope, $scope, $log, $interval, httpMethod) {
            $scope.link = function (title, view, id, data) {
                parent.angular.element(parent.$('#tabs')).scope().addTab(title, view, id, data);
            };
            $scope.unitPurchaseList = [{
                unitId: 10000,
                unitName: '万台'
            }, {
                unitId: 1,
                unitName: '个台'
            }];
            $scope.unitSaleList = [{
                unitId: 10000,
                unitName: '万'
            }, {
                unitId: 1,
                unitName: '个'
            }];
            $scope.checkedPurchaseUnit = $scope.unitPurchaseList[0];//1
            $scope.checkedSalesAmountUnit = $scope.unitPurchaseList[0];//2
            $scope.checkedStructureUnit = $scope.unitPurchaseList[0];//3
            $scope.checkedSaleUnit = $scope.unitSaleList[0];//5
            $scope.checkedZzcInfoUnit = $scope.unitPurchaseList[0];//6
            $scope.checkedInStockTimeUnit = $scope.unitPurchaseList[0];//7
            $scope.checkedInStockPriceUnit = $scope.unitPurchaseList[0];//8
            $scope.checkedStockBrandUnit = $scope.unitPurchaseList[0];//9
            $scope.checkedStockModelUnit = $scope.unitPurchaseList[0];//10
            $scope.checkedShopBrandUnit = $scope.unitPurchaseList[0];//11
            $scope.checkedShopModelUnit = $scope.unitPurchaseList[0];//12
            $scope.checkedRetailBrandUnit = $scope.unitPurchaseList[0];//13
            $scope.checkedRetailModelUnit = $scope.unitPurchaseList[0];//14

            function getTimeStamp() {
                var now = new Date(),
                    y = now.getFullYear(),
                    m = now.getMonth() + 1,
                    d = now.getDate(),
                    H = now.getHours(),
                    M = now.getMinutes(),
                    S = now.getSeconds();
                $scope.timeStamp = y + '年' + (m < 10 ? '0' + m : m) + '月' + (d < 10 ? '0' + d : d) + '日 ' + (H < 10 ? '0' + H : H) + ':' + (M < 10 ? '0' + M : M) + ':' + (S < 10 ? '0' + S : S);
            }

            getTimeStamp();
            var deInterval = $interval(getTimeStamp, 500);
            $scope.$on('$destroy', function () {
                $interval.cancel(deInterval);
            });

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
            //查询地区
            httpMethod.initCommonRegionInfo().then(function (rsp) {
                if (rsp.success) {
                    $scope.nameList = rsp.data.areaLevelNames;
                    $scope.commonRegionList = rsp.data.commonRegion;
                }
            });
            //查询渠道类型
            httpMethod.loadChannelType().then(function (rsp) {
                if (rsp.success) {
                    $scope.channelList = rsp.data;
                }
            });
            //1
            $scope.qryPurchaseInAmountLast6Months = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    unit: _.get($scope, 'checkedPurchaseUnit.unitId')
                };
                httpMethod.qryPurchaseInAmountLast6Months(params).then(function (rsp) {
                    var xaxis = [], arr = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.COV_DATE);
                        arr.push(item.PURCHASE_IN_AMOUNT);
                    });
                    $scope.purchaseInAmountLast6Months = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '50',
                            right: '0',
                            bottom: '22'
                        },
                        color: ['#1DA1DD', '#FCCC0E', '#54B594', '#7370E8', '#1DA1DD', '#CEA963'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 105,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['入库量']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                axisTick: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        type: 'solid'
                                    }
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    interval: 0,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        width: 1
                                    }
                                },
                                data: xaxis
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }
                        ],
                        series: [{
                            name: '入库量',
                            type: 'bar',
                            stack: false,
                            barWidth: 30,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'top',
                                color: '#fcfb0e'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr
                        }]
                    }
                });
            };
            //2
            $scope.qrySalesAmountLast6Months = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    unit: _.get($scope, 'checkedSalesAmountUnit.unitId')
                };
                httpMethod.qrySalesAmountLast6Months(params).then(function (rsp) {
                    var xaxis = [], arr1 = [], arr4 = [], arr5 = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.COV_DATE);
                        arr1.push(item.SALES_AMOUNT);
                        arr4.push(item.CONTRACT_SALES_RATIO);
                        arr5.push(item.TERMINAL_SALES_RATIO);
                    });
                    $scope.salesAmountLast6Months = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '50',
                            right: '0',
                            bottom: '22'
                        },
                        color: ['#ff395f', '#fada4a', '#1DA1DD', '#CEA963'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 105,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['合约销量占比', '裸机销量占比', '核销量']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                axisTick: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        type: 'solid'
                                    }
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    interval: 0,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        width: 1
                                    }
                                },
                                data: xaxis
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }, {
                                type: 'value',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }
                        ],
                        series: [{
                            name: '合约销量占比',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12',
                                formatter: function (param) {
                                    return param.value + '%';
                                }
                            },
                            yAxisIndex: 1,
                            data: arr4
                        }, {
                            name: '裸机销量占比',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12',
                                formatter: function (param) {
                                    return param.value + '%';
                                }
                            },
                            yAxisIndex: 1,
                            data: arr5
                        }, {
                            name: '核销量',
                            type: 'bar',
                            barWidth: 30,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }]
                    }
                });
            };
            //3
            $scope.qrySalesAmountStructureLast6Months = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    unit: _.get($scope, 'checkedStructureUnit.unitId')
                };
                httpMethod.qrySalesAmountStructureLast6Months(params).then(function (rsp) {
                    var xaxis = [], arr1 = [], arr2 = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.COV_DATE);
                        arr1.push(item.CM_PIN_CM_SALE);
                        arr2.push(item.PM_PIN_CM_SALE);
                    });
                    $scope.salesAmountStructureLast6Months = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '50',
                            right: '0',
                            bottom: '22'
                        },
                        color: ['#1da1dd', '#e44b68'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 105,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['当月入库当月核销量', '非当月入库当月核销量']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                axisTick: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        type: 'solid'
                                    }
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    interval: 0,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        width: 1
                                    }
                                },
                                data: xaxis
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }],
                        series: [{
                            name: '当月入库当月核销量',
                            type: 'bar',
                            stack: 'one',
                            barWidth: 30,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }, {
                            name: '非当月入库当月核销量',
                            type: 'bar',
                            stack: 'one',
                            barWidth: 30,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr2
                        }]
                    }
                });
            };
            //4
            $scope.qryPriceSalesRatioLast6Months = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),

                };
                httpMethod.qryPriceSalesRatioLast6Months(params).then(function (rsp) {
                    var xaxis = [], arr1 = [], arr2 = [], arr3 = [], arr4 = [], arr5 = [], arr6 = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.COV_DATE);
                        arr1.push(item.RATIO_0_699);
                        arr2.push(item.RATIO_700_999);
                        arr3.push(item.RATIO_1000_1499);
                        arr4.push(item.RATIO_1500_1999);
                        arr5.push(item.RATIO_2000_2999);
                        arr6.push(item.RATIO_3000);
                    });
                    $scope.priceSalesRatioLast6Months = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '50',
                            right: '0',
                            bottom: '22'
                        },
                        color: ['#4256d1', '#c37449', '#54b594', '#7370e8', '#1da1dd', '#cea963'],
                        legend: {
                            show: true,
                            left: 'center',
                            top: 0,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['0-699占比(%)', '700-999占比(%)', '1000-1499占比(%)', '1500-1999占比(%)', '2000-2999占比(%)', '3000以上占比(%)']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                axisTick: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        type: 'solid'
                                    }
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    interval: 0,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        width: 1
                                    }
                                },
                                data: xaxis
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }],
                        series: [{
                            name: '0-699占比(%)',
                            type: 'bar',
                            stack: 'one',
                            barWidth: 30,
                            label: {
                                show: false,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }, {
                            name: '700-999占比(%)',
                            type: 'bar',
                            stack: 'one',
                            barWidth: 30,
                            label: {
                                show: false,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr2
                        }, {
                            name: '1000-1499占比(%)',
                            type: 'bar',
                            stack: 'one',
                            barWidth: 30,
                            label: {
                                show: false,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr3
                        }, {
                            name: '1500-1999占比(%)',
                            type: 'bar',
                            stack: 'one',
                            barWidth: 30,
                            label: {
                                show: false,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr4
                        }, {
                            name: '2000-2999占比(%)',
                            type: 'bar',
                            stack: 'one',
                            barWidth: 30,
                            label: {
                                show: false,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr5
                        }, {
                            name: '3000以上占比(%)',
                            type: 'bar',
                            stack: 'one',
                            barWidth: 30,
                            label: {
                                show: false,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr6
                        }]
                    }
                });
            };
            //5
            $scope.qrySalesAmountPerSaleShopLast6Months = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    unit: _.get($scope, 'checkedSaleUnit.unitId')
                };
                httpMethod.qrySalesAmountPerSaleShopLast6Months(params).then(function (rsp) {
                    var xaxis = [], arr1 = [], arr2 = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.COV_DATE);
                        arr1.push(item.SALE_SHOP_AMOUNT);
                        arr2.push(item.SALES_AMOUNT_PER_SALE_SHOP);
                    });
                    $scope.salesAmountPerSaleShopLast6Months = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '50',
                            right: '0',
                            bottom: '22'
                        },
                        color: ['#f7c911', '#1DA1DD'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 105,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['单店月销量（台/月）', '有销门店']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                axisTick: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        type: 'solid'
                                    }
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    interval: 0,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        width: 1
                                    }
                                },
                                data: xaxis
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }, {
                                type: 'value',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }
                        ],
                        series: [{
                            name: '单店月销量（台/月）',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            yAxisIndex: 1,
                            data: arr2
                        }, {
                            name: '有销门店',
                            type: 'bar',
                            barWidth: 30,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }]
                    }
                });
            };
            //6
            $scope.qryZzcInfoLast6Months = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    unit: _.get($scope, 'checkedZzcInfoUnit.unitId')
                };
                httpMethod.qryZzcInfoLast6Months(params).then(function (rsp) {
                    var xaxis = [], arr1 = [], arr2 = [], arr3 = [], arr4 = [], arr5 = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.COV_DATE);
                        arr1.push(item.SALES_AMOUNT);
                        arr2.push(item.JH_AMOUNT);
                        arr3.push(item.LX_AMOUNT);
                        arr4.push(item.JH_RATIO);
                        arr5.push(item.LX_RATIO);
                    });
                    $scope.zzcInfoLast6Months = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '50',
                            right: '0',
                            bottom: '22'
                        },
                        color: ['#1DA1DD', '#e2bb5d', '#51b674', '#ff395f'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 105,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['核销量', '激活量', '拉新用户']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                axisTick: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        type: 'solid'
                                    }
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    interval: 0,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        width: 1
                                    }
                                },
                                data: xaxis
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }
                        ],
                        series: [{
                            name: '核销量',
                            type: 'bar',
                            stack: 'one',
                            barWidth: 30,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }, {
                            name: '激活量',
                            type: 'bar',
                            stack: 'one',
                            barWidth: 24,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr2
                        }, {
                            name: '拉新用户',
                            type: 'bar',
                            stack: 'one',
                            barWidth: 30,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr3
                        }]
                    }
                });
            };
            //7
            $scope.inStockTimeByConds = {
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
                    layout: 'vertical',
                    itemMarginTop: 10,
                    symbolHeight: 10,
                    symbolWidth: 10,
                    symbolRadius: 2,
                    width: 120,
                    align: 'right',
                    verticalAlign: 'middle',
                    x: 0,
                    y: 0
                },
                tooltip: {
                    pointFormat: '<b>{point.y}<br/>{point.percentage:.1f}%</b>'
                },
                colors: ['#74bd73', '#09a9f7', '#d0b069', '#8178f7'],
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        cursor: 'pointer',
                        depth: 15,
                        dataLabels: {
                            enabled: true,
                            style: {
                                color: '#fff'
                            },
                            format: '{point.y}<br/>{point.percentage:.1f}%'
                        },
                        showInLegend: true
                    },
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    $scope.state1 = 'bar';
                                    $scope.paymentDayDuring = this.name;
                                    $scope.dayDuringRage = this.r;
                                    $scope.qryTimeTop5ModelByConds();
                                }
                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    keys: ['name', 'y', 'r'],
                    data: []
                }],
                credits: {
                    enabled: false
                }
            };
            $scope.qryInStockTimeByConds = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    unit: _.get($scope, 'checkedInStockTimeUnit.unitId')
                };
                httpMethod.qryInStockTimeByConds(params).then(function (rsp) {
                    var businessIndexList = [];
                    _.forEach(rsp.data, function (item, index) {
                        if (index < 4) {
                            var obj = {
                                name: item.paymentDayDuring,
                                y: item.stockCount,
                                r: item.dayDuringRage
                            };
                            businessIndexList.push(obj);
                        }
                    });
                    $scope.inStockTimeByConds.series[0].data = businessIndexList;
                });
            };
            //圆变柱状图
            $scope.qryTimeTop5ModelByConds = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    dayDuringRage: $scope.dayDuringRage,
                    unit: _.get($scope, 'checkedInStockTimeUnit.unitId')
                };
                httpMethod.qryTimeTop5ModelByConds(params).then(function (rsp) {
                    var xaxis = [], arr1 = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.modelName);
                        arr1.push(item.stockCount);
                    });
                    $scope.inStockTimeInBar = {
                        tooltip: {
                            show: true,
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        grid: {
                            left: '150',
                            top: '20',
                            right: '50',
                            bottom: '25'
                        },
                        color: ['#1da1dd'],
                        legend: {
                            show: false
                        },
                        xAxis: [
                            {
                                type: 'value',
                                axisTick: {
                                    show: false
                                },
                                splitLine: {
                                    show: false
                                },
                                axisLabel: {
                                    show: false
                                },
                                axisLine: {
                                    show: false
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                axisTick: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        type: 'solid'
                                    }
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    interval: 0,
                                    textStyle: {
                                        color: '#fff'
                                    },
                                    formatter: function (val) {
                                        var reg = /(.{11}).*/;
                                        return val.replace(reg, "$1...");
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        width: 1
                                    }
                                },
                                data: xaxis
                            }
                        ],
                        series: [{
                            name: 'TOP5库存机型',
                            type: 'bar',
                            barWidth: 20,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'insideRight'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }]
                    };
                });
            };
            //8
            $scope.inStockByPriceRange = {
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
                    layout: 'vertical',
                    itemMarginTop: 10,
                    symbolHeight: 10,
                    symbolWidth: 10,
                    symbolRadius: 2,
                    width: 120,
                    align: 'right',
                    verticalAlign: 'middle',
                    x: 0,
                    y: 0
                },
                tooltip: {
                    pointFormat: '<b>{point.y}<br/>{point.percentage:.1f}%</b>'
                },
                colors: ['#74bd73', '#09a9f7', '#2db1be', '#8178f7', '#cd6470', '#d0b069'],
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        cursor: 'pointer',
                        depth: 15,
                        dataLabels: {
                            enabled: true,
                            style: {
                                color: '#fff'
                            },
                            format: '{point.y}<br/>{point.percentage:.1f}%'
                        },
                        showInLegend: true
                    },
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    $scope.state2 = 'bar';
                                    $scope.priceRangeName = this.name;
                                    $scope.priceRange = this.r;
                                    $scope.qryPriceTop5ModelByCond();
                                }
                            }
                        }
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
            $scope.qryInStockByPriceRange = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    unit: _.get($scope, 'checkedInStockPriceUnit.unitId')
                };
                httpMethod.qryInStockByPriceRange(params).then(function (rsp) {
                    var businessIndexList = [];
                    _.forEach(rsp.data, function (item, index) {
                        if (index < 6) {
                            var obj = {
                                name: item.priceRangeName,
                                y: item.stockCount,
                                r: item.priceRange
                            };
                            businessIndexList.push(obj);
                        }
                    });
                    $scope.inStockByPriceRange.series[0].data = businessIndexList;
                });
            };
            //圆变柱状图
            $scope.qryPriceTop5ModelByCond = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    priceRange: $scope.priceRange,
                    unit: _.get($scope, 'checkedInStockPriceUnit.unitId')
                };
                httpMethod.qryPriceTop5ModelByCond(params).then(function (rsp) {
                    var xaxis = [], arr1 = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.modelName);
                        arr1.push(item.stockCount);
                    });
                    $scope.priceTop5ModelByCond = {
                        tooltip: {
                            show: true,
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        grid: {
                            left: '150',
                            top: '20',
                            right: '50',
                            bottom: '25'
                        },
                        color: ['#1da1dd'],
                        legend: {
                            show: false
                        },
                        xAxis: [
                            {
                                type: 'value',
                                axisTick: {
                                    show: false
                                },
                                splitLine: {
                                    show: false
                                },
                                axisLabel: {
                                    show: false
                                },
                                axisLine: {
                                    show: false
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                axisTick: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        type: 'solid'
                                    }
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    interval: 0,
                                    textStyle: {
                                        color: '#fff'
                                    },
                                    formatter: function (val) {
                                        var reg = /(.{11}).*/;
                                        return val.replace(reg, "$1...");
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        width: 1
                                    }
                                },
                                data: xaxis
                            }
                        ],
                        series: [{
                            name: 'TOP5库存机型',
                            type: 'bar',
                            barWidth: 20,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'insideRight'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }]
                    };
                });
            };
            //9
            $scope.inStockTopBrand = {
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
                    layout: 'vertical',
                    itemMarginTop: 10,
                    symbolHeight: 10,
                    symbolWidth: 10,
                    symbolRadius: 2,
                    width: 120,
                    align: 'right',
                    verticalAlign: 'middle',
                    x: 0,
                    y: 0
                },
                tooltip: {
                    pointFormat: '<b>{point.y}<br/>{point.percentage:.1f}%</b>'
                },
                colors: ['#74bd73', '#d0b069', '#8178f7', '#09a9f7', '#cd6470'],
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        cursor: 'pointer',
                        depth: 15,
                        dataLabels: {
                            enabled: true,
                            style: {
                                color: '#fff'
                            },
                            format: '{point.y}<br/>{point.percentage:.1f}%'
                        },
                        showInLegend: true
                    },
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    $scope.state3 = 'bar';
                                    $scope.brandName = this.name;
                                    $scope.stockRange = this.r;
                                    $scope.qryBrandTop5ModelByConds();
                                }
                            }
                        }
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
            $scope.qryInStockTopBrand = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    unit: _.get($scope, 'checkedStockBrandUnit.unitId')
                };
                httpMethod.qryInStockTopBrand(params).then(function (rsp) {
                    var businessIndexList = [];
                    _.forEach(rsp.data, function (item, index) {
                        if (index < 6) {
                            var obj = {
                                name: item.brandName,
                                y: item.stockCount,
                                r: item.stockRange
                            };
                            businessIndexList.push(obj);
                        }
                    });
                    $scope.inStockTopBrand.series[0].data = businessIndexList;
                });
            };
            //圆变柱状图
            $scope.qryBrandTop5ModelByConds = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    stockRange: $scope.stockRange,
                    unit: _.get($scope, 'checkedStockBrandUnit.unitId')
                };
                httpMethod.qryBrandTop5ModelByConds(params).then(function (rsp) {
                    var xaxis = [], arr1 = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.modelName);
                        arr1.push(item.stockCount);
                    });
                    $scope.brandTop5ModelByConds = {
                        tooltip: {
                            show: true,
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        grid: {
                            left: '150',
                            top: '20',
                            right: '50',
                            bottom: '25'
                        },
                        color: ['#1da1dd'],
                        legend: {
                            show: false
                        },
                        xAxis: [
                            {
                                type: 'value',
                                axisTick: {
                                    show: false
                                },
                                splitLine: {
                                    show: false
                                },
                                axisLabel: {
                                    show: false
                                },
                                axisLine: {
                                    show: false
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                axisTick: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        type: 'solid'
                                    }
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    interval: 0,
                                    textStyle: {
                                        color: '#fff'
                                    },
                                    formatter: function (val) {
                                        var reg = /(.{11}).*/;
                                        return val.replace(reg, "$1...");
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        width: 1
                                    }
                                },
                                data: xaxis
                            }
                        ],
                        series: [{
                            name: 'TOP5库存机型',
                            type: 'bar',
                            barWidth: 20,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'insideRight'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }]
                    };
                });
            };
            //10
            $scope.inStockTopModel = {
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
                    layout: 'vertical',
                    itemMarginTop: 10,
                    symbolHeight: 10,
                    symbolWidth: 10,
                    symbolRadius: 2,
                    width: 120,
                    align: 'right',
                    verticalAlign: 'middle',
                    x: 0,
                    y: 0
                },
                tooltip: {
                    pointFormat: '<b>{point.y}<br/>{point.percentage:.1f}%</b>'
                },
                colors: ['#74bd73', '#09a9f7', '#2db1be', '#e2bb5d', '#8178f7'],
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 15,
                        dataLabels: {
                            enabled: true,
                            style: {
                                color: '#fff'
                            },
                            format: '{point.y}<br/>{point.percentage:.1f}%'
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
            $scope.qryInStockTopModel = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    unit: _.get($scope, 'checkedStockModelUnit.unitId')
                };
                httpMethod.qryInStockTopModel(params).then(function (rsp) {
                    var businessIndexList = [];
                    _.forEach(rsp.data, function (item, index) {
                        if (index < 6) {
                            var obj = {
                                name: item.offerModelName,
                                y: item.stockCount
                            };
                            businessIndexList.push(obj);
                        }
                    });
                    $scope.inStockTopModel.series[0].data = businessIndexList;
                });
            };
            //11
            $scope.qryRetailShopTopBrand = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    unit: _.get($scope, 'checkedShopBrandUnit.unitId')
                };
                httpMethod.qryRetailShopTopBrand(params).then(function (rsp) {
                    var xaxis = [], arr1 = [], arr2 = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.brandName);
                        arr1.push(item.retailShopCount);
                        arr2.push(item.retailShopPercent);
                    });
                    $scope.retailShopTopBrand = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '60',
                            right: '0',
                            bottom: '22'
                        },
                        color: ['#f7c911', '#1DA1DD'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 105,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['有销门店占比', '有销门店数']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                axisTick: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        type: 'solid'
                                    }
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    interval: 0,
                                    textStyle: {
                                        color: '#fff'
                                    },
                                    formatter: function (val) {
                                        var reg = /(.{4}).*/;
                                        return val.replace(reg, "$1...");
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        width: 1
                                    }
                                },
                                data: xaxis
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }, {
                                type: 'value',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }
                        ],
                        series: [{
                            name: '有销门店占比',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12',
                                formatter: function (param) {
                                    return param.value + '%';
                                }
                            },
                            yAxisIndex: 1,
                            data: arr2
                        }, {
                            name: '有销门店数',
                            type: 'bar',
                            barWidth: 24,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }]
                    }
                });
            };
            //12
            $scope.qryRetailShopTopModel = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    unit: _.get($scope, 'checkedShopModelUnit.unitId')
                };
                httpMethod.qryRetailShopTopModel(params).then(function (rsp) {
                    var xaxis = [], arr1 = [], arr2 = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.offerModelName);
                        arr1.push(item.retailShopCount);
                        arr2.push(item.retailShopPercent);
                    });
                    $scope.retailShopTopModel = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '60',
                            right: '0',
                            bottom: '22'
                        },
                        color: ['#f7c911', '#1DA1DD'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 105,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['有销门店占比', '有销门店数']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                axisTick: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        type: 'solid'
                                    }
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    interval: 0,
                                    textStyle: {
                                        color: '#fff'
                                    },
                                    formatter: function (val) {
                                        var reg = /(.{4}).*/;
                                        return val.replace(reg, "$1...");
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
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
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }, {
                                type: 'value',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }
                        ],
                        series: [{
                            name: '有销门店占比',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12',
                                formatter: function (param) {
                                    return param.value + '%';
                                }
                            },
                            yAxisIndex: 1,
                            data: arr2
                        }, {
                            name: '有销门店数',
                            type: 'bar',
                            barWidth: 24,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }]
                    }
                });
            };
            //13
            $scope.qryRetailTopBrand = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    unit: _.get($scope, 'checkedRetailBrandUnit.unitId')
                };
                httpMethod.qryRetailTopBrand(params).then(function (rsp) {
                    var xaxis = [], arr1 = [], arr2 = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.brandName);
                        arr1.push(item.retailCount);
                        arr2.push(item.retailPercent);
                    });
                    $scope.retailTopBrand = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '50',
                            right: '0',
                            bottom: '22'
                        },
                        color: ['#f7c911', '#1DA1DD'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 105,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['销量占比', '销量']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                axisTick: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        type: 'solid'
                                    }
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    interval: 0,
                                    textStyle: {
                                        color: '#fff'
                                    },
                                    formatter: function (val) {
                                        var reg = /(.{4}).*/;
                                        return val.replace(reg, "$1...");
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        width: 1
                                    }
                                },
                                data: xaxis
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }, {
                                type: 'value',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    },
                                    formatter: function (val) {
                                        var reg = /(.{8}).*/;
                                        return val.replace(reg, "$1...");
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }
                        ],
                        series: [{
                            name: '销量占比',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12',
                                formatter: function (param) {
                                    return param.value + '%';
                                }
                            },
                            yAxisIndex: 1,
                            data: arr2
                        }, {
                            name: '销量',
                            type: 'bar',
                            barWidth: 24,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }]
                    }
                });
            };
            //14
            $scope.qryRetailTopModel = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    unit: _.get($scope, 'checkedRetailModelUnit.unitId')
                };
                httpMethod.qryRetailTopModel(params).then(function (rsp) {
                    var xaxis = [], arr1 = [], arr2 = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.offerModelName);
                        arr1.push(item.retailCount);
                        arr2.push(item.retailPercent);
                    });
                    $scope.retailTopModel = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '50',
                            right: '0',
                            bottom: '22'
                        },
                        color: ['#f7c911', '#1DA1DD'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 105,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['销量占比', '销量']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                axisTick: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        type: 'solid'
                                    }
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    interval: 0,
                                    textStyle: {
                                        color: '#fff'
                                    },
                                    formatter: function (val) {
                                        var reg = /(.{4}).*/;
                                        return val.replace(reg, "$1...");
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#2f76a5',
                                        width: 1
                                    }
                                },
                                data: xaxis
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }, {
                                type: 'value',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    }
                                },
                                axisLabel: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }
                        ],
                        series: [{
                            name: '销量占比',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12',
                                formatter: function (param) {
                                    return param.value + '%';
                                }
                            },
                            yAxisIndex: 1,
                            data: arr2
                        }, {
                            name: '销量',
                            type: 'bar',
                            barWidth: 24,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }]
                    }
                });
            };

            $scope.$watchGroup(['month.key', 'channelType.channelTypeCd', 'checkedCity.commonRegionId'], function (newVal) {
                if (newVal) {
                    $scope.qryPurchaseInAmountLast6Months();
                    $scope.qrySalesAmountLast6Months();
                    $scope.qrySalesAmountStructureLast6Months();
                    $scope.qryPriceSalesRatioLast6Months();
                    $scope.qrySalesAmountPerSaleShopLast6Months();
                    $scope.qryZzcInfoLast6Months();
                    $scope.qryInStockTimeByConds();
                    $scope.qryTimeTop5ModelByConds();
                    $scope.qryInStockByPriceRange();
                    $scope.qryPriceTop5ModelByCond();
                }
            });

            $scope.$watchGroup(['month.key', 'checkedCity.commonRegionId'], function (newVal) {
                if (newVal) {
                    $scope.qryInStockTopBrand();
                    $scope.qryBrandTop5ModelByConds();
                    $scope.qryInStockTopModel();
                    $scope.qryRetailShopTopBrand();
                    $scope.qryRetailShopTopModel();
                    $scope.qryRetailTopBrand();
                    $scope.qryRetailTopModel();
                }
            });

            $scope.$watch('checkedPurchaseUnit.unitId', function (newVal) { //1
                if (newVal) {
                    $scope.qryPurchaseInAmountLast6Months();
                }
            });
            $scope.$watch('checkedSalesAmountUnit.unitId', function (newVal) {//2
                if (newVal) {
                    $scope.qrySalesAmountLast6Months();
                }
            });
            $scope.$watch('checkedStructureUnit.unitId', function (newVal) {//3
                if (newVal) {
                    $scope.qrySalesAmountStructureLast6Months();
                }
            });
            $scope.$watch('checkedSaleUnit.unitId', function (newVal) {//5
                if (newVal) {
                    $scope.qrySalesAmountPerSaleShopLast6Months();
                }
            });
            $scope.$watch('checkedZzcInfoUnit.unitId', function (newVal) {//6
                if (newVal) {
                    $scope.qryZzcInfoLast6Months();
                }
            });
            $scope.$watch('checkedInStockTimeUnit.unitId', function (newVal) {//7
                if (newVal) {
                    $scope.qryInStockTimeByConds();
                    $scope.qryTimeTop5ModelByConds();
                }
            });
            $scope.$watch('checkedInStockPriceUnit.unitId', function (newVal) {//8
                if (newVal) {
                    $scope.qryInStockByPriceRange();
                    $scope.qryPriceTop5ModelByCond();
                }
            });
            $scope.$watch('checkedStockBrandUnit.unitId', function (newVal) {//9
                if (newVal) {
                    $scope.qryInStockTopBrand();
                    $scope.qryBrandTop5ModelByConds();
                }
            });
            $scope.$watch('checkedStockModelUnit.unitId', function (newVal) {//10
                if (newVal) {
                    $scope.qryInStockTopModel();
                }
            });
            $scope.$watch('checkedShopBrandUnit.unitId', function (newVal) {//11
                if (newVal) {
                    $scope.qryRetailShopTopBrand();
                }
            });
            $scope.$watch('checkedShopModelUnit.unitId', function (newVal) {//12
                if (newVal) {
                    $scope.qryRetailShopTopModel();
                }
            });
            $scope.$watch('checkedRetailBrandUnit.unitId', function (newVal) {//13
                if (newVal) {
                    $scope.qryRetailTopBrand();
                }
            });
            $scope.$watch('checkedRetailModelUnit.unitId', function (newVal) {//14
                if (newVal) {
                    $scope.qryRetailTopModel();
                }
            });

            $scope.state1 = 'circle';
            $scope.changeTarget1 = function (val) {
                $scope.state1 = val;
            };
            $scope.state2 = 'circle';
            $scope.changeTarget2 = function (val) {
                $scope.state2 = val;
            };
            $scope.state3 = 'circle';
            $scope.changeTarget3 = function (val) {
                $scope.state3 = val;
            }
        }])
});
