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
            $scope.qryPurchaseInAmountLast6Months = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
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
                            left: 'right',
                            top: 0,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['入库量（万台）']
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
                            name: '入库量（万台）',
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
            $scope.qrySalesAmountLast6Months = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
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
                        color: ['#1DA1DD', '#ff395f', '#fada4a', '#CEA963'],
                        legend: {
                            show: true,
                            left: 'center',
                            top: 0,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['核销量（万台）', '合约销量（万台）', '裸机销量（万台）', '合约销量占比', '裸机销量占比']
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
                            name: '核销量（万台）',
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
                        }, {
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
                        }]
                    }
                });
            };
            $scope.qrySalesAmountStructureLast6Months = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
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
                            left: 'center',
                            top: 0,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['当月入库当月核销量（万台）', '非当月入库当月核销量（万台）']
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
                            name: '当月入库当月核销量（万台）',
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
                            name: '非当月入库当月核销量（万台）',
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
            $scope.qryPriceSalesRatioLast6Months = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
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
                                show: true,
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
                                show: true,
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
                                show: true,
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
                                show: true,
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
                                show: true,
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
                                show: true,
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
            $scope.qrySalesAmountPerSaleShopLast6Months = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
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
                        color: ['#1DA1DD', '#f7c911'],
                        legend: {
                            show: true,
                            left: 'center',
                            top: 0,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['有销门店（万）', '单店月销量（台/月）']
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
                            name: '有销门店（万）',
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
                        }, {
                            name: '单店月销量（台/月）',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            yAxisIndex: 1,
                            data: arr2
                        }]
                    }
                });
            };
            $scope.qryZzcInfoLast6Months = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
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
                            left: 'center',
                            top: 0,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['核销量（万台）', '激活量（万台）', '拉新用户（万台）']
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
                            name: '核销量（万台）',
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
                            name: '激活量（万台）',
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
                            name: '拉新用户（万台）',
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
                    align: 'right',
                    verticalAlign: 'top',
                    itemMarginTop: 10,
                    symbolHeight: 10,
                    symbolWidth: 10,
                    symbolRadius: 2,
                    x: -60,
                    y: 40
                },
                tooltip: {
                    pointFormat: '<b>{point.y}万台<br/>{point.percentage:.1f}%</b>'
                },
                colors: ['#74bd73', '#09a9f7', '#d0b069', '#8178f7'],
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
            $scope.qryInStockTimeByConds = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
                };
                httpMethod.qryInStockTimeByConds(params).then(function (rsp) {
                    var businessIndexList = [];
                    _.forEach(rsp.data, function (item, index) {
                        if (index < 4) {
                            var obj = {
                                name: item.paymentDayDuring,
                                y: item.stockCount
                            };
                            businessIndexList.push(obj);
                        }
                    });
                    $scope.inStockTimeByConds.series[0].data = businessIndexList;
                });
            };

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
                    align: 'right',
                    verticalAlign: 'top',
                    itemMarginTop: 10,
                    symbolHeight: 10,
                    symbolWidth: 10,
                    symbolRadius: 2,
                    x: -60,
                    y: 40
                },
                tooltip: {
                    pointFormat: '<b>{point.y}万台<br/>{point.percentage:.1f}%</b>'
                },
                colors: ['#74bd73', '#09a9f7', '#2db1be', '#8178f7', '#cd6470', '#d0b069'],
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
            $scope.qryInStockByPriceRange = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
                };
                httpMethod.qryInStockByPriceRange(params).then(function (rsp) {
                    var businessIndexList = [];
                    _.forEach(rsp.data, function (item, index) {
                        if (index < 6) {
                            var obj = {
                                name: item.priceRangeName,
                                y: item.stockCount
                            };
                            businessIndexList.push(obj);
                        }
                    });
                    $scope.inStockByPriceRange.series[0].data = businessIndexList;
                });
            };

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
                    align: 'right',
                    verticalAlign: 'top',
                    itemMarginTop: 10,
                    symbolHeight: 10,
                    symbolWidth: 10,
                    symbolRadius: 2,
                    x: -60,
                    y: 40
                },
                tooltip: {
                    pointFormat: '<b>{point.y}万台<br/>{point.percentage:.1f}%</b>'
                },
                colors: ['#74bd73', '#d0b069', '#8178f7', '#09a9f7', '#cd6470'],
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
            $scope.qryInStockTopBrand = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
                };
                httpMethod.qryInStockTopBrand(params).then(function (rsp) {
                    var businessIndexList = [];
                    _.forEach(rsp.data, function (item, index) {
                        if (index < 6) {
                            var obj = {
                                name: item.brandName,
                                y: item.stockCount
                            };
                            businessIndexList.push(obj);
                        }
                    });
                    $scope.inStockTopBrand.series[0].data = businessIndexList;
                });
            };

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
                    align: 'right',
                    verticalAlign: 'top',
                    itemMarginTop: 10,
                    symbolHeight: 10,
                    symbolWidth: 10,
                    symbolRadius: 2,
                    x: -60,
                    y: 40
                },
                tooltip: {
                    pointFormat: '<b>{point.y}万台<br/>{point.percentage:.1f}%</b>'
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
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
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

            $scope.qryRetailShopTopBrand = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
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
                            top: '50',
                            right: '0',
                            bottom: '32'
                        },
                        color: ['#1DA1DD', '#f7c911'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 0,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['有销门店数', '有销门店占比']
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
                                    formatter: function(params) {var newParamsName = "";// 最终拼接成的字符串
                                        var paramsNameNumber = params.length;// 实际标签的个数
                                        var provideNumber = 6;// 每行能显示的字的个数
                                        var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                                        /**
                                         * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                                         */
                                        // 条件等同于rowNumber>1
                                        if (paramsNameNumber > provideNumber) {
                                            /** 循环每一行,p表示行 */
                                            for (var p = 0; p < rowNumber; p++) {
                                                var tempStr = "";// 表示每一次截取的字符串
                                                var start = p * provideNumber;// 开始截取的位置
                                                var end = start + provideNumber;// 结束截取的位置
                                                // 此处特殊处理最后一行的索引值
                                                if (p == rowNumber - 1) {
                                                    // 最后一次不换行
                                                    tempStr = params.substring(start, paramsNameNumber);
                                                } else {
                                                    // 每一次拼接字符串并换行
                                                    tempStr = params.substring(start, end) + "\n";
                                                }
                                                newParamsName += tempStr;// 最终拼成的字符串
                                            }
                                        } else {
                                            // 将旧标签的值赋给新标签
                                            newParamsName = params;
                                        }
                                        //将最终的字符串返回
                                        return newParamsName;
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
                        }, {
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
                        }]
                    }
                });
            };
            $scope.qryRetailShopTopModel = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
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
                            top: '50',
                            right: '0',
                            bottom: '32'
                        },
                        color: ['#1DA1DD', '#f7c911'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 0,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['有销门店数', '有销门店占比']
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
                                    formatter: function(params) {var newParamsName = "";// 最终拼接成的字符串
                                        var paramsNameNumber = params.length;// 实际标签的个数
                                        var provideNumber = 6;// 每行能显示的字的个数
                                        var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                                        /**
                                         * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                                         */
                                        // 条件等同于rowNumber>1
                                        if (paramsNameNumber > provideNumber) {
                                            /** 循环每一行,p表示行 */
                                            for (var p = 0; p < rowNumber; p++) {
                                                var tempStr = "";// 表示每一次截取的字符串
                                                var start = p * provideNumber;// 开始截取的位置
                                                var end = start + provideNumber;// 结束截取的位置
                                                // 此处特殊处理最后一行的索引值
                                                if (p == rowNumber - 1) {
                                                    // 最后一次不换行
                                                    tempStr = params.substring(start, paramsNameNumber);
                                                } else {
                                                    // 每一次拼接字符串并换行
                                                    tempStr = params.substring(start, end) + "\n";
                                                }
                                                newParamsName += tempStr;// 最终拼成的字符串
                                            }
                                        } else {
                                            // 将旧标签的值赋给新标签
                                            newParamsName = params;
                                        }
                                        //将最终的字符串返回
                                        return newParamsName;
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
                        }, {
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
                        }]
                    }
                });
            };

            $scope.qryRetailTopBrand = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
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
                            bottom: '32'
                        },
                        color: ['#1DA1DD', '#f7c911'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 0,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['销量（万台）', '销量占比']
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
                                    },
                                    formatter: function(params) {var newParamsName = "";// 最终拼接成的字符串
                                        var paramsNameNumber = params.length;// 实际标签的个数
                                        var provideNumber = 6;// 每行能显示的字的个数
                                        var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                                        /**
                                         * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                                         */
                                        // 条件等同于rowNumber>1
                                        if (paramsNameNumber > provideNumber) {
                                            /** 循环每一行,p表示行 */
                                            for (var p = 0; p < rowNumber; p++) {
                                                var tempStr = "";// 表示每一次截取的字符串
                                                var start = p * provideNumber;// 开始截取的位置
                                                var end = start + provideNumber;// 结束截取的位置
                                                // 此处特殊处理最后一行的索引值
                                                if (p == rowNumber - 1) {
                                                    // 最后一次不换行
                                                    tempStr = params.substring(start, paramsNameNumber);
                                                } else {
                                                    // 每一次拼接字符串并换行
                                                    tempStr = params.substring(start, end) + "\n";
                                                }
                                                newParamsName += tempStr;// 最终拼成的字符串
                                            }
                                        } else {
                                            // 将旧标签的值赋给新标签
                                            newParamsName = params;
                                        }
                                        //将最终的字符串返回
                                        return newParamsName;
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }
                        ],
                        series: [{
                            name: '销量（万台）',
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
                        }, {
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
                        }]
                    }
                });
            };
            $scope.qryRetailTopModel = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
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
                            bottom: '32'
                        },
                        color: ['#1DA1DD', '#f7c911'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 0,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['销量（万台）', '销量占比']
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
                                    formatter: function(params) {var newParamsName = "";// 最终拼接成的字符串
                                        var paramsNameNumber = params.length;// 实际标签的个数
                                        var provideNumber = 6;// 每行能显示的字的个数
                                        var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                                        /**
                                         * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                                         */
                                        // 条件等同于rowNumber>1
                                        if (paramsNameNumber > provideNumber) {
                                            /** 循环每一行,p表示行 */
                                            for (var p = 0; p < rowNumber; p++) {
                                                var tempStr = "";// 表示每一次截取的字符串
                                                var start = p * provideNumber;// 开始截取的位置
                                                var end = start + provideNumber;// 结束截取的位置
                                                // 此处特殊处理最后一行的索引值
                                                if (p == rowNumber - 1) {
                                                    // 最后一次不换行
                                                    tempStr = params.substring(start, paramsNameNumber);
                                                } else {
                                                    // 每一次拼接字符串并换行
                                                    tempStr = params.substring(start, end) + "\n";
                                                }
                                                newParamsName += tempStr;// 最终拼成的字符串
                                            }
                                        } else {
                                            // 将旧标签的值赋给新标签
                                            newParamsName = params;
                                        }
                                        //将最终的字符串返回
                                        return newParamsName;
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
                            name: '销量（万台）',
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
                        }, {
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
                    $scope.qryInStockByPriceRange();
                }
            });

            $scope.$watchGroup(['month.key', 'checkedCity.commonRegionId'], function (newVal) {
                if (newVal) {
                    $scope.qryInStockTopBrand();
                    $scope.qryInStockTopModel();
                    $scope.qryRetailShopTopBrand();
                    $scope.qryRetailShopTopModel();
                    $scope.qryRetailTopBrand();
                    $scope.qryRetailTopModel();
                }
            });
        }])
});
