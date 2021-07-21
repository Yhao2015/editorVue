import moment from 'moment';
const fileMethods = {
    data() {
        return {
            fileList: [],
            header: {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        }
    },
    methods: {
        moment,
        //获取所有表单数据
        getFieldsValue() {
            var params = this.form.getFieldsValue()
            return params
        },
        //获取某个表单数据
        getFieldValue(key) {
            return this.form.getFieldValue(key)
        },
        //清空表单
        resetFields() {
            this.form.resetFields()
        },
        //批量设置表单数据
        setFieldsValue(datas) {
            var formData = this.getFieldsValue();//防止表单没有对应数据
            for (var item in formData) {
                if (datas[item]) {
                    this.setFieldValue(item, datas[item])
                } else if (item.indexOf('_theDate') > 1) {
                    this.setFieldValue(item, datas[item.replace('_theDate', '')])
                } else if (item.indexOf('_theDateRange') > -1) {
                    this.setFieldValue(item, datas[item.replace('_theDateRange', '')])
                }
            }
        },
        //设置表单单个数据
        setFieldValue(key, data) {
            if (key.indexOf('_theDate') > -1) {
                this.form.setFieldsValue({
                    [key]: data ? moment(data) : null
                })
            } else if (key.indexOf('_theDateRange') > -1) {
                this.form.setFieldsValue({
                    [key]: data ? [moment(data[0]), moment(data[1])] : []
                })
            } else {
                this.form.setFieldsValue({
                    [key]: data
                })
            }
        },
        //调用父页面方法
        emitFunction(funName, datas, code) {
            this.formFunctionList[funName](datas, code)
        },
        //调用父页面校验方法
        checkFunction(rule, value, callback, checkFunName, funParams) {
            this.formFunctionList[checkFunName](rule, value, callback, funParams)
        },
        //表单校验
        checkForm(callback) {
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    callback()
                }
            })
        },
        loadData(selectedOptions) {
            this.formFunctionList.loadingFunName(selectedOptions)
        },
        //select过滤方法
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
        //select  change事件调用父页面方法
        selectFormChange(e, option, changeFunName, code) {
            this.formFunctionList[changeFunName](e, option, code)
        },
        //input等  change事件调用父页面方法
        formChange(e, changeFunName, code) {
            this.formFunctionList[changeFunName](e, code)
        },
        //重新校验单个表单元素
        checkFormItem(fields, options, callback) {
            this.form.validateFields(fields, options, callback);
        },
        //移除文件
        handleRemove(file) {
            const index = this.fileList.indexOf(file);
            const newFileList = this.fileList.slice();
            newFileList.splice(index, 1);
            this.fileList = newFileList
        },
        //上传文件
        beforeUpload(file) {
            this.fileList = [file]
            return false;
        }
    }
}

export { fileMethods }