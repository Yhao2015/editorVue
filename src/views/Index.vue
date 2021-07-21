<template>
    <div class="fx_EditCon" :style="transformStyle">
        <header-con :name="name"></header-con>
        <!-- 图层管理区域 -->
        <div class="fx_main">
            <!-- 图层 -->
            <div class="width200 fx_layerArea" v-if="isLayerShow.isLayerLeft">
                <layer-left ref="layerLeft"/>
            </div>
            <!-- 布局容器 -->
            <div class="width250 fx_layerArea" v-if="isLayerShow.isLayerRight">
                <layer-right />
            </div>
            <!-- 画布区域 -->
            <div class="fx_canvas">
                <div class="fx_tools" v-if="isLayerShow.isTools">
                    <div class="fx_tool marginL8 noPadding">
                        <a-select show-search :filter-option="this.$flineFunction.filterOption" class="width200" :placeholder='"请选择"' @change="handleChange">
                            <a-select-option :key="index" :value="item.id" v-for="(item,index) in assemblyList">{{ item.alias || item.name}}</a-select-option>
                        </a-select>
                    </div>
                    <div class="fx_tool marginL8" @click="refreshCanvas">
                        <a-icon type="sync" class="marginR8"/>刷新画布
                    </div>
                    <div class="fx_tool marginL8" @click="resetCanvas">
                        <a-icon type="fullscreen" class="marginR8"/>重置画布大小
                    </div>
                </div>
                <canvas-area ref="canvasArea" @onClickMenu="onClickMenu" :pageInfo="pageInfo"/>
                <div class="fx_sliderBtn">
                    <a-space>
                        <a-icon type="minus" @click="decline"/>
                        <a-slider :min="0" :max="100" v-model="sliderValue" class="width200" @change="handleSliderChange" />
                        <a-icon type="plus" @click="increase"/>
                    </a-space>
                </div>
            </div>
            <!-- 控件配置区域 -->
            <div class="width350 fx_control" v-if="isLayerShow.isSetting">
                <control-area ref="controlArea" :pageInfo="pageInfo"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { assemblySetting, containerSetting, pageInfo } from "@cf/setting";

export default {
    data() {
        return {
            findJsonUrl: this.$api.findJson,
            findTemplateJsonUrl: this.$api.findTemplateJson,
            updateJsonUrl: this.$api.updateJson,
            updateTemplateJsonUrl: this.$api.updateTemplateJson,
            pageInfo, //页面信息
            name: "",
            // templateContent: [], //组件信息
            id: 0, // 0:新增
            innerHeight: window.innerHeight,
            innerWidth: window.innerWidth,
            Timer: null, //定时保存配置信息
            // nowTime: null, //当前保存的时间戳
            sliderValue: 0,
            isLayerClick: false,
            visibility: true //当前窗口激活状态
        };
    },
    computed: {
        transformStyle() {
            return {
                width: this.innerWidth + "px",
                height: this.innerHeight + "px",
                overflow: "hidden"
            };
        },
        ...mapState(["isLayerShow", "assemblyList"])
    },
    watch: {
        isShow: {
            handler() {
                //改变画布大小
                this.$refs.canvasArea.initCanvas();
            },
            deep: true
        }
    },
    provide() {
        return {
            updateChooseItme: this.updateChooseItme,
            updateItmeActive: this.updateItmeActive,
            updatePage: this.updatePage,
            delItem: this.delItem,
            save: this.save,
            updateJson: this.updateJson,
            setTemplateContent: this.setTemplateContent,
            revokeFun: this.revokeFun,
            recoveryFun: this.recoveryFun,
            updateItmeShowHide: this.updateItmeShowHide,
            updateItmeShowLayers: this.updateItmeShowLayers,
            copyCanvas: this.copyCanvas,
            updateTemplateAlias: this.updateTemplateAlias
        };
    },
    mounted() {
        window.staticContentConfig.userId = this.$route.params.userId || 1
        window.staticContentConfig.id = this.$route.params.id || 1
        window.staticContentConfig.systemName = this.$route.params.systemName || 'space-station' // space-station 空间站 monitor-station 监管中心
        this.getInfo();
        this.setTimer();
        this.addListener()
        // 禁止鼠标右键
        document.oncontextmenu = function(){
        　　return false;
        }
    },
    methods: {
        addListener() {
            window.addEventListener("resize", () => {
                this.innerHeight = window.innerHeight;
                this.innerWidth = window.innerWidth;
            });
            let hiddenProperty = 'hidden' in document ? 'hidden' :    
            'webkitHidden' in document ? 'webkitHidden' :    
            'mozHidden' in document ? 'mozHidden' :    
            null;
            let visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
            // 当前窗口激活状态才会去触发定时请求
            window.addEventListener("visibilitychange", () => {
                if (!document[hiddenProperty]) {
                    // 回来
                    this.visibility = true
                    this.setTimer()
                } else {
                    // 离开
                    this.visibility = false
                    if (this.Timer) {
                        clearTimeout(this.Timer);
                    }
                }
            })
            
        },
        // 搜索图层
        handleChange(value) {
            this.updateItmeActive([value])
            this.$store.commit("updateLayer", this.$refs.canvasArea.assemblyList);
        },
        onClickMenu(item) {
            this.$refs.layerLeft.onClickIcon(item)
        },
        // 刷新
        refreshCanvas() {
            this.$refs.canvasArea.isCanvasContainer = false
            setTimeout(() => {
                this.$refs.canvasArea.isCanvasContainer = true
            }, 200)
        },
        // 重置
        resetCanvas(sliderValue) {
            if(!sliderValue || typeof sliderValue == 'object') {
                const wrapperRect = document.getElementsByClassName("fx_canvasBox")[0].getBoundingClientRect();
                let scale = ((wrapperRect.width - 30) * 0.9 / this.$refs.canvasArea.rectWidth) / (window.innerWidth / 1920)
                this.$refs.canvasArea.scale = scale
                this.sliderValue = Number((scale * 100).toFixed(0))
            } else{
                this.$refs.canvasArea.scale = sliderValue / 100
            }
            this.$nextTick(() => {
                this.$refs.canvasArea.handleScroll();
            });
        },
        // 减
        decline() {
            this.sliderValue -= 1
            this.resetCanvas(this.sliderValue)
        },
        // 加
        increase() {
            this.sliderValue += 1
            this.resetCanvas(this.sliderValue)
        },
        handleSliderChange(value) {
            this.resetCanvas(value)
        },
        getInfo() {
            let pathUrl = window.staticContentConfig.systemName == "monitor-station" ? `${this.findTemplateJsonUrl}${window.staticContentConfig.id}` : `${this.findJsonUrl}${window.staticContentConfig.id}`
            this.$get(pathUrl).then(res => {
                if (res.code == 200) {
                    let datas = res.data
                    if(!datas) {
                        return
                    }
                    this.name = datas.name;
                    window.staticContentConfig.status =  window.staticContentConfig.systemName == "monitor-station" ? datas.templateStatus :  datas.status
                    let basicsSetting = datas.content ? JSON.parse(datas.content) : {};
                    if (typeof basicsSetting == "string") {
                        basicsSetting = JSON.parse(basicsSetting);
                    }
                    this.setTemplateContent(basicsSetting)
                }
            });
        },
        setTemplateContent(basicsSetting) {
            basicsSetting.templateContent.forEach(t => {
                if (t.type.indexOf('gauge') > -1) {
                    let funcStr = t.extend.chartOption.formatter;
                    if(funcStr) {
                        t.extend.chartOption.formatter = eval("(false || " + funcStr + ")");
                    }
                    return t;
                }
            });
            // 页面信息
            let pageInfo = basicsSetting.pageInfo;
            this.pageInfo = pageInfo;
            // 图层信息
            let layerLayout= basicsSetting.layerLayout || []
            this.$store.commit('updateLayout', layerLayout)

            // 画布图层信息
            let templateContent = basicsSetting.templateContent;
            templateContent = templateContent.map(t => {
                t = {
                    ...t,
                    ...t.style,
                    chartOption: t.extend.chartOption,
                    extraOption: t.extend.extraOption || {}
                };
                let type = t.type;
                if (
                    type == "inline" ||
                    type == "horizontal" ||
                    type == "vertical"
                ) {
                } else {
                    let typeGroup = type.split("&");
                    if (typeGroup.length > 1) {
                    } else {
                        t.extend.configDataForm = {
                            ...t.extend.configDataForm,
                            ...t.extend.chartOption
                        };
                    }
                }
                delete t.extend.chartOption;
                t.clientX = t.positionX;
                t.clientY = t.positionY;
                return t;
            });
            this.$refs.canvasArea.assemblyList = templateContent;
            this.$store.commit("updateLayer", templateContent);
        },
        // 更新配置
        updateChooseItme(obj, code) {
            let assemblyList = this.$refs.canvasArea.assemblyList;
            // console.log('assemblyList', assemblyList)
            assemblyList.map(t => {
                if (t.id == obj.id) {
                    t[code] = obj[code];
                }
            });
            this.save();
        },
        // 切换选中状态
        updateItmeActive(activeIds = []) {
            this.isLayerClick = true
            this.$refs.canvasArea.multiple = activeIds.length > 1 ? true : false
            let assemblyList = this.$flineFunction.deepClone(this.$refs.canvasArea.assemblyList);
            assemblyList.forEach(element => {
                element.active = false
                activeIds.map(el => {
                    if(element.id == el) {
                        element.active = true
                    }
                })
            });
            this.$refs.canvasArea.assemblyList = assemblyList
            this.$nextTick(() => {
                window.postMessage("reloadFun");
            })
        },
        // 切换显示隐藏
        updateItmeShowHide(activeIds = [], isShowHide, name) {
            let assemblyList = this.$flineFunction.deepClone(this.$refs.canvasArea.assemblyList);
            let item = null
            assemblyList = assemblyList.map(element => {
                activeIds.map(el => {
                    if(element.id == el) {
                        element[name] = isShowHide
                        item = element
                    }
                })
                return element
            })
            this.$refs.canvasArea.assemblyList = assemblyList
            if( name == 'isLock' && isShowHide) {
                this.$store.commit("updateChoose", item)
            } else if(name == 'isLock' && !isShowHide) {
                this.$store.commit("updateChoose", null)
            }
            this.$nextTick(() => {
                window.postMessage("reloadFun");
            })
        },
        updateItmeShowLayers(activeIds = [], isShowHide, name) {
            let assemblyList = this.$flineFunction.deepClone(this.$refs.canvasArea.assemblyList);
            assemblyList.forEach(element => {
                element[name] = isShowHide
                activeIds.map(el => {
                    if(element.id == el) {
                        element[name] = !isShowHide
                    }
                })
            })
            this.$refs.canvasArea.assemblyList = assemblyList
            this.$nextTick(() => {
                window.postMessage("reloadFun");
            })
        },
        updateTemplateAlias(lists = []) {
            let assemblyList = this.$flineFunction.deepClone(this.$refs.canvasArea.assemblyList);
            assemblyList = assemblyList.map(element => {
                let temp = lists.filter(el => el.id == element.id)[0]
                if(temp) {
                    element.alias = temp.alias
                }
                return element
            })
            this.$refs.canvasArea.assemblyList = assemblyList
            this.$nextTick(() => {
                window.postMessage("reloadFun");
                let item = assemblyList.filter(el => el.id == this.$refs.canvasArea.activeId)[0]
                if(item) {
                    this.$store.commit("updateChoose", item)
                }
            })
        },
        // 更新页面信息
        updatePage(value, code) {
            this.$refs.canvasArea[code] = value;
            pageInfo[code] = value;
            this.save();
        },
        // 删除
        delItem(activeId) {
            this.$refs.canvasArea.activeId = null
            this.$store.commit("updateChoose", null);
            let assemblyList = this.$flineFunction.deepClone(this.$refs.canvasArea.assemblyList || []);
            activeId.map(el => {
                let index = assemblyList.findIndex(t => t.id == el);
                if(index > -1) {
                    assemblyList.splice(index, 1);
                }
            })
            this.$refs.canvasArea.assemblyList = assemblyList
            this.$nextTick(() => {
                this.save()
            })
        },
        copyCanvas(chooseLayers, mapIds) {
            let assemblyList = this.$flineFunction.deepClone(this.$refs.canvasArea.assemblyList);
            let newData = [...assemblyList]
            assemblyList.map(el => {
                chooseLayers.map(t => {
                    if(el.id == t.id) {
                        let obj = {...el}
                        obj.id = mapIds[el.id]
                        obj.clientX = 0
                        obj.clientY = 0
                        obj.active = false;
                        obj.show = true; // 显示
                        obj.isLock = true; // 解锁
                        obj.isSingle = true; // 显示
                        newData.push(obj)
                    }
                })
            })
            this.$refs.canvasArea.assemblyList = newData
            this.$nextTick(() => {
                this.save()
            })
        },
        // 实时保存
        save() {
            let assemblyList = this.$refs.canvasArea && this.$refs.canvasArea.assemblyList || []
            let fun = chartOption => {
                let obj = {};
                for (let key in chartOption) {
                    if (chartOption[key] instanceof Function) {
                        obj[key] = chartOption[key].toString();
                    } else {
                        obj[key] = chartOption[key];
                    }
                }
                return obj;
            };
            let settingJson = {}, templateContent = [];
            assemblyList.length && assemblyList.map(assemblyItem => {
                let assembly = { ...assemblyItem };
                let type = assembly.type;
                if (
                    type == "inline" ||
                    type == "horizontal" ||
                    type == "vertical"
                ) {
                    settingJson = {
                        ...containerSetting,
                        id: assembly.id,
                        name: assembly.name,
                        type: assembly.type,
                        style: {
                            positionX: assembly.clientX,
                            positionY: assembly.clientY,
                            width: assembly.width,
                            height: assembly.height
                        },
                        extend: {
                            cssStyle: assembly.cssStyle,
                            mode: assembly.mode
                        },
                        children: json.children
                    };
                } else {
                    let typeGroup = type.split("&");
                    settingJson = {
                        ...assemblySetting,
                        id: assembly.id,
                        name: assembly.name,
                        alias: assembly.alias,
                        iconType: assembly.iconType,
                        show: assembly.show,
                        isLock: assembly.isLock,
                        isSingle: assembly.isSingle,
                        type: type,
                        style: {
                            positionX: assembly.clientX,
                            positionY: assembly.clientY,
                            width: assembly.width,
                            height: assembly.height
                        },
                    }
                    
                    if (typeGroup.length > 1) {
                        //图表
                        settingJson = {
                            ...settingJson,
                            extend: {
                                chartOption: fun(assembly.chartOption),
                                extraOption: assembly.extraOption,
                                width: assembly.width,
                                height: assembly.height,
                                ...assembly.extend
                            }
                        };
                    } else {
                        // 非图表
                        settingJson = {
                            ...settingJson,
                            extend: {
                                chartOption: fun(assembly.chartOption),
                                width: assembly.width,
                                height: assembly.height,
                                ...assembly.extend
                            }
                        };
                    }
                    if(assembly.extend.selectType == '2' || assembly.extend.selectType == '3') {
                        settingJson.extend.chartOption.seriesData = []
                    }
                }
                // console.log('settingJson', settingJson)
                templateContent.push(settingJson);
            });

            let layerLayout = []
            if(this.$refs.layerLeft) {
                this.$refs.layerLeft.rename(null, false)
                layerLayout = this.$refs.layerLeft.assemblyLists || []
            }

            let basicsSetting = {
                pageInfo: { ...pageInfo }, // 页面信息
                templateContent: [...templateContent], // 配置信息
                layerLayout: layerLayout //图层信息
            };

            this.setSessionStorage(basicsSetting);
            assemblyList.length && window.postMessage("reloadFun");
        },
        // 保存
        updateJson() {
            if(!this.visibility) {
                return
            }
            this.setTimer()
            this.$store.commit(
                "updateTime",
                this.$flineFunction.dateFormat(new Date(), "hh:mm:ss")
            );
            let orders = sessionStorage.getItem("order");
            if (!orders) {
                return;
            }
            orders = orders.split(",");
            let id = sessionStorage.nowTime || orders[orders.length - 1]
            // this.nowTime = id;
            sessionStorage.nowTime = id
            let basicsSetting = sessionStorage.getItem(id);
            if (!basicsSetting) {
                return;
            }

            let params = {
                id: window.staticContentConfig.id,
                content: basicsSetting
            };
            console.log('basicsSetting', basicsSetting)
            let pathUrl = window.staticContentConfig.systemName == "monitor-station" ? this.updateTemplateJsonUrl : this.updateJsonUrl
            this.$post(pathUrl, params).then(res => {
                if(res.code == 200) {
                    this.$message.success(res.data)
                }
            })
        },
        // 撤销
        revokeFun() {
            let orders = sessionStorage.getItem("order");
            if (!orders) {
                return;
            }
            orders = orders.split(",");
            let nowTime = sessionStorage.getItem("nowTime");
            if (!nowTime) {
                nowTime = orders[orders.length - 1];
            }
            let tindex = orders.findIndex(t => t == nowTime);
            if (tindex == 0) {
                // 第一个，不能撤回
                return;
            }
            let id = orders[tindex - 1]
            sessionStorage.setItem('nowTime', id)
            let configSetting = sessionStorage.getItem(id)
            if(configSetting) {
                this.setTemplateContent(JSON.parse(configSetting))
            }
            let updateTime = this.$flineFunction.dateFormat(new Date(), 'hh:mm:ss')
            this.$store.commit("updateTime", updateTime);
        },
        //恢复
        recoveryFun() {
            let orders = sessionStorage.getItem("order");
            if (!orders) {
                return;
            }
            orders = orders.split(",");
            let nowTime = sessionStorage.getItem("nowTime");
            if (!nowTime) {
                nowTime = orders[orders.length - 1];
            }
            let tindex = orders.findIndex(t => t == nowTime);
            if(tindex == (orders.length - 1)) {
                // 最后一个， 不能恢复
                return
            }
            let id = orders[tindex + 1]
            sessionStorage.setItem('nowTime', id)
            let configSetting = sessionStorage.getItem(id)
            if(configSetting) {
                this.setTemplateContent(JSON.parse(configSetting))
            }
            let updateTime = this.$flineFunction.dateFormat(new Date(), 'hh:mm:ss')
            this.$store.commit("updateTime", updateTime);
        },
        /**
         * @description: 定时器，定时更新保存数据
         * @param {*}
         * @return {*}
         */
        setTimer() {
            if (this.Timer) {
                clearTimeout(this.Timer);
            }
            let num = Number(window.staticContentConfig.setting.time || 2);
            this.Timer = setTimeout(() => {
                this.updateJson();
            }, num * 60 * 1000);
        },
        // 缓存更新 sessionStorage 只存在当前页签，关闭之后清空
        setSessionStorage(basicsSetting) {
            let orders = sessionStorage.getItem("order");
            if (!orders) {
                orders = [];
            } else {
                orders = orders.split(",");
            }
            if(sessionStorage.getItem(orders[orders.length - 1]) == JSON.stringify(basicsSetting)) {
                // 只是选中状态变化，配置未改变
                return
            }
            // TODO 回退、恢复中，继续操作，覆盖后续
            let nowTime = sessionStorage.getItem('nowTime')
            if(nowTime) {
                let tIndex = orders.findIndex(t => t == nowTime)
                if(tIndex != (orders.length - 1)) {
                    let temp = orders.splice((tIndex + 1))
                    temp.map(el => {
                        sessionStorage.removeItem(el)
                    })
                }
            }

            let num = Number(
                window.staticContentConfig.setting.timeCount || 10
            );
            if (orders.length >= num) {
                let oldId = orders.shift();
                sessionStorage.removeItem(oldId);
            }
            let id = new Date().getTime();
            sessionStorage.setItem('nowTime', id)
            orders.push(id);
            sessionStorage.setItem(`${id}`, JSON.stringify(basicsSetting));
            sessionStorage.setItem("order", orders);
        }
    },
    destroyed() {
        if (this.Timer) {
            clearTimeout(this.Timer);
        }
    }
};
</script>

<style lang="less" scoped>
.noPadding {
    padding: 0 !important; 
}
/deep/.ant-select-selection{
    background: #151515;
}
/deep/.ant-select-arrow{
    color: #fafafa;
}
</style>
