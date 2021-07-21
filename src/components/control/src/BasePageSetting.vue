<!--
 * @Author: yuanhao
 * @Date: 2021-07-02 09:06:58
 * @LastEditTime: 2021-07-13 17:48:34
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \flinev-editor-vue\src\components\control\src\BasePageSetting.vue
-->
<template>
    <div class="margin16">
        <baseForm 
            :addFunctions='addFunctionPage' 
            :formConfigBase="formConfigBase" 
            :formConfigData='formConfigData' 
            ref='baseForm' 
        />
    </div>
</template>

<script>
import baseForm from '@c/control/src/BaseForm.vue'
import { pageJSON } from '@cf/formJson/basePage.js'
import { mixin } from '@m/page/mixin.js'

export default {
    name: 'fx-base-page-setting',
    mixins: [mixin],
    data() {
        return {
            formConfigBase: {
                labelCol: { span: 6 },
                wrapperCol: { span: 18 },
                gutter: [16, 8]
            },
            formConfigData: this.$flineFunction.deepClone(pageJSON),
        }
    },
    props: {
        pageInfo: {
            type: Object,
            default: () => {}
        }
    },
    watch: {
        pageInfo: {
            handler(val) {
                this.formConfigData = this.formConfigData.map(el => {
                    if(el.code == 'backgroundColor') {
                        el.defaultValue = this.pageInfo.backgroundColor
                    } else if(el.code == 'backgroundImage') {
                        el.defaultValue = this.pageInfo.backgroundImage
                    }
                    return el
                })
            },
            deep: true,
            immediate: true
        }
    },
    components: {
        baseForm
    }
}
</script>

<style>
</style>