/*
 * @Author: yuanhao
 * @Date: 2021-07-12 17:12:39
 * @LastEditTime: 2021-07-12 17:13:24
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \flinev-editor-vue\src\config\formJson\other\otherCharts.js
 */
import { dictionary } from "@cf/dictionary";
const ifont = {
    normal: [
        { name: '字体', value: 'microsoft yahei', span: 10, code: 'ifonts', type: 'select', dataFormat: dictionary.iFonts.iFonts, changeFunName: 'onChange' },
        { name: '文字粗细', value: 'normal', span: 8, code: 'font-weight', type: 'select', dataFormat: dictionary.iFonts.fontWeight, changeFunName: 'onChange' },
        { name: '字号', value: 12, span: 6, code: 'font-size', type: 'input-number', changeFunName: 'onChange' },
        { name: '颜色', value: '#ffffff', span: 4, code: 'color', type: 'color', changeFunName: 'onChangeColor' },
        { name: '字距', min: 0, value: 0, span: 6, code: 'letter-spacing', type: 'input-number', changeFunName: 'onChange' },
        { name: '行高', min: 0, value: 80, span: 6, code: 'line-height', type: 'input-number', changeFunName: 'onChange' },
        { name: '段落', min: 0, value: 0, span: 4, code: 'text-indent', type: 'input-number', changeFunName: 'onChange' },
    ]
}

const formConfigData = [
    {
        label: '图表尺寸',
        code: 'size',
        type: '',
        slot: 'positionSize',
        required: false,
        show: true,
        defaultValue: 1,
        isShowIcon: true,
        dataFormat: [
            { name: 'w', value: '0', suffix: 'W', code: 'width' },
            { name: 'h', value: '0', suffix: 'H', code: 'height' }
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
        defaultValue: 1,
        dataFormat: [
            { name: 'x', value: '0', suffix: 'X', code: 'clientX' },
            { name: 'y', value: '0', suffix: 'Y', code: 'clientY' }
        ],
        changeFunName: 'onInputChange'
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

// 大标题
const pageHeader = [
    {
        label: '标题内容',
        code: 'textContent',
        type: 'input',
        required: false,
        defaultValue: '嵊州市投资项目监管系统数据大屏',
        show: true,
        changeFunName: 'onInputChangeOther'
    },
    {
        label: '文本样式',
        code: '',
        type: 'iconfont',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
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
        dataFormat: ifont.normal
    },
    {
        label: '填充',
        code: '',
        type: '',
        slot: 'iconfont',
        required: false,
        show: true,
        classStyle: 'height30 paddingT0',
        dataFormat: [
            {
                icontype: 'iconshanchu',
                funName: 'iconDel'
            },
            {
                icontype: 'icontianjia',
                funName: 'iconAdd'
            }
        ]
    },
    {
        label: '填充',
        code: 'textFill',
        type: '',
        slot: 'extra',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        required: false,
        show: true,
        disabled: true,
        dictionary: [
            { name: '', span: 4, code: 'switch', type: 'switch' },
            { name: '颜色', value: 'ffffff', span: 4, code: 'fontColor', type: 'color' },
            { name: 'Hex', value: 'ffffff', span: 8, code: 'fontHex', type: 'input', prefix: '#' },
            // { name: '不透明度', value: 0, span: 8, code: 'fontOpacity', type: 'input-number', suffix: '%' }
        ],
        dataFormat: [
            { name: '', value: 1, span: 4, code: 'switch', type: 'switch', funName: 'onSwitch' },
            { name: '颜色', value: 'ffffff', span: 4, code: 'fontColor', type: 'color' },
            { name: 'Hex', value: 'ffffff', span: 8, code: 'fontHex', type: 'input', prefix: '#' },
            // { name: '不透明度', value: 0, span: 8, code: 'fontOpacity', type: 'input-number', suffix: '%' }
        ]
    },
    {
        label: '描边',
        code: '',
        type: '',
        required: false,
        show: true,
        classStyle: 'height30 paddingT0'
    },
    {
        label: '描边',
        code: 'textStroke',
        type: '',
        slot: 'extra',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        required: false,
        show: true,
        disabled: true,
        dataFormat: [
            { name: '', span: 4, type: 'switch', funName: 'onSwitch' },
            { name: '颜色', value: 'ffffff', span: 4, code: 'textStrokeColor', type: 'color' },
            {
                span: 8, type: 'fontIcons', dataFormat: [
                    { name: '内部', icontype: 'iconneibu', code: 'inside', type: 'fontIcons' },
                    { name: '外部', icontype: 'iconwaibu', code: 'outside', type: 'fontIcon' },
                    { name: '居中', icontype: 'iconjuzhong', code: 'center', type: 'fontIcon' },
                ]
            },
            { name: '宽度', value: 0, span: 8, code: 'extend', type: 'input-number', suffix: 'px' },
        ]
    },
    {
        label: '阴影',
        code: '',
        type: '',
        required: false,
        show: true,
        classStyle: 'height30 paddingT0'
    },
    {
        label: '阴影',
        code: 'textShadow',
        type: '',
        slot: 'extra',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        required: false,
        show: true,
        disabled: true,
        dataFormat: [
            { name: '', span: 4, type: 'switch', funName: 'onSwitch' },
            { name: '颜色', value: 'ffffff', span: 4, code: 'textShadowColor', type: 'color' },
            { name: 'X', value: '0', span: 4, code: 'x', type: 'input-number' },
            { name: 'Y', value: '0', span: 4, code: 'y', type: 'input-number' },
            { name: '模糊', value: '0', span: 4, code: 'vague', type: 'input-number' },
            { name: '扩展', value: '0', span: 4, code: 'extend', type: 'input-number' },
        ]
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
    }
]

// 小标题
const smallTitle = [
    {
        label: '文本内容',
        code: 'textContent',
        type: 'input',
        required: false,
        defaultValue: '',
        show: true,
        changeFunName: 'onInputChangeOther'
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
            { name: '字体', value: 'microsoft yahei', span: 12, code: 'titleFontFamily', type: 'select', dataFormat: dictionary.iFonts.iFonts },
            { name: '文字粗细', value: 'normal', span: 12, code: 'titleFontWeight', type: 'select', dataFormat: dictionary.iFonts.fontWeight },
            { name: '颜色', value: '#259bca', span: 3, code: 'titleColor', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: '259bca', span: 11, code: 'titleHex', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
            { name: '字号', value: 16, span: 10, code: 'titleFontSize', type: 'input-number', changeFunName: 'onChangeFontSize' },
        ]
    },
    {
        label: '图文间距',
        code: 'imgTitleMargin',
        type: 'number',
        required: false,
        show: true,
        defaultValue: 10,
        changeFunName: 'onInputChangeTitleMargin'
    },
    {
        label: '修饰物边框色',
        code: '',
        type: '',
        slot: 'formExpand',
        required: false,
        show: true
    },
    {
        label: '左下边框',
        code: '',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#3290fc', span: 4, code: 'leftBottomLineColor', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: '3290fc', span: 20, code: 'leftBottomLineHex', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
        ]
    },
    {
        label: '左橙竖线',
        code: '',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#ff893c', span: 4, code: 'leftOrangeLineColor', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: 'ff893c', span: 20, code: 'leftOrangeLineHex', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
        ]
    },
    {
        label: '左蓝竖线',
        code: '',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#0053FF', span: 4, code: 'leftBlueLineColor', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: '0053FF', span: 20, code: 'leftBlueLineHex', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
        ]
    },
    {
        label: '右橙线',
        code: '',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#ff893c', span: 4, code: 'rightOrangeLineColor', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: 'ff893c', span: 20, code: 'rightOrangeLineHex', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
        ]
    },
    {
        label: '右蓝线',
        code: '',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#0053FF', span: 4, code: 'rightBlueLineColor', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: '0053FF', span: 20, code: 'rightBlueLineHex', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
        ]
    },
]

// 几何体
const geometry = [
    {
        label: '背景颜色',
        code: 'backgroundColor',
        type: '',
        slot: 'color',
        required: false,
        defaultValue: 'ffffff',
        funName: 'onChangeColor',
        show: true
    }
]

// 文字
const ifonts = [
    {
        label: '文本内容',
        code: 'textContent',
        type: 'input',
        required: false,
        defaultValue: '文字',
        show: true,
        changeFunName: 'onInputChangeOther'
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
        dataFormat: ifont.normal
    }
]

// 图片
const pageImage = [
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
    }
]

// 指标
const quato = [
    {
        label: '标题文字',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: 'quatoTitle',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#ffffff', span: 4, code: 'quatoTitleColor', keys: 'styleOption', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: '文字粗细', value: 'normal', span: 12, code: 'quatoTitleFontWeight', keys: 'styleOption', type: 'select', dataFormat: dictionary.iFonts.fontWeight, changeFunName: 'onChangeFont' },
            { name: '字号', value: 14, span: 8, code: 'quatoTitleFontSize', keys: 'styleOption', type: 'input-number', changeFunName: 'onChangeFontSize' },
        ]
    },
    {
        label: '数值',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: 'quatoValue',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#ffffff', span: 4, code: 'quatoValueColor', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: '文字粗细', value: 'normal', span: 12, code: 'quatoValueFontWeight', type: 'select', dataFormat: dictionary.iFonts.fontWeight, changeFunName: 'onChangeFont' },
            { name: '字号', value: 21, span: 8, code: 'quatoValueFontSize', type: 'input-number', changeFunName: 'onChangeFontSize' },
        ]
    },
    {
        label: '单位文字',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: 'quatoUnit',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#ffffff', span: 4, code: 'quatoUnitColor', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: '文字粗细', value: 'normal', span: 12, code: 'quatoUnitFontWeight', type: 'select', dataFormat: dictionary.iFonts.fontWeight, changeFunName: 'onChangeFont' },
            { name: '字号', value: 14, span: 8, code: 'quatoUnitFontSize', type: 'input-number', changeFunName: 'onChangeFontSize' },
        ]
    },
    {
        label: '项标题背景色',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: 'quatoTitleBg',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '', value: 1, span: 4, code: 'quatoTitleBgSwitch', type: 'switch', funName: 'onSwitch' },
            { name: '颜色', value: '#3290fc', span: 4, code: 'quatoTitleBgColor', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: '3290fc', span: 16, code: 'quatoTitleBgHex', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
        ]
    },
    {
        label: '装饰方块颜色',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: 'squareBg',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '', value: 1, span: 4, code: 'squareBgSwitch', type: 'switch', funName: 'onSwitch' },
            { name: '颜色', value: '#3290fc', span: 4, code: 'squareBgColor', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: '3290fc', span: 16, code: 'squareBgHex', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
        ]
    }
]

// 筛选器
const tabSelect = [
    {
        label: '选中文字',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: 'activeFort',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#ffffff', span: 4, code: 'activeColor', keys: 'styleOption', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: '文字粗细', value: 'normal', span: 12, code: 'activeFortWeight', keys: 'styleOption', type: 'select', dataFormat: dictionary.iFonts.fontWeight, changeFunName: 'onChangeFont' },
            { name: '字号', value: 14, span: 8, code: 'activeFontSize', keys: 'styleOption', type: 'input-number', changeFunName: 'onChangeFontSize' },
        ]
    },
    {
        label: '选中背景色',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: 'tabActiveBg',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '', value: 1, span: 4, code: 'tabActiveBgSwitch', type: 'switch', funName: 'onSwitch' },
            { name: '颜色', value: '#3290fc', span: 4, code: 'tabActiveBgColor', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: '3290fc', span: 16, code: 'tabActiveBgHex', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
        ]
    },
    {
        label: '未选中文字',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: 'valueFont',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#ffffff', span: 4, code: 'valueColor', keys: 'styleOption', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: '文字粗细', value: 'normal', span: 12, code: 'valueFontWeight', keys: 'styleOption', type: 'select', dataFormat: dictionary.iFonts.fontWeight, changeFunName: 'onChangeFont' },
            { name: '字号', value: 14, span: 8, code: 'valueFontSize', keys: 'styleOption', type: 'input-number', changeFunName: 'onChangeFontSize' },
        ]
    },
    {
        label: '未选中背景色',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: 'tabBg',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '', value: 1, span: 4, code: 'tabBgSwitch', type: 'switch', funName: 'onSwitch' },
            { name: '颜色', value: '#3290fc', span: 4, code: 'tabBgColor', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: '3290fc', span: 16, code: 'tabBgHex', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
        ]
    },
    {
        label: '边框颜色',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: 'border',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '', value: 1, span: 4, code: 'borderSwitch', type: 'switch', funName: 'onSwitch' },
            { name: '颜色', value: '#3290fc', span: 4, code: 'borderColor', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: '3290fc', span: 8, code: 'borderHex', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
            { name: '高度', value: 14, span: 8, code: 'height', keys: 'styleOption', type: 'input-number', changeFunName: 'onChangeFontSize' },
        ]
    },
    {
        label: '文字左右间距',
        code: 'paddingLR',
        type: 'number',
        required: false,
        show: true,
        defaultValue: 10,
        changeFunName: 'onPaddingLR'
    },
]

const yearSelect = [
    {
        label: '背景色',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: 'background',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '', value: 1, span: 4, code: 'bgSwitch', type: 'switch', funName: 'onSwitch' },
            { name: '颜色', value: '#3290FC', span: 4, code: 'bgColor', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: '3290FC', span: 16, code: 'bgHex', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
        ]
    },
    {
        label: '箭头样式',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: '',
        type: '',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#ffffff', span: 4, code: 'actionColor', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: '文字粗细', value: 'normal', span: 10, code: 'actionFontWeight', keys: 'styleOption', type: 'select', dataFormat: dictionary.iFonts.fontWeight, changeFunName: 'onChangeFont' },
            { name: '大小', value: 14, span: 10, code: 'actionFontSize', keys: 'styleOption', type: 'input-number', changeFunName: 'onChangeFontSize' },
        ]
    },
    {
        label: '年份数字',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: 'value',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#ffffff', span: 4, code: 'valueColor', keys: 'styleOption', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: '文字粗细', value: 'normal', span: 10, code: 'valueFontWeight', keys: 'styleOption', type: 'select', dataFormat: dictionary.iFonts.fontWeight, changeFunName: 'onChangeFont' },
            { name: '字号', value: 14, span: 10, code: 'valueFontSize', keys: 'styleOption', type: 'input-number', changeFunName: 'onChangeFontSize' },
        ]
    },
    {
        label: '年份单位',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: 'unit',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#ffffff', span: 4, code: 'unitColor', keys: 'styleOption', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: '文字粗细', value: 'normal', span: 12, code: 'unitFornWeight', keys: 'styleOption', type: 'select', dataFormat: dictionary.iFonts.fontWeight, changeFunName: 'onChangeFont' },
            { name: '字号', value: 14, span: 8, code: 'unitFontSize', keys: 'styleOption', type: 'input-number', changeFunName: 'onChangeFontSize' },
        ]
    },
    {
        label: '单位和数字间距',
        code: 'valueUnitMargin',
        type: 'number',
        required: false,
        show: true,
        defaultValue: 10,
        changeFunName: 'onInputChangeTitleMargin'
    },
    {
        label: '箭头和文字间距',
        code: 'actionMargin',
        type: 'number',
        required: false,
        show: true,
        defaultValue: 10,
        changeFunName: 'onInputChangeTitleMargin'
    },
    {
        label: '边框内左右间距',
        code: 'paddingLR',
        type: 'number',
        required: false,
        show: true,
        defaultValue: 10,
        changeFunName: 'onInputChangeTitleMargin'
    },
]

const boxBorder = [
    {
        label: '背景色',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: 'background',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '', value: 1, span: 4, code: 'bgSwitch', type: 'switch', funName: 'onSwitch' },
            { name: '颜色', value: '#3290fc', span: 4, code: 'bgColor', otherColor: 'bgHex', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: '3290fc', span: 16, code: 'bgHex', otherColor: 'bgColor', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
        ]
    },
    {
        label: '边框颜色',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: 'border',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '', value: 1, span: 4, code: 'borderSwitch', type: 'switch', funName: 'onSwitch' },
            { name: '颜色', value: '#3290fc', span: 4, code: 'borderColor', otherColor: 'borderHex', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: '3290fc', span: 16, code: 'borderHex', otherColor: 'borderColor', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
        ]
    },
    {
        label: '修饰物背景色',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '左右',
        code: 'borderModificationBg',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#3290fc', span: 4, code: 'borderModificationBgColor', otherColor: 'borderModificationBgHex', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: '3290fc', span: 16, code: 'borderModificationBgHex', otherColor: 'borderModificationBgColor', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
        ]
    },
    {
        label: '上',
        code: 'borderModificationBgTop',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#3290fc', span: 4, code: 'borderModificationBgColorTop', otherColor: 'borderModificationBgHexTop', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: '3290fc', span: 16, code: 'borderModificationBgHexTop', otherColor: 'borderModificationBgColorTop', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
        ]
    },
    {
        label: '下',
        code: 'borderModificationBorderTop',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#3290fc', span: 4, code: 'borderModificationBorderColorTop', otherColor: 'borderModificationBorderHexTop', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: '3290fc', span: 16, code: 'borderModificationBorderHexTop', otherColor: 'borderModificationBorderColorTop', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
        ]
    },
    // {
    //     label: '边框宽度',
    //     code: 'borderWidth',
    //     type: 'number',
    //     required: false,
    //     show: true,
    //     defaultValue: 1,
    //     changeFunName: 'onChangeBorderWidth'
    // }
]

const timeLineCommon = [
    {
        label: '箭头样式',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '箭头样式',
        code: '',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '箭头粗细', value: 'normal', span: 12, code: 'arrowFontWeight', keys: 'styleOption', type: 'select', dataFormat: dictionary.iFonts.fontWeight, changeFunName: 'onChangeFont' },
            { name: '箭头大小', value: 20, span: 12, code: 'arrowFontSize', keys: 'styleOption', type: 'input-number', changeFunName: 'onChangeFontSize' },
        ]
    },
    {
        label: '颜色',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: '',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '', value: 1, span: 4, code: 'arrowSwitch', type: 'switch', funName: 'onSwitch' },
            { name: '颜色', value: '#889499', span: 4, code: 'arrowColor', otherColor: 'arrowHex', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: '889499', span: 16, code: 'arrowHex', otherColor: 'arrowColor', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
        ]
    },
    {
        label: '箭头背景大小',
        code: '',
        type: '',
        slot: 'positionSize',
        required: false,
        show: true,
        defaultValue: 1,
        isShowIcon: true,
        dataFormat: [
            { name: 'w', value: '20', suffix: 'W', code: 'arrowWidth' },
            { name: 'h', value: '20', suffix: 'H', code: 'arrowHeight' }
        ],
        changeFunName: 'onInputChangeSize'
    },
    {
        label: '鼠标hover颜色',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: '',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '', value: 1, span: 4, code: 'arrowHoverBgSwitch', type: 'switch', funName: 'onSwitch' },
            { name: '颜色', value: '#2681FF', span: 4, code: 'arrowHoverBgColor', otherColor: 'arrowHoverBgHex', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: '2681FF', span: 16, code: 'arrowHoverBgHex', otherColor: 'arrowHoverBgColor', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
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
    },
    {
        label: '时间轴线样式',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '颜色',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: '',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '', value: 1, span: 4, code: 'lineSwitch', type: 'switch', funName: 'onSwitch' },
            { name: '颜色', value: '#0988ff', span: 4, code: 'lineColor', otherColor: 'lineHex', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: 'Hex', value: '0988ff', span: 16, code: 'lineHex', otherColor: 'lineColor', type: 'input', prefix: '#', changeFunName: 'onChangeFontColor' },
        ]
    },
    {
        label: '轴线尺寸',
        code: '',
        type: '',
        slot: 'positionSize',
        required: false,
        show: true,
        defaultValue: 1,
        isShowIcon: true,
        dataFormat: [
            { name: 'w', value: '500', suffix: 'W', code: 'lineWidth' },
            { name: 'h', value: '2', suffix: 'H', code: 'lineHeight' }
        ],
        changeFunName: 'onInputChangeSize'
    },
    {
        label: '线与箭头间距',
        code: '',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '间距', value: '10', span: 12, code: 'lineArrowMargin', type: 'input-number', suffix: 'px', changeFunName: "onInputChangeSize" },
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
    },
    {
        label: '节点样式',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '图标',
        code: '',
        type: '',
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#2681FF', span: 6, code: 'iconColor', otherColor: 'iconSize', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: '直径', value: '10', span: 18, code: 'iconSize', otherColor: 'iconColor', type: 'input-number', suffix: 'px', changeFunName: 'onChangeFontColor' },
        ]
    },
    {
        label: '选中图标',
        code: '',
        type: '',
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#2681FF', span: 6, code: 'iconActiveColor', otherColor: 'iconActiveSize', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: '直径', value: '20', span: 18, code: 'iconActiveSize', otherColor: 'iconActiveColor', type: 'input-number', suffix: 'px', changeFunName: 'onChangeFontColor' },
        ]
    },
    {
        label: '图标与数据间距',
        code: '',
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '间距', value: '10', span: 12, code: 'iconValueMargin', type: 'input-number', suffix: 'px', changeFunName: 'onInputChangeSize' },
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
    },
    {
        label: '数值样式',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: 'quatoTitle',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#ffffff', span: 4, code: 'valueColor', keys: 'styleOption', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: '文字粗细', value: 'normal', span: 12, code: 'valueFontWeight', keys: 'styleOption', type: 'select', dataFormat: dictionary.iFonts.fontWeight, changeFunName: 'onChangeFont' },
            { name: '字号', value: 14, span: 8, code: 'valueFontSize', keys: 'styleOption', type: 'input-number', changeFunName: 'onChangeFontSize' },
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
    },
    {
        label: '单位样式',
        code: '',
        type: '',
        classStyle: 'height30 paddingT0',
        required: false,
        show: true
    },
    {
        label: '',
        code: 'quatoTitle',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'extra',
        required: false,
        show: true,
        dataFormat: [
            { name: '颜色', value: '#ffffff', span: 4, code: 'unitColor', keys: 'styleOption', type: 'color', changeFunName: 'onChangeFontColor' },
            { name: '字号', value: 12, span: 8, code: 'unitFontSize', keys: 'styleOption', type: 'input-number', changeFunName: 'onChangeFontSize' },
        ]
    }
]

const timeLineCommonanimation = [
    {
        label: '动画配置',
        code: 'isAnimate',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
        type: '',
        slot: 'switch',
        required: false,
        defaultValue: true,
        show: true,
        funName: 'onSwitchAnimation'
    },
    {
        label: '轮播时间',
        code: 'animateInterval',
        type: 'number',
        required: false,
        show: true,
        defaultValue: 1000,
        changeFunName: 'onInputChangeNumber'
    }
]

export {
    formConfigData,
    pageImage,
    pageHeader,
    geometry,
    smallTitle,
    ifonts,
    quato,
    tabSelect,
    yearSelect,
    boxBorder,
    timeLineCommon,
    timeLineCommonanimation
}