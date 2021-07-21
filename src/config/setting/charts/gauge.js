/*
 * @Author: your name
 * @Date: 2021-07-09 09:06:33
 * @LastEditTime: 2021-07-14 14:25:15
 * @LastEditors: yuanhao
 * @Description: In User Settings Edit
 * @FilePath: \flinev-editor-vue\src\config\setting\charts\gauge.js
 */
import { seriesData, extraOption, colorSetting, width, height, legendName, backgroundColor } from './index.js'


const formatter = {
    gauge: function (params) {
        let value = params.toFixed(2)
        if (value == 0.00) {
            return '危'
        } else if (value == 0.25) {
            return '差'
        } else if (value == 0.50) {
            return '中'
        } else if (value == 0.75) {
            return '良'
        } else if (value == 1.00) {
            return '优'
        } else {
            return ''
        }
    }
}

const gauge = {
    gauge: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: [
                [0.12, 'red'],
                [0.35, '#F88168'],
                [0.63, '#FBF76B'],
                [0.8, '#7AD4DF'],
                [1, '#70C27E']
            ],
            type: 'GAUGE',
            legend: legendName,
            seriesData: [...seriesData.oneValue],
            // 函数改成字符串传递
            formatter: formatter.gauge,
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '基础仪表盘',
        alias: '基础仪表盘',
        version: '1.0.0'
    },
    gauge_speed: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: [
                '#266DB1',
                ['#373737', '#266DB1', '#266DB1', '#266DB1', '#373737'],
            ],
            type: 'GAUGE_SPEED',
            legend: legendName,
            seriesData: [...seriesData.oneValue],
            formatter: () => { }
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '速度仪表盘',
        alias: '速度仪表盘',
        version: '1.0.0'
    },
}

export { gauge }