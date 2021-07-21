<!--
 * @Author: yhao
 * @Date: 2021-04-30 09:45:13
 * @LastEditTime: 2021-07-21 17:56:03
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \flinev-editor-vue\src\components\control\src\SourceData.vue
 * fline
-->
<template>
    <div class="fx_sourceData">
        <a-row class="colorfff" :gutter="[16,0]" type="flex" align='middle'>
            <a-col :span="12">数据接口</a-col>
            <a-col :span="12" class="fx_match">
                <span class="fx_block"></span>
                <span>匹配成功</span>
            </a-col>
        </a-row>
        <a-divider />
        <a-table :columns="columns" :data-source="interfaceData" :pagination="false">
            <div slot='state' slot-scope="text" class="fx_match">
                <span class="fx_block"></span> {{text}}
            </div>
            <div slot='mapping' slot-scope="text, result" class="fx_match">
                <div class="paddingR16">
                    <a-input @blur="onInputBlur($event, result)" :value="chartOption[result.field] || ''" />
                </div>
            </div>
        </a-table>
        <a-divider />
        <a-row class="colorfff" :gutter="[16,0]" type="flex" align='middle'>
            <a-col :span="12" class="paddingT8 paddingB8">数据响应结果</a-col>
        </a-row>
        <a-divider />
        <a-row class="colorfff" :gutter="[16,0]" type="flex" align='middle'>
            <!-- <a-col :span="24" class="height30">
                <span class="marginR16">受控模式</span>
                <a-switch />
            </a-col> -->
            <a-col :span="24" class="height30 marginT8">
                <span class="marginR16">自动更新请求</span>
                <a-switch v-model="autoUpdata" @change="onChangeSwitch"/>
                <a-input-number 
                    :min="1" 
                    :default-value="5" 
                    :formatter="value => `${value} 秒/次`" 
                    :parser="value => value.replace(' 秒/次', '')" 
                    class="marginL16" 
                />
            </a-col>
            <a-col :span="24">
                <a-timeline class="colorfff marginT16 height100">
                    <a-timeline-item class="borderBG2483FF">
                        <span class="fx_flex fx_justifyBetween">
                            <span class="fx_text">{{typeText}}</span>
                            <a-button type="primary" ghost @click="addData">配置数据源</a-button>
                        </span>
                    </a-timeline-item>
                    <a-timeline-item class="borderBG3D4552">
                        <span class="fx_flex fx_justifyBetween">
                            <a-checkbox :checked="checkboxChecked" @change="onChangeCheckbox">
                                <span class="colorfff fontSize12">数据过滤器</span>
                            </a-checkbox>
                            <a-button type="primary" ghost @click="addFilter">添加过滤器</a-button>
                        </span>
                    </a-timeline-item>
                    <a-timeline-item class="borderBG2483FF">
                        响应结果
                    </a-timeline-item>
                </a-timeline>
                <prism-editor
                    class="fx_editor marginT16" 
                    v-model="codeSnippet"
                    :highlight="highlighter"
                    :line-numbers="true"
                    :readonly="false"
                    @blur="onChangeEditor"
                />
            </a-col>
        </a-row>

        <!-- 弹框 -->
        <a-drawer 
            :title="title" 
            placement="right" 
            class="fx_drawer" 
            :visible="visible == 'data' || visible == 'filter'" 
            :width="350" 
            :maskClosable='true' 
            @close="onClose"
        >
            <div class="marginL16 marginR16" v-if="visible == 'data'">
                <baseForm 
                    :addFunctions='addFunctionCharts' 
                    :formConfigBase="formConfigBase" 
                    :formConfigData='baseDataForm' 
                    ref='baseDataForm' 
                />
                <a-divider />
                <baseForm 
                    :addFunctions='addFunctionCharts' 
                    :formConfigBase="formConfigBase" 
                    :formConfigData='formDataForm' 
                    ref='formDataForm' 
                />
            </div>
            <div class="marginL16 marginR16" v-if="visible == 'filter'">
                <baseForm 
                    :addFunctions='addFunctionCharts' 
                    :formConfigBase="formConfigBase" 
                    :formConfigData='filterDataForm' 
                    ref='filterDataForm' 
                />
            </div>
        </a-drawer>
    </div>
</template>

<script>
import { highlight, languages } from "prismjs/components/prism-core";
import baseForm from '@c/control/src/BaseForm.vue'
import * as baseJson from "@cf/formJson/other/sourceData.js"
export default {
    name: 'fx_sourceData',
    data() {
        return {
            singleFileUrl: this.$api.uploadFile, //图片上传
            dictionaryUrl: this.$api.dictionary,
            dictionaryUserUrl: this.$api.dictionaryUser,
            codeSnippetUrl: this.$api.codeSnippet,
            codeSnippetUserUrl: this.$api.codeSnippetUser,
            dictionaryCodeUrl: this.$api.dictionaryCode,
            dictionaryCodeUserUrl: this.$api.dictionaryCodeUser,
            findInterfaceUrl: this.$api.findInterface,
            showInterfaceUrl: this.$api.showInterface,
            showDatabaseUrl: this.$api.showDatabase,
            findDatabaseUrl: this.$api.findDatabase,
            fileName: null,
            visible: '',
            title: '',
            addFunctionCharts: {
                onFileUpload: this.onFileUpload,
                onSelectChange: this.onSelectChange,
                onDictionaryChange: this.onDictionaryChange,
                onFilterChange: this.onFilterChange,
                onFilterRules: this.onFilterRules,
                onInterface: this.onInterface,
                onInterfaceTypeChange: this.onInterfaceTypeChange,
                onTableData: this.onTableData,
                onDatabaseTypeChange: this.onDatabaseTypeChange
            },
            columns: this.$flineFunction.deepClone(baseJson.columns),
            formConfigBase: this.$flineFunction.deepClone(baseJson.formConfigBase),
            baseDataForm: this.$flineFunction.deepClone(baseJson.baseDataForm),
            filterDataForm: this.$flineFunction.deepClone(baseJson.filterDataForm),
            dictionaries: this.$flineFunction.deepClone(baseJson.dictionaries),
            staticData: this.$flineFunction.deepClone(baseJson.staticData),
            bigDataTable: this.$flineFunction.deepClone(baseJson.bigDataTable),
            bigDataApi: this.$flineFunction.deepClone(baseJson.bigDataApi),
            formDataForm: [],
            codeSnippet: '', // 代码片段
            typeText: '',
            selectType: '1', //类型选择
            checkboxChecked: false,
            autoUpdata: false, // 自动更新
            params: {
                'api': {},
                'table': {}
            }
        }
    },
    props: {
        editorCode: {
            type: String,
            default: ''
        },
        chartOption: {
            type: Object,
            default: () => { }
        },
        interfaceData: {
            type: Array,
            default: () => { }
        },
        extend: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        baseForm
    },
    watch: {
        editorCode: {
            handler(newObj, oldObj) {
                this.codeSnippet = this.$flineFunction.toJsonp(newObj) 
            },
            immediate: true,
            deep: true
        },
        'extend.selectType': {
            handler(newObj, oldObj) {
                this.selectType = this.extend.selectType || '1'
                this.typeText = baseJson.sourceDataTypeAll.filter(el => el.value == this.selectType)[0].name
            },
            immediate: true,
            deep: true
        },
        'extend.autoUpdata': {
            handler(newObj, oldObj) {
                this.autoUpdata = this.extend.autoUpdata || false
            },
            immediate: true,
            deep: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.baseDataForm = this.baseDataForm.map(el => {
                if(el.code == 'sourceDataType') {
                    el.dataFormat = window.staticContentConfig.systemName == 'space-station' ? 
                        this.$flineFunction.deepClone(baseJson.sourceDataTypeAll) : this.$flineFunction.deepClone(baseJson.sourceDataType)
                }
                return el
            })
            this.getDictionary() // 字典
            this.getCodeSnippe() // 过滤器
            if(window.staticContentConfig.systemName == 'space-station') {
                this.getInterface(1)
                this.getInterface(3)
            } 
        })
    },
    methods: {
        /**
         * @description: 获取字典名称
         * @param {*}
         * @return {*}
         */
        getDictionary() {
            let pathUrl = window.staticContentConfig.systemName == 'space-station' ? `${this.dictionaryUserUrl}?userId=${window.staticContentConfig.userId}` : this.dictionaryUrl
            this.$get(pathUrl).then(res => {
                if (res.code == 200) {
                    let temp = res.data || []
                    let dictionaries = this.dictionaries.map(el => {
                        if(el.code == 'dictionarie') {
                            el.dataFormat = temp
                        }
                        return el
                    });
                    this.dictionaries = dictionaries
                    
                }
            })
        },
        /**
         * @description: 获取过滤器代码
         * @param {*}
         * @return {*}
         */
        getCodeSnippe() {
            let pathUrl = window.staticContentConfig.systemName == 'space-station' ? `${this.codeSnippetUserUrl}?userId=${window.staticContentConfig.userId}` : this.codeSnippetUrl
            this.$get(pathUrl).then(res => {
                if (res.code == 200) {
                    let temp = res.data
                    this.filterDataForm  = this.filterDataForm.map(el => {
                        if(el.code == 'selectFilter') {
                            el.dataFormat = temp
                        }
                        return el
                    })
                }
            })
        },
        /**
         * @description: 查询大数据平台接口
         * @param {Number} type 1 库表 3 接口
         * @return {*}
         */
        getInterface(type) {
            let params = {
                resourceType: type,
                userId: Number(window.staticContentConfig.userId),
                authenticationMethodId: 1, //鉴权类型 （当前传1）
            }
            this.$axios.get(`${this.findInterfaceUrl}`, {params}).then(res => {
                if(res.data.code == 200) {
                    let datas = res.data.data || []
                    if(type == 1) {
                        this.bigDataTable = this.bigDataTable.map(el => {
                            if(el.code == 'database') {
                                el.dataFormat = datas
                            }
                            return el
                        })
                    } else if(type == 3) {
                        this.bigDataApi = this.bigDataApi.map(el => {
                            if(el.code == 'interface') {
                                el.dataFormat = datas
                            }
                            return el
                        })
                    }
                }
            })
        },
        /**
         * @description: 高亮 prismjs插件
         * @param {*} code
         * @return {*}
         */
        highlighter(code) {
            return highlight(code, languages.js); 
        },
        /**
         * @description: 数据过滤器勾选
         * @param {*}
         * @return {*}
         */
        onChangeCheckbox(e) {
            this.checkboxChecked = e.target.checked
        },
        /**
         * @description: 字段匹配
         * @param {*} e 输入框映射值
         * @param {Object} result 字段名称
         * @return {*}
         */
        onInputBlur(e, result) {
            let value = e.target.value
            this.$emit('updateChoose', value, result.field)
            this.getTableState(value, result.field) 
        },
        /**
         * @description: 
         * @param {*}
         * @return {*}
         */
        getTableState(value, field) {
            value = !value ? field : value
            let codeSnippet = this.$flineFunction.JSONParse(this.codeSnippet)
            let state = '匹配失败'
            if(codeSnippet && codeSnippet.length) {
                let map = codeSnippet[0]
                if(map.hasOwnProperty(value)) {
                    state = '匹配成功'
                }
            }
            let interfaceData = this.interfaceData.map(el => {
                if(el.field == field) {
                    el.state = state
                }
                return el
            })
            this.$emit('updataInterface', interfaceData)
        },
        /**
         * @description: 配置数据源
         * @param {*}
         * @return {*}
         */
        addData() {
            this.visible = 'data'
            this.title = '配置数据源'
            this.$nextTick(() => {
                this.$refs.baseDataForm.$refs.baseForm.setFieldsValue({
                    sourceDataType: this.selectType
                })
                this.onSelectChange(this.selectType)
            })
        },
        /**
         * @description: 配置过滤器 add
         * @param {*}
         * @return {*}
         */
        addFilter() {
            this.title = '配置过滤器'
            this.filterDataForm  = this.filterDataForm.map(el => {
                if(el.code == 'correspondResult') {
                    el.defaultValue = this.codeSnippet
                }
                return el
            })
            this.visible = 'filter'
        },
        /**
         * @description: 关闭抽屉
         * @param {*}
         * @return {*}
         */
        onClose() {
            // 数据源
            if(this.visible == 'data') {
                let codeSnippet = ''
                this.formDataForm.map(el => {
                    if(el.slot && el.slot == 'results') {
                        codeSnippet = this.$refs.formDataForm.codeSnippet[el.code]
                    }
                })
                this.typeText = baseJson.sourceDataTypeAll.filter(el => el.value == this.selectType)[0].name
                let params = this.getParams(this.selectType)
                let pathUrl = this.getPathUrl(this.selectType)
                console.log('pathUrl', pathUrl, this.selectType)
                this.$nextTick(() => {
                    this.$emit('setExtendCode', 'params', params)
                    this.$emit('setExtendCode', 'pathUrl', pathUrl)
                    this.codeSnippet = codeSnippet
                    let codeList = this.$flineFunction.JSONParse(codeSnippet) ? this.$flineFunction.JSONParse(codeSnippet) : []
                    if(codeList.length) {
                        this.$emit('updateChoose', codeList, 'seriesData')
                    }
                })
            } else {
                // 过滤器
                if(this.checkboxChecked) {
                    let codeSnippet = this.$refs.filterDataForm.codeSnippet['correspondResult']
                    this.codeSnippet = codeSnippet
                    let codeList = this.$flineFunction.JSONParse(codeSnippet) ? this.$flineFunction.JSONParse(codeSnippet) : []
                    if(codeList.length) {
                        this.$emit('updateChoose', codeList, 'seriesData')
                    }
                }
            }
            
            this.visible = ''
        },
        /**
         * @description: 获取请求数据 大数据api 库表接口是需要，其他返回{}
         * @param {String}} selectType
         * @return {*}
         */
        getParams(selectType) {
            if(selectType == "2") {
                return this.params.api 
            } else if(selectType == "3") {
                return this.params.table 
            } else {
                return {}
            }
        },
        getPathUrl(selectType) {
            if(selectType == "2") {
                return this.showInterfaceUrl
            } else if(selectType == "3") {
                return this.showDatabaseUrl
            } else {
                return ''
            }
        },
        /**
         * @description: 响应结果手动修改
         * @param {*} event
         * @return {*}
         */
        onChangeEditor(event) {
            let value = this.$flineFunction.JSONParse(event.target.value) 
            this.$emit('updateChoose', value, 'seriesData')
        },
        /**
         * @description: 过滤器
         * @param {*} event
         * @return {*}
         */
        onFilterChange(val) {
            let dataFormat = this.filterDataForm.filter(el => el.code == 'selectFilter')[0].dataFormat
            let funcStr = dataFormat.filter(el => el.id == val)[0].content
            
            this.filterDataForm.map(el => {
                if(el.code == 'filterRules') {
                    // el.defaultValue = funcStr
                    this.$refs.filterDataForm.codeSnippet[el.code] = funcStr
                    this.$refs.filterDataForm.$refs.baseForm.setFieldsValue({
                        [el.code]: funcStr
                    })
                    this.onFilterRules(funcStr)
                }
                return el
            })
        },
        onFilterRules(funcStr) {
            let fun = null
            // 转换异常
            try{
                fun = eval("(false || " + funcStr + ")")
            }
            catch(err) {
                return
            }
            if(typeof fun != 'function') {
                return
            }
            let codeSnippet = this.$flineFunction.JSONParse(this.codeSnippet)
            codeSnippet = fun(codeSnippet)
            codeSnippet = this.$flineFunction.toJsonp(codeSnippet)
            this.$refs.filterDataForm.codeSnippet['correspondResult'] = codeSnippet
            this.$refs.filterDataForm.$refs.baseForm.setFieldsValue({
                ['correspondResult']: codeSnippet
            })
        },
        onInterfaceTypeChange(value, node) {
            this.params.api = {
                ...this.params.api,
                resourceCode: value,
                appKey: node.data.attrs.data.appKey,
                edition: node.data.attrs.data.edition
            }
            let {header, parameter} = this.$refs.formDataForm.$refs.baseForm.getFieldsValue()
            let params = {
                ...this.params.api,
                userId: Number(window.staticContentConfig.userId),
                authenticationMethodId: 1, //鉴权类型 （当前传1） 
                header: header,
                parameter: parameter,
                pageNum: 1,
                pageSize: 99
            }
            this.params.api = params
            this.setCodeSnippe([])
            this.$axios.get(`${this.showInterfaceUrl}`, {params}).then(res => {
                if(res.data.code == 200) {
                    let datas = this.$flineFunction.JSONParse(res.data.data).data || []
                    this.setCodeSnippe(datas)
                }
            })
        },
        /**
         * @description: API调用接口
         * @param {*}
         * @return {*}
         */
        onInterface() {
            if(!this.params.table.resourceCode) {
                return
            }
            let {header, parameter} = this.$refs.formDataForm.$refs.baseForm.getFieldsValue()
            let params = {
                userId: Number(window.staticContentConfig.userId),
                authenticationMethodId: 1, //鉴权类型 （当前传1） 
                resourceCode: node.data.attrs.data.resourceCode,
                appKey: node.data.attrs.data.appKey,
                edition: node.data.attrs.data.edition,
                header: header,
                parameter: parameter,
                pageNum: 1,
                pageSize: 99
            }
            this.params.api = params //缓存
            this.setCodeSnippe([])
            this.$axios.get(`${this.showInterfaceUrl}`, {params}).then(res => {
                if(res.data.code == 200) {
                    let datas = this.$flineFunction.JSONParse(res.data.data).data || []
                    this.setCodeSnippe(datas)
                }
            })
        },
        onDatabaseTypeChange(value, node) {
            this.params.table = {
                ...this.params.table,
                resourceCode: value,
                appKey: node.data.attrs.data.appKey,
                edition: node.data.attrs.data.edition
            }
            this.$get(this.findDatabaseUrl, {resourceCode: value, edition: node.data.attrs.data.edition}).then(res => {
                if(res.code == 200) {
                    this.$refs.formDataForm.$refs.baseForm.setFieldsValue({
                        dataBaseName: res.data.dataBaseName,
                        tableName: res.data.tableName
                    })
                }
            })
        },
        /**
         * @description: 库表调用接口
         * @param {*}
         * @return {*}
         */
        onTableData() {
            if(!this.params.table.resourceCode) {
                return
            }
            let { sql } = this.$refs.formDataForm.$refs.baseForm.getFieldsValue()
            let params = {
                userId: Number(window.staticContentConfig.userId),
                authenticationMethodId: 1, //鉴权类型 （当前传1） 
                resourceCode: this.params.table.resourceCode,
                appKey: this.params.table.appKey,
                edition: this.params.table.edition,
                sql: sql,
                pageNum: 1,
                pageSize: 99
            }
            this.params.table = params
            this.setCodeSnippe([])
            this.$axios.get(`${this.showDatabaseUrl}`, {params}).then(res => {
                if(res.data.code == 200) {
                    let datas = this.$flineFunction.JSONParse(res.data.data) || []
                    this.setCodeSnippe(datas)
                }
            })
        },
        /**
         * @description: 获取字典值
         * @param {Number} code
         * @return {*}
         */
        onDictionaryChange(code) {
            let pathUrl = window.staticContentConfig.systemName == 'space-station' ? `${this.dictionaryCodeUserUrl}?dictionaryId=${code}` : `${this.dictionaryCodeUrl}?dictionaryId=${code}` 
            this.$get(pathUrl).then(res => {
                if(res.code == 200) {
                    let datas = res.data || []
                    this.setCodeSnippe(datas)
                }
            })
        },
        /**
         * @description: 类型选择 1：静态数据 2：大数据平台API服务 3：大数据平台库表 4：字典
         * @param {*} event
         * @return {*}
         */
        onSelectChange(event) {
            this.selectType = event
            let obj = {
                '1': () => {
                    // 静态数据
                    this.formDataForm = this.staticData
                    this.formDataForm = this.formDataForm.map(el => {
                        if(el.code == 'dataresults') {
                            this.$refs.formDataForm.codeSnippet[el.code] = this.codeSnippet
                            this.$refs.formDataForm.$refs.baseForm.setFieldsValue({
                                [el.code]: this.codeSnippet
                            })
                        }
                        return el
                    })
                },
                '2': () => {
                    // 大数据平台API服务
                    this.formDataForm = this.bigDataApi
                    this.$nextTick(() => {
                        this.$refs.formDataForm.$refs.baseForm.resetFields()
                    })
                },
                '3': () => {
                    // 大数据平台库表
                    this.formDataForm = this.bigDataTable
                    this.$nextTick(() => {
                        this.$refs.formDataForm.$refs.baseForm.resetFields()
                    })
                },
                '4': () => {
                    // 字典数据
                    this.formDataForm = this.dictionaries
                    this.$nextTick(() => {
                        this.$refs.formDataForm.$refs.baseForm.resetFields()
                    })
                }
            }
            obj[event] && obj[event]()
            this.$emit('setExtendCode', 'selectType', event)
        },
        /**
         * @description: 附件上传
         * @param {*} data
         * @return {*}
         */
        onFileUpload(data) {
            let params = new FormData()
            params.append('file', data.file)
            // params.append('fileName', `flinev/space-station/workspace/${window.staticContentConfig.id}/` + data.file.name.split('.')[0])
            this.$post(this.singleFileUrl, params, 'multipart/form-data').then(res => {
                this.$refs.formDataForm.fileList = []
                this.$refs.formDataForm.ImgKey = Math.random()
                if (res.code == 200) {
                    let datas = res.data 
                    this.setCodeSnippe(datas)
                }
            })
        },
        /**
         * @description: 更新代码集
         * @param {Array | string} datas
         * @return {*}
         */        
        setCodeSnippe(datas) {
            this.formDataForm  = this.formDataForm.map(el => {
                if(el.slot && el.slot == 'results') {
                    let funStr = datas instanceof Array ? this.$flineFunction.toJsonp(datas) : datas
                    this.$refs.formDataForm.codeSnippet[el.code] = funStr
                    this.$refs.formDataForm.$refs.baseForm.setFieldsValue({
                        [el.code]: funStr
                    })
                }
                return el
            })
        },
        /**
         * @description: 自动更新请求
         * @param {*}
         * @return {*}
         */
        onChangeSwitch(event) {
            this.$emit('setExtendCode', 'autoUpdata', this.autoUpdata)
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../../assets/less/colorSet.less';

.fx_sourceData {
    .fx_block {
        width: 6px;
        height: 6px;
        background: @primary-color-2;
        margin-right: 8px;
        display: inline-block;
    }

    .borderBG2483FF /deep/ .ant-timeline-item-head {
        background-color: @primary-color-2;
        color: @primary-color-2;
        border-color: @primary-color-2;
    }

    .borderBG3D4552 /deep/ .ant-timeline-item-head {
        background-color: @background-8;
        color: @background-8;
        border-color: @background-8;
    }

}

.fx_colorFFF {
    color: @text-3 !important;
    border-color: @text-3 !important;

    /deep/.ant-btn .anticon {
        color: @text-3 !important;
    }
}

/deep/.ant-drawer-body {
    padding: 8px 0;

    .ant-btn {
        height: 25px;
        padding: 0 12px;
        font-size: 12px;
        border-radius: 0;
    }

    .ant-btn-primary {
        background-color: @primary-color;
    }
}

.fx_AddFilter {
    background-color: @background-9 !important;
    border: 0;
    color: @text-3 !important;
    height: 30px !important;
}

.fx_text {
    background: @background-7;
    padding: 0 6px;
    height: 20px;
    line-height: 20px;
}
</style>