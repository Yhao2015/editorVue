<template>
    <div :style="styleCss"></div>
</template>

<script>
export default {
    name: 'fx-geometry',
    data() {
        return {

        }
    },
    props: {
        height: {
            type: Number,
            default: 200
        },
        width: {
            type: Number,
            default: 200
        },
        chartOption: {
            type: Object,
            default: () => { }
        }
    },
    computed:{
        styleCss() {
            return {
                height: this.height + 'px',
                width: this.width + 'px',
                'background-color': this.chartOption.backgroundColor.indexOf('#') == 0 ? this.chartOption.backgroundColor : '#' + this.chartOption.backgroundColor
            }
        }
    }
}
</script>

<style>
</style>