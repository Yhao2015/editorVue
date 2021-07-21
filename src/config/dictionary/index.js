/*
 * @Author: yuanhao
 * @Date: 2021-07-12 11:09:25
 * @LastEditTime: 2021-07-14 11:21:06
 * @LastEditors: yuanhao
 * @Description: 字典值
 * @FilePath: \flinev-editor-vue\src\config\dictionary\index.js
 */
const dictionary = {
    tab: {
        tabPane: [
            { key: '1', value: '样式' },
            { key: '2', value: '数据' },
            { key: '3', value: '交互' }
        ],
        tabSetting: [
            { key: '1', value: '图表' },
            { key: '2', value: '坐标轴' },
            { key: '3', value: '系列' },
            { key: '4', value: '其他' }
        ],
        tabsPane: [
            { key: '1', value: '外观样式' },
            { key: '2', value: '其他' }
        ]
    },
    iFonts: {
        iFonts: [
            { value: 'microsoft yahei', name: '微软雅黑' },
            { value: 'song', name: '宋体' },
            { value: 'block', name: '黑体' }
        ],
        fontWeight: [
            { value: 'normal', name: 'normal' },
            { value: 'bold', name: 'bold' },
            { value: 'bolder', name: 'bolder' },
            { value: 'lighter', name: 'lighter' },
            { value: '100', name: '100' },
            { value: '200', name: '200' },
            { value: '300', name: '300' },
            { value: '400', name: '400' },
            { value: '500', name: '500' },
            { value: '600', name: '600' },
            { value: '700', name: '700' },
            { value: '800', name: '800' },
            { value: '900', name: '900' }
        ]
    },
    other: {
        symbolIcon: [
            {
                value: 'circle',
                name: 'circle'
            },
            {
                value: 'rect',
                name: 'rect'
            },
            {
                value: 'roundRect',
                name: 'roundRect'
            },
            {
                value: 'triangle',
                name: 'triangle'
            },
            {
                value: 'diamond',
                name: 'diamond'
            },
            {
                value: 'pin',
                name: 'pin'
            },
            {
                value: 'arrow',
                name: 'arrow'
            },
            {
                value: 'none',
                name: 'none'
            }
        ],
        animation: [
            {
                name: 'linear',
                value: 'linear'
            },
            {
                name: 'quadraticIn',
                value: 'quadraticIn'
            },
            {
                name: 'quadraticOut',
                value: 'quadraticOut'
            },
            {
                name: 'cubicIn',
                value: 'cubicIn'
            },
            {
                name: 'cubicOut',
                value: 'cubicOut'
            },
            {
                name: 'cubicInOut',
                value: 'cubicInOut'
            },
            {
                name: 'quarticIn',
                value: 'quarticIn'
            },
            {
                name: 'quarticOut',
                value: 'quarticOut'
            },
            {
                name: 'quarticInOut',
                value: 'quarticInOut'
            },
            {
                name: 'quinticIn',
                value: 'quinticIn'
            },
            {
                name: 'quinticOut',
                value: 'quinticOut'
            },
            {
                name: 'quinticInOut',
                value: 'quinticInOut'
            },
            {
                name: 'sinusoidalIn',
                value: 'sinusoidalIn'
            },
            {
                name: 'sinusoidalOut',
                value: 'sinusoidalOut'
            },
            {
                name: 'sinusoidalInOut',
                value: 'sinusoidalInOut'
            },
            {
                name: 'exponentialIn',
                value: 'exponentialIn'
            },

            {
                name: 'exponentialOut',
                value: 'exponentialOut'
            },
            {
                name: 'exponentialInOut',
                value: 'exponentialInOut'
            },
            {
                name: 'circularIn',
                value: 'circularIn'
            },
            {
                name: 'circularOut',
                value: 'circularOut'
            },
            {
                name: 'circularInOut',
                value: 'circularInOut'
            },
            {
                name: 'elasticIn',
                value: 'elasticIn'
            },
            {
                name: 'elasticOut',
                value: 'elasticOut'
            },
            {
                name: 'elasticInOut',
                value: 'elasticInOut'
            }
        ],
        linesType: [
            {
                name: 'solid',
                value: 'solid'
            },
            {
                name: 'dashed',
                value: 'dashed'
            },
            {
                name: 'dotted',
                value: 'dotted'
            }
        ],
        symbolType: [
            {
                name: 'circle',
                value: 'circle'
            },
            {
                name: 'rect',
                value: 'rect'
            },
            {
                name: 'roundRect',
                value: 'roundRect'
            },
            {
                name: 'triangle',
                value: 'triangle'
            },
            {
                name: 'diamond',
                value: 'diamond'
            },
            {
                name: 'pin',
                value: 'pin'
            },
            {
                name: 'arrow',
                value: 'arrow'
            },
            {
                name: 'none',
                value: 'none'
            }
        ]
    },
    iconFonts: [
        {
            name: '置顶',
            iconName: 'iconzhiding'
        },
        {
            name: '置底',
            iconName: 'iconzhidi'
        },
        {
            name: '上移一层',
            iconName: 'iconshangyiceng'
        },
        {
            name: '下移一层',
            iconName: 'iconxiayiceng'
        },
        {
            name: '成组',
            iconName: 'iconbianzu'
        },
        {
            name: '取消成组',
            iconName: 'iconquxiaochengzu'
        },
        {
            name: '锁定',
            iconName: 'iconsuoding'
        },
        {
            name: '解锁',
            iconName: 'iconjiesuo'
        },
        {
            name: '隐藏',
            iconName: 'iconyincang'
        },
        {
            name: '显示',
            iconName: 'iconxianshi'
        },
        {
            name: '单独显示图层',
            iconName: 'iconxianshidangetuceng'
        },
        {
            name: '显示全部图层',
            iconName: 'iconquxiaoxianshidangetuceng'
        },
        {
            name: '重命名',
            iconName: 'iconzhongmingming'
        },
        {
            name: '复制',
            iconName: 'iconfuzhi'
        },
        {
            name: '删除',
            iconName: 'iconshanchu'
        },
        // {
        //     name: '收藏',
        //     iconName: 'iconshoucang'
        // }
    ]
}

const layers = {
    layerItem: [
        {
            iconName: 'iconhuabubianjiqi',
            checked: true,
            title: '画布编辑器',
            funName: 'layerFun'
        },
        {
            iconName: 'iconlantubianjiqi',
            checked: false,
            title: '蓝图编辑器',
            funName: 'layerFun'
        },
        {
            iconName: 'iconsanweichangjingbianjiqi',
            checked: false,
            title: '三维场景编辑器',
            funName: 'layerFun'
        }
    ],
    layoutItem: [
        {
            iconName: 'icondakaitucenglan',
            boxClass: 'marginR8',
            checked: true,
            title: '图层栏',
            name: 'isLayerLeft',
            funName: 'layoutFun'
        },
        {
            iconName: 'icondakaizujianlan',
            boxClass: 'marginR8',
            checked: true,
            title: '组件栏',
            name: 'isLayerRight',
            funName: 'layoutFun'
        },
        {
            iconName: 'icondakaipeizhilan',
            boxClass: 'marginR8',
            checked: true,
            title: '配置栏',
            name: 'isSetting',
            funName: 'layoutFun'
        },
        {
            iconName: 'icondakaigongjulan',
            boxClass: 'marginR8',
            checked: true,
            title: '工具栏',
            name: 'isTools',
            funName: 'layoutFun'
        }
    ],
    canvasItem: [
        {
            iconName: 'iconquanjushujuguolvqi',
            boxClass: 'marginR8',
            checked: false,
            title: '全局数据过滤器',
            funName: 'canvasFun'
        },
        {
            iconName: 'iconshuaxinzujianku',
            boxClass: 'marginR8',
            checked: false,
            title: '刷新组件库',
            funName: 'canvasFun'
        },
        {
            iconName: 'iconquanjushejizhuti',
            boxClass: 'marginR8',
            checked: false,
            title: '一键美化',
            funName: 'canvasFun'
        },
        {
            iconName: 'iconlvjing',
            boxClass: 'marginR8',
            checked: false,
            title: '滤镜',
            funName: 'canvasFun'
        }
    ],
    pageSettingItem: [
        {
            iconName: 'iconchexiao',
            boxClass: 'marginR8',
            checked: false,
            title: '撤销',
            type: 'revoke',
            funName: 'pageSettingFun'
        },
        {
            iconName: 'iconhuifu',
            boxClass: 'marginR8',
            checked: false,
            title: '恢复',
            type: 'recovery',
            funName: 'pageSettingFun'
        },
        {
            iconName: 'iconhuishouzhan',
            boxClass: 'marginR8',
            checked: false,
            title: '回收站',
            type: 'del',
            funName: 'pageSettingFun'
        },
        {
            iconName: 'iconbangzhu',
            boxClass: 'marginR8',
            checked: false,
            title: '帮助',
            type: 'help',
            funName: 'pageSettingFun'
        },
        {
            iconName: 'iconkongzhitai',
            boxClass: 'marginR8',
            checked: false,
            title: '控制台',
            type: 'consoleDesk',
            funName: 'pageSettingFun'
        },
        {
            iconName: 'iconbaocun',
            boxClass: 'marginR8',
            checked: false,
            title: '保存',
            type: 'save',
            funName: 'pageSettingFun'
        },
        {
            iconName: 'iconfabu',
            boxClass: 'marginR8',
            checked: false,
            title: '发布',
            type: 'release',
            funName: 'pageSettingFun'
        },
        {
            iconName: 'iconyulan',
            boxClass: 'marginR8',
            checked: false,
            title: '预览',
            type: 'preview',
            funName: 'pageSettingFun'
        }
    ]
}

export { dictionary, layers }
