<template>
    <div class="fx_echarts">
        <a-tabs 
            default-active-key="1"
            v-model="extend.activeKey" 
            :tab-position="'bottom'"
            class="fx_tabs" 
            :tabBarGutter="0"
        >
            <a-tab-pane v-for="item in tabPane" :key="item.key" :tab="item.value" />
        </a-tabs>

        <div class="paddingT8 paddingB8 paddingL16 paddingR16 fx_title">
            <h3>{{name}}</h3>
            <h4>{{introduce}}</h4>
            <span class="fx_themeStyle">
                <icon-font :type="'iconfengge'" :class="['icon', 'fontSize12']" />
                主题风格
            </span>
        </div>

        <div v-show="extend.activeKey == '1'">
            <div class="paddingL16 paddingR16">
                <baseForm 
                    :addFunctions='addFunctionCharts' 
                    :formConfigBase="formConfigBase" 
                    :formConfigData='baseDataForm' 
                    ref='baseDataForm' 
                />
            </div>
            <a-tabs 
                default-active-key="1"
                v-model="extend.activeKeySetting" 
                :tab-position="'bottom'" 
                :tabBarGutter="0"
                class="marginT16 fx_subTabs"
            >
                <a-tab-pane v-for="item in tabSetting" :key="item.key" :tab="item.value"/>
            </a-tabs>

            <div class="fx_collapse" v-show="extend.activeKeySetting == '1'">
                <div class="marginT16 marginB32 paddingL16 paddingR16">
                    <baseForm 
                        :addFunctions='addFunctionCharts' 
                        :formConfigBase="formConfigBase" 
                        :formConfigData='spacingForm' 
                        ref='spacingForm'
                    />
                    <div v-if="type.indexOf('bar') > -1">
                        <a-divider />
                        <a-switch v-model="extend.switchMap.isBar" @change="onSwitchChange"/> 
                        <span class="marginL16">柱子样式</span>
                        <baseForm
                            v-show="extend.switchMap.isBar" 
                            :addFunctions='addFunctionCharts' 
                            :formConfigBase="formConfigBase" 
                            :formConfigData='barForm'
                            class="marginT16" 
                            ref='barForm'
                        />
                    </div>
                    <a-divider />
                    <a-switch v-model="extend.switchMap.isLegend" @change="onSwitchChange($event, 'legend')"/> 
                    <span class="marginL16">图例</span>
                    <baseForm
                        v-show="extend.switchMap.isLegend" 
                        :addFunctions='addFunctionCharts' 
                        :formConfigBase="formConfigBase" 
                        :formConfigData='legendForm'
                        class="marginT16" 
                        ref='legendForm'
                    />
                    <a-divider />
                    <a-switch v-model="extend.switchMap.isValue" @change="onSwitchChange($event, 'label')"/> 
                    <span class="marginL16">值标签</span>
                    <baseForm
                        v-show="extend.switchMap.isValue" 
                        :addFunctions='addFunctionCharts' 
                        :formConfigBase="formConfigBase" 
                        :formConfigData='valueForm'
                        class="marginT16" 
                        ref='valueForm'
                    />
                    <a-divider />
                    <a-switch v-model="extend.switchMap.isTooltip" @change="onSwitchChange($event, 'tooltip')"/> 
                    <span class="marginL16">提示框</span>
                    <baseForm
                        v-show="extend.switchMap.isTooltip" 
                        :addFunctions='addFunctionCharts' 
                        :formConfigBase="formConfigBase" 
                        :formConfigData='tooltipForm'
                        class="marginT16" 
                        ref='tooltipForm'
                    />
                </div>
            </div>
            <div class="fx_collapse" v-show="extend.activeKeySetting == '2'">
                <div class="fx_flex fx_justifyCenter marginT16">
                    <a-radio-group v-model="extend.mode" button-style="solid">
                        <a-radio-button value="x">
                            x轴
                        </a-radio-button>
                        <a-radio-button value="y">
                            y轴
                        </a-radio-button>
                    </a-radio-group>
                </div>

                <div v-show="extend.mode == 'x'" class="colorfff marginT16 paddingL16 paddingR16">
                    <a-switch 
                        v-model="extend.switchMap.checkedX" 
                        @change="onSwitchChangeMode($event, 'x')"
                    /> 
                    <span class="marginL16">x轴可见</span>
                    <a-divider />
                    <a-switch v-model="extend.switchMap.isXLabel" @change="onSwitchChange($event, 'xAxis', 'axisLabel')"/> 
                    <span class="marginL16">x轴标签样式</span>
                    <baseForm
                        v-show="extend.switchMap.isXLabel" 
                        :addFunctions='addFunctionCharts' 
                        :formConfigBase="formConfigBase" 
                        :formConfigData='xlabelForm'
                        class="marginT16" 
                        ref='xlabelForm'
                    />
                    <a-divider />
                    <a-switch v-model="extend.switchMap.isXAxis" @change="onSwitchChange($event, 'xAxis', 'axisLine')"/> 
                    <span class="marginL16">轴线</span>
                    <baseForm
                        v-show="extend.switchMap.isXAxis" 
                        :addFunctions='addFunctionCharts' 
                        :formConfigBase="formConfigBase" 
                        :formConfigData='xaxisForm'
                        class="marginT16" 
                        ref='xaxisForm'
                    />
                    <a-divider />
                    <a-switch v-model="extend.switchMap.isXGridlines" @change="onSwitchChange($event, 'xAxis', 'splitLine')"/> 
                    <span class="marginL16">网格线</span>
                    <baseForm
                        v-show="extend.switchMap.isXGridlines" 
                        :addFunctions='addFunctionCharts' 
                        :formConfigBase="formConfigBase" 
                        :formConfigData='xgridlinesForm'
                        class="marginT16" 
                        ref='xgridlinesForm'
                    />

                    <div class="marginB32"></div>
                </div>
                <div v-show="extend.mode == 'y'" class="colorfff marginT16 paddingL16 paddingR16">
                    <a-switch 
                        v-model="extend.switchMap.checkedY" 
                        @change="onSwitchChangeMode($event, 'y')"
                    /> 
                    <span class="marginL16">y轴可见</span>
                    <baseForm
                        v-show="extend.switchMap.checkedY" 
                        :addFunctions='addFunctionCharts' 
                        :formConfigBase="formConfigBase" 
                        :formConfigData='yForm'
                        class="marginT16" 
                        ref='yForm'
                    />
                    <a-divider />
                    <a-switch v-model="extend.switchMap.isYLabel" @change="onSwitchChange($event, 'yAxis', 'axisLabel')"/> 
                    <span class="marginL16">y轴标签样式</span>
                    <baseForm
                        v-show="extend.switchMap.isYLabel" 
                        :addFunctions='addFunctionCharts' 
                        :formConfigBase="formConfigBase" 
                        :formConfigData='ylabelForm'
                        class="marginT16" 
                        ref='ylabelForm'
                    />
                    <a-divider />
                    <a-switch v-model="extend.switchMap.isYAxis" @change="onSwitchChange($event, 'yAxis', 'axisLine')"/> 
                    <span class="marginL16">轴线</span>
                    <baseForm
                        v-show="extend.switchMap.isYAxis" 
                        :addFunctions='addFunctionCharts' 
                        :formConfigBase="formConfigBase" 
                        :formConfigData='yaxisForm'
                        class="marginT16" 
                        ref='yaxisForm'
                    />
                    <a-divider />
                    <a-switch v-model="extend.switchMap.isYGridlines" @change="onSwitchChange($event, 'yAxis', 'splitLine')"/> 
                    <span class="marginL16">网格线</span>
                    <baseForm
                        v-show="extend.switchMap.isYGridlines" 
                        :addFunctions='addFunctionCharts' 
                        :formConfigBase="formConfigBase" 
                        :formConfigData='ygridlinesForm'
                        class="marginT16" 
                        ref='ygridlinesForm'
                    />
                </div>
                <div class="marginB32"></div>
            </div>
            <div class="fx_collapse" v-show="extend.activeKeySetting == '3'">
                <div class="marginT16 marginB32 paddingL16 paddingR16">
                    <a-switch v-model="extend.switchMap.isSeries" @change="onSwitchChange($event, 'color')"/> 
                    <span class="marginL16">系列映射</span>
                    <baseForm
                        v-show="extend.switchMap.isSeries"
                        :addFunctions='addFunctionCharts' 
                        :formConfigBase="formConfigBase" 
                        :formConfigData='seriesForm'
                        class="marginT16" 
                        ref='seriesForm'
                    />
                    <div class="fx_flex fx_justifyCenter marginT16" v-show="extend.switchMap.isSeries">
                        <a-button ghost class="widthP40" @click.stop="addSeries">
                            添加系列
                            <icon-font :type="'iconfangda'" :class="['icon']" />
                        </a-button>
                    </div>
                </div>
            </div>
            <div class="fx_collapse" v-show="extend.activeKeySetting == '4'">
                <div class="marginT16 marginB32 paddingL16 paddingR16">
                    <a-switch v-model="extend.switchMap.isAnimation" @change="onSwitchChange($event, 'animation')"/> 
                    <span class="marginL16">缓动动画</span>
                    <baseForm
                        v-show="extend.switchMap.isAnimation" 
                        :addFunctions='addFunctionCharts' 
                        :formConfigBase="formConfigBase" 
                        :formConfigData='animationForm'
                        class="marginT16" 
                        ref='animationForm'
                    />
                </div>
            </div>
        </div>
        <div v-show="extend.activeKey == '2'">
            <div class="paddingL16 paddingR16">
                <source-data
                    ref="sourceDataRef" 
                    :editorCode="result" 
                    :chartOption="chartOption"
                    :interfaceData="interfaceData"
                    :extend="extend"
                    @updateChoose="updateChoose"
                    @updataInterface="updataInterface"
                    @setExtendCode="setExtendCode"
                />
            </div>
        </div>
        <div v-show="extend.activeKey == '3'">

        </div>

    </div>
</template>

<script>
import baseForm from '@c/control/src/BaseForm.vue'
import sourceData from  '@c/control/src/SourceData.vue'
import * as echartsJson from '@cf/formJson/charts'
import { dictionary } from '@cf/dictionary'
import {mixin} from '@m/echarts/mixin.js'

export default {
    data() {
        return {
            introduce: '',
            name: '',
            id: '',
            extend: {},
            type: null,
            result: '',
            chartOption: {},
            formConfigBase: {
                labelCol: { span: 6 },
                wrapperCol: { span: 18 },
                gutter: [16, 8]
            },
            tabPane: this.$flineFunction.deepClone(dictionary.tab.tabPane),
            tabSetting: [],
            baseDataForm: this.$flineFunction.deepClone(echartsJson.formBase), //基础
            spacingForm: this.$flineFunction.deepClone(echartsJson.spacingForm),
            barForm: this.$flineFunction.deepClone(echartsJson.barForm),
            legendForm: this.$flineFunction.deepClone(echartsJson.legendForm),
            valueForm: this.$flineFunction.deepClone(echartsJson.valueForm),
            tooltipForm: this.$flineFunction.deepClone(echartsJson.tooltipForm),
            xlabelForm: this.$flineFunction.deepClone(echartsJson.labelForm),
            xaxisForm: this.$flineFunction.deepClone(echartsJson.axisForm),
            xgridlinesForm: this.$flineFunction.deepClone(echartsJson.gridlinesForm),
            yForm: this.$flineFunction.deepClone(echartsJson.yForm),
            ylabelForm: this.$flineFunction.deepClone(echartsJson.labelForm),
            yaxisForm: this.$flineFunction.deepClone(echartsJson.axisForm),
            ygridlinesForm: this.$flineFunction.deepClone(echartsJson.gridlinesForm),
            animationForm: this.$flineFunction.deepClone(echartsJson.animationForm), // 动画
            seriesForm: [], //系列
            interfaceData: [
                {
                    key: '1',
                    field: 'legend',
                    mapping: '',
                    state: '匹配成功'
                },
                {
                    key: '2',
                    field: 'xAxis',
                    mapping: '',
                    state: '匹配成功'
                },
                {
                    key: '3',
                    field: 'yAxis',
                    mapping: '',
                    state: '匹配成功'
                }
            ],
            // selectType: '1'
        }
    },
    mixins: [mixin],
    props: {
        chooseItme: {
            type: Object,
            default: () => { }
        }
    },
    watch: {
        chooseItme: {
            handler(val) {
                this.getInfo(val)
            },
            immediate: true,
            deep: true,
        }
    },
    components: {
        baseForm,
        sourceData
    },
    methods: {
        getInfo(val) {
            console.log('info', val)
            this.id = val.id
            this.type = val.type
            this.tabSetting = this.$flineFunction.deepClone(dictionary.tab.tabSetting)
            if(this.type.indexOf('pie') > -1) {
                this.tabSetting = this.tabSetting.filter(t => t.key != '2')
            }
            this.name = (val.alias || val.name) + '_' + val.id
            this.introduce = (val.version || '1.0.0') + ' | ' + val.name
            this.extend = val.extend
            // this.selectType = val.extend.selectType || '1'
            // console.log('selectType', this.selectType)
            this.chartOption = val.chartOption
            this.result = ''
            if(val.chartOption && val.chartOption.seriesData) {
                this.result = JSON.stringify(val.chartOption.seriesData)
            }
            let obj = this.$flineFunction.deepClone(echartsJson.seriesForm[val.type.split('&')[0]])
            let len = 0
            if(val.extend.seriesForm) {
                for(let key in val.extend.seriesForm){
                    let num = Number(key.split('_')[1])
                    if(num > len) {
                        len = num
                    }
                }
            }
            let seriesForm = []
            for(let i = 0; i< len; i++){
                seriesForm = [...seriesForm, ...obj]
            }
            this.seriesForm = seriesForm
            this.setFormValue(val)
        },
        setFormValue(val) {
            this.$nextTick(() => {
                let refs = this.$refs
                for(let key in refs) {
                    if(refs[key] && refs[key].$refs.baseForm && val.extend[key]) {
                        refs[key].$refs.baseForm.resetFields()
                        if(val.extend[key] && Object.keys(val.extend[key]).length) {
                            refs[key].$refs.baseForm.setFieldsValue(val.extend[key])
                        }
                        if(key == 'baseDataForm') {
                            // 特殊处理
                            this.changeFormItem('baseDataForm', 'direction', 'leftRight', val.extend[key].leftRight)
                            this.changeFormItem('baseDataForm', 'direction', 'topBottom', val.extend[key].topBottom)
                            this.changeFormItem('baseDataForm', 'opacity', 'defaultValue', val.extend[key].opacity)
                        }else if(key == 'spacingForm') {
                            for(let keys in val.extend[key]) {
                                this.changeFormItem('spacingForm', 'grid', keys, val.extend[key][keys])
                            }
                        }else if(key.indexOf('labelForm') > -1) {
                            this.changeFormItem(key, 'positionIcon', 'defaultValue', val.extend[key].positionIcon || 'horizontal')
                        }else if(key == 'legendForm') {
                            this.changeFormItem(key, 'legendPosition', 'defaultValue', val.extend[key].legendPosition || 'leftTop')
                        }else if(key == 'tooltipForm') {
                            this.changeFormItem(key, 'triggerOn', 'defaultValue', val.extend[key].triggerOn || 'mousemove')
                        }else if(key == 'seriesForm') {
                            for(let keys in val.extend[key]) {
                                if(keys.indexOf('smooth') > -1) {
                                    this.changeFormItem(key, 'lineStyle', 'defaultValue', val.extend[key][keys])
                                }
                            }
                        }
                    }
                }
            })
        },
        // x y 轴是否显示
        onSwitchChangeMode(value, type) {
            let obj = { ...this.chooseItme }
            let fun = (key) => {
                let axis = obj.extraOption[key]
                axis.map(t => {
                    t.show = value
                    return t
                })
                this.chooseItme = obj
                this.updateChooseItme(obj, 'extraOption')
            }
            fun(type == 'x' ? 'xAxis' : 'yAxis')
        },
        onSwitchChange(value, type, keys) {
            // this.updateChooseItme(this.extend, 'extend')
            let obj = {
                ...this.chooseItme,
            }
            if(!type) {
                this.updateChooseItme(obj, 'extraOption')
                return
            }
            if(type == 'yAxis' || type == 'xAxis') {
                let axis = obj.extraOption[type]
                axis.map(t => {
                    t[keys].show = value
                    return t 
                })
            }else if(type == 'label') {
                if (!obj.extraOption.series) {
                    let keys = this.getlegendKeys(obj)
                    let series = keys.map(() => {
                        return {
                            label: {
                                show: value,
                                position: 'inside'
                            }
                        }
                    })
                    obj.extraOption.series = series
                }else {
                    obj.extraOption.series.map(t => {
                        if(!t.label) {
                            t.label = {
                                show: value,
                                position: 'inside'
                            }
                        }else{
                            t.label.show = value
                        }
                        return t
                    })
                }
                
            }else if(type == 'animation') {
                obj.extraOption[type] = value
            }else if(type == 'color') {
                if(value == false) {
                    obj.chartOption[type] = []
                    this.extend.seriesForm = {}
                }
            }else {
                if(!obj.extraOption[type]) {
                    obj.extraOption[type] = {}
                }
                obj.extraOption[type].show = value
            }
            this.updateChooseItme(obj, 'extraOption')
        },
        updateChoose(val, code) {
            if(!val && code == 'seriesData') {
                this.result = JSON.stringify(val)
                this.$refs.sourceDataRef && this.$refs.sourceDataRef.$forceUpdate()
            }
            this.updateExtendItem(code, val)
        },
        updataInterface(val) {
            this.interfaceData = val
            this.$nextTick(el => {
                this.$forceUpdate()
            })
        },
        // updataType(value) {
        //     this.extend.selectType = value
        //     this.updateItem(this.extend, 'extend')
        // },
        setExtendCode(code, value) {
            this.extend[code] = value
            console.log('extend', this.extend)
            this.updateItem(this.extend, 'extend')
        }
    }
}
</script>

<style lang="less" scoped>
</style>