// 表单方法
const mixin = {
    data() {
        return {
            singleFileUrl: this.$api.singleFile, //图片上传
            addFunctionPage: {
                onFileUpload: this.onFileUpload,
                onBlurFun: this.onBlurFun,
                onChangeColor: this.onChangeColor,
                screenSizeChange: this.onScreenSizeChange,
                onSizeChange: this.onSizeChange,
                onReset: this.onReset,
                onZoom: this.onZoom,
                onChangeColorPicker: this.onChangeColorPicker
            }
        }
    },
    inject: ['updateChooseItme', 'updatePage'],
    methods: {
        changeFormItem(formKey, code, key, value) {
            let temp = [...this[formKey]]
            let newData = temp.filter(t => t.code == code)[0]
            if (newData) {
                newData[key] = value
            }
            this[formKey] = temp
        },
        changeExtend(formKey, code, value) {
            // watch 监听 只能修改extend里面的数据
            let extend = this.extend
            if (!extend[formKey]) {
                extend[formKey] = {}
            }
            extend[formKey][code] = value
        },
        updateExtendItem(code, value) {
            let obj = {
                ...this.chooseItme,
            }
            obj.chartOption = {
                ...obj.chartOption,
                [code]: value
            }
            this.updateChooseItme(obj, 'chartOption')
        },
        updateExtendItemKeys(code, value, key) {
            let obj = {
                ...this.chooseItme,
            }
            if (!obj.chartOption || !obj.chartOption[key]) {
                this.updateExtendItem(code, value)
                return
            }
            obj.chartOption[key] = {
                ...obj.chartOption[key],
                [code]: value
            }
            this.updateChooseItme(obj, 'chartOption')
        },
        updateExtraOption(code, value) {
            let obj = {
                ...this.chooseItme,
            }
            obj.extraOption = {
                ...obj.extraOption,
                [code]: value
            }
            this.updateChooseItme(obj, 'extraOption')
        },
        updateExtraOptionKeys(code, value, key) {
            let obj = {
                ...this.chooseItme,
            }
            if (!obj.extraOption || !obj.extraOption[key]) {
                this.updateExtraOption(code, value)
                return
            }
            obj.extraOption[key] = {
                ...obj.extraOption[key],
                [code]: value
            }
            this.updateChooseItme(obj, 'extraOption')
        },
        updateItem(obj, code) {
            this.updateChooseItme(obj, code)
        },
        /** page */
        // 屏幕尺寸 下拉框
        onScreenSizeChange(value, item) {
            let temp = item.filter(t => t.value == value)[0]
            if (temp) {
                if (value == 4) {
                    this.changeFormItem('formConfigData', 'screenSize', 'disabled', false)
                } else {
                    this.changeFormItem('formConfigData', 'screenSize', 'disabled', true)
                }
                this.updatePage(temp.width, 'rectWidth')
                this.updatePage(temp.height, 'rectHeight')
                this.$refs.baseForm.$refs.baseForm.setFieldValue('rectWidth', temp.width)
                this.$refs.baseForm.$refs.baseForm.setFieldValue('rectHeight', temp.height)
            }
        },
        // 输入框
        onSizeChange(e, code) {
            this.updatePage(e.target.value, code)
        },
        onChangeColor(e, item) {
            let color = e.target.value
            if (!((color.indexOf('#') == 0 && color.length == 7) || (color.indexOf('#') == -1 && color.length == 6))) {
                return
            }
            color = color.indexOf('#') == 0 ? color.substring(1) : color
            this.$refs.baseForm.$refs.baseForm.setFieldValue(item.code + 'Color', '#' + color)
            this.$refs.baseForm.$refs.baseForm.setFieldValue(item.code, color)
            this.updatePage('#' + color, 'backgroundColor')
        },
        onReset() {
            // 重置
            this.$refs.baseForm.$refs.baseForm.resetFields()
            this.$refs.baseForm.fileList = []
            this.$refs.baseForm.ImgKey = Math.random()
            this.$nextTick(() => {
                let fieldsValue = this.$refs.baseForm.$refs.baseForm.getFieldsValue()
                let temp = ['backgroundColor', 'backgroundImage', 'rectHeight', 'rectWidth']
                temp.map(code => {
                    if (code == 'backgroundColor') {
                        this.updatePage(fieldsValue[code].indexOf('#') == 0 ? fieldsValue[code] : '#' + fieldsValue[code], code)
                    } else {
                        this.updatePage(fieldsValue[code], code)
                    }
                })
            })

        },
        // 页面缩放
        onZoom(value) {
            this.changeFormItem('formConfigData', 'zoomType', 'defaultValue', value)
        },
        onFileUpload(data) {
            let params = new FormData()
            params.append('file', data.file)
            params.append('fileName', `flinev/space-station/workspace/${window.staticContentConfig.id}/` + data.file.name.split('.')[0])
            this.$post(this.singleFileUrl, params, 'multipart/form-data').then(res => {
                if (res.code == 200) {
                    //其他组件
                    if (this.$refs.configDataForm) {
                        this.$refs.configDataForm.$refs.baseForm.setFieldValue(data.data.code, res.data)
                        this.updateIMG(res.data, data.data.code)
                    } else {
                        //页面
                        this.$refs.baseForm.$refs.baseForm.setFieldValue(data.data.code, res.data)
                        this.updatePage(res.data, 'backgroundImage')
                    }
                }
            })
        },
        onBlurFun(e, code) {
            let value = e.target.value || ''
            if (this.$refs.configDataForm) {
                this.updateIMG(value, code)
            } else {
                this.updatePage(value, 'backgroundImage')
            }
        },
        onChangeColorPicker(value, item) {
            if (typeof value == 'object') {
                value = value.target.value
            } 
            this.updatePage(value, 'backgroundColor')
        }
        /** page */
    }
}

export { mixin }