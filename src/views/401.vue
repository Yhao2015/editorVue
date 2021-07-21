<!--
 * @Author: yuanhao
 * @Date: 2021-07-14 14:47:29
 * @LastEditTime: 2021-07-21 14:51:09
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \flinev-editor-vue\src\views\401.vue
-->
<!-- 401 -->
<template>
    <div>
        <a-row class='marginT200' type="flex" justify="center" align="middle">
            <a-col :span='10' >
                <img src="@a/image/401.svg" width="100%"/>
            </a-col>
            <a-col :span='8'>
                <div class='fx_errorCode'>401</div>
                <div class='fx_errorInfo'>抱歉，无访问权限</div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            
        };
    },
    methods:{
    }
}
</script>
<style lang='less' scoped>
.marginT200{
    margin-top:200px;
}
.fx_errorCode {
    font-size: 96px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #17233d;
    line-height: 135px;
}
.fx_errorInfo {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #515a6e;
    line-height: 22px;
    margin-bottom: 30px;
}
</style>