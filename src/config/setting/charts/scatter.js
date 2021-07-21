/*
 * @Author: your name
 * @Date: 2021-07-09 09:16:30
 * @LastEditTime: 2021-07-12 15:17:04
 * @LastEditors: yuanhao
 * @Description: In User Settings Edit
 * @FilePath: \flinev-editor-vue\src\config\setting\charts\scatter.js
 */
import { seriesData, extraOption, colorSetting, width, height, legendName, backgroundColor } from './index.js'

const scatter = {
    scatter: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: ['#FB0F00', '#2F63F9'],
            type: 'SCATTER',
            legend: legendName,
            symbolSize: [2, 4, 6, 8, 10, 12, 14, 16, 18],
            seriesData: [...seriesData.single]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '基础散点图',
        alias: '基础散点图',
        version: '1.0.0'
    }
}

export { scatter }