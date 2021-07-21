<template>
    <div class="fx_control">
        <div class="fx_controlTitle" v-if="!choose">{{name}}</div>
        <base-page-setting v-if="!choose" :pageInfo="pageInfo"/>
        <echarts-setting v-else-if="choose.type.indexOf('&') > -1" :chooseItme="choose"/>
        <controlSetting v-else-if="choose.type == 'inline' || choose.type == 'horizontal' || choose.type == 'vertical'" />
        <otherSetting v-else :chooseItme="choose"/>
    </div>
</template>

<script>
import basePageSetting from '@c/control/src/BasePageSetting.vue'
import echartsSetting from '@c/control/src/EchartsSetting.vue'
import controlSetting from '@c/control/src/ControlSetting.vue'
import otherSetting from '@c/control/src/OtherSetting.vue'
import { mapState } from 'vuex'
export default {
    name: 'control-area',
    data() {
        return {
            name: '页面设置',
        }
    },
    props: {
        pageInfo: {
            type:Object,
            default: () => {}
        }
    },
    computed: {
        ...mapState(['choose'])
    },
    components: {
        basePageSetting,
        echartsSetting,
        controlSetting,
        otherSetting
    },
    mounted() {
    },
    methods: {
    }
}
</script>