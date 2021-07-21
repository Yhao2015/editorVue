/*
 * @Author: yuanhao
 * @Date: 2021-07-12 15:49:22
 * @LastEditTime: 2021-07-14 14:27:49
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \flinev-editor-vue\src\config\setting\text\index.js
 */
const text = {
    sortActionList: {
        chartOption: {
            seriesData: [
                { index: "01", title: '户政', value: 123.41, unit: "万次", arrow: 'up' },
                { index: "02", title: '户政', value: 123.41, unit: "万次", arrow: 'up' },
                { index: "03", title: '户政', value: 123.41, unit: "万次", arrow: 'up' },
                { index: "04", title: '户政', value: 123.41, unit: "万次", arrow: 'up' }
            ]
        },
        width: 300,
        height: 270,
        name: '动态列表',
        alias: '动态列表',
        version: '1.0.0',
    },
    ballWorldCloud: {
        width: 500,
        height: 500,
        name: '词云',
        alias: '词云',
        chartOption: {
            seriesData: [
                { name: "标签1" }, //词云数据
                { name: "标签2" },
                { name: "标签3" },
                { name: "标签4" },
                { name: "标签5" },
                { name: "标签6" },
                { name: "标签7" },
                { name: "标签8" },
                { name: "标签9" },
                { name: "标签10" },
                { name: "标签11" },
                { name: "标签12" },
                { name: "标签13" },
                { name: "标签14" },
                { name: "标签15" },
                { name: "标签16" },
                { name: "标签17" },
                { name: "标签18" },
                { name: "标签19" },
                { name: "标签20" }
            ]
        }
    },
    boxBorder: {
        height: 300,
        width: 600,
        name: '边框',
        alias: '边框',
        version: '1.0.0'
    },
    pageHeader: {
        chartOption: {
            'path': '',
            'textContent': '嵊州市投资项目监管系统数据大屏',
            'ifonts': '',
            'font-weight': 'normal',
            'font-size': 30,
            'color': '#ffffff',
            'letter-spacing': 0,
            'line-height': 80,
            'text-indent': 0,
            'font-style': 'normal'
        },
        width: 1920,
        height: 100,
        name: '大标题',
        alias: '大标题',
        version: '1.0.0'
    },
    pageImage: {
        chartOption: {
            path: 'https://gw.alipayobjects.com/mdn/prod_resou/afts/img/A*-a9gToDQcVMAAAAAAAAAAAAAARQnAQ'
        },
        width: 200,
        height: 200,
        name: '图片',
        alias: '图片',
        version: '1.0.0'
    },
    smallTitle: {
        chartOption: {
            textContent: '基本信息统计',
            styleOption: {
                borderColor: 'linear-gradient(270deg, rgba(0,35,98,0.91) 0%, #0353e8 97%) 1 1',
                titleFontSize: '16px',
                titleFontFamily: 'AlibabaPuHuiTiR',
                titleColor: '#aae7ff',
                imgTitleMargin: '10px',
                leftBottomLineColor: '#3290fc',
                leftOrangeLineColor: '#ff893c',
                leftBlueLineColor: '#0053FF',
                rightOrangeLineColor: '#ff893c',
                rightBlueLineColor: '#0053FF',
            }
        },
        width: 400,
        height: 30,
        name: '二级标题',
        alias: '二级标题',
        resizable: false,
        version: '1.0.0'
    },
    quato: {
        chartOption: {
            seriesData: [
                { text: '常住人口', value: '787.5', unit: '万' },
                { text: '户籍人口', value: '145.3', unit: '万' },
                { text: '流动人口', value: '87', unit: '万' }
            ],
            styleOption: {
                quatoTitleColor: '#ffffff',
                quatoTitleFontSize: '14px',
                quatoTitleFontWeight: 'normal',
                quatoValueColor: '#ffffff',
                quatoValueFontSize: '21px',
                quatoValueFontWeight: 'normal',
                quatoUnitColor: '#ffffff',
                quatoUnitFontSize: '14px',
                quatoUnitFontWeight: 'normal',
                quatoTitleBgColor: 'linear-gradient(270deg,rgba(0,4,18,0.17), rgba(50,144,252,0.53))',
                squareBgColor: '#3290fc',
            }
        },
        width: 600,
        height: 80,
        name: '指标项',
        alias: '指标项',
        version: '1.0.0'
    },
    geometry: {
        chartOption: {
            backgroundColor: 'ffffff'
        },
        width: 80,
        height: 30,
        name: '几何体',
        alias: '几何体',
        version: '1.0.0'
    },
    flopCard: {
        name: '翻牌器',
        alias: '翻牌器',
        version: '1.0.0'
    },
    processList: {
        name: '进度条列表',
        alias: '进度条列表',
        version: '1.0.0'
    },
    ifonts: {
        chartOption: {
            'textContent': '文字',
            'ifonts': '',
            'font-weight': 'normal',
            'font-size': 12,
            'color': '#ffffff',
            'letter-spacing': 0,
            'line-height': 30,
            'text-indent': 0,
            'font-style': 'normal'
        },
        width: 40,
        height: 30,
        version: '1.0.0'
    }
}

export { text }