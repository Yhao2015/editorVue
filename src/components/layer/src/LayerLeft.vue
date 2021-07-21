<template>
    <div class="fx_layerLeft" @click.stop="onPageClick">
        <div class="fx_title fx_justifyBetween">
            <span>图层</span>
            <span class="fx_pointer" @click="onLayoutFun">
                <a-icon type="left" class="colorBBC9D4" />
            </span>
        </div>
        <div class="fx_flex padding8">
            <div class="fx_iconFont" title="置顶" @click.stop="ups">
                <icon-font
                    type="iconshangyiceng"
                    :class="['icon', 'fontSize8']"
                />
            </div>
            <div class="fx_iconFont" title="置底" @click.stop="downs">
                <icon-font
                    type="iconxiayiceng"
                    :class="['icon', 'fontSize8']"
                />
            </div>
            <div class="fx_iconFont" title="上一层" @click.stop="moveUp">
                <icon-font type="iconzhiding" :class="['icon', 'fontSize8']" />
            </div>
            <div class="fx_iconFont" title="下一层" @click.stop="moveDown">
                <icon-font type="iconzhidi" :class="['icon', 'fontSize8']" />
            </div>
        </div>
        <div ref="nestedDraggable" :style="{'margin-left': '-16px','height': 'calc(100% - 105px)', 'overflow': 'auto'}">
            <nested-draggable
                :tasks="assemblyLists"
                :chooseLayers="chooseLayers"
            />
        </div>
        <div :class="['fx_btnLeft', 'width200', {'fx_disabled' : !chooseLayers.length}]" @click.stop="(event) => event.preventDefault()">
            <div :class="['marginR8 fx_flexAlign', showIconFun('iconxianshidangetuceng')]" :style="{'padding': '2px 4px'}" @click="iconFun('iconxianshidangetuceng')">
                <icon-font type="iconxianshidangetuceng" class="icon"/>
            </div>
            <div class="fx_flex">
                <div :class="['marginR8 fx_flexAlign', showIconFun('iconyincang')]" :style="{'padding': '2px 4px'}" @click="iconFun('iconyincang')">
                    <icon-font type="iconyincang1" class="icon"/>
                </div>

                <div :class="['marginR8 fx_flexAlign', showIconFun('iconsuoding')]" :style="{'padding': '2px 4px'}" @click="iconFun('iconsuoding')">
                    <icon-font type="iconsuoding" class="icon"/>
                </div>
            </div>
        </div>
        <context-menu
            class="right-menu"
            :target="contextMenuTarget"
            :show="contextMenuVisible"
            @update:show="show => (contextMenuVisible = show)"
        >
            <div
                v-for="(item, index) in iconFonts"
                :key="index"
                class="fx_iconFontDiv"
                :disabled="setDisabled(item)"
                v-show="showHideFun(item) && chooseLayers.length"
                @click.stop="onClickIcon(item)"
            >
                <icon-font
                    :type="item.iconName"
                    :class="['icon', 'fontSize8']"
                />
                <span class="colorfff marginL8">{{ item.name }}</span>
            </div>
        </context-menu>
    </div>
</template>

<script>
import { mapState } from "vuex";
import nestedDraggable from "./Nested-draggable.vue";
import { dictionary } from "@cf/dictionary";
import { menuFun } from '@m/layer'
export default {
    name: "layer-left",
    data() {
        return {
            assemblyLists: [],
            contextMenuTarget: null, //绑定的dom
            contextMenuVisible: false, //右键显示隐藏
            iconFonts: this.$flineFunction.deepClone(dictionary.iconFonts),
            chooseLayers: [], //选择图层集合
            ids: null,
            mapIds: {}
        };
    },
    watch: {
        layerLeftAdd(val) {
            let obj = {
                alias: val.alias,
                name: val.name,
                iconType: val.iconType,
                id: val.id,
                type: val.type,
                code: val.code
            };
            this.assemblyLists.push(obj);
        },
        layerLeftDel(val) {
            this.delUpdata(val.id)
        },
        layerLayout: {
            handler(val) {
                this.assemblyLists = (val && this.$flineFunction.deepClone(val)) || [];
            },
            deep: true,
            immediate: true
        },
        assemblyList: {
            handler(val) {
                let chooseLayers = val.filter(el => el.active)
                this.chooseLayers = chooseLayers.map(el => {
                    return this.assemblyLists.filter(t => t.id == el.id)[0]
                })
            },
            deep: true
        },
        chooseLayers: {
            handler(val) {
                this.$store.commit('setChooseLayers', val)
            },
            deep: true
        }
    },
    computed: {
        ...mapState([
            "assemblyList",
            "isLayerShow",
            "layerLayout",
            "layerLeftAdd",
            "layerLeftDel"
        ])
    },
    components: {
        nestedDraggable
    },
    mixins: [ menuFun ],
    inject: ["updateItmeActive", "delItem", "save", "updateItmeShowHide", "updateItmeShowLayers", "copyCanvas"],
    provide() {
        return {
            onClickLayerItem: this.onClickLayerItem,
            onClickIcon: this.onClickIcon,
            onClickOpenClose: this.onClickOpenClose,
            renameSave: this.renameSave
        };
    },
    mounted() {
        setTimeout(() => {
            this.contextMenuTarget = this.$refs.nestedDraggable;
        },0)
    },
    methods: {
        onLayoutFun() {
            let isLayerLeft = this.isLayerShow.isLayerLeft;
            this.$store.commit("updateShow", {
                name: "isLayerLeft",
                value: !isLayerLeft
            });
        },
        onPageClick(event) {
            this.rename(null, false)
            if(this.chooseLayers.length == 0) {
                event.preventDefault()
                return
            }
            this.chooseLayers = []
            this.updateItmeActive(); // 更新选中状态
        },
        // 选中这个图层对应的items
        selectLayer(newData) {
            newData = newData || [...this.assemblyLists];
            let temp = [];
            let activeId = this.chooseLayers[0].id;  // 在同一个图层
            newData.map(t => {
                if (t.id == activeId) {
                    temp = newData;
                }
                if (t.tasks && t.tasks.length) {
                    temp = [...temp, ...this.selectLayer(t.tasks)];
                }
            });
            return temp;
        },
        onClickOpenClose(item) {
            if (item.tasks && item.tasks.length > 0) {
                item.isOpen = !item.isOpen
            }
        },
        // 点击选中
        onClickLayerItem(item) {
            this.rename(null, false)
            let activeIds = null;
            if (window.event && window.event.ctrlKey) {
                // 多选
                // 判断一开始是否有选择图层
                if (this.chooseLayers.length == 0) {
                    this.chooseLayers = [item];
                    return;
                }
                // 组和图层不能同时选中
                if (item.tasks && item.tasks.length) {
                    this.chooseLayers = [item];
                    return;
                }
                // 组和图层不能同时选中
                if(this.chooseLayers && this.chooseLayers[0].tasks && this.chooseLayers[0].tasks.length && !item.tasks) {
                    this.chooseLayers = [item];
                    return;
                }
                //获取图层集合
                let temp = this.selectLayer();
                let flag = false;
                // 判断当前选中的是否在该集合中
                temp.map(t => {
                    if (t.id == item.id) {
                        flag = true;
                    }
                });
                // 组和图层不能同时选中
                if (
                    temp.length == 0 &&
                    this.chooseLayers &&
                    this.chooseLayers[0].tasks &&
                    this.chooseLayers[0].tasks.length
                ) {
                    this.chooseLayers = [item];
                    return;
                }
                if (!flag) {
                    return;
                }
                let chooseLayers = [...this.chooseLayers];
                let tIndex = chooseLayers.findIndex(t => t.id == item.id);
                tIndex == -1
                    ? (chooseLayers = [...chooseLayers, item])
                    : chooseLayers.splice(tIndex, 1);
                this.chooseLayers = chooseLayers;
                activeIds = this.chooseLayers.map(t => {
                    return t.id;
                });
            } else {
                // 单选
                this.chooseLayers = [item];
                if (item.tasks && item.tasks.length > 0) {
                    activeIds = item.tasks.map(t => {
                        return t.id;
                    });
                } else {
                    activeIds = [item.id]
                }
            }
            this.updateItmeActive(activeIds); // 更新选中状态
        },
        iconFun(name) {
            if(this.chooseLayers.length == 0) {
                return
            }
            let obj = {
                'iconxianshidangetuceng': () => {
                    let flag = this.showHideFun({name: '单独显示图层'}) 
                    let iconName = !flag ? 'iconquxiaoxianshidangetuceng' : 'iconxianshidangetuceng'
                    this.onClickIcon({iconName: iconName})
                },
                'iconyincang': () => {
                    let flag = this.showHideFun({name: '隐藏'})
                    let iconName = !flag ? 'iconxianshi' : 'iconyincang'
                    this.onClickIcon({iconName: iconName})
                },
                'iconsuoding': () => {
                    let flag = this.showHideFun({name: '锁定'})
                    let iconName = !flag ? 'iconjiesuo' : 'iconsuoding'
                    this.onClickIcon({iconName: iconName})
                }
            }

            return obj[name] && obj[name]()
        },
        showIconFun(name) {
            if(this.chooseLayers.length == 0) {
                return ''
            }

            let obj = {
                'iconxianshidangetuceng': () => {
                    let flag = this.showHideFun({name: '单独显示图层'}) 
                    return !flag ? 'fx_addClass' : ''
                },
                'iconyincang': () => {
                    let flag = this.showHideFun({name: '隐藏'})
                    return !flag ? 'fx_addClass' : ''
                },
                'iconsuoding': () => {
                    let flag = this.showHideFun({name: '锁定'})
                    return !flag ? 'fx_addClass' : ''
                }
            }

            return obj[name] && obj[name]()
        }
    }
};
</script>
<style lang="less" scoped>
@background-7: rgb(102, 102, 102);
/deep/ .icon {
    color: #fff;
}

.fx_btnLeft{
    width: calc(100% - 32px);
    height: 30px;
    display: flex;
    justify-content: space-between;
    margin: 0 16px;
    align-items: center;
    background: #20242A;

    .icon, .icon svg, /deep/.ant-space-item{
        cursor: pointer;
    }
}

.fx_disabled {
    opacity: .4;
}

.fx_addClass {
    background: #2681ff;
    
}
</style>