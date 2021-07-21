/*
 * @Author: yhao
 * @Date: 2021-06-01 14:49:22
 * @LastEditTime: 2021-07-20 19:30:36
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \flinev-editor-vue\src\utils\utils.js
 * fline
 */

/**
 * @description: 时间格式化
 * @param {*} date
 * @param {*} fmt
 * @return {*}
 */
function dateFormat(date = new Date(), fmt = 'yyyy-MM-dd') {
    let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}

/**
 * @description: 深拷贝
 * @param {*} value
 * @return {*}
 */
function deepClone(value) {
    if (!value) {
        return {}
    }
    return JSON.parse(JSON.stringify(value))
}

function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
}
function isObject(val) {
    return typeof val === 'object' && val !== null;
}

function deepCopy(val) {
    var obj = isArray(val) ? [] : {};
    for (var property in val) {
        // 如果当前拷贝的数据还是一个对象的话，那么继续调用
        // deepCopy 进行二次拷贝
        // 递归
        if (isObject(val[property])) {
            obj[property] = deepCopy(val[property]);
        } else {
            obj[property] = val[property];
        }
    }
    return obj
}

/**
 * @description: 下拉框过滤器
 * @param {*} input
 * @param {*} option
 * @return {*}
 */
function filterOption(input, option) {
    return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    )
}

/**
 * @description: 页面缩放比例
 * @param {*}
 * @return {*}
 */
function detectZoom() {
    var ratio = 0,
        screen = window.screen,
        ua = navigator.userAgent.toLowerCase();

    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    }
    else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
    }
    else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
    }

    if (ratio) {
        ratio = Math.round(ratio * 100);
    }

    return ratio;
}

/**
 * @description: 代码美化（换行，空格）
 * @param {*} obj
 * @return {*}
 */
function toJsonp(obj) {
    if (!obj) {
        return []
    }
    if (obj instanceof Array) {
        obj = JSON.stringify(obj)
    }
    obj = obj.replaceAll('{', '  {\n').replaceAll(',', ',\n').replaceAll('[', '[\n').replaceAll(']', '\n]').replaceAll('}', '\n  }').replaceAll('\n"', '\n    "')
    return obj
}

function JSONParse(obj) {
    let temp = ''
    try {
        temp = JSON.parse(obj)
    }
    catch (err) {
        temp = ''
    }
    return temp
}

function generateUUID(type) {
    let rule = type == '-' ? 'xxxxyxxxxxxxyxxx' : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = rule.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

export {
    dateFormat,
    deepClone,
    deepCopy,
    filterOption,
    detectZoom,
    toJsonp,
    JSONParse,
    generateUUID
};