/*
 * @Author: your name
 * @Date: 2021-07-12 11:05:29
 * @LastEditTime: 2021-07-12 16:24:57
 * @LastEditors: yuanhao
 * @Description: In User Settings Edit
 * @FilePath: \flinev-editor-vue\src\config\formJson\basePage.js
 */
const pageJSON = [
    {
        label: '屏幕尺寸',
        code: 'screenSize',
        type: '',
        slot: 'selectAndInput',
        required: false,
        show: true,
        defaultValue: 1,
        dataFormat: [
            { name: '大屏推荐尺寸1920*1080', value: 1, width: 1920, height: 1080 },
            { name: 'web最常见尺寸1366*768', value: 2, width: 1366, height: 768 },
            { name: 'web最小尺寸1024*768', value: 3, width: 1024, height: 768 },
            { name: '自定义', value: 4, width: 1920, height: 1080 }
        ],
        disabled: true,
        changeFunName: 'screenSizeChange',
        funName: 'onSizeChange',
        width: 1920,
        height: 1080
    },
    // {
    //     label: '背景颜色',
    //     code: 'backgroundColor',
    //     type: '',
    //     slot: 'color',
    //     required: false,
    //     defaultValue: '181B24',
    //     funName: 'onChangeColor',
    //     show: true
    // },
    {
        label: '背景颜色',
        code: 'backgroundColor',
        type: '',
        slot: 'colorPicker',
        required: false,
        defaultValue: '#181B24',
        funName: 'onChangeColorPicker',
        disabled: true,
        show: true
    },
    {
        label: '背景图',
        code: 'backgroundImage',
        type: '',
        slot: 'singleFileUpload',
        funName: 'onBlurFun',
        required: false,
        defaultValue: '',
        changeFunName: 'onFileUpload',
        show: true
    },
    {
        label: '重置',
        code: 'reset',
        type: 'btn',
        slot: 'btn',
        required: false,
        funName: 'onReset',
        show: true,
    },
    {
        label: '页面缩放',
        code: 'zoomType',
        type: '',
        slot: 'icons',
        required: false,
        show: true,
        defaultValue: 5,
        dataFormat: [
            { iconType: 'icondengbisuofang', title: '全屏铺满', value: 1 },
            { iconType: 'iconzuoyousuofang', title: '等比缩放宽度铺满', value: 2 },
            { iconType: 'iconshangxiasuofang', title: '等比缩放高度铺满', value: 3 },
            { iconType: 'iconjinzhi', title: '不缩放', value: 5 }
        ],
        funName: 'onZoom',
    }
]

export { pageJSON }