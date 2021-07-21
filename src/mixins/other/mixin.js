// 表单方法
const mixin = {
    data() {
        return {
            singleFileUrl: this.$api.singleFile, //图片上传
            addFunctionOther: {
                onInputChange: this.onInputChange,
                onInputChangeOther: this.onInputChangeOther,
                onInputChangeSize: this.onInputChangeSize,
                onInputChangeNumber: this.onInputChangeNumber,
                onSlider: this.onSlider,
                onBlurFun: this.onBlurFun,
                onFileUpload: this.onFileUpload,
                onChangeColor: this.onChangeColorOther,
                iconDel: this.iconDel,
                iconAdd: this.iconAdd,
                onChange: this.onChange,
                onClickIcon: this.onClickIcon,
                onSwitch: this.onSwitch,
                onChangeFont: this.onChangeFont,
                onChangeFontSize: this.onChangeFontSize,
                onChangeFontColor: this.onChangeFontColor,
                onChangeFontOpacity: this.onChangeFontOpacity,
                onInputChangeTitleMargin: this.formChange,
                onPaddingLR: this.formChange,
                onChangeBorderWidth: this.formChange,
                formChange: this.formChange,
                onSwitchAnimation: this.onSwitchAnimation
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
        updateItem(extend, code) {
            let obj = {
                ...this.chooseItme,
                [code]: extend
            }
            this.updateChooseItme(obj, code)
        },
        /** other */
        onInputChange(e, code) {
            let value = e.target.value
            let obj = {
                ...this.chooseItme,
            }
            obj[code] = value
            this.changeExtend('baseDataForm', code, value)
            this.updateChooseItme(obj, code)
        },
        onSlider(value, item) {
            this.changeExtend('baseDataForm', item.code, value)
            this.updateItem(this.extend, 'extend')
        },
        onBlurFun(e, code) {
            let value = e.target.value || ''
            if (this.$refs.configDataForm) {
                this.updateIMG(value, code)
            } else {
                this.updatePage(value, 'backgroundImage')
            }
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
        updateIMG(path, code) {
            this.updateExtendItem('path', path)
            this.changeExtend('configDataForm', code, path)
        },
        onInputChangeOther(e) {
            let value = e.target.value.trim()
            if (value == '') {
                value = ' '
            }
            this.updateExtendItem('textContent', value)
            this.changeExtend('configDataForm', 'textContent', value)
        },
        onInputChangeSize(e, item) {
            let value = e.target ? e.target.value.trim() : e
            if (value == '') {
                value = ' '
            }
            let code = item.code ? item.code : item
            // console.log(code, value)
            this.updateExtendItemKeys(code, value + 'px', 'styleOption')
            this.changeExtend('configDataForm', code, value)
        },
        iconDel() {
            this.$message.warn('功能开发中')
        },
        iconAdd() {
            this.$message.warn('功能开发中')
        },
        onChange(value, item) {
            this.updateExtendItem(item.code, value)
            if (item.slot == 'color') {
                this.changeExtend('configDataForm', item.code + 'Color', value.indexOf('#') == 0 ? value : '#' + value)
                this.changeExtend('configDataForm', item.code, value, value.indexOf('#') == 0 ? value.substring(1) : value)
            } else {
                this.changeExtend('configDataForm', item.code, value)
            }
        },
        onChangeColorOther(e, item) {
            let color = e.target.value
            if (!((color.indexOf('#') == 0 && color.length == 7) || (color.indexOf('#') == -1 && color.length == 6))) {
                return
            }
            this.onChange(color, item)
        },
        onSwitch(value, item) {
            this.changeFormItem('configDataForm', item.code, 'disabled', !value)
        },
        onClickIcon() {

        },
        onChangeFont(value, item) {
            this.updateExtendItemKeys(item.code, value, 'styleOption')
            this.changeExtend('configDataForm', item.code, value)
        },
        onChangeFontSize(value, item) {
            this.updateExtendItemKeys(item.code, value + 'px', 'styleOption')
            this.changeExtend('configDataForm', item.code, value)
        },
        onChangeFontColor(e, item) {
            let color = e.target.value
            if (!((color.indexOf('#') == 0 && color.length == 7) || (color.indexOf('#') == -1 && color.length == 6))) {
                return
            }
            color = color.indexOf('#') == 0 ? color.substring(1) : color
            if (!item.otherColor) {
                let code = item.code.replace('Color', '').replace('Hex', '')
                this.updateExtendItemKeys(code + 'Color', '#' + color, 'styleOption')
                this.changeExtend('configDataForm', code + 'Color', '#' + color)
                this.changeExtend('configDataForm', code + 'Hex', color)
            } else {
                if (item.code.indexOf('Hex') > -1) {
                    this.updateExtendItemKeys(item.otherColor, '#' + color, 'styleOption')
                    this.changeExtend('configDataForm', item.otherColor, '#' + color)
                    this.changeExtend('configDataForm', item.code, color)
                } else {
                    this.updateExtendItemKeys(item.code, '#' + color, 'styleOption')
                    this.changeExtend('configDataForm', item.code, '#' + color)
                    this.changeExtend('configDataForm', item.otherColor, color)
                }
            }
        },
        formChange(value, code) {
            this.updateExtendItemKeys(code, value + 'px', 'styleOption')
            this.changeExtend('configDataForm', code, value)
        },
        onInputChangeNumber(value, code) {
            this.updateExtendItem(code, value)
            this.changeExtend('animationForm', code, value)
        },
        onSwitchAnimation(value, item) {
            this.updateExtendItem(item.code, value)
            this.changeExtend('animationForm', item.code, value)
            setTimeout(() => {
                this.changeFormItem('animationForm', item.code, 'defaultValue', value)
            }, 0)
        },
        /** other */
    }
}

export { mixin }