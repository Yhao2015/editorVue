<template>
    <div class="fx_canvasBox">
        <div class="fx_wrapper">
            <!-- 卡尺 -->
            <sketch-rule
                :lang="lang"
                :thick="thick"
                :scale="scale"
                :width="width"
                :height="height"
                :startX="startX"
                :startY="startY"
                :shadow="shadow"
                :palette="palette"
                :horLineArr="lines.h"
                :verLineArr="lines.v"
                :cornerActive="true"
                @handleLine="handleLine"
            />
            <div
                ref="screensRef"
                @wheel="handleWheel"
                class="fx_screens"
                @scroll="handleScroll"
                @mousedown="onMove"
            >
                <div
                    v-if="isCanvasContainer"
                    :class="['fx_canvasContainer', { move: iskeyCode }]"
                    :style="canvasStyle"
                    @dragover="allowDrop"
                    ref="canvasContainer"
                    @click.self="onCanvasPage"
                    @drag="onDragCanvas"
                >
                    <vdr
                        v-for="item in assemblyList"
                        v-show="item.show && item.isSingle"
                        :id="item.id"
                        :key="item.id"
                        :w="item.width"
                        :h="item.height"
                        :x="Number(item.clientX)"
                        :y="Number(item.clientY)"
                        :active="item.active"
                        :z="item.zindex || 1"
                        :parent="true"
                        :draggable="item.isLock ? true : false"
                        :resizable="item.isLock ? true : false"
                        :debug="false"
                        :isConflictCheck="false"
                        :snap="true"
                        :prevent-deactivation="true"
                        :snapTolerance="20"
                        :handle-info="{size: 8, offset: -5, switch: true}"
                        :scale-ratio="0.6"
                        class="fx_assembly"
                        @activated="onActivated(item)"
                        @resizing="onResize"
                        @dragging="onDrag"
                        @refLineParams="getRefLineParams"
                    >
                        <assembly-group :assemblyInfo="item"/>
                    </vdr>
                    <!--辅助线-->
                    <span
                        class="ref-line v-line"
                        v-for="(item, index) in vLine"
                        v-show="item.display"
                        :key="'vline' + index"
                        :style="{
                            left: item.position,
                            top: item.origin,
                            height: item.lineLength
                        }"
                    />
                    <span
                        class="ref-line h-line"
                        v-for="(item, index) in hLine"
                        v-show="item.display"
                        :key="'hline' + index"
                        :style="{
                            top: item.position,
                            left: item.origin,
                            width: item.lineLength
                        }"
                    />
                    <!--辅助线END-->
                    <div class="fx_info">
                        <a-space>
                            <span>按住空格可拖动画布</span>
                            <span>{{rectWidth}}</span>
                            <span>{{rectHeight}}</span>
                        </a-space>
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
                        @click.stop="onClickMenu(item)"
                    >
                        <icon-font
                            :type="item.iconName"
                            :class="['icon', 'fontSize8']"
                        />
                        <span class="colorfff marginL8">{{ item.name }}</span>
                    </div>
                </context-menu>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import assemblyGroup from "@c/canvas/src/AssemblyGroup.vue";
import { dictionary } from "@cf/dictionary";
import { menuFun } from '@m/layer'

export default {
    name: "canvas-area",
    data() {
        return {
            vLine: [],
            hLine: [], 
            // 标尺
            lang: "zh-CN", // 中英文
            thick: 30, //高度
            scale: 1, //缩放比例
            width: 0,
            height: 0,
            startX: -100, //开始位置
            startY: -100,
            shadow: {
                // 阴影
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
            lines: {
                //线
                h: [],
                v: []
            },
            palette: {
                bgColor: "#222222",
                longfgColor: "#333333",
                shortfgColor: "#333333",
                fontColor: "#666666",
                shadowColor: "#E8E8E8",
                lineColor: "#666666",
                borderColor: "#DADADC"
                // cornerActiveColor: 'rgb(235, 86, 72, 0.6)'
            },
            horLineArr: [],
            // 标尺 end
            isCanvasContainer: true,
            assemblyList: [], //组件集合
            heightDrop: 0, //画布高度
            activeId: null, //当前选中的组件
            activeMap: {}, //选中组件信息
            contextMenuTarget: null, //绑定的dom
            contextMenuVisible: false, //自定义菜单是否显示
            rectWidth: 1920,
            rectHeight: 1080,
            // rectleft: 0,
            // recttop: 0,
            iskeyCode: false, //是否按住空格
            scrollLeft: 0,
            scrollTop: 0,
            fun: null, //防抖方法
            backgroundColor: "#181b24",
            backgroundImage: "",
            iconFonts: this.$flineFunction.deepClone(dictionary.iconFonts),
            isActivated: false, // 选中模式，不去触发移动事件
            multiple: false // 多选模式
        };
    },
    components: {
        assemblyGroup
    },
    mixins: [ menuFun ],
    props: {
        pageInfo: {
            type: Object,
            default: () => {}
        }
    },
    inject: ["save", "updateJson", "revokeFun", "recoveryFun"],
    watch: {
        dragInfo: {
            handler(obj) {
                Object.keys(obj).length && this.add(obj);
            },
            deep: true
        },
        pageInfo: {
            handler(obj) {
                this.rectWidth = obj.rectWidth
                this.rectHeight = obj.rectHeight
                this.backgroundColor = obj.backgroundColor
                this.backgroundImage = obj.backgroundImage
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        canvasStyle() {
            let obj = {
                left: this.scrollLeft + "px",
                top: this.scrollTop + "px",
                width: this.rectWidth + "px",
                height: this.rectHeight + "px",
                transform: `scale(${this.scale})`,
                "background-color": this.backgroundColor,
                "background-image": `url(${this.backgroundImage})`,
                "background-repeat": "no-repeat",
                "background-size": "100% 100%",
                position: "relative"
            }
            if(this.backgroundColor.indexOf('linear-gradient') > -1) {
                obj.background = this.backgroundColor
            } 
            if(this.backgroundImage) {
                obj.background = `url(${this.backgroundImage}) no-repeat 100% 100%`
            }
            return obj;
        },
        ...mapState(["dragInfo", "chooseLayers"])
    },
    mounted() {
        this.initCanvas();
        this.addEvent()
        setTimeout(() => {
            this.contextMenuTarget = this.$refs.canvasContainer;
            document.getElementById("mb-ruler").getElementsByTagName("a")[0].style.border = "0";
        }, 0);
    },
    methods: {
        onMove(e) {
            if (!this.iskeyCode) {
                return;
            }
            let odiv = e.target;
            let disX = e.clientX - odiv.offsetLeft;
            let disY = e.clientY - odiv.offsetTop;
            document.onmousemove = e => {
                //鼠标按下并移动的事件
                let left = e.clientX - disX;
                let top = e.clientY - disY;
                odiv.style.left = left + "px";
                odiv.style.top = top + "px";
            };
            document.onmouseup = e => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        addEvent() {
            // 绑定键盘事件
            window.addEventListener("keydown", event => {
                if (event.keyCode == 46) {
                    this.activeId && this.delBtn();
                    //删除
                    return false;
                }
                if (event.keyCode == 32) {
                    // 空格
                    this.iskeyCode = true;
                    return false;
                }
                if(window.event && window.event.ctrlKey && event.keyCode == 83) {
                    // 保存 ctrl + s
                    this.save()
                    this.updateJson()
                    // let updateTime = this.$flineFunction.dateFormat(new Date(), 'hh:mm:ss')
                    // this.$store.commit("updateTime", updateTime);
                    event.preventDefault()
                    return false 
                }
                if(window.event && window.event.ctrlKey && event.keyCode == 90) {
                    // 撤销 ctrl + z
                    this.revokeFun()
                    // let updateTime = this.$flineFunction.dateFormat(new Date(), 'hh:mm:ss')
                    // this.$store.commit("updateTime", updateTime);
                    event.preventDefault()
                    return false 
                }

                if(window.event && window.event.ctrlKey && event.keyCode == 89) {
                    // 恢复 ctrl + y
                    this.recoveryFun()
                    // let updateTime = this.$flineFunction.dateFormat(new Date(), 'hh:mm:ss')
                    // this.$store.commit("updateTime", updateTime);
                    event.preventDefault()
                    return false 
                }
            });
            window.addEventListener("keyup", event => {
                if (event.keyCode == 32) {
                    this.iskeyCode = false;
                    return false;
                }
            });
        },
        initCanvas() {
            this.$nextTick(() => {
                this.initSize();
            });
        },
        allowDrop(ev) {
            ev.preventDefault();
        },
        saveJson() {
            this.$nextTick(() => {
                this.save()
            })
        },
        add(obj) {
            //清空重置
            this.$store.commit("updateDragInfo", {});
            let canvasDrop = document
                .getElementsByClassName("fx_canvasContainer")[0]
                .getBoundingClientRect();

            let left = (obj.clientX - canvasDrop.left) / this.scale;
            let right = (obj.clientY - canvasDrop.top) / this.scale;

            //坐标校准
            if (left < 0) {
                left = 0;
            }
            if (left > canvasDrop.width / this.scale - obj.width) {
                left = canvasDrop.width / this.scale - obj.width;
            }
            if (right < 0) {
                right = 0;
            }
            if (right > canvasDrop.height / this.scale - obj.height) {
                right = canvasDrop.height / this.scale - obj.height;
            }

            obj.clientX = parseInt(left);
            obj.clientY = parseInt(right);
            obj.id = new Date().getTime();
            obj.active = false;
            obj.show = true; // 显示
            obj.isLock = true; // 解锁
            obj.isSingle = true; // 显示

            if (this.$store.state.isParentId) {
                let isParentId = this.$store.state.isParentId;
                let parentId = isParentId.split("_");
                this.$store.state.isParentId = "";
                this.assemblyList.map(t => {
                    if (t.id == parentId[0]) {
                        t.children[parentId[1]] = obj;
                    }
                });
            } else {
                this.assemblyList.push(obj);
            }
            // 新增删除 更新左侧图层
            this.$store.commit("layertAdd", obj);
            this.$store.commit("updateLayer", this.assemblyList);
            this.saveJson()
        },
        getRefLineParams(params) {
            const { vLine, hLine } = params;
            this.vLine = vLine;
            this.hLine = hLine;
        },
        onResize(x, y, width, height) {
            if(this.isActivated) {
                this.isActivated = false
                return
            }
            if(!this.activeId) {
                return
            }
            this.activeMap = {
                x,
                y,
                width,
                height,
                activeId: this.activeId
            };
            if (this.fun) {
                clearTimeout(this.fun);
            }
            this.fun = setTimeout(() => {
                //相等意味着位置不在发生变化
                if (
                    this.activeId &&
                    this.activeId == this.activeMap.activeId &&
                    this.activeMap.width == width &&
                    this.activeMap.height == height
                ) {
                    this.activeMap = {};
                    let temp = this.assemblyList.filter(
                        item => item.id == this.activeId
                    )[0];
                    if (temp) {
                        temp.clientX = x;
                        temp.clientY = y;
                        temp.width = width;
                        temp.height = height;
                        // this.$store.commit("updateLayer", this.assemblyList);
                        this.onActivated(temp);
                        this.saveJson();
                    }
                }
            }, 100);
        },
        onDrag(x, y) {
            if(this.isActivated) {
                this.isActivated = false
                return
            }
            if(!this.activeId) {
                return
            }
            this.activeMap = {
                x,
                y,
                activeId: this.activeId
            };
            if (this.fun) {
                clearTimeout(this.fun);
            }
            this.fun = setTimeout(() => {
                //相等意味着位置不在发生变化
                if (
                    this.activeId &&
                    this.activeId == this.activeMap.activeId &&
                    this.activeMap.x == x &&
                    this.activeMap.y == y
                ) {
                    this.activeMap = {};
                    let temp = this.assemblyList.filter(
                        item => item.id == this.activeId
                    )[0];
                    if (temp) {
                        temp.clientX = x;
                        temp.clientY = y;
                        // this.$store.commit("updateLayer", this.assemblyList);
                        this.onActivated(temp);
                        this.saveJson();
                    }
                }
            }, 100);
        },
        // 组件选中事件
        onActivated(item) {
            this.isActivated = true
            let assemblyList = this.$flineFunction.deepClone(this.assemblyList)
            if(window.event && window.event.ctrlKey) {
                // 多选
                this.multiple = true
                assemblyList.forEach(element => {
                    if(element.id == item.id) {
                        element.active = true
                    }
                });
            }
            if(this.multiple) {
                // 多选
                this.activeId = null
                if(!this.$parent.isLayerClick) {
                    this.$store.commit("updateLayer", assemblyList);
                }
                this.$store.commit("updateChoose", null); // 右侧配置项
                this.$nextTick(() => {
                    this.multiple = false
                    this.$parent.isLayerClick = false
                })
                return
            }
            // 单选
            this.activeId = item.id;
            this.onDeactivated();
            item.extend.baseDataForm = {
                ...item.extend.baseDataForm,
                clientX: item.clientX,
                clientY: item.clientY,
                height: item.height,
                width: item.width
            };
            this.$store.commit("updateChoose", item);
            this.$store.commit("updateShow", {
                name: 'isSetting',
                value: true
            });
            
            if(!this.$parent.isLayerClick) {
                // 判断图层点击还是画布点击
                this.$store.commit("updateLayer", this.assemblyList);
            } else {
                this.$parent.isLayerClick = false
            }
        },
        // 组件失去焦点事件
        onDeactivated() {
            this.assemblyList = this.assemblyList.length && this.assemblyList.map(el => {
                el.active = el.id == this.activeId
                return el
            })
            this.$forceUpdate();
        },
        //删除
        delBtn() {
            let index = this.assemblyList.findIndex(t => t.id == this.activeId);
            let obj = this.assemblyList[index]
            this.assemblyList.splice(index, 1);
            this.contextMenuVisible = false;
            this.activeId = null;
            this.onDeactivated();
            // 新增删除 更新左侧图层
            this.$store.commit("layerDel", obj);
            this.$store.commit("updateChoose", null);
            this.saveJson();
        },
        onCanvasPage() {
            this.activeId = null;
            this.onDeactivated();
            this.$store.commit("updateChoose", null);
        },
        // 按住空格键移动
        onDragCanvas(event) {},
        // 辅助线
        handleLine(lines) {
            this.lines = lines;
        },
        handleScroll() {
            const screensRect = document.getElementsByClassName("fx_screens")[0].getBoundingClientRect();
            const canvasRect = document.getElementsByClassName("fx_canvasContainer")[0].getBoundingClientRect();
            // 标尺开始的刻度
            const startX = (screensRect.left + this.thick / (window.innerWidth / 1920) -  canvasRect.left) / this.scale;
            const startY = (screensRect.top + this.thick / (window.innerHeight / 1080) -  canvasRect.top) / this.scale;
            this.startX = startX >> 0;
            this.startY = startY >> 0;
        },
        // 控制缩放值
        handleWheel(e) {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const nextScale = parseFloat(Math.max(0.2,this.scale - e.deltaY / this.rectHeight).toFixed(2));
                this.scale = nextScale;
                this.$parent.sliderValue = Number((nextScale * 100).toFixed(0))
            }
            this.$nextTick(() => {
                this.handleScroll();
            }); 
        },
        // 初始化
        initSize() {
            const borderWidth = 1;
            this.width = 1920 - (this.thick + borderWidth) / (window.innerWidth /  1920);
            this.height = 1080 - (this.thick + borderWidth) / (window.innerHeight / 1080);
            const wrapperRect = document.getElementsByClassName("fx_canvasBox")[0].getBoundingClientRect();
            //缩放比例
            this.scale = ((wrapperRect.width - 30) * 0.9 / this.rectWidth) / (window.innerWidth / 1920)
            this.$parent.sliderValue = Number((this.scale * 100).toFixed(0))
            let scrollLeft = parseInt(((window.innerWidth - wrapperRect.width - 30) / 2) / (window.innerWidth / 1920))
            let scrollTop = parseInt(((window.innerHeight - wrapperRect.height - 30 - 38) / 2) / (window.innerHeight / 1080))
            this.scrollLeft = 65
            this.scrollTop = 65
            this.$nextTick(() => {
                this.handleScroll();
            });
        },
        onClickMenu(item) {
            this.$emit('onClickMenu', item)
            this.contextMenuVisible = false
        }
    }
};
</script>

<style lang="less" scoped>
/deep/ .action {
    color: #fafafa;
}

/deep/ .icon {
    color: #fff;
}

.fx_canvasContainer {
    transform-origin: 0px 0px 0px;
}
</style>