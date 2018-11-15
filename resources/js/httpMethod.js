'use strict';
angular
    .module('httpMethod', ['httpServer'])
    .constant('httpConfig', {
        siteUrl: '/chain-visual'
    })
    .factory('httpMethod', ['httpConfig', 'httpServer', function (httpConfig, httpServer) {
        var httpMethod = {};
        //1、头部进销存数据展示接口
        httpMethod.queryHeadSaleStockInfo = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/queryHeadSaleStockInfo', params, 'POST');
        };
        //2、指标类型接口
        httpMethod.queryIndexInfo = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/queryIndexInfo', params, 'POST');
        };
        //3、分区域按指标排名接口
        httpMethod.queryIndexSeqGroupRegion = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/queryIndexSeqGroupRegion', params, 'POST');
        };
        //4、分区域查询指标数值接口
        httpMethod.queryOrderIndexGroupRegion = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/queryOrderIndexGroupRegion', params, 'POST');
        };
        //5、分商圈查询指标数值接口
        httpMethod.queryBusinessIndex = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/queryBusinessIndex', params, 'POST');
        };
        //6、分日期展示相应帐期内的指标数据查询接口
        httpMethod.queryIndexGroupDay = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/queryIndexGroupDay', params, 'POST');
        };
        //7、按帐期查询TOP12品牌接口
        httpMethod.queryTop12Brand = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/queryTop12Brand', params, 'POST');
        };
        //8、按帐期查询TOP6成长型品牌接口
        httpMethod.queryTop6GrowthBrand = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/queryTop6GrowthBrand', params, 'POST');
        };
        //9、按帐期查询TOP6特色品牌接口
        httpMethod.queryTop6FeatureBrand = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/queryTop6FeatureBrand', params, 'POST');
        };
        //10、按帐期查询TOP10销量机型接口
        httpMethod.queryTop10SaleModel = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/queryTop10SaleModel', params, 'POST');
        };
        //11、按帐期查询TOP10销量明星机型接口
        httpMethod.queryTop10FznModel = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/queryTop10FznModel', params, 'POST');
        };
        //12、按帐期查询分渠道类型数据接口
        httpMethod.queryInfoGroupChannelType = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/queryInfoGroupChannelType', params, 'POST');
        };
        //13、根据登录人信息获取其身份对应的地区信息
        httpMethod.getLoginUserCommonRegion = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/getLoginUserCommonRegion', params, 'POST');
        };
        //13、连续12个月采购入库量
        httpMethod.qryPurchaseInAmountLast12Months = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryPurchaseInAmountLast12Months', params, 'POST');
        };
        //14、连续12个月终端核销量
        httpMethod.qrySalesAmountLast12Months = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qrySalesAmountLast12Months', params, 'POST');
        };
        //15、连续12个月核销量结构
        httpMethod.qrySalesAmountStructureLast12Months = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qrySalesAmountStructureLast12Months', params, 'POST');
        };
        //16、连续12个月单台收银金额
        httpMethod.qrySalePricePerOneLast12Months = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qrySalePricePerOneLast12Months', params, 'POST');
        };
        //17、连续12个月有销门店单店月销量
        httpMethod.qrySalesAmountPerSaleShopLast12Months = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qrySalesAmountPerSaleShopLast12Months', params, 'POST');
        };
        //18、连续12个月核销激活量及拉新率
        httpMethod.qryZzcInfoLast12Months = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryZzcInfoLast12Months', params, 'POST');
        };
        //19、连续12个月分价位段销量占比
        httpMethod.qryPriceSalesRatioLast12Months = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryPriceSalesRatioLast12Months', params, 'POST');
        };
        //20、查询库存量—在库时间分布
        httpMethod.qryInStockTimeByConds = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryInStockTimeByConds', params, 'POST');
        };
        //21、查询库存量—分价位段分布
        httpMethod.qryInStockByPriceRange = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryInStockByPriceRange', params, 'POST');
        };
        //22、查询库存量—TOP5品牌分布
        httpMethod.qryInStockTopBrand = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryInStockTopBrand', params, 'POST');
        };
        //23、查询库存量—TOP5机型分布
        httpMethod.qryInStockTopModel = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryInStockTopModel', params, 'POST');
        };
        //24、查询库TOP10销量品牌有销门店及占比
        httpMethod.qryRetailShopTopBrand = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryRetailShopTopBrand', params, 'POST');
        };
        //25、查询TOP10销量机型有销门店及占比
        httpMethod.qryRetailShopTopModel = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryRetailShopTopModel', params, 'POST');
        };
        //26、查询TOP10销量品牌销量及销量占比
        httpMethod.qryRetailTopBrand = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryRetailTopBrand', params, 'POST');
        };
        //27、查询TOP10销量机型销量及销量占比
        httpMethod.qryRetailTopModel = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryRetailTopModel', params, 'POST');
        };
        //所在地区查询接口
        httpMethod.initCommonRegionInfo = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/initCommonRegionInfo', params, 'POST');
        };
        //为分省终端进销存准备的所在地区查询接口
        httpMethod.initCommonRegionInfo4VisualRegionInvoicing = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/initCommonRegionInfo4VisualRegionInvoicing', params, 'POST');
        };
        //渠道类型查询接口
        httpMethod.loadChannelType = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/loadChannelType', params, 'POST');
        };
        //获取用户信息,菜单列表
        httpMethod.loadUserInfo = function (params) {
            return httpServer('/psm/main/profile/index.action', params, 'POST');
        };
        //用户登出
        httpMethod.loginOut = function (params) {
            return httpServer('/psm/loginOut.action', params, 'POST');
        };

        //整体进销存分析
        //3.连续6个月采购入库量
        httpMethod.qryPurchaseInAmountLast6Months = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryPurchaseInAmountLast6Months', params, 'POST');
        };
        //4.连续6个月终端核销量
        httpMethod.qrySalesAmountLast6Months = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qrySalesAmountLast6Months', params, 'POST');
        };
        //5.连续6个月核销量结构
        httpMethod.qrySalesAmountStructureLast6Months = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qrySalesAmountStructureLast6Months', params, 'POST');
        };
        //6.连续6个月分价位段销量占比
        httpMethod.qryPriceSalesRatioLast6Months = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryPriceSalesRatioLast6Months', params, 'POST');
        };
        //7.连续6个月有销门店单店月销量
        httpMethod.qrySalesAmountPerSaleShopLast6Months = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qrySalesAmountPerSaleShopLast6Months', params, 'POST');
        };
        //8.连续6个月核销激活量及拉新率
        httpMethod.qryZzcInfoLast6Months = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryZzcInfoLast6Months', params, 'POST');
        };
        //9.根据账期、渠道类型、地区获取库存量在库时间分布接口
        httpMethod.qryInStockTimeByConds = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryInStockTimeByConds', params, 'POST');
        };
        //10.根据账期、渠道类型、地区获取库存量分价位段分布接口
        httpMethod.qryInStockByPriceRange = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryInStockByPriceRange', params, 'POST');
        };
        //11.根据账期、渠道类型、地区获取库存量TOP5品牌分布接口
        httpMethod.qryInStockTopBrand = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryInStockTopBrand', params, 'POST');
        };
        //12.根据账期、渠道类型、地区获取库存量TOP5机型分布接口
        httpMethod.qryInStockTopModel = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryInStockTopModel', params, 'POST');
        };
        //13.根据账期、渠道类型、地区获取TOP10销量品牌有销门店及占比
        httpMethod.qryRetailShopTopBrand = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryRetailShopTopBrand', params, 'POST');
        };
        //14.根据账期、渠道类型、地区获取TOP10销量机型有销门店及占比
        httpMethod.qryRetailShopTopModel = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryRetailShopTopModel', params, 'POST');
        };
        //15.根据账期、渠道类型、地区获取TOP10销量品牌销量及销量占比
        httpMethod.qryRetailTopBrand = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryRetailTopBrand', params, 'POST');
        };
        //16.根据账期、渠道类型、地区获取TOP10销量机型销量及销量占比
        httpMethod.qryRetailTopModel = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryRetailTopModel', params, 'POST');
        };

        //分省终端进销存数据
        //3.XX月份入库量及环比变化
        httpMethod.qryInStockAndMonthRatio = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryInStockAndMonthRatio', params, 'POST');
        };
        //4.XX省核销量及环比变化
        httpMethod.qryAllSaleCountAndMonthRatio = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryAllSaleCountAndMonthRatio', params, 'POST');
        };
        //5.XX月份核销量结构
        httpMethod.qryMonthStockSaleProportion = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryMonthStockSaleProportion', params, 'POST');
        };
        //6.XX有销门店及环比变化
        httpMethod.qrySaleShopCountAndMonthRatio = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qrySaleShopCountAndMonthRatio', params, 'POST');
        };
        //7.XX月份有销门店单店月销量及环比变化
        httpMethod.qryShopMonthSaleAndMonthRatio = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryShopMonthSaleAndMonthRatio', params, 'POST');
        };
        //8.XX月份核销量、激活量、拉新用户
        httpMethod.qryJihuoLaxinAndAllSaleCount = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryJihuoLaxinAndAllSaleCount', params, 'POST');
        };
        //9.XX月份激活率和拉新率
        httpMethod.qryMonthJihuoAndLaxinRatio = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryMonthJihuoAndLaxinRatio', params, 'POST');
        };

        //重点明星机型进销存数据
        //3.机型列表查询接口
        httpMethod.qryConstOfferModel = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryConstOfferModel', params, 'POST');
        };
        //4.所有机型相关数据查询接口
        httpMethod.qryDataForStarModel = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryDataForStarModel', params, 'POST');
        };
        //5.有销门店及有销门店占比查询接口
        httpMethod.qrySaleShopForStarModel = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qrySaleShopForStarModel', params, 'POST');
        };
        //6.核销量及单店月销量查询接口
        httpMethod.qrySaleCountForStarModel = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qrySaleCountForStarModel', params, 'POST');
        };
        //7.库存量及库存周转周数查询接口
        httpMethod.qryStockCountForStarModel = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryStockCountForStarModel', params, 'POST');
        };
        //8.XX月XX品牌/XX月XX地区数据查询接口
        httpMethod.qryRegionDataForStarModel = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryRegionDataForStarModel', params, 'POST');
        };

        //门店进销存分析
        //1.门店查询接口
        httpMethod.qryShopByConds = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryShopByConds', params, 'POST');
        };
        //2.连续6个月入库核销量
        httpMethod.qryShopProcureSalesLast6Months = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryShopProcureSalesLast6Months', params, 'POST');
        };
        //3.连续6个月终端核销量
        httpMethod.qryShopSalesInfoLast6Months = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryShopSalesInfoLast6Months', params, 'POST');
        };
        //4.连续6个月终端核销量结构
        httpMethod.qryShopSalesStockInfoLast6Months = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryShopSalesStockInfoLast6Months', params, 'POST');
        };
        //5.连续6个月核销激活量及拉新
        httpMethod.qryShopSalesJhLxLast6Months = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryShopSalesJhLxLast6Months', params, 'POST');
        };
        //6.连续6个月销售品牌种类
        httpMethod.qryShopSalesBrandModelNumLast6Months = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryShopSalesBrandModelNumLast6Months', params, 'POST');
        };
        //7.XX月分店中商入库核销收银
        httpMethod.qryBizmanProcureSales = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryBizmanProcureSales', params, 'POST');
        };
        //8.XX月分店中商收银结算
        httpMethod.qryBizmanSalesInfo = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryBizmanSalesInfo', params, 'POST');
        };
        //9.库存预警TOP5机型
        httpMethod.qryShopStockZZModelTop5 = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryShopStockZZModelTop5', params, 'POST');
        };
        //10.XX月TOP5销量机型
        httpMethod.qryShopSalesModelTop5 = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryShopSalesModelTop5', params, 'POST');
        };
        //11.XX月TOP5销售员
        httpMethod.qryShopSalesManTop5 = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryShopSalesManTop5', params, 'POST');
        };
        //12.库存量—TOP5机型分布
        httpMethod.qryShopStockModelTop5 = function (params) {
            return httpServer(httpConfig.siteUrl + '/visual/q/qryShopStockModelTop5', params, 'POST');
        };

        //可视化平台获取系统菜单接口（新增）
        httpMethod.index = function (params) {
            return httpServer(httpConfig.siteUrl + '/chain-visual/user/index', params, 'POST');
        };


        return httpMethod;
    }]);
