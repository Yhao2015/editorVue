<template>
    <div class="fx_other">
        <a-tabs 
            default-active-key="1"
            :tab-position="'bottom'"
            v-model="extend.activeKey" 
            class="fx_tabs" 
            :tabBarGutter="0"
        >
            <a-tab-pane v-for="item in tabPane" :key="item.key" :tab="item.value" />
        </a-tabs>
        <div class="paddingT8 paddingB8 paddingL16 paddingR16 fx_title">
            <h3>{{name}}</h3>
            <h4>{{introduce}}</h4>
            <span class="fx_themeStyle">主题风格</span>
        </div>
        <div v-show="extend.activeKey == '1'">
            <div class="paddingL16 paddingR16">
                <baseForm 
                    :addFunctions='addFunctionOther' 
                    :formConfigBase="formConfigBase" 
                    :formConfigData='baseDataForm' 
                    ref='baseDataForm' 
                />
            </div>
            <a-divider />
            <a-tabs 
                default-active-key="1"
                :tab-position="'bottom'"
                v-model="extend.activesKey" 
                v-if="type == 'timeLineCommon'"
                :tabBarGutter="48" 
            >
                <a-tab-pane v-for="item in tabsPane" :key="item.key" :tab="item.value" />
            </a-tabs>
            <div :class="['fx_otherMain','marginB32 paddingL16 paddingR16',{'fx_otherTab':type == 'timeLineCommon'}]">
                <baseForm 
                    :addFunctions='addFunctionOther' 
                    :formConfigBase="formConfigBase" 
                    :formConfigData='configDataForm'
                    v-if="extend.activesKey == '1'" 
                    ref='configDataForm' 
                />
                <baseForm 
                    :addFunctions='addFunctionOther' 
                    :formConfigBase="formConfigBase" 
                    :formConfigData='animationForm'
                    v-if="extend.activesKey == '2'" 
                    ref='animationForm' 
                />
            </div>
        </div>
        <div v-show="extend.activeKey == '2'">
            <div class="paddingL16 paddingR16">
                <source-data
                    ref="sourceDataRef" 
                    :editorCode="result" 
                    :chartOption="chartOption"
                    :interfaceData="interfaceData"
                    @updateChoose="updateChoose"
                    @updataInterface="updataInterface"
                    @updataType="updataType"
                />
            </div>
        </div>
        <div v-show="extend.activeKey == '3'">

        </div>
    </div>
</template>

<script>
import baseForm from '@c/control/src/BaseForm.vue'
import * as JsonMap from '@cf/formJson/other/otherCharts.js'
import {mixin} from '@m/other/mixin.js'
import { dictionary } from '@cf/dictionary'
import sourceData from  '@c/control/src/SourceData.vue'

export default {
    mixins: [mixin],
    data() {
        return {
            name: '',
            introduce: '',
            id: '',
            extend: {},
            type: null,
            formConfigBase: {
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                gutter: [16, 8]
            },
            baseDataForm: this.$flineFunction.deepClone(JsonMap.formConfigData),
            configDataForm: [],
            animationForm: [],
            tabPane: this.$flineFunction.deepClone(dictionary.tab.tabPane),
            tabsPane: this.$flineFunction.deepClone(dictionary.tab.tabsPane),
            interfaceData: [
                {
                    key: '2',
                    field: 'name',
                    mapping: '',
                    state: '匹配成功'
                },
                {
                    key: '3',
                    field: 'value',
                    mapping: '',
                    state: '匹配成功'
                }
            ],
            result: '',
            chartOption: {}
        }
    },
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
    mounted() {
    },
    methods: {
        getInfo(val) {
            // 选中的组件不一样
            if(this.id != val.id) {
                this.$nextTick(() => {
                    if(this.$refs.configDataForm) {
                        this.$refs.configDataForm.$refs.baseForm.resetFields()
                        this.$refs.configDataForm.fileList = []
                        this.$refs.configDataForm.ImgKey = Math.random()
                    }
                })
            }
            this.id = val.id
            this.type = val.type
            this.name = (val.alias || val.name) + '_' + val.id
            this.introduce = (val.version || '1.0.0') + ' | ' + val.name
            this.extend = val.extend
            this.chartOption = val.chartOption || {}
            this.result = ''
            if(val.chartOption && val.chartOption.seriesData) {
                this.result = JSON.stringify(val.chartOption.seriesData)
            }
            this.configDataForm = JsonMap[val.type] ? this.$flineFunction.deepClone(JsonMap[val.type]) : []
            this.animationForm = JsonMap[val.type + 'animation'] ? this.$flineFunction.deepClone(JsonMap[val.type + 'animation']) : []
            
            this.$nextTick(() => {
                let refs = this.$refs
                for(let key in refs) {
                    if(refs[key] && refs[key].$refs.baseForm) {
                        refs[key].$refs.baseForm.resetFields()
                        if(val.extend[key] && Object.keys(val.extend[key]).length) {
                            refs[key].$refs.baseForm.setFieldsValue(val.extend[key])
                        }
                        if(key == 'baseDataForm') {
                            // 特殊处理
                            this.changeFormItem('baseDataForm', 'opacity', 'defaultValue', val.extend[key].opacity)
                        }
                    }
                }
            })

        },
        updateChoose(val, code) {
            if(!val && code == 'seriesData') {
                this.result = JSON.stringify(val)
                this.$refs.sourceDataRef && this.$refs.sourceDataRef.$forceUpdate()
                this.updateExtendItem(code, val)
            } else {
                let obj = {
                    ...this.chooseItme,
                }
                let seriesData = obj.chartOption.seriesData
                if(seriesData.length) {
                    seriesData = seriesData.map(el => {
                        el[code] = el[val]
                        return el
                    })
                }
                if(!val) {
                    delete obj.chartOption[code]
                } else {
                    obj.chartOption = {
                        ...obj.chartOption,
                        [code]: val
                    }
                }
                this.updateChooseItme(obj, 'chartOption')
            }
        },
        updataInterface(val) {
            this.interfaceData = val
            this.$nextTick(el => {
                this.$forceUpdate()
            })
        },
        updataType() {}
    }
}
</script>

<style>
</style>