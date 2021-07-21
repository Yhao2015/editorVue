<template>
    <div>
        <div class="fx_verify" v-if="isPassword">
            <img width="100" alt="logo" src="//img.alicdn.com/tfs/TB1TyZBgILJ8KJjy0FnXXcFDpXa-300-300.gif">
            <p>已打开密码保护，请输入密码</p>
            <a-input-password placeholder="请输入密码" v-model="password" @pressEnter="checkPw">
                <a-button slot="addonAfter" type="primary" size="large" @click="checkPw">
                    确定
                </a-button>
            </a-input-password>
            <div class="marginT8" v-show="isErr">
                <a-alert message="密码错误" type="error" />
            </div>
            
        </div>
        <div :style="transformStyle" class="fx_draw" v-else>
            <div :style="drawStyle" class="fx_drawContent">
                <div v-for="(item,index) in templateContent" :key="index" :style="itemStyle(item.style)" class="fx_assemblyItem">
                    <div v-if="item.type == 'horizontal' || item.type == 'vertical' || item.type == 'inline'" class="fx_mode">
                    </div>
                    <assembly-item v-else :extendMap="item.extend" :type="item.type.split('&')[0]" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import assemblyItem from '@c/canvas/src/Assembly.vue';
export default {
    data() {
        return {
            findJsonUrl: this.$api.shareJson,
            findTemplateJsonUrl: this.$api.findTemplateJson,
            pageInfo: {
                rectWidth: 1920,
                rectHeight: 1080,
                backgroundColor: '#181B24',
                backgroundImage: ''
            },
            templateContent: [],
            innerHeight: window.innerHeight,
            innerWidth: window.innerWidth,
            id: '',
            systemName: '',
            // 密码校验
            verificationUrl: this.$api.verification,
            password: '',
            isPassword: false, // 密码校验
            isErr: false //错误提示
        }
    },
    computed: {
        drawStyle() {
            let style = {
                width: this.pageInfo.rectWidth + 'px',
                height: this.pageInfo.rectHeight + 'px',
                'background-color': this.pageInfo.backgroundColor,
                'background-image': `url(${this.pageInfo.backgroundImage})`,
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%'
            }
            if(this.pageInfo.backgroundColor.indexOf('linear-gradient') > -1) {
                style.background = this.pageInfo.backgroundColor
            }
            if(this.pageInfo.backgroundImage) {
                style.background = `url(${this.pageInfo.backgroundImage}) no-repeat 100% 100%`
            }
            return style
        },
        transformStyle() {
            return {
                width: '1920px',
                height: '1080px',
                overflow: 'hidden',
                '-moz-transform-origin': '0 0',
                '-webkit-transform-origin': '0 0',
                ' -o-transform-origin': '0 0',
                transform: 'scale(' + this.innerWidth / 1920 + ', ' + this.innerHeight / 1080 + ')'
            }
        }
    },
    components: {
        assemblyItem
    },
    mounted() {
        this.id = this.$route.params.id || 0
        this.systemName = this.$route.params.systemName || 'space-station'
        let token = this.$route.query.token || ''
        if(token) {
            localStorage.setItem('token', token)
        }
        document.getElementsByClassName('fx_draw')[0].parentNode.style.height = '100vh'
        this.getInfo()
        window.addEventListener('resize', () => {
            this.innerHeight = window.innerHeight
            this.innerWidth = window.innerWidth
        })
    },
    methods: {
        getInfo() {
            let pathUrl = this.systemName == "monitor-station" ? `${this.findTemplateJsonUrl}${this.id}` : `${this.findJsonUrl}${this.id}`
            this.$get(pathUrl).then(res => {
                if (res.code == 200) {
                    if(res.data == false) {
                        // 加密校验密码
                        this.isPassword = true
                        document.getElementsByClassName('fx_draw')[0].parentNode.style.background = '#0f2a41'
                        return
                    }
                    let basicsSetting = res.data.content ? JSON.parse(res.data.content) : {}
                    // 非空判断
                    if(Object.keys(basicsSetting).length == 0) {
                        return
                    }
                    basicsSetting.templateContent.forEach((t) => {
                        if (t.type.indexOf('gauge') > -1 ) {
                            let funcStr = t.extend.chartOption.formatter
                            if(funcStr) {
                                t.extend.chartOption.formatter = eval("(false || " + funcStr + ")")
                            }
                            return t
                        }
                    })
                    this.pageInfo = basicsSetting.pageInfo
                    let templateContent = basicsSetting.templateContent
                    this.templateContent = templateContent
                }
            })
        },
        itemStyle(style) {
            return {
                top: style.positionY + 'px',
                left: style.positionX + 'px',
                width: style.width + 'px',
                height: style.height + 'px'
            }
        },
        checkPw() {
            this.$get(this.verificationUrl, {password: this.password, code: this.id}).then(res => {
                if(res.code == 200) {
                    this.isPassword = false
                    let basicsSetting = res.data.content ? JSON.parse(res.data.content) : {}
                    basicsSetting.templateContent.forEach((t) => {
                        if (t.type.indexOf('gauge') > -1 ) {
                            let funcStr = t.extend.chartOption.formatter
                            if(funcStr) {
                                t.extend.chartOption.formatter = eval("(false || " + funcStr + ")")
                            }
                            return t
                        }
                    })
                    this.pageInfo = basicsSetting.pageInfo
                    let templateContent = basicsSetting.templateContent
                    this.templateContent = templateContent
                }
            })
        }
    },
    destroyed() {
        this.isPassword = false
        
    }
}
</script>

<style lang="less" scoped>
.fx_verify {
    position: absolute;
    top: 50%;
    margin-top: -110px;
    left: 50%;
    margin-left: -130px;
    width: 288px;
    height: 276px;
    text-align: center;

    p {
        color: white;
        font-size: 18px;
        margin-bottom: 20px;
    }

    /deep/.ant-input {
        height: 40px !important;
        background: #ffffff;
    }

    /deep/.ant-input-group-addon{
        padding: 0;
        border: 0;
    }

    /deep/.ant-btn{
        border-radius: 0;
    }
}
</style>