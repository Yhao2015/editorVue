/*
 * @Author: yuanhao
 * @Date: 2021-07-13 14:44:39
 * @LastEditTime: 2021-07-21 18:17:41
 * @LastEditors: yuanhao
 * @Description: 图层右击按键操作
 * @FilePath: \flinev-editor-vue\src\mixins\layer\index.js
 */
const menuFun = {
    data() {
        return {
        }
    },
    methods: {
        /**
         * @description: 操作是否可以执行
         * @param {*} item
         * @return {*}
         */
        setDisabled(item) {
            if (!this.chooseLayers || this.chooseLayers && this.chooseLayers.length == 0) {
                return true
            }
            let isTasks = false
            this.chooseLayers.map(el => {
                if (el.tasks) {
                    isTasks = true
                }
            })
            if (isTasks && (item.name == '成组' || item.name == '收藏')) {
                return true
            }
            if (!isTasks && item.name == '取消成组') {
                return true
            }
            // if (!isTasks && item.name == '单独显示图层') {
            //     return true
            // }
            return false;
        },
        /**
         * @description: 图标显示隐藏 解锁 加锁
         * @param {*} item
         * @return {*}
         */
        showHideFun(item) {
            if (!(item.name == '显示' || item.name == '隐藏' || item.name == '解锁' || item.name == '锁定' || item.name == '单独显示图层' || item.name == '显示全部图层')) {
                return true
            }

            let count = 0, count_lock = 0, count_single = 0

            // 获取多少个显示多少隐藏
            if (this.chooseLayers && this.chooseLayers.length) {
                this.chooseLayers.map(el => {
                    if (Object.keys(el).includes('isShow')) {
                        if (el.isShow) {
                            count++
                        }
                    } else if (Object.keys(el).includes('show')) {
                        if (!el.show) {
                            count++
                        }
                    }
                    if (el.isLock) {
                        count_lock++
                    }
                    if (el.isSingle) {
                        count_single++
                    }

                })

                if (this.chooseLayers.length == count) {
                    if (item.name == '显示') {
                        return true
                    }
                    if (item.name == '隐藏') {
                        return false
                    }
                }

                if (this.chooseLayers.length == count_lock) {
                    if (item.name == '解锁') {
                        return true
                    }
                    if (item.name == '锁定') {
                        return false
                    }
                }

                if (this.chooseLayers.length == count_single) {
                    if (item.name == '显示全部图层') {
                        return true
                    }
                    if (item.name == '单独显示图层') {
                        return false
                    }
                }
            }

            if (item.name == '显示' || item.name == '解锁' || item.name == '显示全部图层') {
                return false
            }
            if (item.name == '隐藏' || item.name == '锁定' || item.name == '单独显示图层') {
                return true
            }
        },
        /**
         * @description: 成组 取消成组等操作
         * @param {*} item
         * @return {*}
         */
        onClickIcon(item) {
            if (this.chooseLayers.length == 0) {
                this.contextMenuVisible = false
                return
            }
            let fun = {
                // 置顶
                iconzhiding: () => {
                    this.ups();
                },
                // 置底
                iconzhidi: () => {
                    this.downs();
                },
                // 上移一层
                iconshangyiceng: () => {
                    this.moveUp();
                },
                // 下移一层
                iconxiayiceng: () => {
                    this.moveDown();
                },
                // 成组
                iconbianzu: () => {
                    this.isGroup();
                },
                // 取消成组
                iconquxiaochengzu: () => {
                    // 只有组可以取消成组
                    this.isGroupCancel();
                },
                // 锁定
                iconsuoding: () => {
                    let activeIds = this.findActiveIds([...this.chooseLayers])
                    let assemblyLists = this.updateShowHide([...this.assemblyLists], 'isLock', false)
                    this.assemblyLists = assemblyLists
                    this.updateItmeShowHide(activeIds, false, 'isLock')
                },
                // 解锁
                iconjiesuo: () => {
                    let activeIds = this.findActiveIds([...this.chooseLayers])
                    let assemblyLists = this.updateShowHide([...this.assemblyLists], 'isLock', true)
                    this.assemblyLists = assemblyLists
                    this.updateItmeShowHide(activeIds, true, 'isLock')
                },
                // 隐藏
                iconyincang: () => {
                    let activeIds = this.findActiveIds([...this.chooseLayers])
                    let assemblyLists = this.updateShowHide([...this.assemblyLists], 'isShow', false)
                    this.assemblyLists = assemblyLists
                    this.updateItmeShowHide(activeIds, false, 'show')
                },
                // 显示
                iconxianshi: () => {
                    let activeIds = this.findActiveIds([...this.chooseLayers])
                    let assemblyLists = this.updateShowHide([...this.assemblyLists], 'isShow', true)
                    this.assemblyLists = assemblyLists
                    this.updateItmeShowHide(activeIds, true, 'show')
                },
                // 单独显示图层
                iconxianshidangetuceng: () => {
                    let activeIds = this.findActiveIds([...this.chooseLayers])
                    let assemblyLists = this.updateShowHide([...this.assemblyLists], 'isSingle', false)
                    this.assemblyLists = assemblyLists
                    this.updateItmeShowLayers(activeIds, false, 'isSingle')
                },
                iconquxiaoxianshidangetuceng: () => {
                    // let activeIds = this.findActiveIds([...this.chooseLayers])
                    let assemblyLists = this.updateShowHide([...this.assemblyLists], 'isSingle', true)
                    this.assemblyLists = assemblyLists
                    this.updateItmeShowLayers([], true, 'isSingle')
                },
                // 重命名
                iconzhongmingming: () => {
                    let assemblyLists = this.rename()
                    this.assemblyLists = assemblyLists
                },
                // 复制
                iconfuzhi: () => {
                    this.copy()
                },    
                // 删除
                iconshanchu: () => {
                    this.chooseLayers.map(el => {
                        this.delUpdata(el.id)
                    })
                },
                // 收藏
                iconshoucang: () => {
                    this.$message.warn("功能开发中，敬请期待");
                }
            };

            fun[item.iconName] && fun[item.iconName]();
            this.contextMenuVisible = false;
            this.$nextTick(() => {
                if (item.iconName != 'iconzhongmingming') {
                    this.save()
                }
                this.$forceUpdate()
            })
        },
        // 上移
        moveUp() {
            this.assemblyLists = this.changeLayer(
                null,
                (layers, activeId) => {
                    let newData = [...layers];
                    let index = newData.findIndex(t => t.id == activeId);
                    if (index > 0) {
                        let temp = newData.filter(t => t.id == activeId)[0];
                        if (temp) {
                            newData.splice(index, 1); //删除当前节点
                            newData.splice(index - 1, 0, temp); // 插入节点
                            return newData;
                        }
                    }
                }
            );
            this.contextMenuVisible = false;
        },
        // 下移
        moveDown() {
            this.assemblyLists = this.changeLayer(
                null,
                (layers, activeId) => {
                    let newData = [...layers];
                    let index = newData.findIndex(t => t.id == activeId);
                    if (index > -1 && index < newData.length - 1) {
                        let temp = newData.filter(t => t.id == activeId)[0];
                        if (temp) {
                            newData.splice(index, 1); //删除当前节点
                            newData.splice(index + 1, 0, temp);
                            return newData;
                        }
                    }
                }
            );
            this.contextMenuVisible = false;
        },
        // 置顶
        ups() {
            this.assemblyLists = this.changeLayer(
                null,
                (layers, activeId) => {
                    let newData = [...layers];
                    let index = newData.findIndex(t => t.id == activeId);
                    if (index > 0) {
                        let temp = newData.filter(t => t.id == activeId)[0];
                        if (temp) {
                            newData.splice(index, 1); //删除当前节点
                            newData.splice(0, 0, temp); // 插入节点
                            return newData;
                        }
                    }
                }
            );
            this.contextMenuVisible = false;
        },
        // 置底
        downs() {
            this.assemblyLists = this.changeLayer(
                null,
                (layers, activeId) => {
                    let newData = [...layers];
                    let index = newData.findIndex(t => t.id == activeId);
                    if (index > -1 && index < newData.length - 1) {
                        let temp = newData.filter(t => t.id == activeId)[0];
                        if (temp) {
                            newData.splice(index, 1); //删除当前节点
                            newData.splice(newData.length, 0, temp);
                            return newData;
                        }
                    }
                }
            );
            this.contextMenuVisible = false;
        },
        // 复制
        copy() {
            let temp = this.copyLayer()
            this.assemblyLists = [...temp]
            this.copyCanvas(this.chooseLayers, this.mapIds)
        },
        copyLayer(newData) {
            newData = newData || [...this.assemblyLists];
            let temp = [];
            newData.map(el => {
                this.chooseLayers.map(t => {
                    if (t.id == el.id) {
                        let obj = { ...el }
                        let id = new Date().getTime()
                        obj.id = id
                        this.mapIds = {
                            [el.id]: id
                        }
                        temp.push(el, obj)
                    } else if (el.tasks && el.tasks.length > 0) {
                        let tasks = this.copyLayer(el.tasks)
                        el.tasks = tasks
                        temp.push(el)
                    } else {
                        temp.push(el)
                    }
                })
            })
            return temp
        },
        isChooseGroup(newData) {
            newData = newData || [...this.assemblyLists];
            let temp = new Array(),
                tIndex = -1,
                id = null;
            newData.map((el, index) => {
                if (el.tasks && el.tasks.length) {
                    let tasks = this.isChooseGroup(el.tasks);
                    el.tasks = tasks;
                    temp[index] = el;
                } else {
                    if (this.chooseLayers.findIndex(t => t.id == el.id) == -1) {
                        temp[index] = el;
                    } else {
                        // 首次出现位置
                        if (tIndex == -1) {
                            tIndex = index;
                            id = new Date().getTime();
                            temp[tIndex] = {
                                id: id,
                                name: "组",
                                iconType: "iconbianzu",
                                tasks: [el]
                            };
                        } else {
                            temp[tIndex].tasks.push(el);
                        }
                    }
                }
            });

            this.ids = temp.filter(el => el.id == id);
            return temp;
        },
        // 成组
        isGroup() {
            let assemblyLists = this.isChooseGroup();
            this.assemblyLists = assemblyLists.filter(el => el);
            this.chooseLayers = [...this.ids];
        },
        isChooseGroupCancel(newData) {
            newData = newData || [...this.assemblyLists];
            let temp = new Array()
            newData.map((el, index) => {
                if (this.chooseLayers.findIndex(t => t.id == el.id) == -1) {
                    if (el.tasks && el.tasks.length) {
                        let tasks = this.isChooseGroupCancel(el.tasks);
                        if (tasks.length) {
                            el.tasks = tasks;
                        }
                    }
                    temp[index] = el;
                } else {
                    this.ids = el.tasks;
                    temp[index] = [...el.tasks];
                }
            });
            return temp;
        },
        isGroupCancelChange(newData) {
            let assemblyLists = [];
            newData.map((el) => {
                if (el instanceof Array) {
                    assemblyLists = [...assemblyLists, ...el]
                } else {
                    if (el.tasks && el.tasks.length) {
                        let tasks = this.isGroupCancelChange(el.tasks)
                        el.tasks = tasks
                    }
                    assemblyLists = [...assemblyLists, el]
                }
            })
            return assemblyLists
        },
        // 取消成组
        isGroupCancel() {
            let assemblyList = this.isChooseGroupCancel();
            let assemblyLists = this.isGroupCancelChange(assemblyList);
            this.assemblyLists = assemblyLists;
            this.chooseLayers = [...this.ids];
        },
        // 删除
        delUpdata(id) {
            let assemblyList = this.delUpdataListTask(this.$flineFunction.deepClone(this.assemblyLists), id)
            this.assemblyLists = assemblyList
            let ids = this.chooseLayers.map(el => el.id)
            this.delItem(ids)
        },
        delUpdataListTask(assemblyList = [], id) {
            if (assemblyList.length == 0) {
                return 
            }
            let index = assemblyList.findIndex(el => el.id == id);
            let assemblyLists = [];
            if (index == -1) {
                assemblyList.map(element => {
                    if (element.tasks && element.tasks.length) {
                        let tasks = this.delUpdataListTask(element.tasks, id);
                        if (tasks.length != 0) {
                            element.tasks = tasks;
                        }
                    }
                    assemblyLists.push(element);
                });
            } else {
                assemblyList.splice(index, 1);
                assemblyLists = assemblyList;
            }
            return assemblyLists;
        },
        // 更新show false
        updateShowHide(newData, name, flag) {
            newData = newData || [...this.assemblyLists];
            let temp = newData.map(t => {
                this.chooseLayers.map(el => {
                    if (el.id == t.id) {
                        t[name] = !flag
                    } 
                    if (t.tasks && t.tasks.length) {
                        this.updateShowHide(t.tasks)
                    }
                })
                return t
            })
            return temp
        },
        changeLayer(newData, fun) {
            newData = newData || [...this.assemblyLists];
            let temp = [];
            let activeId = this.chooseLayers[0].id;
            newData.map((t, index) => {
                if (t.id == activeId) {
                    temp = fun(newData, activeId);
                    return;
                } else {
                    if (t.tasks && t.tasks.length) {
                        let tasks = this.changeLayer(t.tasks, fun);
                        if (tasks.length) {
                            t.tasks = tasks;
                        }
                    }
                    temp.push(t);
                }
            });
            // 去重
            temp = this.unique(temp);
            return temp;
        },
        unique(temp) {
            let arr = [];
            let newData = [];
            temp.map(t => {
                if (arr.indexOf(t.id) == -1) {
                    arr.push(t.id);
                    newData.push(t);
                }
            });
            return newData;
        },
        // 查找所有 id
        findActiveIds(chooseLayers) {
            let activeIds = []
            chooseLayers.map((el) => {
                if (el.tasks && el.tasks.length) {
                    let temp = this.findActiveIds(el.tasks)
                    activeIds = [...activeIds, ...temp]
                } else {
                    activeIds.push(el.id)
                }
            })
            return activeIds
        },
        // 重命名
        rename(newData, flag = true) {
            newData = newData || [...this.assemblyLists];
            let activeId = this.chooseLayers && this.chooseLayers.length && this.chooseLayers[0].id || '';
            let temp = newData.map(el => {
                if (!flag) {
                    el.rename = flag

                    if (el.tasks && el.tasks.length) {
                        let tasks = this.rename(el.tasks, false)
                        el.tasks = tasks
                    }
                } else {
                    if (el.id == activeId) {
                        el.rename = flag
                    } else if (el.tasks && el.tasks.length) {
                        let tasks = this.rename(el.tasks)
                        el.tasks = tasks
                    }
                }
                return el
            })
            return temp
        },
        renameSave(value, newData) {
            newData = newData || [...this.assemblyLists]
            let activeId = this.chooseLayers[0].id
            let temp = [];
            newData.map(el => {
                if (el.id == activeId) {
                    el.alias = value
                } else if (el.tasks && el.tasks.length) {
                    let tasks = this.renameSave(value, el.tasks)
                    el.tasks = tasks
                }
                temp.push(el)
            })
            return temp
        }
    }
}

export { menuFun }
