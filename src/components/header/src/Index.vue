<template>
    <div class="fx_controlManagement">
        <!-- 图层 -->
        <div class="width200 paddingL16">
            <boxs :groupItme="layerItem" @onClickFun="onClickFun"></boxs>
        </div>
        <!-- 布局容器 -->
        <div class="width250">
            <boxs :groupItme="layoutItem" @onClickFun="onClickFun"></boxs>
        </div>
        <div class="fx_headCenter">
            <boxs :groupItme="canvasItem" @onClickFun="onClickFun"></boxs>
            <div class="fx_headerName">
                {{ name }} 
                <span v-if="updateTime" class="fx_updateTimeInfo">保存于{{ updateTime }}</span>
            </div>
        </div>
        <div>
            <boxs :groupItme="pageSettingItem" @onClickFun="onClickFun"></boxs>
        </div>
        <release-modal :visible="visible == 'release'" :title="title" @handleCancel="handleCancel" @changeType="changeType"></release-modal>
        <publish-modal :visible="visible == 'publish'" @handlePubCancel="handleCancel" @handlePubOk="handlePubOk"></publish-modal>
    </div>
</template>

<script>
import boxs from "@c/header/src/Boxs.vue";
import releaseModal from "@c/header/src/Release.vue"
import publishModal from "@c/header/src/Publish.vue"
import { layers } from "@cf/dictionary";
import { mapState } from "vuex";
export default {
    name: "header-con",
    data() {
        return {
            layerItem: this.$flineFunction.deepClone(layers.layerItem),
            layoutItem: this.$flineFunction.deepClone(layers.layoutItem),
            canvasItem: this.$flineFunction.deepClone(layers.canvasItem),
            pageSettingItem: this.$flineFunction.deepClone(layers.pageSettingItem),
            visible: '',
            title: ''
        };
    },
    props: {
        name: {
            type: String,
            default: ""
        }
    },
    computed: {
        ...mapState(["isLayerShow", "updateTime"])
    },
    inject: ['save', 'updateJson', 'revokeFun', 'recoveryFun'],
    components: {
        boxs,
        releaseModal,
        publishModal
    },
    watch: {
        isLayerShow: {
            handler(newObj, oldObj) {
                this.layoutItem.forEach(element => {
                    element.checked = newObj[element.name];
                });
            },
            immediate: true,
            deep: true
        }
    },
    mounted() {},
    methods: {
        onClickFun(index, item) {
            this[item.funName](index, item);
        },
        layerFun(index) {
            this.layerItem[index].checked = !this.layerItem[index].checked;
        },
        layoutFun(index, item) {
            let isShow = this.layoutItem[index].checked;
            this.layoutItem[index].checked = !isShow;
            this.$store.commit("updateShow", {
                name: item.name,
                value: !isShow
            });
        },
        canvasFun(index) {
            this.canvasItem[index].checked = !this.canvasItem[index].checked;
        },
        pageSettingFun(index, item) {
            let type = item.type;
            let obj = {
                revoke: () => {
                    //撤销
                    this.revokeFun()
                },
                recovery: () => {
                    // 恢复
                    this.recoveryFun()
                },
                del: () => {},
                snapshot: () => {},
                help: () => {},
                consoleDesk: () => {},
                save: () => {
                    // 保存
                    this.save()
                    this.updateJson()
                },
                release: () => {
                    // 发布
                    this.visible = window.staticContentConfig.status == 3 ? 'release' : 'publish'
                    this.title = '发布'
                },
                preview: () => {
                    // 预览 先保存
                    this.save()
                    this.updateJson()
                    setTimeout(() => {
                        let routeUrl = this.$router.resolve({
                            name: "draw",
                            params: {
                                id:window.staticContentConfig.id,
                                systemName: window.staticContentConfig.systemName
                            }
                        });
                        window.open(routeUrl.href, '_blank');
                    }, 500)
                }
            };

            obj[type] && obj[type]();
        },
        handleCancel() {
            this.visible = ''
        },
        handlePubOk() {
            this.visible = 'release'
        },
        changeType(value) {
            this.visible = 'publish'
        }
    }
};
</script>
<style lang="less" scoped>
.fx_updateTimeInfo {
    font-size: 12px;
    transform: scale(0.7);
}
</style>