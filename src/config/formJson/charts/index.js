/*
 * @Author: yuanhao
 * @Date: 2021-07-12 16:43:56
 * @LastEditTime: 2021-07-12 17:11:38
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \flinev-editor-vue\src\config\formJson\charts\index.js
 */
import { barForm, bar } from './bar'
import { line } from './line'
import { pie } from './pie'
import { dictionary } from "@cf/dictionary";

const formBase = [
    {
        label: '图表尺寸',
        code: 'size',
        type: '',
        slot: 'positionSize',
        required: false,
        show: true,
        isShowIcon: true,
        dataFormat: [
            {
                name: 'w',
                value: 0,
                suffix: 'W',
                code: 'width'
            },
            {
                name: 'h',
                value: 0,
                suffix: 'H',
                code: 'height'
            }
        ],
        changeFunName: 'onInputChange'
    },
    {
        label: '图表位置',
        code: 'position',
        type: '',
        slot: 'positionSize',
        required: false,
        show: true,
        dataFormat: [
            {
                name: 'x', value: 0, suffix: 'X', code: 'clientX'
            },
            {
                name: 'y',
                value: 0,
                suffix: 'Y',
                code: 'clientY'
            }
        ],
        changeFunName: 'onInputChange'
    },
    {
        label: '图表方向',
        code: 'direction',
        type: '',
        slot: 'numberAndIcon',
        required: false,
        show: true,
        defaultValue: 0,
        min: -365,
        max: 365,
        leftRight: 0,
        topBottom: 0,
        funName: 'onRotate',
        changeFunName: 'onTransform'
    },
    {
        label: '透明度',
        code: 'opacity',
        type: '',
        slot: 'slider',
        required: false,
        show: true,
        min: 0,
        max: 1,
        step: 0.01,
        funName: 'onSlider',
        defaultValue: 1
    }
]
const yForm = [
    {
        label: '文本样式',
        code: 'textStyle',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            {
                name: '最小值',
                value: 0,
                span: 12,
                code: 'min',
                type: 'input-number',
                changeFunName: 'onChangeMin'
            },
            {
                name: '最大值',
                value: 100,
                span: 12,
                code: 'max',
                type: 'input-number',
                changeFunName: 'onChangeMax'
            }
        ]
    }
]
const legendForm = [
    {
        label: '文本样式',
        code: '',
        type: '',
        required: false,
        show: true,
        classStyle: 'height30 paddingT0'
    },
    {
        label: '文本样式',
        code: 'textStyle',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            {
                name: '颜色',
                value: 'ffffff',
                span: 4,
                code: 'color',
                type: 'color',
                changeFunName: 'onChangeFontLegend'
            },
            {
                name: '文字粗细',
                value: 'normal',
                span: 10,
                code: 'fontWeight',
                type: 'select',
                dataFormat: dictionary.iFonts.fontWeight,
                changeFunName: 'onChangeFontLegend'
            },
            {
                name: '字号',
                value: 12,
                span: 10,
                code: 'fontSize',
                type: 'input-number',
                changeFunName: 'onChangeFontLegend'
            }
        ]
    },
    {
        label: '位置',
        code: 'legendPosition',
        type: '',
        slot: 'icons',
        required: false,
        show: true,
        defaultValue: 'leftTop',
        className: 'heightP100 widthP100',
        dataFormat: [
            { iconType: 'iconzuoshang', title: '左上', value: 'leftTop' },
            { iconType: 'iconshangfang', title: '上方', value: 'top' },
            { iconType: 'iconyoushang', title: '右上', value: 'rightTop' },
            { iconType: 'iconzuoxia', title: '左下', value: 'leftBottom' },
            { iconType: 'iconxiafang', title: '下方', value: 'bottom' },
            { iconType: 'iconyouxia', title: '右下', value: 'rightBottom' }
        ],
        funName: 'onChangeLegendPosition'
    },
    {
        label: '图例标记',
        code: 'legendSign',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            {
                name: '图例大小',
                value: 0,
                span: 12,
                code: 'symbolSize',
                type: 'input-number',
                changeFunName: 'onChangeSymbolSize'
            },
            {
                name: '图例形状',
                value: 0,
                span: 12,
                code: 'icon',
                type: 'select',
                value: 'circle',
                dataFormat: dictionary.other.symbolIcon,
                changeFunName: 'onChangeSymbolIcon'
            }
        ]
    },
    {
        label: '间距',
        code: 'itemGap',
        type: 'number',
        required: false,
        defaultValue: '',
        show: true,
        changeFunName: 'onChangeLegend'
    }
]
const spacingForm = [
    {
        label: '边距',
        code: 'grid',
        type: '',
        slot: 'spacing',
        required: false,
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
        show: true,
        changeFunName: 'onChangeGrid'
    }
]
const valueForm = [
    {
        label: '文本样式',
        code: '',
        type: '',
        required: false,
        show: true,
        classStyle: 'height30 paddingT0'
    },
    {
        label: '文本样式',
        code: 'textStyle',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            {
                name: '颜色',
                value: 'ffffff',
                span: 4,
                code: 'color',
                type: 'color',
                changeFunName: 'onChangeFontValue'
            },
            {
                name: '文字粗细',
                value: 'normal',
                span: 10,
                code: 'fontWeight',
                type: 'select',
                dataFormat: dictionary.iFonts.fontWeight,
                changeFunName: 'onChangeFontValue'
            },
            {
                name: '字号',
                value: 12,
                span: 10,
                code: 'fontSize',
                type: 'input-number',
                changeFunName: 'onChangeFontValue'
            },
        ]
    },
    {
        label: '位置',
        code: 'position',
        type: '',
        slot: 'icons',
        required: false,
        show: true,
        defaultValue: 'inside',
        className: 'heightP100 widthP100',
        dataFormat: [
            {
                iconType: 'iconshangfang',
                title: '上方',
                value: 'top'
            },
            {
                iconType: 'iconzhongjian',
                title: '水平',
                value: 'inside'
            },
            {
                iconType: 'iconxiafang',
                title: '下方',
                value: 'bottom'
            }
        ],
        funName: 'onChangeValuePosition'
    },
]
const labelForm = [
    {
        label: '文本样式',
        code: 'textStyle',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            {
                name: '字体',
                value: 'microsoft yahei',
                span: 10,
                code: 'ifonts',
                type: 'select',
                dataFormat: dictionary.iFonts.iFonts
            },
            {
                name: '文字粗细',
                value: 'normal',
                span: 8,
                code: 'font-weight',
                type: 'select',
                dataFormat: dictionary.iFonts.fontWeight,
                changeFunName: 'onChangeFontWeightLabel'
            },
            {
                name: '字号',
                value: 12,
                span: 6,
                code: 'font-size',
                type: 'input-number',
                changeFunName: 'onChangeFontSizeLabel'
            },
            {
                name: '颜色',
                value: '#07FBF7',
                span: 4,
                code: 'fontColor',
                type: 'color',
                changeFunName: 'onChangeColorLabel'
            },
            {
                name: 'Hex',
                value: '07FBF7',
                span: 10,
                code: 'fontHex',
                type: 'input',
                prefix: '#',
                changeFunName: 'onChangeColorLabel'
            },
        ]
    },
    {
        label: '标签数量',
        code: '',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            {
                name: '数量',
                value: '',
                span: 12,
                code: 'splitNumber',
                type: 'input',
                changeFunName: 'onSplitNumber'
            },
            {
                name: 'X轴单位',
                value: '',
                span: 12,
                code: 'unitName',
                type: 'input',
                changeFunName: 'onUnitName'
            }
        ]
    },
    {
        label: '展示',
        code: 'positionIcon',
        type: '',
        slot: 'icons',
        required: false,
        show: true,
        defaultValue: 'horizontal',
        dataFormat: [
            {
                iconType: 'iconshuiping',
                title: '水平',
                value: 'horizontal'
            },
            {
                iconType: 'iconqingxie45du',
                title: '倾斜',
                value: 'tilt'
            },
            {
                iconType: 'iconchuizhi',
                title: '垂直',
                value: 'vertical'
            }
        ],
        funName: 'onLabelTextStyle',
    }
]
const axisForm = [
    {
        label: '文本样式',
        code: 'textCss',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            {
                name: '颜色',
                value: '132750',
                span: 4,
                code: 'fontColor',
                type: 'color',
                changeFunName: 'onChangeColorAxis'
            },
            {
                name: 'Hex',
                value: '132750',
                span: 10,
                code: 'fontHex',
                type: 'input',
                prefix: '#',
                changeFunName: 'onChangeColorAxis'
            },
        ]
    },
]
const gridlinesForm = [
    {
        label: '文本样式',
        code: 'textCss',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            {
                name: '颜色',
                value: 'ffffff',
                span: 4,
                code: 'fontColor',
                type: 'color',
                changeFunName: 'onChangeColorGrid'
            },
            {
                name: 'Hex',
                value: 'ffffff',
                span: 10,
                code: 'fontHex',
                type: 'input',
                prefix: '#',
                changeFunName: 'onChangeColorGrid'
            }
        ]
    }
]
const tooltipForm = [
    {
        label: '消失延迟',
        code: 'hideDelay',
        type: 'number',
        required: false,
        defaultValue: '100',
        suffix: 'ms',
        show: true,
        changeFunName: 'onChangeTooltip'
    },
    {
        label: '触发动作',
        code: 'triggerOn',
        type: '',
        slot: 'actionIcon',
        required: false,
        defaultValue: 'mousemove',
        show: true,
        funName: 'onTrigger'
    },
    {
        label: '文本样式',
        code: '',
        type: '',
        required: false,
        show: true,
        classStyle: 'height30 paddingT0'
    },
    {
        label: '文本样式',
        code: 'textStyle',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            {
                name: '颜色',
                value: 'ffffff',
                span: 4,
                code: 'color',
                type: 'color',
                changeFunName: 'onChangeFontTooltip'
            },
            {
                name: '文字粗细',
                value: 'normal',
                span: 10,
                code: 'fontWeight',
                type: 'select',
                dataFormat: dictionary.iFonts.fontWeight,
                changeFunName: 'onChangeFontTooltip'
            },
            {
                name: '字号',
                value: 12,
                span: 10,
                code: 'fontSize',
                type: 'input-number',
                changeFunName: 'onChangeFontTooltip'
            }
        ]
    },
    {
        label: '背景框样式',
        code: '',
        type: '',
        required: false,
        show: true,
        classStyle: 'height30 paddingT0'
    },
    {
        label: '填充',
        code: '',
        type: '',
        slot: 'extra',
        required: false,
        dataFormat: [
            {
                name: '颜色',
                value: 'ffffff',
                span: 4,
                code: 'backgroundColor',
                otherColor: 'backgroundHex',
                type: 'color',
                changeFunName: 'onChangeTooltipColor'
            },
            {
                name: 'Hex',
                value: 'ffffff',
                span: 10,
                code: 'backgroundHex',
                otherColor: 'backgroundHex',
                type: 'input',
                prefix: '#',
                changeFunName: 'onChangeTooltipColor'
            },
        ],
        show: true
    },
    {
        label: '边框',
        code: 'border',
        type: '',
        slot: 'extra',
        required: false,
        defaultValue: '',
        dataFormat: [
            {
                name: '颜色',
                value: 'ffffff',
                span: 4,
                code: 'borderColor',
                type: 'color',
                changeFunName: 'onChangeTooltipColor'
            },
            {
                name: '宽度',
                value: '1',
                span: 10,
                code: 'borderWidth',
                type: 'input-number',
                prefix: 'px',
                changeFunName: 'onChangeTooltipBorderWidth'
            },
        ],
        show: true
    },
    {
        label: '弹框位置',
        code: 'position',
        type: 'select',
        required: false,
        defaultValue: 'inside',
        dataFormat: [
            { name: '中心位置', value: 'inside' },
            { name: '图形上侧', value: 'top' },
            { name: '图形左侧', value: 'left' },
            { name: '图形右侧', value: 'right' },
            { name: '图形底侧', value: 'bottom' }
        ],
        show: true,
        changeFunName: 'onChangeSelectTooltip'
    },
]
const pieSpacing = [
    {
        label: '饼图位置',
        code: 'size',
        type: '',
        slot: 'positionSize',
        required: false,
        show: true,
        defaultValue: 1,
        dataFormat: [
            {
                name: 'w',
                value: 0,
                suffix: 'W',
                code: 'width'
            },
            {
                name: 'h',
                value: 0,
                suffix: 'H',
                code: 'height'
            }
        ],
        changeFunName: 'onInputChange'
    },
    {
        label: '透视角度',
        code: 'transparency',
        type: 'slider',
        slot: 'slider',
        required: false,
        show: true,
        defaultValue: 100
    }
]
const animationForm = [
    {
        label: '动画设置',
        code: 'animationEasing',
        type: 'select',
        required: false,
        show: true,
        dataFormat: dictionary.other.animation,
        changeFunName: 'onChangeAnimatioSelect'
    },
    {
        label: '入场动画',
        code: 'animationDuration',
        type: 'number',
        required: false,
        show: true,
        defaultValue: '1000',
        changeFunName: 'onChangeAnimation'
    },
    {
        label: '更新动画',
        code: 'animationDurationUpdate',
        type: 'number',
        required: false,
        show: true,
        defaultValue: '300',
        changeFunName: 'onChangeAnimation'
    }
]
const seriesForm = {
    bar,
    line,
    pie
}

export {
    yForm,
    barForm,
    formBase,
    legendForm,
    spacingForm,
    valueForm,
    labelForm,
    axisForm,
    gridlinesForm,
    tooltipForm,
    seriesForm,
    animationForm,
    pieSpacing
}