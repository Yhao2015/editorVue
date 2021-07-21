<template>
    <div 
        :style="{height: height + 'px',width: width + 'px'}" 
        class="fx_pageImage"
    >
        <img :src="src">
    </div>
</template>

<script>
export default {
    name: 'fx-page-image',
    data() {
        return {
            src: ''
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
    watch: {
        chartOption: {
            handler(val) {
                this.src = val.path
            },
            deep: true,
            immediate: true
        }
    }
}
</script>

<style lang="less" scoped>
.fx_pageImage {
    img {
        width: 100%;
        height: 100%;
    }
}
</style>