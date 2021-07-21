<template>
    <div :style="cssStyle">
        <!-- 图表 -->
        <fx-radar-chart 
            v-if="type == 'radar'" 
            :chartOption='extend.chartOption' 
            :extraOption="extend.extraOption" 
            :width="extend.width" 
            :height="extend.height" 
        />
        <fx-bar-chart 
            v-if="type == 'bar'" 
            :chartOption='extend.chartOption' 
            :extraOption="extend.extraOption" 
            :width="extend.width" 
            :height="extend.height" 
        />
        <fx-gauge-chart 
            v-if="type == 'gauge'" 
            :chartOption='extend.chartOption' 
            :extraOption="extend.extraOption" 
            :width="extend.width" 
            :height="extend.height" 
        />
        <fx-line-chart 
            v-if="type == 'line'" 
            :chartOption='extend.chartOption' 
            :extraOption="extend.extraOption" 
            :width="extend.width" 
            :height="extend.height" 
        />
        <fx-line-bar-chart 
            v-if="type == 'linebar'" 
            :chartOption='extend.chartOption' 
            :extraOption="extend.extraOption" 
            :width="extend.width" 
            :height="extend.height" 
        />
        <fx-pie-chart 
            v-if="type == 'pie'" 
            :chartOption='extend.chartOption' 
            :extraOption="extend.extraOption" 
            :width="extend.width" 
            :height="extend.height" 
        />
        <fx-scatter-chart 
            v-if="type == 'scatter'" 
            :chartOption='extend.chartOption' 
            :extraOption="extend.extraOption" 
            :width="extend.width" 
            :height="extend.height" 
        />
        <!-- 词云 -->
        <fx-ballWorldCloud v-if="type == 'ballWorldCloud'"/>
        <!-- 动态列表 -->
        <fx-sort-action-list 
            v-if="type == 'sortActionList'" 
            :datas='extend.chartOption.seriesData'
        />
        <!-- 边框 -->
        <fx-common-border 
            v-if="type == 'boxBorder'" 
            :styleOption="{...extend.chartOption, borderHeight: extend.height + 'px'}"
        />
        <!-- 地图 -->
        <fx-distric-map-echart 
            v-if="type == 'mapEchart'" 
            :geoJson='extend.chartOption.seriesData'
            :width="extend.width" 
            :height="extend.height" 
        />
        <!-- 图片 -->
        <fx-page-image
            v-if="type == 'pageImage'"
            :chartOption="extend.chartOption"
            :width="extend.width"
            :height="extend.height" 
        />
        <!-- 页头 -->
        <fx-page-header
            v-if="type == 'pageHeader'"
            :chartOption="extend.chartOption"
            :width="extend.width"
            :height="extend.height" 
        />
        <!-- 二级标题 -->
        <fx-small-title
            v-if="type == 'smallTitle'" 
            :title='extend.chartOption.textContent'
            :styleOption='extend.chartOption.styleOption'
        />
        <!-- 指标项 -->
        <div v-if="type == 'quato'" class="fx_flex">
            <div v-for="(item, index) in extend.chartOption.seriesData" :key="'quato'+ index" :style="{flex: 1}">
                <fx-quato :datas='item' :styleOption="extend.chartOption.styleOption"></fx-quato>
            </div>
        </div>

        <!-- 几何体 -->
        <fx-geometry 
            v-if="type == 'geometry'"
            :chartOption="extend.chartOption"
            :width="extend.width"
            :height="extend.height"
        />

        <!-- 时间轴 -->
        <fx-common-time-line 
            v-if="type == 'timeLineCommon'"
            :width="extend.width"
            :height="extend.height"
            :styleOption="extend.chartOption.styleOption"
            :isAnimate="extend.isAnimate"
            :animateInterval="extend.animateInterval"
        />

        <!-- 旋转地球 -->
        <fx-earth-scroll 
            v-if="type == 'earthScroll'"
        />

        <!-- 切换选择器 -->
        <fx-tab-select 
            v-if="type == 'tabSelect'"
            :styleOption="extend.chartOption.styleOption"
            :datas="extend.chartOption.seriesData"
            :height="extend.height + 'px'"
        />

        <!-- 年份选择器 -->
        <fx-year-select 
            v-if="type == 'yearSelect'" 
            :initYear='Number(extend.chartOption.initYear)' 
            :minYear='Number(extend.chartOption.minYear)'
            :height="extend.height + 'px'"
            :styleOption="extend.chartOption.styleOption"
        />

        <!-- 翻牌器 -->
        <fx-flop-card 
            v-if="type == 'flopCard'"
        />

        <!-- 进度条列表 -->
        <fx-process-list 
            v-if="type == 'processList'"
        />

        <!-- 字体 -->
        <fx-ifonts 
            v-if="type == 'ifonts'"
            :chartOption="extend.chartOption"
        />
    </div>
</template>

<script>
import fxPageImage from '@c/components/FxPageImage.vue'
import fxPageHeader from '@c/components/FxPageHeader.vue'
import fxGeometry from '@c/components/FxGeometry.vue'
import fxIfonts from '@c/components/FxIFonts.vue'
export default {
    name: 'assembly',
    data() {
        return {
            extend: {}
        }
    },
    components: {
        fxPageImage,
        fxPageHeader,
        fxGeometry,
        fxIfonts
    },
    computed: {
        cssStyle() {
            return {
                'opacity': this.getValue('opacity', 'baseDataForm', 1),
                'transform': `rotateY(${this.getValue('leftRight', 'baseDataForm', 0) ? '180deg' : '0deg'}) rotateX(${this.getValue('topBottom', 'baseDataForm', 0) ? '180deg' : '0deg'}) rotate(${this.getValue('direction', 'baseDataForm', 0)}deg)`
            }
            
        }
    },
    props: {
        extendMap: {
            type: Object,
            default: () => {}
        },
        type: {
            type: String,
            default: ''
        }
    },
    watch: {
        extendMap: {
            handler() {
                this.extend = this.extendMap
            },
            immediate: true,
            deep: true
        }
    },
    mounted() {
        if(this.extend.extend) {
            this.extend = {
                ...this.extend,
                ...this.extend.extend
            }
        }
        if(this.extend.chartOption.seriesData.length == 0 && (this.extend.selectType == '2' || this.extend.selectType == '3')) {
            this.getSeriesData(this.extend.params, this.extend.pathUrl, this.extend.selectType)
        }
    },
    methods: {
        getSeriesData(params, pathUrl, selectType) {
            this.$axios.get(pathUrl, {params}).then(res => {
                if(res.data.code == 200) {
                    let datas = this.$flineFunction.JSONParse(res.data.data) || []
                    if(selectType == '2') {
                        datas = this.$flineFunction.JSONParse(res.data.data).data || []
                    }
                    this.extend.chartOption.seriesData = datas
                }
            })
        },
        getValue(code, key, defaultValue) {
            let extend = this.extend
            let value = defaultValue
            if(extend && extend[key] && (extend[key][code] || extend[key][code] == 0)) {
                value = extend[key][code]
            }
            return value
        },
        changeJson(params) {
            if(params.formatter) {
                params.formatter = eval("(false || " + params.formatter + ")")
            }
            return params
        }
    }
}
</script>

<style>
</style>