'use strict';
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', 'ngJqueryDialog'], factory);
    } else if (typeof exports === 'object') {
        factory(require('angular'), require('ngJqueryDialog'));
        module.exports = 'httpServer';
    } else {
        // Browser globals (root is window), we don't register it.
        factory(root.angular);
    }
})(this, function (angular) {
    angular
        .module('httpServer', ['ngJqueryDialog'])
        .config(function ($httpProvider) {
            var count = 0;

            function showLoad() {
                var loadDom = '<div id="load" class="load-bg"><img src="../../resources/images/loading.gif" class="load-icon"/></div>';
                if (!$('body').find('#load').length) {
                    $('body').append(loadDom);
                }
                $('body').find('#load').css({
                    display: 'block'
                });
            }

            function hideLoad() {
                $('body').find('#load').css({
                    display: 'none'
                });
            }

            $httpProvider.interceptors.push(function ($q) {
                return {
                    request: function (config) {
                        if (count++ === 0) {
                            showLoad();
                        }
                        return config;
                    },
                    response: function (response) {
                        if (count-- === 1) {
                            hideLoad();
                        }
                        return response;
                    },
                    responseError: function (rejection) {
                        if (count-- === 1) {
                            hideLoad();
                        }
                        return $q.reject(rejection);
                    }
                };
            });
        })
        .factory('httpServer', ['$http', '$q', 'JqueryDialog', function ($http, $q, JqueryDialog) {
            return function (url, params, type) {
                var deferred = $q.defer();
                postService(url, params, type).then(
                    function (data) {
                        deferred.resolve(data);
                    },
                    function (data) {
                        deferred.reject(data);
                    }
                );
                return deferred.promise;
            };

            /**
             * [postService 请求服务]
             * @param  {[type]} url            [请求地址]
             * @param  {[object]} params       [参数]
             * @param  {[string]} type         [请求方式]
             * @return {[type]}                [返回数据]
             */
            function postService(url, params, type) {
                var deferred = $q.defer();
                if (angular.isUndefined(type)) {
                    deferred.reject('所需参数type没有传入！');
                    alert('所需参数type没有传入！');
                    return deferred.promise;
                }
                if (type !== 'POST' && type !== 'GET') {
                    deferred.reject('参数【' + type + '】错误！');
                    alert('参数【' + type + '】错误！');
                    return deferred.promise;
                }
                $http({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    method: type,
                    url: url,
                    data: type === 'POST' ? 'param=' + encodeURI(JSON.stringify(params)) : '', //用于post请求
                    params: type === 'POST' ? '' : params //用于get请求
                }).success(function (data, status, headers, config) {
                    if (!data.success) {
                        if (_.get(data, 'code') === '9999') {
                            JqueryDialog.abnormal('提示信息', data.msg, _.get(data, 'error'));
                        } else {
                            if (angular.isString(data)) {
                                var index = data.indexOf('您还没有登录，请登录！');
                                if (index > -1) {
                                    JqueryDialog.error('提示信息', '您的登录已失效,请重新登录！');
                                }
                            } else {
                                JqueryDialog.error('提示信息', data.msg);
                            }
                        }
                    }
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    if (status === '404') {
                        JqueryDialog.error('提示信息', '您请求资源URL不存在!');
                    } else {
                        JqueryDialog.error('提示信息', '服务器出小差了，请稍后再试!');
                    }
                    deferred.reject(data);
                });
                return deferred.promise;
            }
        }]);
});
