'use strict';
angular
    .module('ngJqueryDialog', []).factory('JqueryDialog', ['$rootScope', function ($rootScope) {
    var self = {
        /**
         * [inform 操作提醒弹框方法]
         * @param  {[type]} title    弹框标题
         * @param  {[type]} msg      主标题
         */
        inform: function (title, msg) {
            var html = '<div class="alert-info-wrap alert-info"><p class="alert-title">' + msg + '</p></div>';
            $('body').dialog({
                title: title,
                content: html,
                buttons: {
                    '关闭|btn-close': function (api) {
                        api.close();
                    }
                }
            }, function (api) {
                api.open();
            });
        },
        /**
         * [confirm 操作确认弹框方法]
         * @param  {[type]} title    弹框标题
         * @param  {[type]} msg      主标题
         */
        confirm: function (title, msg, func) {
            var html = '<div class="alert-info-wrap alert-info"><p class="alert-title">' + msg + '</p></div>';
            $('body').dialog({
                title: title,
                content: html,
                buttons: {
                    '取消|btn-close': function (api) {
                        api.close();
                    },
                    '确定|btn-ok': function (api) {
                        api.close();
                        if (func) {
                            func();
                        }
                    }
                }
            }, function (api) {
                api.open();
            });
        },
        /**
         * [success 成功弹框方法]
         * @param  {[type]} title    弹框标题
         * @param  {[type]} msg      主标题
         * @param  {[type]} func     回调函数
         */
        success: function (title, msg, func) {
            var html = '<div class="alert-info-wrap alert-success"><p class="alert-title">' + msg + '</p></div>';
            $('body').dialog({
                title: title,
                content: html,
                buttons: {
                    '关闭|btn-close': function (api) {
                        api.close();
                    }
                },
                afterClose: function () {
                    if (func) {
                        func();
                    }
                }
            }, function (api) {
                api.open();
            });
        },
        /**
         * [error 失败弹框方法]
         * @param  {[type]} title    弹框标题
         * @param  {[type]} msg      主标题
         */
        error: function (title, msg) {
            var html = '<div class="alert-info-wrap alert-error"><p class="alert-title">' + msg + '</p></div>';
            $('body').dialog({
                title: title,
                content: html,
                buttons: {
                    '关闭|btn-close': function (api) {
                        api.close();
                    }
                }
            }, function (api) {
                api.open();
            });
        },
        /**
         * [abnormal 异常弹框方法]
         * @param  {[type]} title    弹框标题
         * @param  {[type]} msg      主标题
         * @param  {[type]} errStack 异常信息
         */
        abnormal: function (title, msg, errStack) {
            var html = '<div class="alert-info-wrap alert-error"><p class="alert-title">' + msg + '</p><a href="javascript:;" class="errstack-btn" id="errstack-btn">详细信息<i class="iconfont">&#xe609;</i></a></div><div class="alert-err-stack">' + errStack + '</div>';
            $('body').dialog({
                title: title,
                content: html,
                buttons: {
                    '关闭|btn-close': function (api) {
                        api.close();
                    }
                }
            }, function (api) {
                api.open();
            });

            $('.errstack-btn').each(function (index, el) {
                $(el).off('click').on('click', function (event) {
                    event.preventDefault();
                    $($('.alert-err-stack')[index]).toggle();
                });
            });
        }
    };
    return self;
}]);
