<template>
    <div class="margin16">
        <baseForm :addFunctions='addFunctions' :formConfigBase="formConfigBase" :formConfigData='formConfigData' ref='controlForm'/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            addFunctions: {
                onChangeColor: this.onChangeColor
            },
            formConfigBase: {
                labelCol: { span: 8 },
                wrapperCol: { span: 14 },
                gutter: [16, 8]
            },
            formConfigData: [
                {
                    label: '背景颜色',
                    code: 'backgroundColor',
                    type: '',
                    slot: 'color',
                    required: false,
                    defaultValue: '181B24',
                    funName: 'onChangeColor',
                    show: true
                },
            ]
        }
    },
    inject: ['updateChooseItme'],
    methods: {
        // 修改颜色
        onChangeColor(val) {
            let obj = {
                ...this.chooseItme,
            }
            let fun = {
                'geometry': () => {
                    obj.chartOption = {
                        ...obj.chartOption,
                        backgroundColor: val
                    }
                    this.updateChooseItme(obj, 'chartOption')
                }
            }
            fun[this.type] && fun[this.type]()
        },
    }
}
</script>

<style>
</style>