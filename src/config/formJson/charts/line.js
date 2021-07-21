/*
 * @Author: yuanhao
 * @Date: 2021-07-12 16:45:19
 * @LastEditTime: 2021-07-12 17:09:06
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \flinev-editor-vue\src\config\formJson\charts\line.js
 */
import { dictionary } from "@cf/dictionary";

const line = [
    {
        label: '系列',
        code: 'sereries',
        type: 'icon',
        show: false,
        extraItem: true,
        len: 4,
        changeFunName: 'copySeries',
        funName: 'delSeries'
    },
    {
        label: '折线外观',
        code: 'lineStyle',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        len: 4,
        isSub: true,
        defaultValue: 'curve',
        dataFormat: [
            {
                name: '颜色',
                value: 'ffffff',
                span: 4,
                code: 'fontColor',
                type: 'color',
                changeFunName: 'onChangeColorSererie'
            },
            {
                name: 'Hex',
                value: 'ffffff',
                span: 10,
                code: 'fontHex',
                type: 'input',
                prefix: '#',
                changeFunName: 'onChangeColorSererie'
            },
            {
                name: '粗细',
                value: 2,
                span: 12,
                code: 'lineWidth',
                type: 'input-number',
                suffix: 'px',
                changeFunName: 'onChangeSererieWidth'
            },
            {
                name: '曲线',
                icontype: 'iconshujuxiang',
                span: 4,
                code: 'curve',
                type: 'fontIcon',
                funName: 'onChangeSererieIcon'
            },
            {
                name: '折线',
                icontype: 'iconshujuxiang',
                span: 4,
                code: 'brokenLine',
                type: 'fontIcon',
                funName: 'onChangeSererieIcon'
            },
            {
                name: '线条',
                value: 'solid',
                span: 12,
                code: 'lineType',
                type: 'select',
                dataFormat: dictionary.other.linesType,
                changeFunName: 'onChangeSererieType'
            },
        ]
    },
    {
        label: '节点',
        code: '',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        len: 4,
        isSub: true,
        dataFormat: [
            {
                name: '颜色',
                value: 'ffffff',
                span: 4,
                code: 'nodeFontColor',
                type: 'color',
                changeFunName: 'onChangeColorSererie'
            },
            {
                name: 'Hex',
                value: 'ffffff',
                span: 10,
                code: 'nodeFontHex',
                type: 'input',
                changeFunName: 'onChangeColorSererie'
            },
            {
                name: '图形',
                value: 'circle',
                span: 10,
                code: 'symbol',
                type: 'select',
                dataFormat: dictionary.other.symbolType,
                changeFunName: 'onChangeSererieSymbolType'
            }
        ]
    },
    {
        label: '',
        code: '',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'divider',
        required: false,
        show: true
    }
]

export { line }
