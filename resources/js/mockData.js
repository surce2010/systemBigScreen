(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['mock'], factory);
    } else if (typeof exports === 'object') {
        factory(require('mock'));
        module.exports = 'mockData';
    } else {
        //Browser globals (root is window), we don't register it.
        factory(root.Mock);
    }
})(this, function (Mock) {
    //1、头部进销存数据展示接口
    Mock.mock(new RegExp('/visual/q/queryHeadSaleStockInfo'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        data: {
            'SALE_SHOP_COUNT|1-10000': 100, //有销门店（万个）
            'IN_STOCK_COUNT|1-10000': 100, //入库量（万台）
            'ALL_SALE_COUNT|1-10000': 100, //核销量（万台）
            'NOW_STOCK_COUNT|1-10000': 100, //库存量（万台）
            'ALL_SALE_AMOUNT|1-10000': 100, //收银额（亿元）
            'SALE_MODEL_COUNT|1-10000': 100, //销售类型（款）
            'JIHUO_COUNT|1-10000': 100, //激活量（万台）
            'LAXIN_COUNT|1-10000': 100 //拉新用户（万户）
        }
    });
    //2、指标类型接口
    Mock.mock(new RegExp('/visual/q/queryIndexInfo'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|5': [{
            'INDEX_ID': '@id', //指标ID
            'INDEX_NAME|+1': ['有销门店', '有销门店占比', '入库量', '核销量', '库存量', '收银额', '激活率', '拉新用户'] //有销门店、有销门店占比、入库量、核销量、库存量、收银额、激活率、拉新用户
        }]
    });
    //3、分区域按指标排名接口
    Mock.mock(new RegExp('/visual/q/queryIndexSeqGroupRegion'), function (options) {
        var param = JSON.parse(decodeURI(options.body.slice(6)));
        if (param.common_region_id === '8100000') {
            return {
                rsphead: 's',
                success: 'true', //是否成功true/失败false
                code: null,
                msg: null, //失败信息
                error: null,
                'data': {
                    'INDEX_SUM': 1324345,
                    'AREA_LEVEL': '2',
                    'list': [{
                        'SEQ': 1, //排名
                        'REGION_NAME': '江苏省', //地区名称
                        'REGION_ALIAS_NAME': '江苏', //别名
                        'PROVINCE_ALIAS_NAME': '江苏', //所属省份
                        'COMMON_REGION_ID': '330000', //地区ID
                        'INDEX_COUNT': 1000, //指标数值
                        'SEQ_CHANGE_TYPE': '1' //排名变化（主数据：1.上升、2.下降、3.持平）
                    }]
                }
            }
        } else if (param.common_region_id === '330000') {
            return {
                rsphead: 's',
                success: 'true', //是否成功true/失败false
                code: null,
                msg: null, //失败信息
                error: null,
                'data': {
                    'INDEX_SUM': 24345,
                    'AREA_LEVEL': '3',
                    'list': [{
                        'SEQ': 1, //排名
                        'REGION_NAME': '南京市', //地区名称
                        'REGION_ALIAS_NAME': '南京市', //别名
                        'PROVINCE_ALIAS_NAME': '江苏', //所属省份
                        'COMMON_REGION_ID': '320100', //地区ID
                        'INDEX_COUNT': 1000, //指标数值
                        'SEQ_CHANGE_TYPE': '2' //排名变化（主数据：1.上升、2.下降、3.持平）
                    }, {
                        'SEQ': 1, //排名
                        'REGION_NAME': '南京市', //地区名称
                        'REGION_ALIAS_NAME': '南京市', //别名
                        'PROVINCE_ALIAS_NAME': '江苏', //所属省份
                        'COMMON_REGION_ID': '320100', //地区ID
                        'INDEX_COUNT': 1000, //指标数值
                        'SEQ_CHANGE_TYPE': '2' //排名变化（主数据：1.上升、2.下降、3.持平）
                    }, {
                        'SEQ': 1, //排名
                        'REGION_NAME': '南京市', //地区名称
                        'REGION_ALIAS_NAME': '南京市', //别名
                        'PROVINCE_ALIAS_NAME': '江苏', //所属省份
                        'COMMON_REGION_ID': '320100', //地区ID
                        'INDEX_COUNT': 1000, //指标数值
                        'SEQ_CHANGE_TYPE': '2' //排名变化（主数据：1.上升、2.下降、3.持平）
                    }, {
                        'SEQ': 1, //排名
                        'REGION_NAME': '南京市', //地区名称
                        'REGION_ALIAS_NAME': '南京市', //别名
                        'PROVINCE_ALIAS_NAME': '江苏', //所属省份
                        'COMMON_REGION_ID': '320100', //地区ID
                        'INDEX_COUNT': 1000, //指标数值
                        'SEQ_CHANGE_TYPE': '2' //排名变化（主数据：1.上升、2.下降、3.持平）
                    }, {
                        'SEQ': 1, //排名
                        'REGION_NAME': '南京市', //地区名称
                        'REGION_ALIAS_NAME': '南京市', //别名
                        'PROVINCE_ALIAS_NAME': '江苏', //所属省份
                        'COMMON_REGION_ID': '320100', //地区ID
                        'INDEX_COUNT': 1000, //指标数值
                        'SEQ_CHANGE_TYPE': '2' //排名变化（主数据：1.上升、2.下降、3.持平）
                    }, {
                        'SEQ': 1, //排名
                        'REGION_NAME': '南京市', //地区名称
                        'REGION_ALIAS_NAME': '南京市', //别名
                        'PROVINCE_ALIAS_NAME': '江苏', //所属省份
                        'COMMON_REGION_ID': '320100', //地区ID
                        'INDEX_COUNT': 1000, //指标数值
                        'SEQ_CHANGE_TYPE': '2' //排名变化（主数据：1.上升、2.下降、3.持平）
                    }, {
                        'SEQ': 1, //排名
                        'REGION_NAME': '南京市', //地区名称
                        'REGION_ALIAS_NAME': '南京市', //别名
                        'PROVINCE_ALIAS_NAME': '江苏', //所属省份
                        'COMMON_REGION_ID': '320100', //地区ID
                        'INDEX_COUNT': 1000, //指标数值
                        'SEQ_CHANGE_TYPE': '2' //排名变化（主数据：1.上升、2.下降、3.持平）
                    }, {
                        'SEQ': 1, //排名
                        'REGION_NAME': '南京市', //地区名称
                        'REGION_ALIAS_NAME': '南京市', //别名
                        'PROVINCE_ALIAS_NAME': '江苏', //所属省份
                        'COMMON_REGION_ID': '320100', //地区ID
                        'INDEX_COUNT': 1000, //指标数值
                        'SEQ_CHANGE_TYPE': '2' //排名变化（主数据：1.上升、2.下降、3.持平）
                    }, {
                        'SEQ': 1, //排名
                        'REGION_NAME': '南京市', //地区名称
                        'REGION_ALIAS_NAME': '南京市', //别名
                        'PROVINCE_ALIAS_NAME': '江苏', //所属省份
                        'COMMON_REGION_ID': '320100', //地区ID
                        'INDEX_COUNT': 1000, //指标数值
                        'SEQ_CHANGE_TYPE': '2' //排名变化（主数据：1.上升、2.下降、3.持平）
                    }, {
                        'SEQ': 1, //排名
                        'REGION_NAME': '南京市', //地区名称
                        'REGION_ALIAS_NAME': '南京市', //别名
                        'PROVINCE_ALIAS_NAME': '江苏', //所属省份
                        'COMMON_REGION_ID': '320100', //地区ID
                        'INDEX_COUNT': 1000, //指标数值
                        'SEQ_CHANGE_TYPE': '2' //排名变化（主数据：1.上升、2.下降、3.持平）
                    }, {
                        'SEQ': 1, //排名
                        'REGION_NAME': '南京市', //地区名称
                        'REGION_ALIAS_NAME': '南京市', //别名
                        'PROVINCE_ALIAS_NAME': '江苏', //所属省份
                        'COMMON_REGION_ID': '320100', //地区ID
                        'INDEX_COUNT': 1000, //指标数值
                        'SEQ_CHANGE_TYPE': '2' //排名变化（主数据：1.上升、2.下降、3.持平）
                    }, {
                        'SEQ': 1, //排名
                        'REGION_NAME': '南京市', //地区名称
                        'REGION_ALIAS_NAME': '南京市', //别名
                        'PROVINCE_ALIAS_NAME': '江苏', //所属省份
                        'COMMON_REGION_ID': '320100', //地区ID
                        'INDEX_COUNT': 1000, //指标数值
                        'SEQ_CHANGE_TYPE': '2' //排名变化（主数据：1.上升、2.下降、3.持平）
                    }]
                }
            }
        } else if (param.common_region_id === '320100') {
            return {
                rsphead: 's',
                success: 'true', //是否成功true/失败false
                code: null,
                msg: null, //失败信息
                error: null,
                'data': {
                    'INDEX_SUM': 145,
                    'AREA_LEVEL': '4',
                    'list': [{
                        'SEQ': 1, //排名
                        'REGION_NAME': '鼓楼区', //地区名称
                        'REGION_ALIAS_NAME': '鼓楼区', //别名
                        'PROVINCE_ALIAS_NAME': '江苏', //所属省份
                        'COMMON_REGION_ID': '320103', //地区ID
                        'INDEX_COUNT': 1000, //指标数值
                        'SEQ_CHANGE_TYPE': '3' //排名变化（主数据：1.上升、2.下降、3.持平）
                    }, {
                        'SEQ': 1, //排名
                        'REGION_NAME': '鼓楼区', //地区名称
                        'REGION_ALIAS_NAME': '鼓楼区', //别名
                        'PROVINCE_ALIAS_NAME': '江苏', //所属省份
                        'COMMON_REGION_ID': '320103', //地区ID
                        'INDEX_COUNT': 1000, //指标数值
                        'SEQ_CHANGE_TYPE': '3' //排名变化（主数据：1.上升、2.下降、3.持平）
                    }, {
                        'SEQ': 1, //排名
                        'REGION_NAME': '鼓楼区', //地区名称
                        'REGION_ALIAS_NAME': '鼓楼区', //别名
                        'PROVINCE_ALIAS_NAME': '江苏', //所属省份
                        'COMMON_REGION_ID': '320103', //地区ID
                        'INDEX_COUNT': 1000, //指标数值
                        'SEQ_CHANGE_TYPE': '3' //排名变化（主数据：1.上升、2.下降、3.持平）
                    }]
                }
            }
        } else {
            return {
                rsphead: 's',
                success: 'true', //是否成功true/失败false
                code: null,
                msg: null, //失败信息
                error: null,
                'data': {
                    'INDEX_SUM': 145,
                    'list': [{
                        'SEQ': 1, //排名
                        'REGION_NAME': '门店1', //地区名称
                        'REGION_ALIAS_NAME': '', //别名
                        'PROVINCE_ALIAS_NAME': '江苏', //所属省份
                        'COMMON_REGION_ID': '', //地区ID
                        'INDEX_COUNT': 100, //指标数值
                        'SEQ_CHANGE_TYPE': '3' //排名变化（主数据：1.上升、2.下降、3.持平）
                    }]
                }
            }
        }
    });
    //4、分区域查询指标数值接口
    Mock.mock(new RegExp('/visual/q/queryOrderIndexGroupRegion'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|2': [{
            'REGION_NAME|+1': ['城市', '农村'], //区域名称
            'INDEX_COUNT|1-10000': 100, //指标数值
            'INDEX_RATIO': 45.55 //指标百分比(精确到小数点后2位)
        }]
    });
    //5、分商圈查询指标数值接口
    Mock.mock(new RegExp('/visual/q/queryBusinessIndex'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|4': [{
            'BUSINESS_NAME': '@cword(2, 3)', //商圈名称
            'INDEX_COUNT|1-10000': 100, //指标数值
            'INDEX_RATIO': 45.55 //指标百分比(精确到小数点后2位)
        }]
    });
    //6、分日期展示相应帐期内的指标数据查询接口
    Mock.mock(new RegExp('/visual/q/queryIndexGroupDay'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|30': [{
            'DAY': '@date()', //日期
            'INDEX_COUNT|1-10000': 100 //指标数值
        }]
    });
    //7、按帐期查询TOP12品牌接口
    Mock.mock(new RegExp('/visual/q/queryTop12Brand'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|12': [{
            'SEQ|1-1000': 1, //排名
            'BRAND_NAME': '@cword(4)', //指标名称
            'SALE_SHOP_COUNT|1-1000': 1000, //有销门店数
            'IN_STOCK_COUNT|1-1000': 1000, //入库量
            'ALL_SALE_COUNT|1-1000': 1000, //核销量
            'NOW_STOCK_COUNT|1-1000': 1000, //库存量
            'JIHUO_COUNT|1-1000': 1000, //激活量
            'LAXIN_COUNT|1-1000': 1000, //拉新用户
            'ALL_SALE_RATIO|1-1000': 45.55 //核销量占比(精确到小数点后2位)
        }]
    });
    //8、按帐期查询TOP6成长型品牌接口
    Mock.mock(new RegExp('/visual/q/queryTop6GrowthBrand'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|6': [{
            'SEQ|1-1000': 1, //排名
            'BRAND_NAME': '@cword(4)', //指标名称
            'SALE_SHOP_COUNT|1-1000': 1000, //有销门店数
            'IN_STOCK_COUNT|1-1000': 1000, //入库量
            'ALL_SALE_COUNT|1-1000': 1000, //核销量
            'NOW_STOCK_COUNT|1-1000': 1000, //库存量
            'JIHUO_COUNT|1-1000': 1000, //激活量
            'LAXIN_COUNT|1-1000': 1000, //拉新用户
            'ALL_SALE_RATIO|1-1000': 45.55 //核销量占比(精确到小数点后2位)
        }]
    });
    //9、按帐期查询TOP6特色品牌接口
    Mock.mock(new RegExp('/visual/q/queryTop6FeatureBrand'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|6': [{
            'SEQ|1-1000': 1, //排名
            'BRAND_NAME': '@cword(4)', //指标名称
            'SALE_SHOP_COUNT|1-1000': 1000, //有销门店数
            'IN_STOCK_COUNT|1-1000': 1000, //入库量
            'ALL_SALE_COUNT|1-1000': 1000, //核销量
            'NOW_STOCK_COUNT|1-1000': 1000, //库存量
            'JIHUO_COUNT|1-1000': 1000, //激活量
            'LAXIN_COUNT|1-1000': 1000, //拉新用户
            'ALL_SALE_RATIO|1-1000': 45.55 //核销量占比(精确到小数点后2位)
        }]
    });
    //10、按帐期查询TOP10销量机型接口
    Mock.mock(new RegExp('/visual/q/queryTop10SaleModel'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|10': [{
            'SEQ|1-1000': 1, //排名
            'MODEL_NAME': '@cword(4)', //指标名称
            'SALE_SHOP_COUNT|1-1000': 1000, //有销门店数
            'IN_STOCK_COUNT|1-1000': 1000, //入库量
            'ALL_SALE_COUNT|1-1000': 1000, //核销量
            'NOW_STOCK_COUNT|1-1000': 1000, //库存量
            'JIHUO_COUNT|1-1000': 1000, //激活量
            'LAXIN_COUNT|1-1000': 1000, //拉新用户
            'ALL_SALE_RATIO|1-1000': 45.55 //核销量占比(精确到小数点后2位)
        }]
    });
    //11、按帐期查询TOP10销量泛智能终端接口
    Mock.mock(new RegExp('/visual/q/queryTop10FznModel'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|10': [{
            'SEQ|1-1000': 1, //排名
            'MODEL_NAME': '@cword(4)', //指标名称
            'SALE_SHOP_COUNT|1-1000': 1000, //有销门店数
            'IN_STOCK_COUNT|1-1000': 1000, //入库量
            'ALL_SALE_COUNT|1-1000': 1000, //核销量
            'NOW_STOCK_COUNT|1-1000': 1000, //库存量
            'JIHUO_COUNT|1-1000': 1000, //激活量
            'LAXIN_COUNT|1-1000': 1000, //拉新用户
            'ALL_SALE_RATIO|1-1000': 45.55 //核销量占比(精确到小数点后2位)
        }]
    });
    //12、按帐期查询分渠道类型数据接口
    Mock.mock(new RegExp('/visual/q/queryInfoGroupChannelType'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|5': [{
            'CHANNEL_TYPE': '自有厅', //渠道类型
            'SALE_SHOP_COUNT|1-1000': 1000, //有销门店数
            'SALE_SHOP_RATIO|1-1000': 1000, //有销门店占比(精确到小数点后2位)
            'IN_STOCK_COUNT|1-1000': 1000, //入库量
            'ALL_SALE_COUNT|1-1000': 1000, //核销量
            'NOW_STOCK_COUNT|1-1000': 1000, //库存量
            'JIHUO_COUNT|1-1000': 1000, //激活量
            'LAXIN_COUNT|1-1000': 1000, //拉新用户
            'ALL_SALE_RATIO|1-1000': 1000 //核销量占比(精确到小数点后2位)
        }]
    });
    //13、根据登录人信息获取其身份对应的地区信息
    Mock.mock(new RegExp('/visual/q/getLoginUserCommonRegion'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        data: {
            'common_region_id|+1': ['8100000', '330000'], //登录人所属地区ID
            'REGION_NAME': '', //地区名称
            'REGION_ALIAS_NAME|+1': ['全国', '江苏'], //地区别名
            'POST_ROLE_LEVEL|+1': ['1', '2'] //1集团管理员，2省级管理员
        }
    });
    //13、连续12个月采购入库量
    Mock.mock(new RegExp('/visual/q/qryPurchaseInAmountLast12Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|12': [{
            'COV_DATE|+1': ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11', '2017-12'], //汇聚日期 yyyy-MM（X轴）
            'PURCHASE_IN_AMOUNT|100-1000': 100 //采购入库量（万台）
        }]
    });
    //14、连续12个月终端核销量
    Mock.mock(new RegExp('/visual/q/qrySalesAmountLast12Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|12': [{
            'COV_DATE|+1': ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11', '2017-12'], //汇聚日期 yyyy-MM（X轴）
            'SALES_AMOUNT|100-1000': 100, //核销量（万台）
            'CONTRACT_SALES_AMOUNT|100-1000': 100, //合约销量（万台）
            'TERMINAL_SALES_AMOUNT|100-1000': 100, //裸机销量（万台）
            'CONTRACT_SALES_RATIO|1-100': 1, //合约销量占比
            'TERMINAL_SALES_RATIO|1-100': 1 //逻辑销量占比
        }]
    });
    //15、连续12个月核销量结构
    Mock.mock(new RegExp('/visual/q/qrySalesAmountStructureLast12Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|12': [{
            'COV_DATE|+1': ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11', '2017-12'], //汇聚日期 yyyy-MM
            'CM_PIN_CM_SALE|100-1000': 100, //当月入库当月核销量（万台）
            'PM_PIN_CM_SALE|100-1000': 100 //非当月入库当月核销量（万台）
        }]
    });
    //16、连续12个月单台收银金额
    Mock.mock(new RegExp('/visual/q/qrySalePricePerOneLast12Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|12': [{
            'COV_DATE|+1': ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11', '2017-12'], //汇聚日期 yyyy-MM
            'CONTRACT_SALE_PRICE_PER_ONE|500-1000': 1000, //合约单台收银金额
            'TERMINAL_SALE_PRICE_PER_ONE|100-500': 100 //裸机单台收银金额
        }]
    });
    //17、连续12个月有销门店单店月销量
    Mock.mock(new RegExp('/visual/q/qrySalesAmountPerSaleShopLast12Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|12': [{
            'COV_DATE|+1': ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11', '2017-12'], //汇聚日期 yyyy-MM
            'SALE_SHOP_AMOUNT|100-1000': 100, //有销门店（万）
            'SALES_AMOUNT_PER_SALE_SHOP|100-1000': 100 //单店月销量（台/月）
        }]
    });
    //18、连续12个月核销激活量及拉新率
    Mock.mock(new RegExp('/visual/q/qryZzcInfoLast12Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|12': [{
            'COV_DATE|+1': ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11', '2017-12'], //汇聚日期 yyyy-MM
            'SALES_AMOUNT|100-1000': 100, //核销量（万台）
            'JH_AMOUNT|100-1000': 100, //激活量（万台）
            'LX_AMOUNT|100-1000': 100, //拉新用户（万台）
            'JH_RATIO|1-100': 100, //激活率
            'LX_RATIO|1-100': 100 //拉新率
        }]
    });
    //19、连续12个月分价位段销量占比
    Mock.mock(new RegExp('/visual/q/qryPriceSalesRatioLast12Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|12': [{
            'COV_DATE|+1': ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11', '2017-12'], //汇聚日期 yyyy-MM
            'RATIO_0_699|1-100': 100, //0-699占比(%)
            'RATIO_700_999|1-100': 100, //700-999占比(%)
            'RATIO_1000_1499|1-100': 100, //1000-1499占比(%)
            'RATIO_1500_1999|1-100': 100, //1500-1999占比(%)
            'RATIO_2000_2999|1-100': 100, //2000-2999占比(%)
            'RATIO_3000|1-100': 100 //3000以上占比(%)
        }]
    });
    //所在地区查询接口
    Mock.mock(new RegExp('/visual/q/initCommonRegionInfo'), {
        'rsphead': 's',
        'success': true, //是否成功
        'code': null,
        'msg': null, //失败信息
        'data': {
            'areaLevelNames': ['地市', '区县'],
            'commonRegion|10': [{
                'commonRegionId': '@id',
                'regionName': '@province',
                'regionCode': '@id',
                'upRegionId': '@id',
                'regionDesc': '@cword(4)',
                'createDate': '@date()',
                'idPrefix': 64,
                'areaLevel': 3,
                'zipCode': null,
                'zoneNumber': '0951',
                'areaId': '@id',
                'childrenCommon|20': [{
                    'commonRegionId': '@id',
                    'regionName': '@city',
                    'regionCode': '@id',
                    'upRegionId': '@id',
                    'regionDesc': '@cword(5)',
                    'createDate': '@date()',
                    'idPrefix': 64,
                    'areaLevel': 4,
                    'zipCode': null,
                    'zoneNumber': '0951',
                    'areaId': null,
                    'childrenCommon': null,
                }]
            }]

        },
        'errors': null
    });

    //渠道类型查询接口
    Mock.mock(new RegExp('/visual/q/loadChannelType'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|5': [{
            'channelTypeCd': '@id',
            'channelTypeName': '@cword(4,6)'
        }]
    });

    //获取用户信息,菜单列表
    Mock.mock(new RegExp('/main/profile/index.action'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        data: {
            'userInfo': {
                'retailShopId': '@id',
                'timePeriod': '上午好',
                'name': '@cname',
                'loginCode': '@cname',
                'roleName': '宁夏自治区店长',
                'retailShopName': '@cword(5,7)',
                'userId': '@id'
            }
        }
    });

    //整体进销存分析
    //3.连续6个月采购入库量
    Mock.mock(new RegExp('/visual/q/qryPurchaseInAmountLast6Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|5': [{
            'COV_DATE': '@date()',
            'PURCHASE_IN_AMOUNT|1000-10000': 2200 //采购入库量（万台）
        }]
    });
    //4.连续6个月终端核销量
    Mock.mock(new RegExp('/visual/q/qrySalesAmountLast6Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|5': [{
            'COV_DATE': '@date()',
            'SALES_AMOUNT|100-5000': 1200,//核销量（万台）
            'CONTRACT_SALES_AMOUNT|100-5000': 300,//合约销量（万台）
            'TERMINAL_SALES_AMOUNT|100-5000': 900,//裸机销量（万台）
            'CONTRACT_SALES_RATIO|1-100': 1,//合约销量占比
            'TERMINAL_SALES_RATIO|1-100': 75//逻辑销量占比
        }]
    });
    //5.连续6个月核销量结构
    Mock.mock(new RegExp('/visual/q/qrySalesAmountStructureLast6Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|5': [{
            'COV_DATE': '@date()',
            'CM_PIN_CM_SALE|100-5000': 300,//当月入库当月核销量（万台）
            'PM_PIN_CM_SALE|100-5000': 300 //非当月入库当月核销量（万台）
        }]
    });
    //6.连续6个月分价位段销量占比
    Mock.mock(new RegExp('/visual/q/qryPriceSalesRatioLast6Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|5': [{
            'COV_DATE': '@date()',
            'RATIO_0_699|1-100': 1,//0-699占比(%)
            'RATIO_700_999|1-100': 1,//700-999占比(%)
            'RATIO_1001_1499|1-100': 1,//1000-1499占比(%)
            'RATIO_1500_1999|1-100': 1,//1500-1999占比(%)
            'RATIO_2000_2999|1-100': 1,//2000-2999占比(%)
            'RATIO_3000|1-100': 1//3000以上占比(%)
        }]
    });
    //7.连续6个月有销门店单店月销量
    Mock.mock(new RegExp('/visual/q/qrySalesAmountPerSaleShopLast6Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|5': [{
            'COV_DATE': '@date()',
            'SALE_SHOP_AMOUNT|1-100': 1,//有销门店（万）
            'SALES_AMOUNT_PER_SALE_SHOP|1-100': 1//单店月销量（台/月）
        }]
    });
    //8.连续6个月核销激活量及拉新率
    Mock.mock(new RegExp('/visual/q/qryZzcInfoLast6Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|5': [{
            'COV_DATE': '@date()',
            'SALES_AMOUNT|100-5000': 1350,//核销量（万台）
            'JH_AMOUNT|100-5000': 350,//激活量（万台）
            'LX_AMOUNT|100-5000': 350,//拉新用户（万台）
            'JH_RATIO|1-100': 1,//激活率
            'LX_RATIO|1-100': 1//拉新率
        }]
    });
    //9.根据账期、渠道类型、地区获取  库存量在库时间分布接口
    Mock.mock(new RegExp('/visual/q/qryInStockTimeByConds'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|4': [{
            'paymentDayDuring|+1': ['0-30天', '31-60天', '61-90天', '90天以上'], //时间跨度
            'stockCount|100-10000': 100, //库存量
            'stockPercent|1-100': 1,//库存占比
            'dayDuringRage|1-100': 1//时间跨度排行
        }]
    });
    //获取库存量在库时间分布top机型库存量接口
    Mock.mock(new RegExp('/visual/q/qryTimeTop5ModelByConds'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|5': [{
            "modelCd": "@id",
            "modelName": '@cword(10,20)',
            "stockCount|1-100": 1
        }]
    });
    //10.根据账期、渠道类型、地区获取  库存量分价位段分布接口
    Mock.mock(new RegExp('/visual/q/qryInStockByPriceRange'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|6': [{
            'priceRangeName|+1': ['0-699元', '700-999元', '1000-1499元', '1500-1999元', '2000-2999元', '3000元以上'], //价位区间
            'stockCount|100-10000': 100, //库存量
            'stockCount|100-5000': 1350,//库存量(万台)
            'stockPercent|1-100': 1//库存占比
        }]
    });
    //获取库存量分价位分布top5机型库存量接口
    Mock.mock(new RegExp('/visual/q/qryPriceTop5ModelByCond'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|5': [{
            "modelCd": "@id",
            "modelName": '@cword(10,20)',
            "stockCount|1-100": 1
        }]
    });
    //11.根据账期、渠道类型、地区获取  库存量TOP5品牌分布接口
    Mock.mock(new RegExp('/visual/q/qryInStockTopBrand'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|5': [{
            'branCd': '@id',//品牌cd
            'brandName|+1': ['小米', 'OPPO', 'VIVO', '华为', 'APPLE'], //品牌名称
            'stockCount|100-10000': 100, //库存量（万台）
            'stockPercent|1-100': 1,//库存量占比
            'stockRange|1-100': 1//库存量排名
        }]
    });
    //获取库存量品牌分布top机型库存量接口
    Mock.mock(new RegExp('/visual/q/qryBrandTop5ModelByConds'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|5': [{
            "modelCd": "@id",
            "modelName": '@cword(10,20)',
            "stockCount|1-100": 1
        }]
    });
    //12.根据账期、渠道类型、地区获取  库存量TOP5机型分布接口
    Mock.mock(new RegExp('/visual/q/qryInStockTopModel'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|5': [{
            'offerModelCd': '@id',//型号cd
            'offerModelName|+1': ['荣耀V10', 'APPLE8', '小米PLUS', 'NOVA3', '荣耀NOTE10'], //机型名称
            'stockCount|100-10000': 100, //库存量
            'stockPercent|1-100': 1,//库存占比
            'stockRange|1-100': 1//排行
        }]
    });

    //13.根据账期、渠道类型、地区获取 TOP10销量品牌有销门店及占比
    Mock.mock(new RegExp('/visual/q/qryRetailShopTopBrand'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|10': [{
            'brandCd': '@id',
            'brandName|+1': ['小米', 'OPPO', 'VIVO', '华为', 'APPLE', '小米', 'OPPO', 'VIVO', '华为', 'APPLE'], //品牌名
            'retailShopCount|100-10000': 100, //有销门店数
            'retailShopPercent|1-100': 1,//有销门店占比（小数点后两位）
            'retailCountRage|1-100': 1
        }]
    });
    //14.根据账期、渠道类型、地区获取 TOP10销量机型有销门店及占比
    Mock.mock(new RegExp('/visual/q/qryRetailShopTopModel'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|10': [{
            'brandCd': '@id',
            'brandName': '@cword(4,6)',
            'offerModelCd': '@id',
            'offerModelName|1': ['OB-PBAM00', 'OB-OPPO A83', 'VIV-vivo Y71A'], //型号名称
            'retailShopCount|100-10000': 100, //有销门店数
            'retailShopPercent|1-100': 1, //有销门店占比（小数点后两位）
            'retailCountRage|1-100': 1
        }]
    });
    //15.根据账期、渠道类型、地区获取 TOP10销量品牌销量及销量占比
    Mock.mock(new RegExp('/visual/q/qryRetailTopBrand'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|10': [{
            'brandCd': '@id',
            'brandName|+1': ['小米', 'OPPO', 'VIVO', '华为', 'APPLE', '小米', 'OPPO', 'VIVO', '华为', 'APPLE'], //品牌名
            'retailCount|100-10000': 100, //销量
            'retailPercent|1-100': 1, //销量占比（小数点后两位）
            'retailCountRage|1-100': 1
        }]
    });
    //16.根据账期、渠道类型、地区获取 TOP10销量机型销量及销量占比
    Mock.mock(new RegExp('/visual/q/qryRetailTopModel'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|10': [{
            'brandCd': '@id',
            'brandName': '@cword(4,6)',
            'offerModelCd': '@id',
            'offerModelName|+1': ['OB-PBAM00', 'OB-OPPO A83', 'VIV-vivo Y71A'], //型号名称
            'retailCount|100-10000': 100, //销量
            'retailPercent|1-100': 1, //销量占比（小数点后两位）
            'retailCountRage|1-100': 1
        }]
    });

    //分省终端进销存数据
    //3.XX月份入库量及环比变化
    Mock.mock(new RegExp('/visual/q/qryInStockAndMonthRatio'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|30': [{
            'commonRegionName': '@province', //地区
            'inStockCount|1-100': 1, //入库量
            'monthRatio|1-100': 1 //环比
        }]
    });
    //4.XX省核销量及环比变化
    Mock.mock(new RegExp('/visual/q/qryAllSaleCountAndMonthRatio'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|30': [{
            'commonRegionName': '@province', //地区
            'allSaleCount|1-100': 1, //核销量
            'monthRatio|1-100': 1 //环比
        }]
    });
    //5.XX月份核销量结构
    Mock.mock(new RegExp('/visual/q/qryMonthStockSaleProportion'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|30': [{
            'commonRegionName': '@province', //地区
            'monthInstockSale|1-100': 1, //当月入库当月核销量
            'monthNoInstockSale|1-100': 1 //非当月入库当月核销量
        }]
    });
    //6.XX有销门店及环比变化
    Mock.mock(new RegExp('/visual/q/qrySaleShopCountAndMonthRatio'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|30': [{
            'commonRegionName': '@province', //地区
            'saleShopCount|1-100': 1, //有销门店
            'monthRatio|1-100': 1 //环比
        }]
    });
    //7.XX月份有销门店单店月销量及环比变化
    Mock.mock(new RegExp('/visual/q/qryShopMonthSaleAndMonthRatio'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|30': [{
            'commonRegionName': '@province', //地区
            'shopMonthSale|1-100': 1, //单店月销量
            'monthRatio|1-100': 1 //环比
        }]
    });
    //8.XX月份核销量、激活量、拉新用户
    Mock.mock(new RegExp('/visual/q/qryJihuoLaxinAndAllSaleCount'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|30': [{
            'commonRegionName': '@province', //地区
            'allSaleCount|1-100': 1, //核销量
            'JihuoCount|1-100': 1, //激活量
            'LaxinCount|1-100': 1 //拉新用户
        }]
    });
    //9.XX月份激活率和拉新率
    Mock.mock(new RegExp('/visual/q/qryMonthJihuoAndLaxinRatio'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|30': [{
            'commonRegionName': '@province', //地区
            'JihuoRatio|1-100': 1, //激活率
            'LaxinRatio|1-100': 1 //拉新率
        }]
    });

    //重点明星机型进销存数据
    //3.机型列表查询接口
    Mock.mock(new RegExp('/visual/q/qryConstOfferModel'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|5': [{
            brandCd: '@id', //品牌cd
            brandName: '@cword(4, 6)', //品牌名
            offerModelId: '@id', //型号id
            modelName: '@cword(4, 6)', //型号名称
            publicName: '@cword(4, 6)' //公众代号
        }]
    });
    //4.所有机型相关数据查询接口
    Mock.mock(new RegExp('/visual/q/qryDataForStarModel'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|20': [{
            'modelRank|1-100': 1, //销量排名
            'offerModelId': '@id', //机型id
            'modelName': '@cword(10, 12)', //机型名称
            'retailShopCount|1-100': 1, //有销门店数
            'allSaleCout|1-100': 1, //核销量
            'allZccCount|1-100': 1, //自注册激活量
            'allLxCount|1-100': 1, //拉新用户
            'allStockCount|1-100': 1, //库存量
            'singleShopMonthSaleCount|1-100': 1, //有销门店单店月销量（台/月）
            'stockDuring|1-100': 1, //库存周转周数
            'jhRate|1-100': 1, //激活率
            'lxRate|1-100': 1 //拉新率
        }]
    });
    //5.有销门店及有销门店占比查询接口
    Mock.mock(new RegExp('/visual/q/qrySaleShopForStarModel'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|30': [{
            'regionName': '@province', //地区名
            'commonRegionId': '@id', //地区编码id
            'areaLevel|+1': ['1', '2', '3'], //地区等级：1、中国，2、省级，3、市级
            'retailShopCount|10-1000': 10, //有销门店数
            'retailShopRate|1-100': 1, //有销门店占比
            'shopRank|1-100': 1 //有销门店数排名
        }]
    });
    //6.核销量及单店月销量查询接口
    Mock.mock(new RegExp('/visual/q/qrySaleCountForStarModel'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|30': [{
            'regionName': '@province', //地区名
            'commonRegionId': '@id', //地区编码id
            'areaLevel|+1': ['1', '2', '3'], //地区等级：1、中国，2、省级，3、市级
            'allSaleCount|1-100': 1, //总核销量
            'singleShopMonthSaleCount|1-100': 1, //单店月销量
            'saleCountRank|1-100': 1 //总核销量排名
        }]
    });
    //7.库存量及库存周转周数查询接口
    Mock.mock(new RegExp('/visual/q/qryStockCountForStarModel'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|30': [{
            'regionName': '@province', //地区名
            'commonRegionId': '@id', //地区编码id
            'areaLevel|+1': ['1', '2', '3'], //地区等级：1、中国，2、省级，3、市级
            'nowStockCount|1-100': 1, //库存量（万台）
            'stockDring|1-100': 1, //库存周转周数
            'stockCountRank|1-100': 1 //库存量排名排名
        }]
    });
    //8.XX月XX品牌/XX月XX地区数据查询接口
    Mock.mock(new RegExp('/visual/q/qryRegionDataForStarModel'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data': {
            'month': '@date(yyyy-MM)', //月份
            'brandCd': '@id', //品牌cd
            'brandName': '@cword(4, 6)', //品牌名称
            'offerModelId|1-100': 1, //型号id
            'modelName': '@cword(4, 6)', //型号名
            'list|30': [{
                'regionName': '@province', //地区名
                'commonRegionId': '@id', //地区编码id
                'areaLevel|+1': ['1', '2', '3'], //地区等级：1、中国，2、省级，3、市级
                'allSaleCount|1-100': 1, //总核销量（万台）
                'allJhCount|1-100': 1, //激活量（万台）
                'allLxCount|1-100': 1, //拉新用户（万台）
                'jhRate|1-100': 1, //激活率
                'lxRate|1-100': 1 //拉新率
            }]
        }
    });

    //门店进销存分析
    //1.门店查询接口
    Mock.mock(new RegExp('/visual/q/qryShopByConds'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data': {
            "pageNum": 1,
            "pageSize": 5,
            "size": 4,
            "total": 100,
            "pages": 20,
            "list|5": [{
                "CHANNEL_ID": '@id',
                "CHANNEL_NBR": '@id',//门店ID
                "CHANNEL_NAME": "@cword(4,10)",//门店名称
                "CHANNEL_ADDRESS": "@cword(4,10)",//门店地址
                "CHANNEL_TYPE_NAME": "@cword(3,6)",//渠道类型
                "HALL_LEVEL": "@cword(3,6)",//自有厅级别
                "BOUTIQUE_STAR": "@cword(3,6)",//专营店星级
                "BUSINESS_LEVEL_VALUE": "@cword(3,6)",//归属商圈级别
                "OPERATORS_NAME": "@cword(3,6)",//经营主体
                "BIAOGAN_FLAG|1": ["是", "否"],//是否精品标杆门店
                "SM_NAME": "@cname",//店长
                "SM_PHONE": "15651806999",//店长联系电话
                "BIZMAN_LIST|5": [{
                    "CHANNEL_ID": '@id',//店中商ID
                    "CHANNEL_NAME": "@cword(3,6)"//店中商名称
                }]
            }]
        }
    });
    //2.连续6个月入库核销量
    Mock.mock(new RegExp('/visual/q/qryShopProcureSalesLast6Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|6': [{
            "QUERY_DATE": "@date(MM)",//月份
            "PROCURE_IN_AMOUNT|1-5000": 1,//入库量
            "SALES|1-5000": 1,//核销量
            "SALES_AMOUNT|1-5000": 1//收银金额
        }]
    });
    //3.连续6个月终端核销量
    Mock.mock(new RegExp('/visual/q/qryShopSalesInfoLast6Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|6': [{
            "QUERY_DATE": "@date(MM)",
            "SALES|1-5000": 1,//核销量
            "CONTRACT_SALES_RATIO|1-100": 1,//合约销量占比
            "NON_CONTRACT_SALES_RATIO|1-100": 1//裸机销量占比
        }]
    });
    //4.连续6个月终端核销量结构
    Mock.mock(new RegExp('/visual/q/qryShopSalesStockInfoLast6Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|6': [{
            "QUERY_DATE": "@date(MM)",
            "CM_STOCK_SALES|1-100": 1,//当月入库当月核销
            "NON_CM_STOCK_SALES|1-100": 1//非当月入库当月核销
        }]
    });
    //5.连续6个月核销激活量及拉新
    Mock.mock(new RegExp('/visual/q/qryShopSalesJhLxLast6Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|6': [{
            "QUERY_DATE": "@date(MM)",
            "SALES|1-5000": 1,//核销量
            "JH_AMOUNT|1-5000": 1,//激活量
            "LX_AMOUNT|1-100": 1//拉新用户
        }]
    });
    //6.连续6个月销售品牌种类
    Mock.mock(new RegExp('/visual/q/qryShopSalesBrandModelNumLast6Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|6': [{
            "QUERY_DATE": "@date(MM)",
            "BRAND_NUM|1-5000": 1,//销售品牌数量
            "MODEL_NUM|1-100": 1//销售机型款数
        }]
    });
    //7.XX月分店中商入库核销收银
    Mock.mock(new RegExp('/visual/q/qryBizmanProcureSales'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|6': [{
            "STORAGE_NAME": "@cword(4,10)",
            "CHANNEL_NAME": "@cword(4,10)",//店中商名称
            "PROCURE_IN_AMOUNT|1-5000": 1,//入库量
            "SALES|1-5000": 1,//核销量
            "SALES_AMOUNT|1-5000": 1,//收银金额
            "JH_AMOUNT|1-5000": 1,
            "LX_AMOUNT|1-5000": 1
        }]
    });
    //8.XX月分店中商收银结算
    Mock.mock(new RegExp('/visual/q/qryBizmanSalesInfo'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|7': [{
            "CHANNEL_NAME": "@cword(4,10)",//店中商名称
            "TOTAL_AMOUNT|1-5000": 1,//合计
            "XJ_AMOUNT|1-5000": 1,//现金
            "POS_AMOUNT|1-5000": 1,//POS
            "DYQ_AMOUNT|1-5000": 1,//抵用券
            "WXZF_AMOUNT|1-5000": 1,//微信支付
            "ZFB_AMOUNT|1-5000": 1//支付宝
        }]
    });
    //9.库存预警TOP5机型
    Mock.mock(new RegExp('/visual/q/qryShopStockZZModelTop5'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|7': [{
            "OFFER_MODEL_NAME": "@cword(4,10)",//机型名称
            "STOCK_COUNT|1-5000": 1,//库存量
            "STOCK_ZZZS|1-5000": 1,//库存周转周数
            "SALES|1-5000": 1
        }]
    });
    //10.XX月TOP5销量机型
    Mock.mock(new RegExp('/visual/q/qryShopSalesModelTop5'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|5': [{
            "OFFER_MODEL_NAME": "@cword(4,10)",//机型名称
            "SALES|1-5000": 1,//核销量
            "JH_AMOUNT|1-5000": 1,//激活量
            "LX_AMOUNT|1-100": 1//拉新用户
        }]
    });
    //11.XX月TOP5销售员
    Mock.mock(new RegExp('/visual/q/qryShopSalesManTop5'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|5': [{
            "SALESMAN_NAME": "@cname",//销售员名称
            "SALES|1-5000": 1,//核销量
            "JH_AMOUNT|1-5000": 1,//激活量
            "LX_AMOUNT|1-5000": 1//拉新用户
        }]
    });
    //12.库存量—TOP5机型分布
    Mock.mock(new RegExp('/visual/q/qryShopStockModelTop5'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|5': [{
            "OFFER_MODEL_NAME": "@cword(4,10)",//机型名称
            "STOCK_COUNT|1-5000": 1//库存量
        }]
    });


    //可视化平台获取系统菜单接口（新增）
    Mock.mock(new RegExp('/chain-visual/user/index'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data': {
            'menuInfo|2-10': [{
                'imgUrl': '/chain-retail/valetOrder/ico.jpg',
                'id': '1',
                'orderSeq': '1',
                'name': '@cword(4, 10)',
                'sysMenuTypeCd': '1',
                'submenu|5-20': [{
                    'imgUrl': 'null',
                    'id': '@id',
                    'orderSeq': '0',
                    'name': '@cword(4, 10)',
                    'sysMenuTypeCd': '1',
                    'menuflag': '2',
                    'url': '/chain-retail/valetOrder/valetSerialCodeQuery'
                }],
                'menuflag': '1'
            }],
            'userInfo': {
                'timePeriod': '@cword(4, 6)',
                'userId': '@id',
                'name': '@cname',
                'postRoleLevel': '51',
                'retailShopName': '@cword(6, 10)',
                'roleName': '@cword(6, 10)',
                'retailShopId': '@id',
                'loginCode': '@id'
            }
        }
    });

    //连续6个月核销激活率及拉新率（新增）
    Mock.mock(new RegExp('/visual/q/qryShopSalesJhLxRatioLast6Months'), {
        rsphead: 's',
        success: 'true', //是否成功true/失败false
        code: null,
        msg: null, //失败信息
        error: null,
        'data|6': [{
            "QUERY_DATE": "@date(MM)",
            "JH_RATIO|1-100": 1,//销售品牌数量
            "LX_RATIO|1-100": 1//销售机型款数
        }]
    });
});
