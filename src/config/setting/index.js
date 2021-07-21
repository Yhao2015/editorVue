/*
 * @Author: yuanhao
 * @Date: 2021-07-12 09:28:37
 * @LastEditTime: 2021-07-12 17:24:40
 * @LastEditors: yuanhao
 * @Description: 图表配置入口
 * @FilePath: \flinev-editor-vue\src\config\setting\index.js
 */
import { bar } from './charts/bar'
import { gauge } from './charts/gauge'
import { line } from './charts/line'
import { pie } from './charts/pie'
import { radar } from './charts/radar'
import { scatter } from './charts/scatter'
// 图表
const basicEchartsJson= {
    ...bar,
    ...gauge,
    ...line,
    ...pie,
    ...radar,
    ...scatter
}

// 交互
import { interactive } from './interactive'
// 地图
import { map } from './map'
// 文字
import { text } from './text'
const basicOtherJson = {
    ...interactive,
    ...map,
    ...text
}

// 容器默认配置
const basicJson = {
    inline: {
        mode: 'inline',
        cssStyle: {
            'flex-direction': 'row'
        },
        children: [{}],
        width: 600,
        height: 400
    },
    // 上下
    vertical: {
        mode: 'vertical',
        cssStyle: {
            'flex-direction': 'column'
        },
        children: [{}, {}],
        width: 600,
        height: 800
    },
    // 左右
    horizontal: {
        mode: 'horizontal',
        cssStyle: {
            'flex-direction': 'row',
        },
        children: [{}, {}],
        width: 1200,
        height: 400
    }
}

// 普通组件
const assemblySetting = {
    id: '',
    name: '',
    type: '',
    theme: 'default',
    style: {
        positionX: 0,
        positionY: 0,
        width: 0,
        height: 0
    },
    dataSource: {},
    eventaction: {},
    extend: {},
    active: false  //是否是激活状态
}

// 容器组件
const containerSetting = {
    id: '',
    name: '',
    type: '',
    theme: 'default',
    style: {
        positionX: 0,
        positionY: 0,
        width: 100,
        height: 100
    },
    children: [],
    extend: {},
    active: false
}

// 页面配置
const pageInfo = {
    rectWidth: 1920,
    rectHeight: 1080,
    backgroundImage: '',
    backgroundColor: '#181B24'
}

export {
    basicEchartsJson,
    basicOtherJson,
    basicJson,
    assemblySetting,
    containerSetting,
    pageInfo
}