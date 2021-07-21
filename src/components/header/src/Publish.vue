<!--
 * @Author: yuanhao
 * @Date: 2021-07-15 10:10:07
 * @LastEditTime: 2021-07-20 15:28:47
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \flinev-editor-vue\src\components\header\src\Publish.vue
-->
<template>
    <!-- 驾驶舱点击发布，未发布时显示这个 -->
    <div>
        <a-modal
            class="fx_publishForm"
            title="发布"
            :visible="visible"
            @cancel="handleCancel"
        >
            <div class="fx_flexBox">
                <a-badge status="default" text="未发布" />
                <a href="javascript:;">查看发布教程</a>
            </div>
            <div slot="footer">
                <a-button type="primary" class="fx_publishBtn" :loading="loading" @click="handleOk">发布大屏</a-button>
                <p class="marginT16">发布后，获取大屏分享链接</p>
            </div>
        </a-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            publishUrl: this.$api.publish
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    mounted() {},
    methods: {
        //提交
        handleOk() {
            let params = {
                id: window.staticContentConfig.id,
                actualLink: window.location.origin + '/draw/space-station/' + window.staticContentConfig.id,
                publishDescription: ''
            }
            this.loading = true
            this.$post(this.publishUrl, params).then(res => {
                this.loading = false
                if(res.code == 200) {
                    this.$emit("handlePubOk");
                }
            })
        },
        //关闭
        handleCancel() {
            this.$emit("handlePubCancel");
        }
    }
};
</script>

<style lang="less" scoped>
.fx_publishForm {
    .fx_flexBox {
        display: flex;
        justify-content: space-between;
    }
    /deep/.ant-badge-status-text {
        color: #fff;
    }
    /deep/.ant-modal-footer {
        border-top: 1px solid #303640;
        text-align: left;
    }
    .fx_publishBtn {
        width: 100%;
    }
}

/deep/ .ant-modal-content {
    background: #222222;
    color: #fafafa;

    .ant-modal-header {
        background: #303640;
        color: #fafafa;
        border: 0;

        .ant-modal-title {
            color: #fafafa;
        }
    }
    button.ant-modal-close {
        color: #fafafa !important;
    }

    .ant-switch {
        background: #303640;
    }

    .ant-switch-checked {
        background: linear-gradient(242deg, #2b87ff 4%, #71ebff 83%);
    }
}
</style>