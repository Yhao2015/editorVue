<template>
    <div @click="onClick" class="fx_assemblyGroupBox" v-if="isReload">
        <!-- 栅格布局 -->
        <div v-if="type == 'horizontal' || type == 'vertical' || type == 'inline'" class="fx_mode" :style="cssStyle">
            <div v-for="(item,index) in assemblyInfo.children" :key="'col' + index" class="fx_modeFlex" @dblclick.stop="ondblclick" @drop="onDrop">
                <assemblyGroupBox :assemblyInfo="item" v-if="Object.keys(item).length"></assemblyGroupBox>
                <div class="fx_modeTop" v-if="Object.keys(item).length == 0">
                    <a-space :size="16">
                        <a-icon type="arrow-left" @click.stop="onDivision('horizontal', item, index)" />
                        <a-icon type="arrow-down" @click.stop="onDivision('vertical', item, index)" />
                        <!-- <a-icon type="delete" @click.stop="onDel(index)" /> -->
                    </a-space>
                </div>
                <div class="fx_modeCon" v-if="Object.keys(item).length == 0" :id="assemblyInfo.id + '_' + index">
                    <a-icon type="plus" />
                </div>
            </div>
        </div>
        <assembly-item v-else :extendMap="extendMap" :type="type" />
    </div>
</template>

<script>
import assemblyItem from '@c/canvas/src/Assembly.vue'
export default {
    name: 'assemblyGroupBox',
    data() {
        return {
            id: 0,
            type: '',
            extendMap: {},
            isReload: true
        }
    },
    props: {
        assemblyInfo: {
            type: Object,
            default: () => { }
        }
    },
    computed: {
        cssStyle() {
            return {
                'flex-direction': this.extendMap.cssStyle['flex-direction'],
                'width': this.extendMap.width + 'px',
                'height': this.extendMap.height + 'px'
            }
        }
    },
    components: {
        assemblyItem
    },
    watch: {
        assemblyInfo: {
            handler(val) {
                this.id = val.id
                let type = val.type || val.mode
                // 容器组件
                if (type == 'inline' || type == 'horizontal' || type == 'vertical') {
                    this.type = type

                } else {
                    let typeGroup = type.split('&')
                    this.type = typeGroup[0]
                }
                this.$set(this, 'extendMap', val)
            },
            immediate: true,
            deep: true
        }
    },
    mounted() {
        window.addEventListener('message', (event) => {
            if(event && event.data == 'reloadFun') {
                this.isReload = false
                this.$nextTick(() => {
                    this.isReload = true
                })
            }
        })
    },
    methods: {
        ondblclick(event) {
            let className = event.currentTarget.className
            event.currentTarget.className = className.indexOf('fx_active') > -1 ? 'fx_modeFlex' : 'fx_modeFlex fx_active'
            // this.$emit('ondblclick', false, this.id)
        },
        onClick() {
            let mode = document.getElementsByClassName('fx_modeFlex') || []
            mode = [...mode]
            mode.map(t => {
                t.classList.remove('fx_active')
            })
        },
        onDrop(event) {
            event.preventDefault()
            this.$store.state.isParentId = event.target.id
        },
        onDivision(type, item, index) {
            if (type == 'horizontal') {
                item = {
                    mode: 'horizontal',
                    cssStyle: {
                        'flex-direction': 'row',
                    },
                    children: [{}, {}],
                }
            } else if (type == 'vertical') {
                item = {
                    mode: 'vertical',
                    cssStyle: {
                        'flex-direction': 'column'
                    },
                    children: [{}, {}],
                }
            }
            item.id = new Date().getTime()
            this.assemblyInfo.children[index] = item
            this.$forceUpdate()
        },
        onDel(index) {
            this.assemblyInfo.children[index] = {}
            this.$forceUpdate()
        }
    }
}
</script>

<style>
</style>