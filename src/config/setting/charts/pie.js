/*
 * @Author: your name
 * @Date: 2021-07-09 09:15:55
 * @LastEditTime: 2021-07-14 14:25:58
 * @LastEditors: yuanhao
 * @Description: In User Settings Edit
 * @FilePath: \flinev-editor-vue\src\config\setting\charts\pie.js
 */
import { seriesData, extraOption, colorSetting, width, height, legendName, backgroundColor } from './index.js'

const pie = {
    pie: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: ['#F09703', '#0BBAFF', '#00DEC7', '#0069FF', '#F09703', '#0BBAFF', '#00DEC7', '#0069FF'],
            legend: legendName,
            type: 'PIE',
            seriesData: [...seriesData.single]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '基础饼图',
        alias: '基础饼图',
        version: '1.0.0'
    },
    ring_ratio_option: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: ['#006CFF', '#000000'],
            legend: legendName,
            type: 'RING_RATIO_OPTION',
            borderColor: '#006CFF',
            seriesData: [...seriesData.single]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '圆环比值',
        alias: '圆环比值',
        version: '1.0.0'
    },
    pie_nightingale: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: [['#F09703', '#0BBAFF', '#00DEC7', '#7EFBFF'], ['#00E4FF']],
            legend: legendName,
            type: 'PIE_NIGHTINGALE',
            seriesData: [...seriesData.single]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '南丁格尔玫瑰图',
        alias: '南丁格尔玫瑰图',
        version: '1.0.0'
    },
    pie_ring: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: ['#F09703', '#0BBAFF', '#00DEC7', '#0069FF'],
            legend: legendName,
            type: 'PIE_RING',
            seriesData: [...seriesData.single]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '圆环',
        alias: '圆环',
        version: '1.0.0'
    },
    pie_ring_double: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: [['#F09703', '#0BBAFF', '#00DEC7', '#0069FF'], ['rgb(126,190,255)', '#000']],
            legend: legendName,
            type: 'PIE_RING_DOUBLE',
            seriesData: [...seriesData.single]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '双圆环',
        alias: '双圆环',
        version: '1.0.0'
    },
    pie_ring_gauge: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: [['#7EFBFF', '#10FFC9'], ['rgba(108,247,252,0.17)']],
            legend: legendName,
            type: 'PIE_RING_GAUGE',
            seriesData: [...seriesData.single]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '双圆环',
        alias: '双圆环',
        version: '1.0.0'
    },
    pie_ring_inside: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: ['#00ffff', '#00cfff', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000'],
            legend: legendName,
            type: 'PIE_RING_INSIDE',
            seriesData: [...seriesData.single]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '双圆环',
        alias: '双圆环',
        version: '1.0.0'
    },
    pie_level_semicircle: {
        chartOption: {
            backgroundColor: backgroundColor,
            color: ['#00ffff', '#00cfff', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000'],
            legend: legendName,
            type: 'PIE_LEVEL_SEMICIRCLE',
            seriesData: [...seriesData.single]
        },
        extraOption: { ...extraOption.normal },
        width: width,
        height: height,
        name: '分级半圆扇',
        alias: '分级半圆扇',
        version: '1.0.0'
    },
    '3d_surface': {
        chartOption: {
            backgroundColor: backgroundColor,
            color: ['#F09703', '#0BBAFF'],
            type: '3D_SURFACE',
            seriesData: [...seriesData.threeDimensional]
        },
        extraOption: {
            series: [
                {
                    itemStyle: {
                        opacity: 0.5,
                        color: 'rgba(25,163,255,.8)',
                    },
                    label: {
                        show: true
                    }
                },
                {
                    itemStyle: {
                        opacity: 0.5,
                        color: 'rgba(145,18,2,.8)',
                    }
                }
            ],
            grid3D: {
                top: 'auto',
                boxHeight: 25,
                boxDepth: 110,
                boxWidth: 110,
                bottom: -15,
                left: -5,
                viewControl: {
                    autoRotate: false,
                    alpha: 23,
                    projection: 'orthographic'
                }
            },
            ...{ ...extraOption.normal }
        },
        width: width,
        height: height,
        name: '3D圆环',
        alias: '3D圆环',
        version: '1.0.0'
    }
}

export { pie }