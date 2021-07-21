/*
 * @Author: yuanhao
 * @Date: 2021-07-09 09:06:44
 * @LastEditTime: 2021-07-21 16:34:32
 * @LastEditors: yuanhao
 * @Description: 折线图
 * @FilePath: \flinev-editor-vue\src\config\setting\charts\line.js
 */
import { seriesData, extraOption, colorSetting, width, height, legendName, backgroundColor } from './index.js'

const line = {
    line: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: ['#D3222A', '#EB8D07', '#A271FF'],
            legend: legendName,
            type: 'line',
            seriesData: [...seriesData.single]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '基础折线图',
        alias: '基础折线图',
        version: '1.0.0'
    },
    lineCircle: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: ['#D3222A', '#EB8D07', '#A271FF'],
            legend: legendName,
            type: 'lineCircle',
            seriesData: [...seriesData.double]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '折线图',
        alias: '折线图',
        version: '1.0.0'
    },
    lineArea: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: ['#D3222A', '#EB8D07', '#A271FF'],
            areaColor: [['#4AC9FE', '#5654F3'], ['#A271FF', '#7160FC']],
            legend: legendName,
            type: 'lineArea',
            seriesData: [...seriesData.double]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '面积图',
        alias: '面积图',
        version: '1.0.0'
    }
}

export { line }