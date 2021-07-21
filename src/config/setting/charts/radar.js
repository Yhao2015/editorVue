/*
 * @Author: yuanhao
 * @Date: 2021-07-09 09:16:11
 * @LastEditTime: 2021-07-14 14:26:05
 * @LastEditors: yuanhao
 * @Description: 雷达图
 * @FilePath: \flinev-editor-vue\src\config\setting\charts\radar.js
 */
import { seriesData, extraOption, colorSetting, width, height, legendName, backgroundColor } from './index.js'

const radar = {
    radar: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: ['#B075FF', '#95FFFD'],
            areaColor: ['rgba(114, 172, 209, 1)', 'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 0.6)', 'rgba(114, 172, 209, 0.4)'],
            legend: legendName,
            type: 'RADAR',
            seriesData: [...seriesData.single]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '基础雷达图',
        alias: '基础雷达图',
        version: '1.0.0'
    }
}

export { radar }