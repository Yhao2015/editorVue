<template>
    <div>
        <a-spin :spinning="spinning">
            <a-tabs :tab-position="tabPosition" v-model="activeKey" @tabClick="onChange">
                <a-tab-pane v-for="(item,index) in singleMenu" :key="index">
                    <span slot="tab" class="fx_tabSpan">
                        <a-popover placement="left" :content="item.name">
                            <icon-font :type="item.iconType || 'iconchangguitubiao'" :class="['fontSize20', 'fx_tabText', {'fx_uncheckIcon':activeKey != index},{'fx_checkIcon':activeKey == index}]" />
                        </a-popover>
                    </span>
                    <div class="fx_lists" v-if="!queryText">
                        <div class="fx_headerTitle" @click="onOpen(item)">
                            <a-icon :type="item.isOpen ? 'caret-down' : 'caret-up'" class="fx_uncheckIcon fontSize16" />
                            <a-icon type="appstore" class="fx_uncheckIcon fontSize16 marginL4 marginR8" />
                            全部 ({{item.list && item.list.length || 0}})
                        </div>
                        <ul class="fx_listInfo" v-show="item.isOpen && item.list.length">
                            <li v-for="list in item.list" :key="list.id" class="fx_listBoxSingle" draggable="true" @dragend="ondragend($event,list)">
                                <div class="fx_listTitle" :title="list.name">{{list.name}}</div>
                                <div class="fx_listImg" :style="{'background-image': `url('${list.cover}')`, 'pointer-events': 'none'}" />
                            </li>
                        </ul>
                        <div v-for="(el,indexs) in item.subList" :key="indexs">
                            <div class="fx_headerTitle" @click="onOpen(el)">
                                <a-icon :type="el.isOpen ? 'caret-down' : 'caret-up'" class="fx_uncheckIcon fontSize16" />
                                <icon-font :type="el.iconType" :class="['icon', 'fontSize10', 'marginL4 marginR8']" />
                                {{el.name}} ({{count(item.list, el.id) || 0}})
                            </div>
                            <ul class="fx_listInfo" v-show="el.isOpen && count(item.list, el.id)">
                                <template v-for="(list,j) in item.list">
                                    <li 
                                        :key="'sub_' + j" 
                                        class="fx_listBoxSingle"
                                        v-if="list.monitorGroupId == el.id"
                                        draggable="true" 
                                        @dragend="ondragend($event,list)"
                                    >
                                        <div class="fx_listTitle" :title="list.name">{{list.name}}</div>
                                        <div class="fx_listImg" :style="{'background-image': `url('${list.cover}')`, 'pointer-events': 'none'}"/>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </div>
                    <div class="fx_lists" v-else>
                        <div class="fx_headerTitle" @click="isOpen = !isOpen">
                            <a-icon :type="isOpen ? 'caret-down' : 'caret-up'" class="fx_uncheckIcon fontSize16" />
                            <a-icon type="appstore" class="fx_uncheckIcon fontSize16 marginL4 marginR8" />
                            全部 
                            <span class="fontSize12 marginL4"> (找到{{queryMenu && queryMenu.length || 0}}个相关组件)</span>
                        </div>
                        <ul class="fx_listInfo" v-show="isOpen && queryMenu.length">
                            <li v-for="list in queryMenu" :key="list.id" class="fx_listBoxSingle" draggable="true" @dragend="ondragend($event,list)">
                                <div class="fx_listTitle" :title="list.name">{{list.name}}</div>
                                <div class="fx_listImg" :style="{'background-image': `url('${list.cover}')`, 'pointer-events': 'none'}" />
                            </li>
                        </ul>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </a-spin>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabPosition: 'right',
            activeKey: 0,
            singleMenu: [], //组件
            findAllGroupUrl: this.$api.findAllGroup,
            findGroupUrl: this.$api.findGroup,
            findAllComponentUrl: this.$api.findAllComponent,
            spinning: false,
            menuAll: [], //所有组件信息
            queryMenu: [], //查询的组件列表
            isOpen: false
        }
    },
    props: {
        queryText:{
            type: String,
            default: ''
        }
    },
    watch: {
        queryText(val) {
            if(val) {
                this.findMenu()
            } else {
                this.queryMenu = []
            }
        }
    },
    mounted() {
        this.findAllGroup() // 第一版本：组件区分大小类
        this.findAllMenu() // 第二版本： 获取所有已发布的组件列表，用于组件查询
    },
    methods: {
        count(list, id) {
            return list && list.filter(el => el.monitorGroupId == id).length || 0
        },
        findAllGroup() {
            this.singleMenu = []
            this.$parent.queryText = ''
            this.spinning = true
            this.$get(this.findAllGroupUrl).then(res => {
                if (res.code == 200) {
                    let singleMenu = res.data || []
                    this.singleMenu = [...singleMenu]
                    if (singleMenu.length) {
                        this.findGroup(singleMenu[0].id)
                        this.findAllComponent(singleMenu[0].id)
                    }
                }
                setTimeout(() => {
                    this.spinning = false
                },800)
            })
        },
        findGroup(parentId) {
            this.$get(`${this.findGroupUrl}?parentId=${parentId}`).then(res => {
                if (res.code == 200) {
                    let datas = res.data || []
                    let newData = [...this.singleMenu]
                    let temp = newData.filter(t => t.id == parentId)[0]
                    if (temp) {
                        if(datas.length == 0) {
                            temp.isOpen = true
                        }
                        temp.subList = datas
                        this.singleMenu = newData
                        this.$forceUpdate()
                    }
                }
            })
        },
        findAllComponent(parentId) {
            this.$get(`${this.findAllComponentUrl}?groupParentId=${parentId}&status=3`).then(res => {
                if (res.code == 200) {
                    let datas = res.data || []
                    let newData = [...this.singleMenu]
                    let temp = newData.filter(t => t.id == parentId)[0]
                    if (temp) {
                        temp.list = datas
                        this.singleMenu = newData
                        this.$forceUpdate()
                    }
                }
            })
        },
        onChange(key) {
            this.$emit('onTabChange')
            this.activeKey = key
            let temp = this.singleMenu[key]
            //判断数据是否已查询
            if (!temp.subList) {
                temp.subList = []
                this.findGroup(temp.id)
            }
            if (!temp.list) {
                temp.list = []
                this.findAllComponent(temp.id)
            }
        },
        ondragend(event, list) {
            this.$emit('ondragend', event, list)
        },
        // 获取数量
        findTypeNum(type, list) {
            let temp = list.filter(t => {
                let typeGroup = t.type.split('&')
                return typeGroup[0] == type
            })
            return temp ? temp.length : 0
        },
        // 展开或者收起
        onOpen(item) {
            item.isOpen = !item.isOpen
            this.$forceUpdate()
        },
        findAllMenu() {
            this.$get(`${this.findAllComponentUrl}?status=3`).then(res => {
                if (res.code == 200) {
                    let datas = res.data || []
                    this.menuAll = datas
                }
            })
        },
        /**
         * @description: 根据查询条件获取组件列表
         * @param {*}
         * @return {*}
         */
        findMenu() {
            let queryMenu = this.menuAll.filter(el => el.name.indexOf(this.queryText) > -1)
            this.queryMenu = queryMenu
            this.isOpen = true
        }
    }
}
</script>

<style>
</style>