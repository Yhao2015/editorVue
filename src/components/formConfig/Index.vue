<template>
    <div class='fx_searchForm'>
        <a-form :form='form' 
            :label-col="formConfigBaseUsed.labelCol" 
            :wrapper-col="formConfigBaseUsed.wrapperCol" 
            :layout="formConfigBaseUsed.layout"
        >
            <a-row type="flex" justify="start" align="top" :gutter='formConfigBaseUsed.gutter || [16,16]'>
                <a-col 
                    v-for='(item,index) in formConfigData' 
                    :key='index' v-bind='item.grid || formConfigBaseUsed.grid' 
                    v-show='item.type.indexOf("hidden")==-1'
                    :class="item.classStyle"
                >
                    <a-form-item 
                        :label="item.label +' '+ (parseInt(index / item.len) + 1)"
                        v-if='item.extraItem' 
                        :colon="!item.colon ? false : true" 
                        :label-col="item.labelCol ? item.labelCol : formConfigBaseUsed.labelCol" 
                        :wrapper-col="item.wrapperCol ? item.wrapperCol : formConfigBaseUsed.wrapperCol" 
                        :labelAlign="formConfigBaseUsed.labelAlign||'right'"
                    >
                        <div class="text-right" v-if="item.type == 'icon'">
                            <a-space>
                                <icon-font :type="'iconfuzhi'" :class="['icon', 'fontSize12']" @click="item.changeFunName ? emitFunction(item.changeFunName,index, item.code) : null"/>
                                <icon-font :type="'iconshanchu'" :class="['icon', 'fontSize12']" @click="item.funName ? emitFunction(item.funName, index, item.code) : null"/>
                            </a-space>
                        </div>
                    </a-form-item>
                    <a-form-item 
                        :label="item.label" 
                        v-if='item.show'
                        :colon="!item.colon ? false : true" 
                        :label-col="item.labelCol ? item.labelCol : formConfigBaseUsed.labelCol" 
                        :wrapper-col="item.wrapperCol ? item.wrapperCol : formConfigBaseUsed.wrapperCol" 
                        :labelAlign="formConfigBaseUsed.labelAlign||'right'"
                    >
                        <!--单选择-->
                        <a-select 
                            v-if='item.type=="select"' 
                            v-decorator="[item.code,{ initialValue:item.defaultValue || ''}]" 
                            class="widthP100" 
                            show-search 
                            v-bind='item.extra' 
                            :filter-option="filterOption" 
                            :placeholder='item.placeholder || "请选择"' 
                            :disabled='item.disabled' 
                            @change='item.changeFunName ? selectFormChange(...arguments,item.changeFunName, item.code) : null'
                        >
                            <a-select-option v-if='item.defaultValue===undefined' key="-1" value="">请选择</a-select-option>
                            <a-select-option 
                                v-for='element in item.dataFormat' 
                                :data='element' 
                                :key='element[item.fieldnames?item.fieldnames.key:"value"]' 
                                :value="element[item.fieldnames?item.fieldnames.key:'value']"
                            >
                                {{element[item.fieldnames?item.fieldnames.text:"name"]}}
                            </a-select-option>
                        </a-select>
                        <!--数字输入框-->
                        <a-input-number 
                            v-else-if='item.type=="number"||item.type=="hiddenNumber"' 
                            v-decorator="[item.code,{ initialValue:item.defaultValue || ''}]" 
                            :min='item.min||null' 
                            v-bind='item.extra' 
                            :placeholder='item.placeholder || "请输入"' 
                            :disabled='item.disabled' 
                            class='widthP100' 
                            allowClear 
                            @change='item.changeFunName ? formChange(...arguments,item.changeFunName, item.code):null' 
                        />
                        <!--单行输入框-->
                        <a-input 
                            v-else-if='item.type=="input"||item.type=="hidden"' 
                            v-decorator="[item.code,{ initialValue:item.defaultValue || ''}]" 
                            v-bind='item.extra' 
                            :type='item.inputType?item.inputType:"text"' 
                            allowClear 
                            :disabled='item.disabled' 
                            :placeholder='item.placeholder || "请输入"' 
                            @change='item.changeFunName ? formChange(...arguments,item.changeFunName, item.code):null' 
                        />
                        <!--多行输入框-->
                        <a-textarea 
                            v-else-if='item.type=="textarea"' 
                            class='widthP90' 
                            allowClear 
                            v-bind='item.extra' 
                            v-decorator="[item.code,{ initialValue:item.defaultValue || ''}]" 
                            :placeholder='item.placeholder||"请输入"'
                            :disabled='item.disabled'
                            @blur="item.changeFunName ? formChange(...arguments,item.changeFunName, item.code):null"
                        />
                        <!--单选组-->
                        <a-radio-group 
                            v-else-if='item.type=="radio"' 
                            v-bind='item.extra' 
                            v-decorator="[item.code,{ initialValue:item.defaultValue || ''}]" 
                            :disabled='item.disabled' 
                            class='widthP100' 
                            @change='item.changeFunName ? formChange(...arguments,item.changeFunName, item.code) : null'
                        >
                            <a-radio 
                                v-for='element in item.dataFormat' 
                                :key='element.code' 
                                :value='element.code'
                            >{{element.name}}</a-radio>
                        </a-radio-group>
                        <!--多选-->
                        <a-checkbox-group 
                            v-else-if="item.type=='checkbox'" 
                            v-bind='item.extra' 
                            v-decorator="[item.code,{ initialValue:item.defaultValue || [] }]" 
                            :disabled='item.disabled' 
                            class='widthP100' 
                            @change='item.changeFunName ? formChange(...arguments,item.changeFunName, item.code) : null'
                        >
                            <a-checkbox 
                                v-for='element in item.dataFormat' 
                                :disabled='element.disabled' 
                                :key='element.code' 
                                :value='element.code'
                            >{{element.text}}</a-checkbox>
                        </a-checkbox-group>
                        <!--级联选择-->
                        <a-cascader 
                            v-else-if='item.type=="cascader"' 
                            v-decorator="[item.code,{ initialValue:item.defaultValue || [] }]" 
                            change-on-select allowClear :load-data="loadData" 
                            v-bind='item.extra' 
                            :disabled='item.disabled' 
                            :options="item.dataFormat" 
                            :field-names="item.fieldnames || {label:'label',value:'value',children:'children'}" 
                            :placeholder='item.placeholder || "请选择"' 
                            @change='item.changeFunName ? selectFormChange(...arguments,item.changeFunName, item.code) : null' 
                        />
                        <a-date-picker 
                            v-else-if='item.type=="date"' 
                            v-decorator="[item.code,{ initialValue:item.defaultValue || null }]" 
                            v-bind='item.extra' 
                            :placeholder='item.placeholder || "请选择"' 
                            :disabled='item.disabled' 
                            class='widthP100' 
                            allowClear 
                            @change='item.changeFunName?selectFormChange(...arguments,item.changeFunName, item.code):null' 
                        />
                        <a-range-picker 
                            v-else-if='item.type=="dateRange"' 
                            v-decorator="[item.code,{ initialValue:item.defaultValue || [] }]" 
                            v-bind='item.extra' 
                            :placeholder='item.placeholder || ["开始时间", "结束时间"]' 
                            :disabled='item.disabled' 
                            class='widthP100' 
                            allowClear 
                            @change='item.changeFunName ? selectFormChange(...arguments,item.changeFunName, item.code) : null' 
                        />
                        <!--特殊的组件-->
                        <!--手动上传附件-->
                        <template v-else-if='item.type=="file"'>
                            <span v-for="(element,num) in item.imgList" :key='num'>
                                <img width='102' height="102" :src='element' />
                            </span>
                            <a-upload 
                                :multiple='item.multiple' 
                                :listType="item.listType || 'picture-card'" 
                                :fileList="fileList" 
                                :remove="handleRemove" 
                                :beforeUpload="beforeUpload" 
                                v-bind='item.extra' 
                                v-decorator="[item.code]">
                                <a-icon type="plus" />
                                <div class="ant-upload-text">上传</div>
                            </a-upload>
                        </template> 
                        <!--自动上传附件-->
                        <a-upload 
                            v-else-if='item.type=="fileUpload"' 
                            :name="item.code" 
                            v-bind='item.extra' 
                            :action="item.action" 
                            :headers="headers" 
                            :remove='removeFiles' 
                            v-decorator="[item.code]"
                            @change='item.changeFunName ? formChange(...arguments,item.changeFunName, item.code) : null' 
                        >
                            <a-button> <a-icon type="upload" /> 上传附件 </a-button>
                        </a-upload>
                        <template v-else-if='item.type=="validator"'>
                            <a-input 
                                v-decorator="[item.code,{ initialValue:item.defaultValue || '' }]" 
                                :disabled='item.disabled' 
                                :placeholder='item.placeholder||"请输入"'
                            >
                                <img title="点击更换验证码" alt="验证码" :src="codeImg" @click="emitFunction(item.funName)" slot="suffix" class="fx_suffix" />
                            </a-input>
                        </template> 
                        <template v-else-if='item.type=="phoneMsgValidator"'>
                            <a-input 
                                v-decorator="[item.code,{ initialValue:item.defaultValue || '' }]" 
                                :disabled='item.disabled' 
                                :placeholder='item.placeholder || "请输入"' 
                                style="width:80%" 
                            />
                            <a-button 
                                :disabled="mobileFlag" 
                                @click="emitFunction(item.funName,getFieldValue('phone'), item.code)" 
                                type='primary'
                            >
                                {{mobileFlag ? msgTime+"s再发送":'发送验证码'}}
                            </a-button>
                        </template>
                        <slot v-else :name="item.slot" :data='{...item,KIndex:(parseInt(index / item.len) + 1)}'></slot>
                    </a-form-item>
                </a-col>
                <slot name='formExpand' :data='formConfigBaseUsed.grid'></slot>
            </a-row>
        </a-form>
    </div>
</template>

<script>
import {fileMethods} from '@m/form/minxin.js'
export default {
    name:'fx-base-editor-form',
    mixins:[fileMethods],
    data() {
        return {
            form: this.$form.createForm(this, { name: this.formConfigBase.formName || 'form' }),
            formConfigBaseUsed: {
                labelCol: { span: 5 },
                wrapperCol: { span: 15 },
                formName: 'form',
                layout: 'horizontal',
                grid: { xxs: 24, xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
                gutter: [16, 8]
            }
        }
    },
    props: {
        //表单内容配置数据
        formConfigData: {
            type: Array,
            default: () => {
                return []
            }
        },
        //表单的基本配置数据
        formConfigBase: {
            type: Object,
            default: () => {
                return {
                    labelCol: { span: 5 },
                    wrapperCol: { span: 15 },
                    formName: 'form',
                    layout: 'horizontal',
                    grid: { xxs: 24, xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
                    gutter: [16, 8]
                }
            }
        },
        //相关业务方法
        formFunctionList: {
            type: Object,
            default: () => {
                return {}
            }
        },
        codeImg: {//验证码
            type: String,
            default: ''
        },
        mobileFlag: {//是否发送短信验证码
            type: Boolean,
            default: false
        },
        msgTime: {//发送验证码定时器
            type: Number,
            default: 0
        },
        okBtn: {
            type: String,
            default: 'add'
        }
    },
    mounted() {
        this.formConfigBaseUsed = { ...this.formConfigBaseUsed, ...this.formConfigBase }
        this.$forceUpdate()
    }
}
</script>

<style scoped lang='less'>
/deep/ .ant-upload-picture-card-wrapper{
    width: 50%;
    vertical-align: top;
    .ant-upload-list-item-actions .anticon-eye-o{
        display: none;
    }
}
.fx_searchForm{
    .ant-form-inline .ant-form-item{
        display: flex;
        /deep/.ant-form-item-control-wrapper{
            flex: 1;
        }
    }
}
</style>