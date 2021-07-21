/*
 * @Author: your name
 * @Date: 2021-07-09 09:06:09
 * @LastEditTime: 2021-07-14 14:25:04
 * @LastEditors: yuanhao
 * @Description: In User Settings Edit
 * @FilePath: \flinev-editor-vue\src\config\setting\charts\Bar.js
 */
// 柱状图
import { seriesData, extraOption, colorSetting } from './index.js'

const width = 480
const height = 300
const barMaxWidth = 15
const legendName = 'legend'
const backgroundColor = 'transparent'
import symbolSVG from '@a/image/symbolSVG.png'
const bar = {
    bar: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: [...colorSetting.bar],
            legend: legendName,
            type: 'bar',
            barMaxWidth: barMaxWidth,
            seriesData: [ ...seriesData.single ]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '基础柱状图',
        alias: '基础柱状图',
        version: '1.0.0'
    },
    barSymbol: {
        chartOption: {
            backgroundColor: backgroundColor,
            symbol: 'image://' + symbolSVG,
            symbolSize: 36,
            symbolOffset: [0, -18],
            color: [...colorSetting.bar],
            legend: legendName,
            type: 'barSymbol',
            barMaxWidth: barMaxWidth,
            seriesData: [...seriesData.single]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '柱状图Symbol',
        alias: '柱状图Symbol',
        version: '1.0.0'
    },
    barTransverse: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: [...colorSetting.bar],
            legend: legendName,
            type: 'barTransverse',
            barMaxWidth: barMaxWidth,
            seriesData: [...seriesData.single]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '横向柱状图',
        alias: '横向柱状图',
        version: '1.0.0'
    },
    barfold: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: [...colorSetting.bar],
            legend: legendName,
            type: 'barfold',
            barMaxWidth: barMaxWidth,
            seriesData: [...seriesData.double]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '叠加柱状图',
        alias: '叠加柱状图',
        version: '1.0.0'
    },
    barbg: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: [...colorSetting.bar],
            legend: legendName,
            type: 'barbg',
            barMaxWidth: barMaxWidth,
            background: 'rgba(180, 180, 180, 0.2)',
            seriesData: [...seriesData.single]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '柱状图背景',
        alias: '柱状图背景',
        version: '1.0.0'
    },
    barlevels: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: [...colorSetting.bar],
            legend: legendName,
            type: 'barlevels',
            barMaxWidth: barMaxWidth,
            seriesData: [...seriesData.single]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '柱状图背景',
        alias: '柱状图背景',
        version: '1.0.0'
    },
    plusMinusBar: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: [...colorSetting.bar],
            legend: legendName,
            type: 'plusMinusBar',
            barMaxWidth: barMaxWidth,
            seriesData: [...seriesData.minus]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '基础柱状图',
        alias: '基础柱状图',
        version: '1.0.0'
    }
}
export { bar }