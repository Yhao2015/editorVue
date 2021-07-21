<template>
    <div 
        :style="styleCss" 
        class="fx_pageHeader"
    >
        <span :style="styleText">{{chartOption.textContent}}</span>
    </div>
</template>

<script>
const bgImage = require('@a/image/other/pageHeader.png')
export default {
    name: 'fx-page-header',
    data() {
        return {
            bgImage
        }
    },
    props: {
        height: {
            type: Number,
            default: 100
        },
        width: {
            type: Number,
            default: 1920
        },
        chartOption: {
            type: Object,
            default: () => { }
        }
    },
    computed: {
        styleCss() {
            return {
                height: this.height + 'px',
                width: this.width + 'px',
                'background-image': !this.chartOption.path ? `url('${bgImage}')` : `url('${this.chartOption.path}')`,
                'background-size': '100% 100%',
            }
        },
        styleText() {
            return {
                color: this.chartOption.color,
                'font-size': (this.chartOption['font-size'] || 30) + 'px',
                'font-weight': this.chartOption['font-weight'],
                'letter-spacing': (this.chartOption['letter-spacing'] || 0) + 'px',
                'line-height': (this.chartOption['line-height'] || 80) +  'px',
                'text-indent': (this.chartOption['text-indent'] || 0) + 'px'
            }
        }
    }
}
</script>

<style lang="less" scoped>
.fx_pageHeader {
    background-repeat: no-repeat;
    background-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    span{
        display: inline-block;
        width: 100%;
        height: 100%;
        text-align: center;
    }
}
</style>