<template>
    <div :style="styleCss">
        {{chartOption.textContent}}
    </div>
</template>

<script>
export default {
    name: 'fx-ifonts',
    props: {
        chartOption: {
            type: Object,
            default: () => { }
        }
    },
    computed: {
        styleCss() {
            return {
                color: this.chartOption.color,
                'font-size': this.chartOption['font-size'] + 'px',
                'font-weight': this.chartOption['font-weight'],
                'letter-spacing': this.chartOption['letter-spacing'] + 'px',
                'line-height': this.chartOption['line-height'] +  'px',
                'text-indent': this.chartOption['text-indent'] + 'px'
            }
        }
    }
}
</script>

<style>
</style>