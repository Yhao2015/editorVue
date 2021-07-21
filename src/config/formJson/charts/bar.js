/*
 * @Author: yuanhao
 * @Date: 2021-07-12 16:44:18
 * @LastEditTime: 2021-07-12 17:06:43
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \flinev-editor-vue\src\config\formJson\charts\bar.js
 */

const barForm = [
    {
        label: '排列',
        code: 'stack',
        type: 'radio',
        required: false,
        show: true,
        defaultValue: 'spread',
        dataFormat: [
            { name: '铺开', code: 'spread' },
            { name: '堆叠', code: 'stack' }
        ],
        changeFunName: 'onstack'
    },
    {
        label: '系列间距',
        code: 'barGap',
        type: 'input',
        required: false,
        defaultValue: '',
        show: true,
        extra: {
            min: 0,
            max: 100,
            suffix: '%'
        },
        changeFunName: 'onbarGap'
    },
    {
        label: '柱子宽度',
        code: 'barWidth',
        type: '',
        slot: 'slider',
        required: false,
        defaultValue: 10,
        min: 0,
        max: 100,
        step: 1,
        show: true,
        funName: 'onChartSlider'
    },
    {
        label: '柱外间距',
        code: 'barCategoryGap',
        type: '',
        slot: 'slider',
        required: false,
        defaultValue: 10,
        min: 0,
        max: 100,
        step: 1,
        show: true,
        funName: 'onChartSlider'
    }
]

const bar = [
    {
        label: '系列',
        code: 'sereries',
        type: 'icon',
        show: false,
        extraItem: true,
        len: 3,
        changeFunName: 'copySeries',
        funName: 'delSeries'
    },
    {
        label: '填充',
        code: '',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        len: 3,
        isSub: true,
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

export { barForm, bar }
