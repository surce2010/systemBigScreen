/**
 * Auth dingshaohua
 * Date 2018-06-29
 */
define(['angular', 'jquery', 'lodash', 'ngDirective', 'ngHighCharts', 'ngEcharts', 'scrollbar', 'httpMethod'], function (angular, $, _) {
    angular
        .module('pageModule', ['ngDirective', 'ngHighCharts', 'ngEcharts', 'httpMethod'])
        .run(['$rootScope', function ($rootScope) {
            $rootScope.month = '';
        }])
        .controller('pageCtrl', ['$rootScope', '$scope', '$log', '$interval', 'httpMethod', '$uibModal', function ($rootScope, $scope, $log, $interval, httpMethod, $uibModal) {
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
                $scope.monthNew = $scope.monthList[0];
            }

            getMonthList();

            $scope.$watch('monthNew', function (newVal) {
                if (newVal) {
                    $rootScope.month = newVal;
                }
            }, true);

            $scope.chooseStore = function () {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'chooseServiceHallModal.html',
                    controller: 'chooseServiceHallModalCtrl',
                    controllerAs: '$ctrl',
                    size: 'lg',
                    resolve: {
                        items: function () {
                            return;
                        }
                    }
                });
            };

            $scope.qryShopProcureSalesLast6Months = function () {
                var params = {
                    queryDate: _.get($rootScope, 'month.key'),
                    channelId: _.get($rootScope, 'targetStore.CHANNEL_ID')
                };
                httpMethod.qryShopProcureSalesLast6Months(params).then(function (rsp) {
                    $scope.shopProcureSalesLast6MonthsList = rsp.data;
                    var xaxis = [], arr1 = [], arr2 = [], arr3 = [];
                    _.map($scope.shopProcureSalesLast6MonthsList, function (item) {
                        xaxis.push(item.QUERY_DATE);
                        arr1.push(item.PROCURE_IN_AMOUNT);
                        arr2.push(item.SALES);
                        arr3.push(item.SALES_AMOUNT);
                    });
                    $scope.shopProcureSalesLast6Months = {
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
                        color: ['#0fc4d9', '#f90050', '#ffdb01'],
                        legend: {
                            show: true,
                            left: 'right',
                            top: 0,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['入库量（台）', '核销量（台）', '收银金额（万元）']
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
                            name: '入库量（台）',
                            type: 'bar',
                            stack: false,
                            barWidth: 11,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'top'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }, {
                            name: '核销量（台）',
                            type: 'bar',
                            stack: false,
                            barWidth: 11,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'top'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr2
                        }, {
                            name: '收银金额（万元）',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'top'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            yAxisIndex: 1,
                            data: arr3
                        }]
                    }
                });
            };
            $scope.qryShopSalesInfoLast6Months = function () {
                var params = {
                    queryDate: _.get($rootScope, 'month.key'),
                    channelId: _.get($rootScope, 'targetStore.CHANNEL_ID')
                };
                httpMethod.qryShopSalesInfoLast6Months(params).then(function (rsp) {
                    $scope.shopSalesInfoLast6MonthsList = rsp.data;
                    var xaxis = [], arr1 = [], arr2 = [], arr3 = [];
                    _.map($scope.shopSalesInfoLast6MonthsList, function (item) {
                        xaxis.push(item.QUERY_DATE);
                        arr1.push(item.SALES);
                        arr2.push(item.CONTRACT_SALES_RATIO);
                        arr3.push(item.NON_CONTRACT_SALES_RATIO);
                    });
                    $scope.shopSalesInfoLast6Months = {
                        tooltip: {
                            show: true,
                            trigger: 'axis',
                            formatter:function(params) {
                                var relVal = params[0].name;
                                for (var i = 0, l = params.length; i < l; i++) {
                                    if(params[i].seriesName === '合约销量占比' || params[i].seriesName === '裸机销量占比'){
                                        relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value+"%";
                                    }else{
                                        relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value;
                                    }
                                }
                                return relVal;
                            }
                        },
                        grid: {
                            left: '0',
                            top: '50',
                            right: '0',
                            bottom: '22'
                        },
                        color: ['#0fc4d9', '#ffdb01', '#f90050'],
                        legend: {
                            show: true,
                            left: 'right',
                            top: 0,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['核销量（台）', '合约销量占比', '裸机销量占比']
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
                            name: '核销量（台）',
                            type: 'bar',
                            stack: 'one',
                            barWidth: 27,
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
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            yAxisIndex: 1,
                            data: arr2
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
                            data: arr3
                        }]
                    }
                });
            };
            $scope.qryShopSalesStockInfoLast6Months = function () {
                var params = {
                    queryDate: _.get($rootScope, 'month.key'),
                    channelId: _.get($rootScope, 'targetStore.CHANNEL_ID')
                };
                httpMethod.qryShopSalesStockInfoLast6Months(params).then(function (rsp) {
                    var xaxis = [], arr1 = [], arr2 = [];
                    $scope.shopSalesStockInfoLast6MonthsList = rsp.data;
                    _.map($scope.shopSalesStockInfoLast6MonthsList, function (item) {
                        xaxis.push(item.QUERY_DATE);
                        arr1.push(item.CM_STOCK_SALES);
                        arr2.push(item.NON_CM_STOCK_SALES);
                    });
                    $scope.shopSalesStockInfoLast6Months = {
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
                        color: ['#0fc4d9', '#f90050'],
                        legend: {
                            show: true,
                            left: 'right',
                            top: 0,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['当月入库当月核销（台）', '非当月入库当月核销（台）']
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
                            name: '当月入库当月核销（台）',
                            type: 'bar',
                            stack: 'one',
                            barWidth: 27,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }, {
                            name: '非当月入库当月核销（台）',
                            type: 'bar',
                            stack: 'one',
                            barWidth: 27,
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
            $scope.qryShopSalesJhLxLast6Months = function () {
                var params = {
                    queryDate: _.get($rootScope, 'month.key'),
                    channelId: _.get($rootScope, 'targetStore.CHANNEL_ID')
                };
                httpMethod.qryShopSalesJhLxLast6Months(params).then(function (rsp) {
                    $scope.shopSalesJhLxLast6MonthsList = rsp.data;
                    var xaxis = [], arr1 = [], arr2 = [], arr3 = [];
                    _.map($scope.shopSalesJhLxLast6MonthsList, function (item) {
                        xaxis.push(item.QUERY_DATE);
                        arr1.push(item.SALES);
                        arr2.push(item.JH_AMOUNT);
                        arr3.push(item.LX_AMOUNT);
                    });
                    $scope.shopSalesJhLxLast6Months = {
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
                        color: ['#0fc4d9', '#f90050', '#ffdb01'],
                        legend: {
                            show: true,
                            left: 'right',
                            top: 0,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['核销量（台）', '激活量（台）', '拉新用户（户）']
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
                            name: '核销量（台）',
                            type: 'bar',
                            stack: false,
                            barWidth: 11,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'top'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }, {
                            name: '激活量（台）',
                            type: 'bar',
                            stack: false,
                            barWidth: 11,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'top'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr2
                        }, {
                            name: '拉新用户（户）',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'top'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            yAxisIndex: 1,
                            data: arr3
                        }]
                    }
                });
            };
            $scope.qryShopSalesBrandModelNumLast6Months = function () {
                var params = {
                    queryDate: _.get($rootScope, 'month.key'),
                    channelId: _.get($rootScope, 'targetStore.CHANNEL_ID')
                };
                httpMethod.qryShopSalesBrandModelNumLast6Months(params).then(function (rsp) {
                    $scope.shopSalesBrandModelNumLast6MonthsList = rsp.data;
                    var xaxis = [], arr1 = [], arr2 = [];
                    _.map($scope.shopSalesBrandModelNumLast6MonthsList, function (item) {
                        xaxis.push(item.QUERY_DATE);
                        arr1.push(item.BRAND_NUM);
                        arr2.push(item.MODEL_NUM);
                    });
                    $scope.shopSalesBrandModelNumLast6Months = {
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
                        color: ['#0fc4d9', '#ffdb01'],
                        legend: {
                            show: true,
                            left: 'right',
                            top: 0,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['销售品牌数量', '销售机型款数']
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
                            name: '销售品牌数量',
                            type: 'bar',
                            stack: false,
                            barWidth: 46,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'top'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }, {
                            name: '销售机型款数',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'top'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            yAxisIndex: 1,
                            data: arr2
                        }]
                    }
                });
            };

            $scope.qryBizmanProcureSales = function () {
                var params = {
                    queryDate: _.get($rootScope, 'month.key'),
                    channelId: _.get($rootScope, 'targetStore.CHANNEL_ID')
                };
                httpMethod.qryBizmanProcureSales(params).then(function (rsp) {
                    $scope.bizmanProcureSalesList = rsp.data;
                    var xaxis = [], arr1 = [], arr2 = [], arr3 = [];
                    _.map($scope.bizmanProcureSalesList, function (item) {
                        xaxis.push(item.CHANNEL_NAME);
                        arr1.push(item.PROCURE_IN_AMOUNT);
                        arr2.push(item.SALES);
                        arr3.push(item.SALES_AMOUNT);
                    });
                    $scope.bizmanProcureSales = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '50',
                            right: '0',
                            bottom: '32',
                        },
                        color: ['#0fc4d9', '#f90050', '#ffdb01'],
                        legend: {
                            show: true,
                            left: 'center',
                            top: 0,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['入库量（台）', '核销量（台）', '收银总金额（元）']
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
                                    formatter: function (params) {
                                        var newParamsName = "";// 最终拼接成的字符串
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
                            name: '入库量（台）',
                            type: 'bar',
                            stack: false,
                            barWidth: 27,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'top'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }, {
                            name: '核销量（台）',
                            type: 'bar',
                            stack: false,
                            barWidth: 27,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'top'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr2
                        }, {
                            name: '收银总金额（元）',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'top'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            yAxisIndex: 1,
                            data: arr3
                        }]
                    }
                });
            };
            $scope.qryBizmanSalesInfo = function () {
                var params = {
                    queryDate: _.get($rootScope, 'month.key'),
                    channelId: _.get($rootScope, 'targetStore.CHANNEL_ID')
                };
                httpMethod.qryBizmanSalesInfo(params).then(function (rsp) {
                    $scope.bizmanSalesInfoList = rsp.data;
                });
            };
            $scope.qryShopStockZZModelTop5 = function () {
                var params = {
                    queryDate: _.get($rootScope, 'month.key'),
                    channelId: _.get($rootScope, 'targetStore.CHANNEL_ID')
                };
                httpMethod.qryShopStockZZModelTop5(params).then(function (rsp) {
                    $scope.shopStockZZModelTop5List = rsp.data;
                });
            };

            $scope.qryShopSalesModelTop5 = function () {
                var params = {
                    queryDate: _.get($rootScope, 'month.key'),
                    channelId: _.get($rootScope, 'targetStore.CHANNEL_ID')
                };
                httpMethod.qryShopSalesModelTop5(params).then(function (rsp) {
                    $scope.shopSalesModelTop5List = rsp.data;
                    var xaxis = [], arr1 = [], arr2 = [], arr3 = [];
                    _.map($scope.shopSalesModelTop5List, function (item) {
                        xaxis.push(item.OFFER_MODEL_NAME);
                        arr1.push(item.SALES);
                        arr2.push(item.JH_AMOUNT);
                        arr3.push(item.LX_AMOUNT);
                    });
                    $scope.shopSalesModelTop5 = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '50',
                            right: '0',
                            bottom: '32',
                        },
                        color: ['#0fc4d9', '#f90050', '#ffdb01'],
                        legend: {
                            show: true,
                            left: 'center',
                            top: 0,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['核销量（台）', '激活量（台）', '拉新用户（户）']
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
                                    formatter: function (params) {
                                        var newParamsName = "";// 最终拼接成的字符串
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
                            name: '核销量（台）',
                            type: 'bar',
                            stack: false,
                            barWidth: 11,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'top'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }, {
                            name: '激活量（台）',
                            type: 'bar',
                            stack: false,
                            barWidth: 11,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'top'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr2
                        }, {
                            name: '拉新用户（户）',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'top'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            yAxisIndex: 1,
                            data: arr3
                        }]
                    }
                });
            };
            $scope.qryShopSalesManTop5 = function () {
                var params = {
                    queryDate: _.get($rootScope, 'month.key'),
                    channelId: _.get($rootScope, 'targetStore.CHANNEL_ID')
                };
                httpMethod.qryShopSalesManTop5(params).then(function (rsp) {
                    $scope.shopSalesManTop5List = rsp.data;
                    var xaxis = [], arr1 = [], arr2 = [], arr3 = [];
                    _.map($scope.shopSalesManTop5List, function (item) {
                        xaxis.push(item.SALESMAN_NAME);
                        arr1.push(item.SALES);
                        arr2.push(item.JH_AMOUNT);
                        arr3.push(item.LX_AMOUNT);
                    });
                    $scope.shopSalesManTop5 = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '50',
                            right: '0',
                            bottom: '32',
                        },
                        color: ['#0fc4d9', '#f90050', '#ffdb01'],
                        legend: {
                            show: true,
                            left: 'center',
                            top: 0,
                            itemWidth: 13,
                            itemHeight: 6,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['核销量（台）', '激活量（台）', '拉新用户（户）']
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
                                    formatter: function (params) {
                                        var newParamsName = "";// 最终拼接成的字符串
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
                            name: '核销量（台）',
                            type: 'bar',
                            stack: false,
                            barWidth: 11,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'top'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr1
                        }, {
                            name: '激活量（台）',
                            type: 'bar',
                            stack: false,
                            barWidth: 11,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'top'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: arr2
                        }, {
                            name: '拉新用户（户）',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12',
                                position: 'top'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            yAxisIndex: 1,
                            data: arr3
                        }]
                    }
                });
            };
            $scope.shopStockModelTop5 = {
                chart: {
                    type: 'pie',
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '<b>{point.name}<br/>{point.y}台<br/>{point.percentage:.1f}%</b>'
                },
                colors: ['#00a3ff', '#00c7dc', '#08b051', '#e45800', '#944cde'],
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 15,
                        dataLabels: {
                            enabled: true,
                            distance: -40,
                            style: {
                                color: '#181818'
                            },
                            format: '<b>{point.name}<br/>{point.y}台<br/>{point.percentage:.1f}%</b>'
                        },
                        showInLegend: false
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
            $scope.qryShopStockModelTop5 = function () {
                var params = {
                    queryDate: _.get($rootScope, 'month.key'),
                    channelId: _.get($rootScope, 'targetStore.CHANNEL_ID')
                };
                httpMethod.qryShopStockModelTop5(params).then(function (rsp) {
                    $scope.shopStockModelTop5List = rsp.data;
                    var businessIndexList = [];
                    _.forEach(rsp.data, function (item, index) {
                        if (index < 5) {
                            var obj = {
                                name: item.OFFER_MODEL_NAME,
                                y: item.STOCK_COUNT
                            };
                            businessIndexList.push(obj);
                        }
                    });
                    $scope.shopStockModelTop5.series[0].data = businessIndexList;
                });
            };


            $rootScope.$watch('month.key', function(newVal){
                if($rootScope.targetStore){
                    var params = {
                        queryDate: newVal,
                        channelNbr: _.get($rootScope.targetStore, 'CHANNEL_NBR')
                    };
                    httpMethod.qryShopByConds(params).then(function (rsp) {
                        if (rsp.success) {
                            $rootScope.targetStore = rsp.data.list[0];
                        }
                    });
                }
            });

            $rootScope.$watchGroup(['month.key', 'targetStore.CHANNEL_ID'], function (newVal) {
                if (newVal) {
                    if (_.get($rootScope.targetStore, 'CHANNEL_ID')) {
                        $scope.qryShopProcureSalesLast6Months();
                        $scope.qryShopSalesInfoLast6Months();
                        $scope.qryShopSalesStockInfoLast6Months();
                        $scope.qryShopSalesJhLxLast6Months();
                        $scope.qryShopSalesBrandModelNumLast6Months();

                        $scope.qryBizmanProcureSales();
                        $scope.qryBizmanSalesInfo();
                        $scope.qryBizmanSalesInfo();
                        $scope.qryShopStockZZModelTop5();

                        $scope.qryShopSalesModelTop5();
                        $scope.qryShopSalesManTop5();
                        $scope.qryShopStockModelTop5();
                    }
                }
            }, true);

        }])
        .controller('chooseServiceHallModalCtrl', function ($uibModalInstance, $scope, $rootScope, items, httpMethod) {
            var $ctrl = this;

            $scope.totalNum = 0;
            $scope.pageSize = 5;
            $scope.currentPage = 1;
            $scope.maxSize = 3; //最大显示页码数
            $scope.qryShopByConds = function (curPage, pageSize) {
                $scope.currentPage = curPage || 1;
                $scope.pageSize = pageSize || 5;
                var params = {
                    curPage: $scope.currentPage, //当前页
                    pageSize: $scope.pageSize, //每页条数
                    queryDate: _.get($rootScope, 'month.key'),
                    channelNbr: $scope.channelNbr,
                    channelName: $scope.channelName
                };
                httpMethod.qryShopByConds(params).then(function (rsp) {
                    if (rsp.success) {
                        $scope.totalNum = rsp.data.total;
                        $scope.pageNums = rsp.data.pages;
                        $scope.shopByCondsList = rsp.data.list;
                    }
                });
            };
            $scope.qryShopByConds();

            $scope.todoChecked = {}; //待确认的选项
            //单选框选择
            $scope.check = function (item) {
                if (!item.checked) {
                    _.map($scope.shopByCondsList, function (item) {
                        item.checked = false;
                    });
                    $scope.todoChecked = item;
                    item.checked = true;
                } else {
                    item.checked = false;
                    $scope.todoChecked = {};
                }
            };
            $ctrl.ok = function () {
                $rootScope.targetStore = $scope.todoChecked;
                $scope.todoChecked = {}; // 置空
                $uibModalInstance.close();
            };
            $ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        })
});
