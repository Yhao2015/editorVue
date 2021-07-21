<template>
    <div class="fx_boxItem">
        <template v-for="(item,index) in groupItme">
            <a-popover :content="item.title" :key="index" arrow-point-at-center>
                <div :class="[{'fx_check':item.checked},'fx_bg',item.boxClass]" @click="onClickFun(index, item)">
                    <icon-font :type="item.iconName" :class="['icon']" />
                </div>
            </a-popover>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        groupItme: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        onClickFun(index, item) {
            if(!item.funName) {
                return
            }
            this.$emit('onClickFun', index, item)
        }
    }
}
</script>

<style lang="less" scoped>
/deep/ .icon {
    color: #fff;
}
</style>