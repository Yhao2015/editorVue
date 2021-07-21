<!--  -->
<template>
    <div>
        <a-modal
            :title="title"
            :visible="visible"
            :confirm-loading="confirmLoading"
            :maskClosable="false"
            @cancel="handleCancel"
            :width="400"
            :footer="null"
        >
            <div class="fx_searchForm">
                <a-form :form='form' 
                    :label-col="{span: 0}" 
                    :wrapper-col="{span: 24}"
                    :labelAlign="'right'" 
                    :layout="formConfigBaseUsed.layout"
                >
                    <a-row type="flex" justify="start" align="top" :gutter='formConfigBaseUsed.gutter || [16,16]'>
                        <a-col 
                            v-for='(item,index) in formConfigData' 
                            :key='index' 
                            v-bind='item.grid || formConfigBaseUsed.grid'
                            v-show='item.type.indexOf("hidden")==-1'
                            :class="item.classStyle"
                        >
                            <a-form-item v-if='item.show'>
                                <div class="fx_flexAlign colorfff marginB8 relative">
                                    <div>{{item.label}}</div>
                                    <div class="fx_flexAlign fx_justifyBetween marginL16">
                                        <a-switch v-if="item.labelSlot.isSwitch" v-model="switchChecked" @change="item.funName ? emitFunction(item.funName, $event, item) : null"/>
                                        <a :class="['marginL8 absolute',{'right0': item.labelSlot.isRight} ]">{{item.labelSlot.label}}</a>
                                    </div>
                                </div>
                            </a-form-item>
                            <a-form-item v-if='item.type == "input"' class="fx_inputDisabled">
                                <a-input :disabled="item.disabled" :value="item.defaultValue">
                                    <a-icon slot="addonAfter" type="pushpin" @click="copy(item.defaultValue)"/>
                                </a-input>
                            </a-form-item>
                            <a-form-item v-if='item.type == "select"'>
                                <a-select></a-select>
                            </a-form-item>
                            <a-form-item v-if='item.type == "btn"'>
                                <a-space :size="16">
                                    <a-button type="primary" ghost>覆盖已发布快照</a-button>
                                    <a-button type="primary" ghost>自动新增并发布</a-button>
                                    <a-button type="primary" ghost>管理快照</a-button>
                                </a-space>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>


                <a-collapse :bordered="false">
                    <a-collapse-panel key="1" header="访问限制">
                        <a-form :form='form' 
                            :label-col="{span: 0}" 
                            :wrapper-col="{span: 24}"
                            :labelAlign="'right'" 
                            :layout="formConfigBaseUsed.layout"
                        >
                            <a-row type="flex" justify="start" align="top" :gutter='formConfigBaseUsed.gutter || [16,16]'>
                                <a-col 
                                    v-for='(item,index) in visitData' 
                                    :key='index' 
                                    v-show='item.type.indexOf("hidden")==-1'
                                    v-bind='item.grid || formConfigBaseUsed.grid'
                                    :class="item.classStyle"
                                >
                                    <a-form-item v-if='item.show'>
                                        <div class="fx_flexAlign colorfff marginB8 relative">
                                            <div>{{item.label}}</div>
                                            <div class="fx_flexAlign fx_justifyBetween marginL16">
                                                <a-switch 
                                                    :checked="type == item.defaultValue"
                                                    v-if="item.labelSlot.isSwitch" 
                                                    @change="item.funName ? emitFunction(item.funName, $event, item) : null"
                                                />
                                                <a :class="['marginL8 absolute',{'right0': item.labelSlot.isRight} ]">{{item.labelSlot.label}}</a>
                                            </div>
                                        </div>
                                    </a-form-item>
                                    <a-form-item v-if='item.type == "input"' v-show="type == item.defaultValue" class="fx_inputDisabled">
                                        <a-input :disabled="item.disabled" :value="item.value"></a-input>
                                    </a-form-item>
                                    <a-form-item v-if='item.type == "password"' v-show="type == item.defaultValue">
                                        <a-input-password :value="item.value" @blur="changAndUpdata('1', item.code, 'value', $event.target.value)"></a-input-password>
                                    </a-form-item>
                                    <a-form-item v-if="item.type == 'checkbox'" v-show="type == item.defaultValue">
                                        <a-checkbox :checked="item.once" @change="changAndUpdata('2', item.code, 'once', $event.target.checked)">签名地址只允许打开一次</a-checkbox>
                                    </a-form-item>
                                    <a-form-item v-if="item.type == 'sliderTime'" v-show="type == item.defaultValue">
                                        <a-row type="flex" align="middle">
                                            <a-col :span="7">
                                                <a-checkbox :checked="item.validityTime" @change="changAndUpdata('2', item.code, 'validityTime', $event.target.checked)">验证有效期</a-checkbox>
                                            </a-col>
                                            <a-col :span="1">
                                                <a-icon type="question-circle" class="colorfff" />
                                            </a-col>
                                            <a-col :span="8" :offset="1" v-show="item.validityTime">
                                                <a-slider class="width120" :min="1" :max="32" v-model="item.value" @change="changAndUpdata('2')"/>
                                            </a-col>
                                            <a-col :span="6" :offset="1" v-show="item.validityTime">
                                                <a-input-number
                                                    v-model="item.value"
                                                    :min="1"
                                                    :max="32"
                                                    :formatter="value => `${value}小时`"
                                                    :parser="value => value.replace('小时', '')"
                                                    @change="changAndUpdata('2')"
                                                />
                                            </a-col>
                                        </a-row>
                                    </a-form-item>
                                    <a-form-item v-if="item.type == 'textarea'" v-show="type == item.defaultValue">
                                        <a-textarea placeholder="请用;隔开" v-model="item.value" allow-clear :autosize="{minRows: 4, maxRows: 8}" @blur="changAndUpdata('3')"/>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </a-form>
                    </a-collapse-panel>
                    <a-collapse-panel key="2" header="加载页设置">
                        <a-form :form='form' 
                            :label-col="{span: 6}" 
                            :wrapper-col="{span: 18}"
                            :labelAlign="'right'"  
                            :layout="formConfigBaseUsed.layout"
                        >
                            <a-row type="flex" justify="start" align="top" :gutter='formConfigBaseUsed.gutter || [16,16]'>
                                <a-col 
                                    v-for='(item,index) in loadData' 
                                    :key='index'
                                    
                                    v-bind='item.grid || formConfigBaseUsed.grid' 
                                    v-show='item.type.indexOf("hidden")==-1'
                                    :class="item.classStyle"
                                >
                                    <a-form-item :label="item.label" v-if="item.show">
                                        <a-row type="flex" align="middle" v-if="item.type == 'color'">
                                            <a-col :span="4"> 
                                                <input 
                                                    type="color"
                                                    v-bind='item.extra'
                                                    v-decorator="[item.code + 'Color', { initialValue: item.defaultValue.indexOf('#') == 0 ? item.defaultValue : '#' + item.defaultValue }]"
                                                    @change="item.funName ? emitFunction(item.funName, $event, item) : null" 
                                                    class="fx_formColor" 
                                                />
                                            </a-col>
                                            <a-col :span="20"> 
                                                <a-input
                                                    v-decorator="[item.code, { initialValue: item.defaultValue.indexOf('#') == 0 ? item.defaultValue.substring(1) : item.defaultValue }]"
                                                    v-bind='item.extra'
                                                    prefix="#" 
                                                    @change="item.funName ? emitFunction(item.funName, $event, item) : null" 
                                                />
                                            </a-col>
                                        </a-row>
                                        <a-row type="flex" align="middle" v-if="item.type == 'fileUpload'">
                                            <a-col :span="24"> 
                                                <a-input
                                                    :placeholder='item.placeholder || "输入图片地址"'  
                                                    v-decorator="[item.code, { initialValue:item.defaultValue || '' }]"
                                                    @blur="item.funName ? emitFunction(item.funName, $event, item) : null" 
                                                >
                                                    <a-icon slot="prefix" type="paper-clip" class="colorfff"/>
                                                </a-input>
                                            </a-col>
                                            <a-row type="flex" :key="ImgKey">
                                                <a-upload 
                                                    class="marginT8" 
                                                    accept=".png,.jpg,.gif" 
                                                    :multiple='false' 
                                                    :listType="'picture-card'" 
                                                    :remove="handleRemove" 
                                                    :beforeUpload="beforeUpload.bind(this,item)"
                                                >
                                                    <div v-if="fileList.length == 0">
                                                        <a-icon type="plus" class="colorfff"/>
                                                        <div class="ant-upload-text">上传</div>
                                                    </div>
                                                </a-upload>
                                            </a-row>
                                        </a-row>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </a-form>
                    </a-collapse-panel>
                </a-collapse>
            </div>
        </a-modal>

        <a-modal :visible="isWarn" title="" @cancel="isWarn = false" @ok="handleModalOk" :width="380" :dialogStyle="{top: '180px'}" :maskClosable="false">
            <div class="fx_modalBody">
                <a-icon type="warning" class="fx_warn"/>
                <span>下一次再打开分享时，分享链接会发生变化。</span>
            </div>
        </a-modal>
    </div>
</template>

<script>
const formConfigData = [
    {
        label: '已发布',
        code: '',
        type: '',
        required: false,
        labelSlot: {
            isSwitch: true,
            label: '查看发布教程',
            isRight: true
        },
        funName: 'onPublish',
        show: true
    },
    {
        label: '分享链接',
        code: 'url',
        type: 'input',
        required: false,
        disabled: true,
        labelSlot: {
            isSwitch: false,
            label: '二维码'
        },
        defaultValue: '',
        // funName: '',
        show: true
    },
    // {
    //     label: '发布快照',
    //     code: '',
    //     type: 'select',
    //     required: false,
    //     labelSlot: {
    //         isSwitch: false,
    //         label: ''
    //     },
    //     // defaultValue: '',
    //     // funName: '',
    //     show: true
    // },
    // {
    //     label: '',
    //     code: '',
    //     type: 'btn',
    //     required: false,
    //     show: false
    // }
]
const visitData = [
    {
        label: '访问密码',
        code: 'passwordCode',
        type: 'password',
        required: false,
        labelSlot: {
            isSwitch: true,
            label: ''
        },
        defaultValue: '1',
        value: '',
        funName: 'onChangeSwitch',
        show: true
    },
    {
        label: '通过Token验证',
        code: 'tokenCode',
        type: 'input',
        required: false,
        labelSlot: {
            isSwitch: true,
            label: ''
        },
        disabled: true,
        value: '',
        defaultValue: '2',
        funName: 'onChangeSwitch',
        show: true
    },
    {
        code: 'checkboxCode',
        type: 'checkbox',
        defaultValue: '2',
        once: false,
        show: false
    },
    {
        code: 'sliderCode',
        type: 'sliderTime',
        defaultValue: '2',
        value: 1,
        validityTime: false,
        show: false
    },
    {
        label: 'IP白名单',
        code: 'textareaCode',
        type: 'textarea',
        required: false,
        labelSlot: {
            isSwitch: true,
            label: ''
        },
        defaultValue: '3',
        value: '',
        funName: 'onChangeSwitch',
        show: true
    }
]
const loadData = [
    {
        label: '背景颜色',
        code: '',
        type: 'color',
        required: false,
        show: true,
        defaultValue: '',
        funName: '',
    },
    {
        label: 'logo',
        code: '',
        type: 'fileUpload',
        required: false,
        show: true,
        defaultValue: '',
        funName: '',
    }
]
export default {
    data() {
        return {
            form: this.$form.createForm(this, { name: 'form' }),
            confirmLoading: false,
            formConfigBaseUsed: {
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
                formName: 'form',
                layout: 'horizontal',
                grid: { xxs: 24, xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
                gutter: [16, 8]
            },
            fileList: [],
            formFunctionList: {
                onPublish: this.onPublish,
                onChangeSwitch: this.onChangeSwitch
            },
            formConfigData,
            visitData,
            loadData,
            ImgKey: '',
            switchChecked: true,
            isWarn: false,
            unpublishUrl: this.$api.unpublish, // 取消发布
            postingDetailUrl: this.$api.postingDetail, //获取详情
            updateSpaceCokpitUrl: this.$api.updateSpaceCokpit,
            type: 1,
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ""
        }
    },
    watch: {
        visible(val) {
            if(val) {
                this.getDetail()
            }
        }
    },
    components: {},
    computed: {},
    mounted() {
    },
    methods: {
        /**
         * @description: 获取详情
         * @param {*}
         * @return {*}
         */
        getDetail() {
            this.$get(this.postingDetailUrl, {spaceCockpitId: window.staticContentConfig.id}).then(res => {
                if(res.code == 200) {
                    this.type = res.data.type
                    this.formConfigData = this.formConfigData.map(el => {
                        if(el.code == 'url') {
                            el.defaultValue = res.data.hideLink
                        } 
                        return el
                    })
                    this.visitData = this.visitData.map(el => {
                        let obj = {
                            'passwordCode': () => {
                                el.value = res.data.password
                            },
                            'tokenCode': () => {
                                el.value = res.data.token
                            },
                            'checkboxCode': () => {
                                el.once = res.data.tokenLimit == 1
                            },
                            'sliderCode': () => {
                                el.validityTime = res.data.effectiveTime == 0 ? false : true
                                if(res.data.effectiveTime > 0) {
                                    el.value = res.data.effectiveTime
                                }
                            },
                            'textareaCode': () => {
                                el.value = res.data.ipWhiteList
                            }
                        }
                        obj[el.code] && obj[el.code]()
                        return el
                    })
                }
            })
        },
        handleCancel() {
            this.$emit('handleCancel')
        },
        beforeUpload() {
        },
        handleRemove() {
        },
        //调用父页面方法
        emitFunction(funName, datas, item) {
            this.formFunctionList[funName](datas, item)
        },
        /**
         * @description: 取消发布弹窗
         * @param {*} datas
         * @return {*}
         */
        onPublish(datas) {
            this.switchChecked = true
            this.isWarn = true
        },
        /**
         * @description: 取消弹窗
         * @param {*}
         * @return {*}
         */
        handleModalOk() {
            this.isWarn = false
            this.$axios.delete(this.unpublishUrl, {data: {id: window.staticContentConfig.id}}).then(res => {
                if(res.data.code == 200) {
                    this.$emit('changeType')
                }
            })
        },
        onChangeSwitch(value, item) {
            this.type = !value ? 0 : +item.defaultValue
            if(value && this.type == 2) {
                this.visitData = this.visitData.map(el => {
                    if(el.code == 'tokenCode') {
                        el.value = this.$flineFunction.generateUUID('-', 16)
                    }
                    return el
                })
            }
            this.changAndUpdata(this.type)
        },
        changAndUpdata(type, code, target, value) {
            if(code) {
                this.visitData = this.visitData.map(el => {
                    if(el.code == code) {
                        el[target] = value
                    }
                    return el
                })
            }
            let obj = {
                '0': () => {
                    this.addLimit({
                        spaceCockpitId: window.staticContentConfig.id,
                        type: 0,
                        password: '',
                        token: '',
                        tokenLimit: '',
                        effectiveTime: '',
                        ipWhiteList: ''
                    })
                },
                '1': () => {
                    let password = this.visitData.filter(el => el.code == 'passwordCode')[0].value
                    this.addLimit({
                        spaceCockpitId: window.staticContentConfig.id,
                        type: 1,
                        password: password,
                        token: '',
                        tokenLimit: '',
                        effectiveTime: '',
                        ipWhiteList: ''
                    })
                },
                '2': () => {
                    let token = this.visitData.filter(el => el.code == 'tokenCode')[0].value
                    let tokenLimit = this.visitData.filter(el => el.code == 'checkboxCode')[0].once ? 1: 999
                    let effectiveTime = 0
                    let validityTime = this.visitData.filter(el => el.code == 'sliderCode')[0].validityTime
                    if(validityTime) {
                        effectiveTime = this.visitData.filter(el => el.code == 'sliderCode')[0].value
                    }
                    this.addLimit({
                        spaceCockpitId: window.staticContentConfig.id,
                        type: 2,
                        token: token,
                        tokenLimit: tokenLimit,
                        effectiveTime: effectiveTime,
                        password: '',
                        ipWhiteList: ''
                    })
                },
                '3': () => {
                    let ipWhiteList = this.visitData.filter(el => el.code == 'textareaCode')[0].value
                    this.addLimit({
                        spaceCockpitId: window.staticContentConfig.id,
                        type: 3,
                        ipWhiteList: ipWhiteList,
                        token: '',
                        tokenLimit: '',
                        effectiveTime: '',
                        password: ''
                    })
                }
            }
            obj[type] && obj[type]()
            this.onReset(type)
        },
        onReset(type) {
            this.visitData = this.visitData.map(el => {
                let obj = {
                    "0": () =>  {
                        if(el.code == 'passwordCode') el.value = ''
                        if(el.code == 'tokenCode') el.value = ''
                        if(el.code == 'checkboxCode') el.once = false
                        if(el.code == 'sliderCode') {
                            el.validityTime = false
                            el.value = ''
                        }
                        if(el.code == 'textareaCode') el.value = ''
                    },
                    "1": () =>  {
                        if(el.code == 'tokenCode') el.value = ''
                        if(el.code == 'checkboxCode') el.once = false
                        if(el.code == 'sliderCode') {
                            el.validityTime = false
                            el.value = ''
                        }
                        if(el.code == 'textareaCode') el.value = ''
                    },
                    "2": () =>  {
                        if(el.code == 'passwordCode') el.value = ''
                        if(el.code == 'textareaCode') el.value = ''
                    },
                    "3": () =>  {
                        if(el.code == 'passwordCode') el.value = ''
                        if(el.code == 'tokenCode') el.value = ''
                        if(el.code == 'checkboxCode') el.once = false
                        if(el.code == 'sliderCode') {
                            el.validityTime = false
                            el.value = ''
                        }
                    }
                }
                obj[type] && obj[type]()
                return el
            })
        },
        copy(text) {
            var copyipt = document.createElement("input");
            copyipt.setAttribute("value", text);
            document.body.appendChild(copyipt);
            copyipt.select();
            document.execCommand("copy");
            document.body.removeChild(copyipt);
            this.$message.success('复制成功')
        },
        addLimit(params) {
            this.$post(this.updateSpaceCokpitUrl, params)
        }
    }
};
</script>
<style lang='less' scoped>
@import '../../../assets/less/colorSet.less';
/deep/ .ant-modal-content{
    background: @background-10;
    color: @text-2;

    .ant-modal-header {
        background: #303640;
        color: @text-2;
        border: 0;

        .ant-modal-title{
            color: @text-2;
        }
    }
    button.ant-modal-close{
        color: @text-2 !important;
    }
        
    .ant-switch{
        background: @background-5;
    }

    .ant-switch-checked{
        background: linear-gradient(242deg,#2b87ff 4%, #71ebff 83%);
    }

    .ant-modal-footer {
        border-top: 1px solid #3A4659;
    }
}
/deep/.ant-collapse {
    .ant-collapse-item > .ant-collapse-header{
        padding-left: 24px;
    }
    .ant-collapse-content > .ant-collapse-content-box {
        padding: 0
    }

    .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow{
        left: 0;
    }
}

/deep/ .fx_inputDisabled {
    background: @background-7;
}

/deep/.ant-input[disabled] {
    color: @text-4;
}
/deep/.ant-input-group-addon{
    background-color: transparent;
    border: 0;
}

.fx_formColor {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    width: 40px;
    border: 0;
    background: transparent;
}

.fx_modalBody {
    display: flex;
    flex-direction: column;
    height: 150px;
    // width: 100%;
    align-items: center;
    justify-content: center;

    .fx_warn {
        color: #ff4f43;
        font-size: 65px;
        display: block;
        margin-bottom: 16px;
    }

    
}
</style>