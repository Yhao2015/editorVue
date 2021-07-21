/*
 * @Author: yuanhao
 * @Date: 2021-07-12 15:45:40
 * @LastEditTime: 2021-07-14 14:26:28
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \flinev-editor-vue\src\config\setting\interactive\index.js
 */
const interactive = {
    tabSelect: {
        name: '切换选择器',
        alias: '切换选择器',
        version: '1.0.0',
        width: 125,
        height: 30,
        resizable: false,
        chartOption: {
            styleOption: {},
            seriesData: [
                { key: '1', text: '选项三' },
                { key: '2', text: '选项二' }
            ]
        }
    },
    timeLineCommon: {
        name: '时间轴',
        alias: '时间轴',
        version: '1.0.0',
        width: 600,
        height: 50,
        chartOption: {
            styleOption: {},
            isAnimate: true,
            animateInterval: 1000
        }
    },
    yearSelect: {
        chartOption: {
            initYear: 2021,
            minYear: 2019,
            styleOption: {}
        },
        name: '年份选择器',
        alias: '年份选择器',
        version: '1.0.0',
        width: 120,
        height: 30
    }
}

export { interactive }