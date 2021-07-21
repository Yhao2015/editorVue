<!--
 * @Author: yuanhao
 * @Date: 2021-04-15 11:28:22
 * @LastEditTime: 2021-07-20 11:31:31
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \flinev-editor-vue\src\components\layer\src\Nested-draggable.vue
-->
<template>
    <div v-if="tasks && tasks.length > 0" ref="draggable">
        <draggable group="nested" :animation="150" :list="tasks">
            <div
                :class="['fx_listGroup', 'paddingL16']"
                :key="index"
                v-for="(el, index) in tasks"
            >
                <div
                    :id="el.id"
                    :class="['fx_listGroupItem',{ fx_active: selectLayer(el.id) }]"
                    @click.stop="onClickLayerItem(el)"
                >
                    <a-space>
                        <a-icon
                            :type="el.isOpen ? 'caret-down' : 'caret-up'"
                            v-if="el.tasks && el.tasks.length"
                            @click="onClickOpenClose(el)"
                        />
                        <icon-font
                            :type="el.iconType"
                            :class="['icon', 'fontSize10', 'marginR8']"
                        />
                        <span v-if="!el.rename">{{ el.alias || el.name }}</span>
                        <a-input v-else class="widthP80" :value="el.alias || el.name" @click.stop="onInput" @blur="onBlurInput"></a-input>
                    </a-space>
                    <a-space class="marginR8">
                        <icon-font
                            v-if="el.isShow"
                            :type="'iconyincang1'"
                            :class="['icon', 'fontSize10']"
                        />
                        <icon-font
                            v-if="el.isLock"
                            :type="'iconsuoding'"
                            :class="['icon', 'fontSize10']"
                        />
                        <icon-font
                            v-if="el.isSingle"
                            :type="'iconxianshidangetuceng'"
                            :class="['icon', 'fontSize10']"
                        />
                    </a-space>
                </div>
                <nested-draggable
                    v-if="el.tasks && el.tasks.length > 0"
                    v-show="el.isOpen"
                    :tasks="el.tasks"
                    :chooseLayers="chooseLayers"
                />
            </div>
        </draggable>
    </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
    name: "nested-draggable",
    components: {
        draggable
    },
    inject: ["onClickLayerItem", "onClickIcon", "onClickOpenClose", "renameSave", "save", "updateTemplateAlias"],
    props: {
        tasks: {
            type: Array,
            default: () => []
        },
        chooseLayers: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        // 判断是否选中
        selectLayer(id) {
            let falg = false;
            let temp = this.chooseLayers.filter(t => t.id == id);
            if (temp.length) {
                falg = true;
            }
            return falg;
        },
        onInput(e) {
            e.preventDefault()
        },
        onBlurInput(e) {
            let assemblyLists = this.renameSave(e.target.value)
            this.updateTemplateAlias(assemblyLists)
            this.$nextTick(() => {
                this.save()
            })

        }
    }
};
</script>
<style lang="less" scoped>
</style>