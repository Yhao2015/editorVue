<template>
    <div class="fx_layerRight">
        <div class="fx_title fx_justifyBetween">
            <span>布局容器</span>
            <span class="fx_pointer" @click="onLayoutFun">
                <a-icon type="left" class="colorBBC9D4" />
            </span>
        </div>
        <div class="fx_box">
            <div class="fx_grid" 
                v-for="item in gridBoxs" 
                :key="item.type" 
                draggable="true" 
                @dragend="ondragend($event,item)"
            >
                <img :src="item.path">
            </div>
        </div>
        <div class="fx_title fx_justifyStart">
            <span>组件列表</span>
            <span class="fx_pointer marginL8" @click="onRefresh">
                <icon-font type="iconshuaxin" :class="['icon']" />
            </span>
        </div>
        <div class="fx_title bg222 fx_justifyBetween">
            <span class="fontSize12">全部可用组件</span>
        </div>
        <!-- 组件列表 -->
        <div class="fx_tabs">
            <tabs @ondragend="ondragend" ref="tabs" :queryText="queryText" @onTabChange="onTabChange"></tabs>
        </div>
        <div class="fx_search width250">
            <a-input placeholder="请输入" v-model="queryText" @change="onChange" allowClear/>
        </div>
    </div>
</template>

<script>
import tabs from './Tabs.vue'
import { mapState } from 'vuex'
import lottie from 'lottie-web'
import { basicJson, assemblySetting, containerSetting, basicEchartsJson, basicOtherJson } from '@cf/setting'
export default {
    computed: mapState(['basicsSetting', 'isParent', 'isLayerShow']),
    name: 'layer-right',
    data() {
        return {
            gridBoxs: [
                {
                    type: 'inline',
                    name: '组件容器',
                    iconType: 'align-left',
                    path: require('@a/image/inline.png')
                },
                {
                    type: 'horizontal',
                    name: '水平布局',
                    iconType: 'align-left',
                    path: require('@a/image/horizontal.png')
                },
                {
                    type: 'vertical',
                    name: '垂直布局',
                    iconType: 'align-left',
                    path: require('@a/image/vertical.png')
                }
            ],
            spinning: false,
            queryText: ''
        }
    },
    components: {
        tabs
    },
    methods: {
        /**
         * @description: 布局容器 收起
         * @param {*}
         * @return {*}
         */
        onLayoutFun() {
            let isLayerRight = this.isLayerShow.isLayerRight
            this.$store.commit('updateShow', {
                name: 'isLayerRight',
                value: !isLayerRight
            })
        },
        /**
         * @description: 组件列表刷新
         * @param {*}
         * @return {*}
         */
        onRefresh() {
            this.$refs.tabs.findAllGroup()
        },

        /**
         * @description: 组件拖拽到画布事件
         * @param {*} event 画布定位
         * @param {*} list 组件信息
         * @return {*}
         */
        ondragend(event, list) {
            // 没有在画布上的不处理
            let canvasDrop = document.getElementsByClassName('fx_canvasContainer')[0].getBoundingClientRect()
            if (event.clientX < canvasDrop.left || event.clientX > canvasDrop.right
                || event.clientY < canvasDrop.top || event.clientY > canvasDrop.bottom) {
                return
            }

            list.type = list.code || list.type
            
            if (list.type == 'inline' || list.type == 'horizontal' || list.type == 'vertical') {
                list = { ...list, ...basicJson[list.type] }
                list.children = list.type == 'inline' ? [{}] : [{}, {}]
            } else {
                let typeGroup = list.type.split('&')
                let chartsJson = null
                let extend = null
                if (typeGroup.length > 1) {
                    // 图表组件
                    extend = this.addExtend()
                    chartsJson = basicEchartsJson[typeGroup[1]]
                } else {
                    extend = this.addExtendOther(typeGroup[0])
                    chartsJson = basicOtherJson[typeGroup[0]]
                }
                // 名字和别名和列表保持一致
                chartsJson.name = list.name
                chartsJson.alias = list.name
                if(!chartsJson) {
                    this.$message.error('组件类型错误')
                    return
                }
                list = {
                    ...assemblySetting,
                    extend: extend,
                    ...list,
                    ...chartsJson
                }
            }

            this.$store.commit('updateDragInfo', {
                ...list,
                clientX: event.clientX,
                clientY: event.clientY
            })
        },
        onTabChange() {
            this.queryText = ''
        },
        /**
         * @description: 图表类配置
         * @param {*}
         * @return {*}
         */
        addExtend() {
            let extend = {
                activeKey: '1',
                activeKeySetting: '1',
                mode: 'x',
                switchMap: {
                    isBar: false, // 柱子样式
                    isLegend: false, // 图例
                    isValue: false, //值标签
                    checkedX: true, //X轴可见
                    checkedY: true, //Y轴可见
                    isAnimation: false, //动画
                    isToolbox: false,  //提示框
                    isMapping: false, //映射
                    isXLabel: true, //标签样式
                    isYLabel: true,
                    isXAxis: false, //轴线
                    isYAxis: false,
                    isXGridlines: false, //网格线
                    isYGridlines: false,
                    isSeries: false
                },
                baseDataForm: {
                    clientX: "",
                    clientY: "",
                    height: "",
                    width: "",
                    opacity: 1,
                    direction: 0,
                    leftRight: 0,
                    topBottom: 0
                },
                spacingForm: {},
                cssForm: {},
                legendForm: {},
                valueForm: {},
                tooltipForm: {},
                xlabelForm: {},
                xaxisForm: {},
                xgridlinesForm: {},
                animationForm: {},
                dataSourceForm: {}
            }
            return extend
        },
        /**
         * @description: 非图表类配置
         * @param {*} type
         * @return {*}
         */
        addExtendOther(type) {
            let extend = {
                baseDataForm: {
                    clientX: "",
                    clientY: "",
                    height: "",
                    width: "",
                    opacity: 1
                },
                activeKey: '1',
                activesKey: '1',
                configDataForm: {}
            }
            let obj = {
                'pageImage': () => {
                    extend.configDataForm = {
                        backgroundImage: ''
                    }
                },
                'pageHeader': () => {
                    extend.configDataForm = {
                        path: '',
                        textContent: '嵊州市投资项目监管系统数据大屏',
                        'ifonts': '',
                        'font-weight': 'normal',
                        'font-size': 30,
                        'color': '#ffffff',
                        'letter-spacing': 0,
                        'line-height': 80,
                        'text-indent': 0,
                        'font-style': 'normal'
                    }
                },
                'smallTitle': () => {
                    extend.configDataForm = {
                        textContent: '基本信息统计',
                        titleFontSize: 16,
                        titleFontWeight: 'normal',
                        titleFontFamily: 'AlibabaPuHuiTiR',
                        titleColor: '#aae7ff',
                        imgTitleMargin: 10
                    }
                },
                'ifonts': () => {
                    extend.configDataForm = {
                        textContent: '文字',
                        'ifonts': '',
                        'font-weight': 'normal',
                        'font-size': 12,
                        'color': '#ffffff',
                        'letter-spacing': 0,
                        'line-height': 30,
                        'text-indent': 0,
                        'font-style': 'normal'
                    }
                },
                'boxBorder': () => {
                    extend.configDataForm = {
                        bgColor: "#3290fc",
                        bgHex: "3290fc",
                        borderColor: "#3290fc",
                        borderHex: "3290fc",
                        borderModificationBgColor: "#3290fc",
                        borderModificationBgHex: "3290fc",
                        borderModificationBgColorTop: "#3290fc",
                        borderModificationBgHexTop: "3290fc",
                        borderModificationBorderColorTop: "#3290fc",
                        borderModificationBorderHexTop: "3290fc"
                    }
                }
            }
            obj[type] && obj[type]()
            return extend
        },
        /**
         * @description: 查询
         * @param {*} e
         * @return {*}
         */
        onChange(e) {
            let text = e.target.value
        }
    }
}
</script>

<style>
</style>