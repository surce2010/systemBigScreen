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

            $scope.qryDataForStarModel = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    areaLevel: _.get($scope, 'checkedCity.areaLevel')
                };
                httpMethod.qryDataForStarModel(params).then(function (rsp) {
                    $scope.dataForStarModelList = rsp.data || [];

                    var chartData = rsp.data.slice(0, 5);
                    var xaxis = [], retailShopCount = [], singleShopMonthSaleCount = [], allSaleCout = [],
                        allZccCount = [], allLxCount = [], allStockCount = [], stockDuring = [], jhRate = [], lxRate = [];
                    _.map(chartData, function (item) {
                        xaxis.push(item.modelName);
                        retailShopCount.push(item.retailShopCount); //有销门店数
                        singleShopMonthSaleCount.push(item.singleShopMonthSaleCount); //有销门店单店月销量（台/月）
                        allSaleCout.push(item.allSaleCout); //核销量
                        allZccCount.push(item.allZccCount); //自注册激活量
                        allLxCount.push(item.allLxCount); //拉新用户
                        allStockCount.push(item.allStockCount); //库存量
                        stockDuring.push(item.stockDuring); //库存周转周数
                        jhRate.push(item.jhRate);//激活率
                        lxRate.push(item.lxRate);//拉新率
                    });

                    //TOP5销量机型有销门店单店月销量
                    $scope.top5ShopConfig = {
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
                            left: 'center',
                            top: 0,
                            itemWidth: 20,
                            itemHeight: 10,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['有销门店数（个）', '有销门店单店月销量（台/月）']
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
                                    formatter:function(val){
                                        var reg = /(.{8}).*/;
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
                            name: '有销门店数（个）',
                            type: 'bar',
                            stack: false,
                            barWidth: 70,
                            label: {
                                show: false,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: retailShopCount
                        }, {
                            name: '有销门店单店月销量（台/月）',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            yAxisIndex: 1,
                            data: singleShopMonthSaleCount
                        }]
                    };
                    //TOP5销量机型核销量
                    $scope.top5ModelConfig = {
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
                        color: ['#1DA1DD', '#E2BB5D', '#51B674'],
                        legend: {
                            show: true,
                            left: 'center',
                            top: 0,
                            itemWidth: 10,
                            itemHeight: 10,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['核销量（台）']
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
                                    formatter:function(val){
                                        var reg = /(.{8}).*/;
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
                            }
                        ],
                        series: [{
                            name: '核销量（台）',
                            type: 'bar',
                            stack: true,
                            barWidth: 70,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: allSaleCout
                        }]
                    };

                    //TOP5销量机型激活拉新
                    $scope.top5SaleConfig = {
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
                        color: ['#1DA1DD', '#E2BB5D'],
                        legend: {
                            show: true,
                            left: 'center',
                            top: 0,
                            itemWidth: 10,
                            itemHeight: 10,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['激活量（台）', '拉新用户（户）']
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
                                    formatter:function(val){
                                        var reg = /(.{8}).*/;
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
                            }
                        ],
                        series: [{
                            name: '激活量（台）',
                            type: 'bar',
                            stack: true,
                            barWidth: 70,
                            label: {
                                show: false,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: allZccCount
                        }, {
                            name: '拉新用户（户）',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: allLxCount
                        }]
                    };

                    //TOP5销量机型激活率、拉新率
                    $scope.top5ActivatyConfig = {
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
                        color: ['#1da1dd', '#cea963'],
                        legend: {
                            show: true,
                            left: 'center',
                            top: 0,
                            itemWidth: 10,
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
                                    formatter:function(val){
                                        var reg = /(.{8}).*/;
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
                            }
                        ],
                        series: [{
                            name: '激活率',
                            type: 'bar',
                            stack: true,
                            barWidth: 70,
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
                            data: jhRate
                        }, {
                            name: '拉新率',
                            type: 'bar',
                            stack: true,
                            barWidth: 70,
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
                            data: lxRate
                        }]
                    };

                    //TOP5销量机型库存周转
                    $scope.top5StockConfig = {
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
                            left: 'center',
                            top: 0,
                            itemWidth: 20,
                            itemHeight: 10,
                            textStyle: {
                                color: '#fff'
                            },
                            data: ['库存量（台）', '库存周转周数']
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
                                    formatter:function(val){
                                        var reg = /(.{10}).*/;
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
                            name: '库存量（台）',
                            type: 'bar',
                            stack: false,
                            barWidth: 70,
                            label: {
                                show: false,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: allStockCount
                        }, {
                            name: '库存周转周数',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            yAxisIndex: 1,
                            data: stockDuring
                        }]
                    }
                });
            };

            $scope.qrySaleShopForStarModel = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    areaLevel: _.get($scope, 'checkedCity.areaLevel'),
                    publicName: _.get($scope, 'constOfferModel.publicName')
                };
                httpMethod.qrySaleShopForStarModel(params).then(function (rsp) {
                    var xaxis = [], retailShopCount = [], singleShopMonthSaleCount = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.regionName);
                        retailShopCount.push(item.retailShopCount); //有销门店数
                        singleShopMonthSaleCount.push(item.retailShopRate); //有销门店占比
                    });

                    //有销门店及有销门店占比
                    $scope.saleShopConfig = {
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
                            data: ['有销门店数（个）', '有销门店占比']
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
                            name: '有销门店数（个）',
                            type: 'bar',
                            stack: false,
                            barWidth: 22,
                            label: {
                                show: false,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: retailShopCount
                        }, {
                            name: '有销门店占比',
                            type: 'line',
                            smooth: false,
                            yAxisIndex: 1,
                            label: {
                                show: true,
                                fontSize: '12',
                                formatter: function (params) {
                                    return params.value + '%';
                                }
                            },
                            data: singleShopMonthSaleCount
                        }]
                    }
                });
            };

            $scope.qrySaleCountForStarModel = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    areaLevel: _.get($scope, 'checkedCity.areaLevel'),
                    publicName: _.get($scope, 'constOfferModel.publicName')
                };
                httpMethod.qrySaleCountForStarModel(params).then(function (rsp) {
                    var xaxis = [], allSaleCount = [], singleShopMonthSaleCount = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.regionName);
                        allSaleCount.push(item.allSaleCount); //总核销量
                        singleShopMonthSaleCount.push(item.singleShopMonthSaleCount); //单店月销量
                    });

                    //核销量及单店月销量
                    $scope.saleCountConfig = {
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
                            data: ['总核销量（台）', '单店月销量（台/月）']
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
                            name: '总核销量（台）',
                            type: 'bar',
                            stack: false,
                            barWidth: 22,
                            label: {
                                show: false,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: allSaleCount
                        }, {
                            name: '单店月销量（台/月）',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            yAxisIndex: 1,
                            data: singleShopMonthSaleCount
                        }]
                    }
                });
            };

            $scope.qryStockCountForStarModel = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    areaLevel: _.get($scope, 'checkedCity.areaLevel'),
                    publicName: _.get($scope, 'constOfferModel.publicName')
                };
                httpMethod.qryStockCountForStarModel(params).then(function (rsp) {
                    var xaxis = [], nowStockCount = [], stockDring = [];
                    _.map(rsp.data, function (item) {
                        xaxis.push(item.regionName);
                        nowStockCount.push(item.nowStockCount); //库存量（台）
                        stockDring.push(item.stockDring); //库存周转周数
                    });

                    //库存量及库存周转周数
                    $scope.stockCountConfig = {
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
                            data: ['库存量（台）', '库存周转周数（周）']
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
                            name: '库存量（台）',
                            type: 'bar',
                            stack: false,
                            barWidth: 22,
                            label: {
                                show: false,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: nowStockCount
                        }, {
                            name: '库存周转周数（周）',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            yAxisIndex: 1,
                            data: stockDring
                        }]
                    }
                });
            };

            $scope.qryRegionDataForStarModel = function () {
                var params = {
                    queryDate: _.get($scope, 'month.key'),
                    channelTypeCd: _.get($scope, 'channelType.channelTypeCd'),
                    commonRegionId: _.get($scope, 'checkedCity.commonRegionId'),
                    areaLevel: _.get($scope, 'checkedCity.areaLevel'),
                    publicName: _.get($scope, 'constOfferModel.publicName')
                };
                httpMethod.qryRegionDataForStarModel(params).then(function (rsp) {
                    $scope.currentMonth = rsp.data.month; //月份
                    $scope.brandName = rsp.data.brandName; //品牌名称
                    $scope.modelName = rsp.data.modelName; //型号名称

                    var xaxis = [], allSaleCount = [], allJhCount = [], allLxCount = [], jhRate = [], lxRate = [];
                    _.map(rsp.data.list, function (item) {
                        xaxis.push(item.regionName);
                        // allSaleCount.push(item.allSaleCount); //总核销量（万台）
                        allJhCount.push(item.allJhCount); //激活量（万台）
                        allLxCount.push(item.allLxCount); //拉新用户（万台）
                        jhRate.push(item.jhRate); //激活率
                        lxRate.push(item.lxRate); //拉新率
                    });

                    //激活量拉新用户数据
                    $scope.regionDataConfig = {
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
                            data: ['激活量（台）', '拉新用户（户）']
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
                            name: '激活量（台）',
                            type: 'bar',
                            stack: true,
                            barWidth: 22,
                            label: {
                                show: false,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: allJhCount
                        }, {
                            name: '拉新用户（户）',
                            type: 'line',
                            smooth: false,
                            label: {
                                show: true,
                                fontSize: '12'
                            },
                            itemStyle: {
                                barBorderRadius: 0
                            },
                            data: allLxCount
                        }]
                    };

                    //总核销量激活量拉新用户数据
                    $scope.regionRateConfig = {
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
                            data: jhRate
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
                            data: lxRate
                        }]
                    }
                });
            };

            $scope.$watch('month.key', function (newVal) {
                if (newVal) {
                    httpMethod.qryConstOfferModel({
                        queryDate: newVal
                    }).then(function (rsp) {
                        if (rsp.success) {
                            $scope.constOfferModelList = rsp.data;
                        }
                    })
                }
            });

            $scope.$watchGroup(['month.key', 'channelType.channelTypeCd', 'checkedCity.commonRegionId'], function (newVal) {
                if (newVal) {
                    $scope.qryDataForStarModel();
                }
            });

            $scope.$watchGroup(['month.key', 'channelType.channelTypeCd', 'checkedCity.commonRegionId', 'constOfferModel.publicName'], function (newVal) {
                if (newVal) {
                    $scope.qrySaleShopForStarModel();
                    $scope.qrySaleCountForStarModel();
                    $scope.qryStockCountForStarModel();
                    $scope.qryRegionDataForStarModel();
                }
            });
        }])
});
