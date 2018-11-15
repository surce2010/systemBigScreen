/**
 * Auth dingshaohua
 * Date 2018-10-22
 */
define(['angular', 'jquery', 'lodash', 'ngDirective', 'ngHighCharts', 'ngEcharts', 'scrollbar', 'ngMapDrill', 'httpMethod'], function (angular, $, _) {
    angular
        .module('pageModule', ['ngDirective', 'ngHighCharts', 'ngMapDrill', 'ngEcharts', 'httpMethod'])
        .controller('pageCtrl', ['$rootScope', '$scope', '$log', '$timeout', 'httpMethod', function ($rootScope, $scope, $log, $timeout, httpMethod) {
            $scope.link = function (title, view, id, data) {
                parent.angular.element(parent.$('#tabs')).scope().addTab(title, view, id, data);
            };

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
            httpMethod.initCommonRegionInfo4VisualRegionInvoicing().then(function (rsp) {
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

            $scope.qryInStockAndMonthRatio = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
                };
                httpMethod.qryInStockAndMonthRatio(params).then(function (rsp) {
                    var xaxis = [], inStockCount = [], monthRatio = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.commonRegionName);
                        inStockCount.push(item.inStockCount); //入库量
                        monthRatio.push(item.monthRatio); //环比
                    });

                    //XX月份省入库量及环比变化
                    $scope.inStockAndMonthRatioConfig = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '40',
                            right: '0',
                            bottom: '22'
                        },
                        color: ['#1DA1DD', '#FCCC0E'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 0,
                            itemWidth: 20,
                            itemHeight: 10,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['入库量（万台）', '环比']
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
                                        return params.slice(0, 3);
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
                            name: '入库量（万台）',
                            type: 'bar',
                            stack: false,
                            barWidth: 22,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: inStockCount
                        }, {
                            name: '环比',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            yAxisIndex: 1,
                            data: monthRatio
                        }]
                    }
                });
            };

            $scope.qryAllSaleCountAndMonthRatio = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
                };
                httpMethod.qryAllSaleCountAndMonthRatio(params).then(function (rsp) {
                    var xaxis = [], allSaleCount = [], monthRatio = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.commonRegionName);
                        allSaleCount.push(item.allSaleCount); //核销量
                        monthRatio.push(item.monthRatio); //环比
                    });

                    //XX月份省核销量及环比变化
                    $scope.allSaleCountAndMonthRatioConfig = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '40',
                            right: '0',
                            bottom: '22'
                        },
                        color: ['#1DA1DD', '#FCCC0E'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 0,
                            itemWidth: 20,
                            itemHeight: 10,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['核销量（万台）', '环比']
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
                                        return params.slice(0, 3);
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
                            stack: false,
                            barWidth: 22,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: allSaleCount
                        }, {
                            name: '环比',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            yAxisIndex: 1,
                            data: monthRatio
                        }]
                    }
                });
            };

            $scope.qryMonthStockSaleProportion = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
                };
                httpMethod.qryMonthStockSaleProportion(params).then(function (rsp) {
                    var xaxis = [], monthInstockSale = [], monthNoInstockSale = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.commonRegionName);
                        monthInstockSale.push(item.monthInstockSale); //当月入库当月核销量
                        monthNoInstockSale.push(item.monthNoInstockSale); //非当月入库当月核销量
                    });

                    //XX月份核销量结构
                    $scope.monthStockSaleProportionConfig = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '40',
                            right: '0',
                            bottom: '22'
                        },
                        color: ['#1DA1DD', '#CEA963'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 0,
                            itemWidth: 20,
                            itemHeight: 10,
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
                                    },
                                    formatter: function (params) {
                                        return params.slice(0, 3);
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
                            name: '当月入库当月核销量（万台）',
                            type: 'bar',
                            stack: true,
                            barWidth: 22,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: monthInstockSale
                        }, {
                            name: '非当月入库当月核销量（万台）',
                            type: 'bar',
                            stack: true,
                            barWidth: 22,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: monthNoInstockSale
                        }]
                    }
                });
            };

            $scope.qrySaleShopCountAndMonthRatio = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
                };
                httpMethod.qrySaleShopCountAndMonthRatio(params).then(function (rsp) {
                    var xaxis = [], saleShopCount = [], monthRatio = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.commonRegionName);
                        saleShopCount.push(item.saleShopCount); //有销门店
                        monthRatio.push(item.monthRatio); //环比
                    });

                    //XX有销门店及环比变化
                    $scope.saleShopCountAndMonthRatioConfig = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '40',
                            right: '0',
                            bottom: '22'
                        },
                        color: ['#1DA1DD', '#FCCC0E'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 0,
                            itemWidth: 20,
                            itemHeight: 10,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['有销门店（个）', '环比']
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
                                        return params.slice(0, 3);
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
                            name: '有销门店（个）',
                            type: 'bar',
                            stack: false,
                            barWidth: 22,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: saleShopCount
                        }, {
                            name: '环比',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            yAxisIndex: 1,
                            data: monthRatio
                        }]
                    }
                });
            };

            $scope.qryShopMonthSaleAndMonthRatio = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
                };
                httpMethod.qryShopMonthSaleAndMonthRatio(params).then(function (rsp) {
                    var xaxis = [], shopMonthSale = [], monthRatio = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.commonRegionName);
                        shopMonthSale.push(item.shopMonthSale); //单店月销量
                        monthRatio.push(item.monthRatio); //环比
                    });

                    //XX月份有销门店单店月销量及环比变化
                    $scope.shopMonthSaleAndMonthRatioConfig = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '40',
                            right: '0',
                            bottom: '22'
                        },
                        color: ['#1DA1DD', '#FCCC0E'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 0,
                            itemWidth: 20,
                            itemHeight: 10,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['单店月销量（万台）', '环比']
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
                                        return params.slice(0, 3);
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
                            name: '单店月销量（万台）',
                            type: 'bar',
                            stack: false,
                            barWidth: 22,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: shopMonthSale
                        }, {
                            name: '环比',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            yAxisIndex: 1,
                            data: monthRatio
                        }]
                    }
                });
            };

            $scope.qryJihuoLaxinAndAllSaleCount = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
                };
                httpMethod.qryJihuoLaxinAndAllSaleCount(params).then(function (rsp) {
                    var xaxis = [], allSaleCount = [], JihuoCount = [], LaxinCount = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.commonRegionName);
                        allSaleCount.push(item.allSaleCount); //核销量
                        JihuoCount.push(item.JihuoCount); //激活量
                        LaxinCount.push(item.LaxinCount); //拉新用户
                    });

                    //XX月份核销量、激活量、拉新用户
                    $scope.jihuoLaxinAndAllSaleCountConfig = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '40',
                            right: '0',
                            bottom: '22'
                        },
                        color: ['#1DA1DD', '#CEA963', '#6CB37A'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 0,
                            itemWidth: 20,
                            itemHeight: 10,
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
                                    },
                                    formatter: function (params) {
                                        return params.slice(0, 3);
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
                            stack: true,
                            barWidth: 22,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: allSaleCount
                        }, {
                            name: '激活量（万台）',
                            type: 'bar',
                            stack: true,
                            barWidth: 22,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: JihuoCount
                        }, {
                            name: '拉新用户（万台）',
                            type: 'bar',
                            stack: true,
                            barWidth: 22,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: LaxinCount
                        }]
                    }
                });
            };

            $scope.qryMonthJihuoAndLaxinRatio = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId')
                };
                httpMethod.qryMonthJihuoAndLaxinRatio(params).then(function (rsp) {
                    var xaxis = [], JihuoRatio = [], LaxinRatio = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.commonRegionName);
                        JihuoRatio.push(item.JihuoRatio); //激活率
                        LaxinRatio.push(item.LaxinRatio); //拉新率
                    });

                    //XX月份激活率和拉新率
                    $scope.monthJihuoAndLaxinRatioConfig = {
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        grid: {
                            left: '0',
                            top: '40',
                            right: '0',
                            bottom: '22'
                        },
                        color: ['#1DA1DD', '#CEA963'],
                        legend: {
                            show: true,
                            top: 0,
                            right: 0,
                            itemWidth: 20,
                            itemHeight: 10,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['激活率', '拉新率']
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
                                        return params.slice(0, 3);
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
                            name: '激活率',
                            type: 'bar',
                            stack: true,
                            barWidth: 22,
                            label: {
                                show: true,
                                fontSize: '12',
                                formatter: function (params) {
                                    return params.value + '%';
                                }
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: JihuoRatio
                        }, {
                            name: '拉新率',
                            type: 'bar',
                            stack: true,
                            barWidth: 22,
                            label: {
                                show: true,
                                fontSize: '12',
                                formatter: function (params) {
                                    return params.value + '%';
                                }
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: LaxinRatio
                        }]
                    }
                });
            };

            $scope.$watchGroup(['month.key', 'channelType.channelTypeCd', 'checkedCity.commonRegionId'], function (newVal) {
                if (newVal) {
                    $scope.qryInStockAndMonthRatio();
                    $scope.qryAllSaleCountAndMonthRatio();
                    $scope.qryMonthStockSaleProportion();
                    $scope.qrySaleShopCountAndMonthRatio();
                    $scope.qryShopMonthSaleAndMonthRatio();
                    $scope.qryJihuoLaxinAndAllSaleCount();
                    $scope.qryMonthJihuoAndLaxinRatio();
                }
            });
        }])
});
