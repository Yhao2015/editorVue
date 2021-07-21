<template>
    <fx-base-editor-form :formFunctionList='addFunctions' :formConfigBase="formConfigBase" :formConfigData='formConfigData' ref='baseForm'>
        <!-- 屏幕尺寸 -->
        <template slot="selectAndInput" slot-scope="data">
            <a-select 
                v-decorator="[data.data.code,{ initialValue:data.data.defaultValue || ''}]" 
                class="widthP100" 
                show-search 
                v-bind='data.data.extra' 
                :filter-option="filterOption" 
                :placeholder='data.data.placeholder || "请选择"' 
                @change='data.data.changeFunName ? emitFunction(data.data.changeFunName, $event, data.data.dataFormat) : null'
            >
                <a-select-option v-if='data.data.defaultValue===undefined' key="-1" value="">请选择</a-select-option>
                <a-select-option 
                    v-for='element in data.data.dataFormat' 
                    :data='element' 
                    :key='element.value' 
                    :value="element.value"
                >
                    {{element.name}}
                </a-select-option>
            </a-select>
            <a-row type="flex" class="marginT8">
                <a-col :span="10">
                    <a-input 
                        class="widthP100" 
                        :disabled="data.data.disabled" 
                        v-decorator="['rectWidth',{ initialValue:data.data.width || ''}]" 
                        suffix="W"
                        @change="data.data.funName ? emitFunction(data.data.funName, $event, 'rectWidth') : null" 
                    />
                </a-col>
                <a-col :span="3" :offset="1">
                    <icon-font :type="'iconsuoding'" :class="['icon', 'fontSize10']" />
                </a-col>
                <a-col :span="10">
                    <a-input 
                        class="widthP100" 
                        :disabled="data.data.disabled" 
                        v-decorator="['rectHeight',{ initialValue:data.data.height || ''}]" 
                        suffix="H"
                        @change="data.data.funName ? emitFunction(data.data.funName, $event, 'rectHeight') : null"  
                    />
                </a-col>
            </a-row>
        </template>
        
        <!-- 颜色  纯色-->
        <template  slot="color" slot-scope="data">
            <a-row type="flex" :gutter="[8,0]">
                <a-col :span="4"> 
                    <input 
                        type="color"
                        v-bind='data.data.extra'
                        v-decorator="[data.data.code + 'Color', { initialValue: data.data.defaultValue.indexOf('#') == 0 ? data.data.defaultValue : '#' + data.data.defaultValue }]"
                        @change="data.data.funName ? emitFunction(data.data.funName, $event, data.data) : null" 
                        class="fx_formColor" 
                    />
                </a-col>
                <a-col :span="20"> 
                    <a-input
                        v-decorator="[data.data.code, { initialValue: data.data.defaultValue.indexOf('#') == 0 ? data.data.defaultValue.substring(1) : data.data.defaultValue }]"
                        v-bind='data.data.extra'
                        prefix="#" 
                        @change="data.data.funName ? emitFunction(data.data.funName, $event, data.data) : null" 
                    />
                </a-col>
            </a-row>
        </template>

        <!-- 颜色 支持渐变 -->
        <template  slot="colorPicker" slot-scope="data">
            <a-row type="flex">
                <a-col flex="25px"> 
                    <div :id="data.data.code"></div>
                </a-col>
                <a-col flex="auto"> 
                    <a-input
                        v-decorator="[data.data.code, { initialValue: data.data.defaultValue }]"
                        v-bind='data.data.extra'
                        :disabled="data.data.disabled"
                        @change="data.data.funName ? emitFunction(data.data.funName, $event, data.data) : null" 
                    />
                </a-col>
            </a-row>
        </template>

        <!-- 颜色 + 透明度 -->
        <template slot="colorAndOpacity" slot-scope="data">
            <a-row type="flex" :gutter="[8,0]">
                <a-col :span="4" class="fx_flexAlign">
                    <a-input type="color" :value="'#' + data.data.defaultValue" class="noPadding"/>
                </a-col>
                <a-col :span="10"> 
                    <a-input class="widthP100" prefix="#" :value="data.data.defaultValue"/>
                </a-col>
                <a-col :span="10"><a-input class="widthP100" :value="data.data.opacity" suffix="%" /></a-col>
            </a-row>
        </template>


        <!-- 图片上传 -->
        <template slot="singleFileUpload" slot-scope="data">
            <a-input
                :placeholder='data.data.placeholder || "输入图片地址"'  
                v-decorator="[data.data.code, { initialValue:data.data.defaultValue || '' }]"
                @blur="data.data.funName ? emitFunction(data.data.funName, $event, data.data.code) : null" 
            >
                <a-icon slot="prefix" type="paper-clip" class="colorfff"/>
            </a-input>
            <a-row type="flex" :key="ImgKey">
                <a-upload 
                    class="marginT8" 
                    accept=".png,.jpg,.gif" 
                    :multiple='false' 
                    :listType="'picture-card'" 
                    :remove="handleRemove" 
                    :beforeUpload="beforeUpload.bind(this,data.data)"
                >
                    <div v-if="fileList.length == 0">
                        <a-icon type="plus" class="colorfff"/>
                        <div class="ant-upload-text fontSize12">上传</div>
                    </div>
                </a-upload>
            </a-row>
        </template>

        <template slot="fileUpload" slot-scope="data">
            <a-row type="flex" :key="ImgKey">
                <a-upload 
                    class="marginT8" 
                    :accept="data.data.accept || '.*'" 
                    :multiple='false' 
                    :listType="'picture-card'" 
                    :remove="handleRemove" 
                    :beforeUpload="beforeUpload.bind(this, data.data)"
                >
                    <div v-if="fileList.length == 0">
                        <a-icon type="plus" class="colorfff"/>
                        <div class="ant-upload-text fontSize12">上传</div>
                    </div>
                </a-upload>
            </a-row>
        </template>

        <!-- 按钮 -->
        <template slot="btn" slot-scope="data">
            <a-button 
                type="primary" 
                ghost 
                class="widthP100" 
                @click="data.data.funName ? emitFunction(data.data.funName) : null"
            >恢复默认背景</a-button>
        </template>

        <!-- icons -->
        <template slot="icons" slot-scope="data">
            <a-input v-show="false" v-decorator="[data.data.code]"/>
            <span 
                v-for="(item,index) in data.data.dataFormat"
                :title="item.title" 
                :key="index" :class="['fx_tabIcon', {'fx_checkedIcons': item.value == data.data.defaultValue}]" 
                @click="data.data.funName ? emitFunction(data.data.funName, item.value) : null"
            >
                <icon-font :type="item.iconType" :class="['icon', data.data.className]" />
            </span>
            <a-input v-show="false" v-decorator="[data.data.code, { initialValue:data.data.defaultValue}]"/>
        </template>

        <!-- input  -->
        <template slot="positionSize" slot-scope="data">
            <a-row type="flex" :gutter="[8,0]">
                <template v-for="(item,index) in data.data.dataFormat">
                    <a-col :span="10" :key="index">
                        <a-input
                            class="widthP100" 
                            :suffix="item.suffix"
                            v-bind='item.extra'
                            v-if="item.code" 
                            v-decorator="[item.code, { initialValue:item.value || '' }]"
                            @change="data.data.changeFunName ? emitFunction(data.data.changeFunName, $event, item.code) : null"
                        />
                    </a-col>
                    <a-col :span="3" :offset="1" v-if="index == 0" :key="'icon' + index">
                        <icon-font v-show="data.data.isShowIcon" :type="'iconsuoding'" :class="['icon', 'fontSize10']" />
                    </a-col>
                </template>
            </a-row>
        </template>

        <!-- 分割线 -->
        <template slot="divider">
            <a-divider class="fx-divider"/>
        </template>

        <!-- 透明度 -->
        <template slot="slider" slot-scope="data">
            <a-row type="flex" :gutter="[8, 0]">
                <a-col :span="12">
                    <a-slider 
                        :min="data.data.min || null" 
                        :max="data.data.max || null" 
                        :step="data.data.step || 1"
                        v-model="data.data.defaultValue" 
                        @change="data.data.funName ? emitFunction(data.data.funName, $event, data.data) : null"
                    />
                </a-col>
                <a-col :span="10" :offset="2">
                    <a-input-number 
                        :min="data.data.min || null" 
                        :max="data.data.max || null"
                        :step="data.data.step || 1"
                        class="widthP100" 
                        v-decorator="[data.data.code, { initialValue:data.data.defaultValue || 0 }]" 
                        @change="data.data.funName ? emitFunction(data.data.funName, $event, data.data) : null"
                    />
                </a-col>
            </a-row>
        </template>

        <!-- 边距padding -->
        <template slot="spacing" slot-scope="data">
            <div class="fx_spacing">
                <div class="fx_spacingBox"></div>
                <span class="fx_left">
                    <span v-show="!spacing.isLeft" @click.stop="showInput('isLeft')">
                        {{data.data.left}}
                    </span>
                    <a-input 
                        v-show="spacing.isLeft" 
                        v-decorator="['left', { initialValue: data.data.left }]" 
                        class="fx_inputSpanLeft" 
                        @blur="showInput('isLeft', $event, 'left')"
                    />
                </span>
                <span class="fx_right">
                    <span v-show="!spacing.isRight" @click.stop="showInput('isRight')">
                        {{data.data.right}}
                    </span>
                    <a-input 
                        v-show="spacing.isRight" 
                        v-decorator="['right', { initialValue: data.data.right }]" 
                        class="fx_inputSpanRight" 
                        @blur="showInput('isRight', $event, 'right')"
                    />
                </span>
                <span class="fx_top">
                    <span v-show="!spacing.isTop" @click.stop="showInput('isTop')">
                        {{data.data.top}}
                    </span>
                    <a-input 
                        v-show="spacing.isTop" 
                        v-decorator="['top', { initialValue: data.data.top }]" 
                        class="fx_inputSpan" 
                        @blur="showInput('isTop', $event, 'top')"
                    />
                </span>
                <span class="fx_bottom">
                    <span v-show="!spacing.isBottom" @click.stop="showInput('isBottom')">
                        {{data.data.bottom}}
                    </span>
                    <a-input 
                        v-show="spacing.isBottom" 
                        v-decorator="['bottom', { initialValue: data.data.bottom }]" 
                        class="fx_inputSpan" 
                        @blur="showInput('isBottom', $event, 'bottom')"
                    />
                </span>
            </div>
        </template>

        <template slot="actionIcon" slot-scope="data" class="fx_flexAlign">
            <span 
                :class="['fx_tabIcon', {'fx_checkedIcons': data.data.defaultValue == 'mousemove'}]" 
                @click="data.data.funName ? emitFunction(data.data.funName, 'mousemove') : null"
            >
                <icon-font :type="'iconxuanfu'" :class="['icon', 'fontSize10']" />
            </span>
            <span class="colorfff marginL8">悬浮</span>
            <span 
                :class="['fx_tabIcon', 'marginL16', {'fx_checkedIcons': data.data.defaultValue == 'click'}]"  
                @click="data.data.funName ? emitFunction(data.data.funName, 'click') : null"
            >
                <icon-font :type="'icondianji'" :class="['icon', 'fontSize10']" />
            </span>
            <span class="colorfff marginL8">点击</span>
        </template>

        <!-- 方向 -->
        <template slot="numberAndIcon" slot-scope="data">
            <a-row type="flex" :gutter="[16,16]">
                <a-col :span="12">
                    <a-input-number 
                        :min='data.data.min || null'
                        :max='data.data.max || null'
                        :step="data.data.step || 1"
                        :placeholder='data.data.placeholder || "请输入"'
                        v-decorator="[data.data.code, { initialValue:data.data.defaultValue || 0 }]" 
                        class='widthP100'
                        @change="data.data.changeFunName ? emitFunction(data.data.changeFunName, $event, data.data) : null"
                    />
                </a-col>
                <a-col :span="8" :offset="2">
                    <a-space>
                        <icon-font 
                        @click="data.data.funName ? emitFunction(data.data.funName, data.data, 'leftRight') : null" 
                        :type="data.data.leftRight == 1 ? 'iconzuoyouduichengdakai' : 'iconzuoyouduicheng2'" 
                        :class="['icon', 'fontSize14']" 
                    />
                        <icon-font 
                        @click="data.data.funName ? emitFunction(data.data.funName, data.data, 'topBottom') : null" 
                        :type="data.data.topBottom == 1 ? 'iconshangxiaduichengdakai' : 'iconshangxiaduicheng2'" 
                        :class="['icon', 'fontSize14']" 
                    />
                    </a-space>
                </a-col>
            </a-row>
        </template>

        <!-- 图标右置 -->
        <template slot="iconfont" slot-scope="data">
            <a-input v-show="false" v-decorator="[data.data.code]"/>
            <div class="text-right">
                <a-space>
                    <icon-font 
                        :type="item.icontype" 
                        :class="['icon', 'fontSize12']" 
                        v-for="(item,index) in data.data.dataFormat" 
                        :key="index" 
                        @click="item.funName ? emitFunction(item.funName, item) : null"
                    />
                </a-space>
            </div>
        </template>


        <!-- 扩展属性 上下 -->
        <template slot="extra" slot-scope="data">
            <a-row type="flex" :gutter="[8,0]">
                <a-col :span="item.span" v-for="(item,index) in data.data.dataFormat" :key="index" class="height52">
                    <template v-if="item.type ==  'input-number'">
                        <a-input-number
                            class="widthP100"
                            :min="item.min || 0" 
                            :formatter="value => `${value}${item.suffix}`"
                            :parser="value => value.replace(item.suffix, '')"
                            v-decorator="[data.data.isSub ? item.code + '_' + data.data.KIndex : item.code, { initialValue: item.value }]"
                            @change="item.changeFunName ? emitFunction(item.changeFunName, $event, item, data.data.KIndex) : null"
                            :disabled='data.data.disabled'
                            v-if="item.suffix"
                        />
                        <a-input-number
                            :min="item.min || 0" 
                            class="widthP100" 
                            v-decorator="[data.data.isSub ? item.code + '_' + data.data.KIndex : item.code, { initialValue: item.value }]"
                            @change="item.changeFunName ? emitFunction(item.changeFunName, $event, item, data.data.KIndex) : null"
                            :disabled='data.data.disabled'
                            v-else
                        />
                    </template>
                    <template v-if="item.type ==  'color'" class="fx_fontColor">
                        <a-input 
                            type="color" 
                            class="noPadding"
                            :min="item.min || 0"
                            :max="item.max || null"
                            v-decorator="[data.data.isSub ? item.code + '_' + data.data.KIndex : item.code, { initialValue: item.value.indexOf('#') == 0 ?  item.value : '#' + item.value}]" 
                            :disabled='data.data.disabled'
                            @change="item.changeFunName ? emitFunction(item.changeFunName, $event, item, data.data.KIndex) : null"
                        />
                    </template>
                    <template v-if="item.type ==  'input'">
                        <a-input 
                            class="widthP100" 
                            :prefix="item.prefix" 
                            v-decorator="[data.data.isSub ? item.code + '_' + data.data.KIndex : item.code, { initialValue: item.value }]"
                            @change="item.changeFunName ? emitFunction(item.changeFunName, $event, item, data.data.KIndex) : null"
                            :disabled='data.data.disabled'
                        />
                    </template>
                    <div v-if="item.type ==  'fontIcon'" @click="item.funName ? emitFunction(item.funName, item.code, data.data.KIndex) : null">
                        <icon-font :type="item.icontype" :class="['icon', 'fontSize12',{'fx_checkIcon': item.code == data.data.defaultValue}]" />
                    </div>
                    <template v-if="item.type ==  'fontIcons'">
                        <span v-for="(el,j) in item.dataFormat" :key="j" class="fx_tabIcon marginR0">
                            <icon-font :type="el.icontype" :class="['icon', 'fontSize10']" />
                            <span class="fontSize12 colorfff fx_fonts">{{el.name}}</span>
                        </span>
                    </template>
                    <template v-if="item.type ==  'switch'">
                        <a-switch :checked="!data.data.disabled" @change="item.funName ? emitFunction(item.funName, $event, data.data) : null"/>
                    </template>
                    <template v-if='item.type=="select"'>
                        <a-select 
                            v-decorator="[data.data.isSub ? item.code + '_' + data.data.KIndex : item.code,{ initialValue:item.value || ''}]" 
                            class="widthP100"
                            show-search 
                            v-bind='item.extra'
                            :filter-option="filterOption"
                            :placeholder='item.placeholder || "请选择"'
                            :disabled='data.data.disabled'
                            @change="item.changeFunName ? emitFunction(item.changeFunName, $event, item, data.data.KIndex) : null"
                        >
                            <a-select-option v-if='item.value===undefined' key="-1" value="">请选择</a-select-option>
                            <a-select-option 
                                v-for='element in item.dataFormat' :data='element' 
                                :key='element[item.fieldnames?item.fieldnames.key:"value"]' 
                                :value="element[item.fieldnames?item.fieldnames.key:'value']"
                            >
                                {{element[item.fieldnames?item.fieldnames.text:"name"]}}
                            </a-select-option>
                        </a-select>
                    </template>
                    <div v-if="item.type !=  'color'" :class="['fontSize12', 'colorfff','fx_font']">{{item.name}}</div>
                </a-col>
            </a-row>
        </template>

        <template slot="results" slot-scope="data"> 
            <prism-editor
                class="fx_editor"
                v-model="codeSnippet[data.data.code]" 
                :highlight="highlighter"
                :line-numbers="true"
                :readonly="data.data.readonly || false"
                @input="onChangeSnippet($event, data.data)"

            />
            <a-input v-decorator="[data.data.code,{ initialValue:data.data.defaultValue || ''}]" v-show="false"/>
        </template>

        <!-- 开关 -->
        <template slot="switch" slot-scope="data"> 
            <a-row type="flex" align="middle">
                <a-switch :checked="data.data.defaultValue" v-decorator="[data.data.code,{ initialValue:data.data.defaultValue}]" @change="data.data.funName ? emitFunction(data.data.funName, $event, data.data) : null"/>
                <span class="colorfff marginL8">{{data.data.label}}</span>
            </a-row>
        </template>
        
    </fx-base-editor-form>
</template>

<script>
import fxBaseEditorForm from '@c/formConfig/Index.vue'
import { highlight, languages } from "prismjs/components/prism-core";
export default {
    name: 'fx-base-form',
    data() {
        return {
            codeSnippet: {},
            fileList: [],
            spacing: {
                isLeft: false,
                isRight: false,
                isTop: false,
                isBottom: false
            },
            ImgKey: '', //清空upload组件图片缓存,
            colorPicker: {}
        }
    },
    props: {
        addFunctions: {
            type: Object,
            default: () => {}
        },
        formConfigBase: {
            type: Object,
            default: () => {
                return {
                    labelCol: { span: 6 },
                    wrapperCol: { span: 18 },
                    gutter: [16, 8]
                }
            }
        },
        formConfigData: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        formConfigData: {
            handler(val) {
                this.initColorPicker()
            }
        }
    },
    mounted()  {
        this.$nextTick(() => {
            this.initColorPicker()
        })
        this.setCodeSnippet()
    },
    methods: {
        /**
         * @description: 编辑器change事件
         * @param {*}
         * @return {*}
         */
        onChangeSnippet(e, data) {
            this.$forceUpdate()
            if(data.changeFunName) {
                this.emitFunction(data.changeFunName, e)
            }
        },
        /**
         * @description: 判断代码编辑器，设置初始值
         * @param {*}
         * @return {*}
         */
        setCodeSnippet() {
            this.formConfigData.map(el => {
                if(el.slot && el.slot == 'results') {
                    this.codeSnippet[el.code] = el.defaultValue
                }
            })
        },
        initColorPicker() {
            let self = this
            this.formConfigData.map(el => {
                if(el.slot && el.slot == 'colorPicker') {
                    if(self.colorPicker[el.code]) {
                        self.colorPicker[el.code] = null
                    }
                    self.colorPicker[el.code] = new XNColorPicker({
                        color: el.defaultValue,
                        selector: "#" + el.code,
                        showprecolor: true,//显示预制颜色
                        prevcolors: null,//预制颜色，不设置则默认
                        showhistorycolor: true,//显示历史
                        historycolornum: 16,//历史条数
                        format: 'hex',//rgba hex hsla,初始颜色类型
                        showPalette:true,//显示色盘
                        show:false, //初始化显示
                        lang:'cn',// cn 、en
                        colorTypeOption:'single,linear-gradient', //radial-gradient
                        onError: function (e) {},
                        onCancel:function(color) {},
                        onChange:function(color){},
                        onConfirm:function(color) {
                            let value = null
                            if(color.colorType == 'single') {
                                value = color.color.hex
                            } else if(color.colorType == 'linear-gradient') {
                                value = color.color.str
                            }
                            self.$refs.baseForm.form.setFieldsValue({[el.code]: value})
                            self.addFunctions[el.funName](value, el)
                        }
                    })
                }
            })
        },
        // 下拉框筛选
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            )
        },
        // 图片移除
        handleRemove(file) {
            this.fileList = []
        },
        // 图片上传前移除
        beforeUpload(data, file, fileList) {
            if(data.changeFunName) {
                this.emitFunction(data.changeFunName, {file: file, data: data})
            }
            this.fileList = fileList
            return false
        },
        // 边距设置
        showInput(code, event, valCode) {
            let temp = this.spacing[code]
            this.spacing.isLeft = false
            this.spacing.isRight = false
            this.spacing.isTop = false
            this.spacing.isBottom = false
            this.spacing[code] = !temp
            if(event) {
                this.emitFunction('onChangeGrid', valCode, event.target.value)
            }
        },
         //调用父页面方法
        emitFunction(funName, datas, item, KIndex) {
            this.addFunctions[funName](datas, item, KIndex)
        },
        // 高亮
        highlighter(code) {
            return highlight(code, languages.js); 
        }
    },
    components: {
        fxBaseEditorForm
    }
}
</script>

<style lang="less" scoped>
.marginR16 {
    margin-right: 16px !important;
}

/deep/.fcolorpicker-curbox {
    width: 25px;
    height: 25px;
    margin: 0;
    // border: 1px solid #ffffff;
}
/deep/.ant-input[disabled]{
    background-color: #333333;
    color: #bfbfbf
}
</style>