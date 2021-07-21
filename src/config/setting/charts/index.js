/*
 * @Author: your name
 * @Date: 2021-07-12 10:04:37
 * @LastEditTime: 2021-07-12 15:18:58
 * @LastEditors: yuanhao
 * @Description: In User Settings Edit
 * @FilePath: \flinev-editor-vue\src\config\setting\charts\index.js
 */
/**
 * @description: 数据集合
 * @param {*}
 * @return {*}
 */
const seriesData = {
    single: [
        { legend: '杭州', name: '一月', value: 80 },
        { legend: '杭州', name: '二月', value: 30 },
        { legend: '杭州', name: '三月', value: 90 },
        { legend: '杭州', name: '四月', value: 40 },
        { legend: '杭州', name: '五月', value: 70 },
        { legend: '杭州', name: '六月', value: 30 },
        { legend: '杭州', name: '七月', value: 30 },
        { legend: '杭州', name: '八月', value: 60 },
        { legend: '杭州', name: '九月', value: 50 },
        { legend: '杭州', name: '十月', value: 70 },
        { legend: '杭州', name: '十一月', value: 85 },
        { legend: '杭州', name: '十二月', value: 40 }
    ],
    double: [
        { legend: '杭州', name: '一月', value: 80 },
        { legend: '杭州', name: '二月', value: 30 },
        { legend: '杭州', name: '三月', value: 90 },
        { legend: '杭州', name: '四月', value: 40 },
        { legend: '杭州', name: '五月', value: 70 },
        { legend: '杭州', name: '六月', value: 30 },
        { legend: '杭州', name: '七月', value: 30 },
        { legend: '杭州', name: '八月', value: 60 },
        { legend: '杭州', name: '九月', value: 50 },
        { legend: '杭州', name: '十月', value: 70 },
        { legend: '杭州', name: '十一月', value: 85 },
        { legend: '杭州', name: '十二月', value: 40 },

        { legend: '宁波', name: '一月', value: 50 },
        { legend: '宁波', name: '二月', value: 40 },
        { legend: '宁波', name: '三月', value: 80 },
        { legend: '宁波', name: '四月', value: 50 },
        { legend: '宁波', name: '五月', value: 60 },
        { legend: '宁波', name: '六月', value: 50 },
        { legend: '宁波', name: '七月', value: 40 },
        { legend: '宁波', name: '八月', value: 70 },
        { legend: '宁波', name: '九月', value: 60 },
        { legend: '宁波', name: '十月', value: 80 },
        { legend: '宁波', name: '十一月', value: 65 },
        { legend: '宁波', name: '十二月', value: 40 }
    ],
    // 正负极
    minus: [
        { legend: '杭州', name: '一月', value: 80 },
        { legend: '杭州', name: '二月', value: 30 },
        { legend: '杭州', name: '三月', value: 90 },
        { legend: '杭州', name: '四月', value: 40 },
        { legend: '杭州', name: '五月', value: 70 },
        { legend: '杭州', name: '六月', value: 30 },
        { legend: '杭州', name: '七月', value: 30 },
        { legend: '杭州', name: '八月', value: 60 },
        { legend: '杭州', name: '九月', value: 50 },
        { legend: '杭州', name: '十月', value: 70 },
        { legend: '杭州', name: '十一月', value: 85 },
        { legend: '杭州', name: '十二月', value: 40 },

        { legend: '宁波', name: '一月', value: -50 },
        { legend: '宁波', name: '二月', value: -40 },
        { legend: '宁波', name: '三月', value: -80 },
        { legend: '宁波', name: '四月', value: -50 },
        { legend: '宁波', name: '五月', value: -60 },
        { legend: '宁波', name: '六月', value: -50 },
        { legend: '宁波', name: '七月', value: -40 },
        { legend: '宁波', name: '八月', value: -70 },
        { legend: '宁波', name: '九月', value: -60 },
        { legend: '宁波', name: '十月', value: -80 },
        { legend: '宁波', name: '十一月', value: -65 },
        { legend: '宁波', name: '十二月', value: -40 }
    ],
    // 三维
    threeDimensional: [
        { legend: '', name: '已消除', value: 2 },
        { legend: '', name: '未消除', value: 1 }
    ],
    // 单一值
    oneValue: [
        { legend: '', name: '2021', value: 83 }
    ]
}

/**
 * @description: 图表扩展
 * @param {*}
 * @return {*}
 */
const extraOption = {
    normal: {
        legend: {
            show: false,
            left: '10%',
            top: 10
        },
        tooltip: {
            show: false,
            textStyle: {}
        },
        xAxis: [
            {
                name: '',
                axisLine: {
                    show: false,
                    lineStyle: {}
                },
                axisLabel: {
                    show: true,
                    textStyle: {}
                },
                splitLine: {
                    show: false,
                    interval: 0,
                    lineStyle: {
                        type: 'solid'
                    }
                }
            }
        ],
        yAxis: [
            {
                name: '',
                axisLine: {
                    show: false,
                    lineStyle: {}
                },
                axisLabel: {
                    show: true,
                    textStyle: {}
                },
                splitLine: {
                    show: false,
                    interval: 0,
                    lineStyle: {
                        type: 'solid'
                    }
                }
            }
        ],
        grid: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
        }
    }
}

/**
 * @description: 颜色
 * @param {*}
 * @return {*}
 */
const colorSetting = {
    bar: [
        ['#52A3F6', '#DF7CFD'],
        ['#FF948A', '#FD6493'],
        ['#9715E9', '#5304DC']
    ]
}

const width = 480
const height = 300
const legendName = 'legend'
const backgroundColor = 'transparent'

export {
    seriesData,
    extraOption,
    colorSetting,
    width,
    height,
    legendName,
    backgroundColor
}