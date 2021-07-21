// 表单方法
import * as echartsJson from '@cf/formJson/charts'
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
                onZoom: this.onZoom
            },
            addFunctionCharts: {
                onChangeSelect: this.onChangeSelect,
                onInputChange: this.onInputChange,
                onTransform: this.onTransform,
                onRotate: this.onRotate,
                onSlider: this.onSlider,
                onChangeGrid: this.onChangeGrid,
                onstack: this.onstack,
                onbarGap: this.onbarGap,
                onChartSlider: this.onChartSlider,
                onChangeColorLabel: this.onChangeColorLabel,
                onChangeColorAxis: this.onChangeColorAxis,
                onChangeFontSizeLabel: this.onChangeFontSizeLabel,
                onChangeFontWeightLabel: this.onChangeFontWeightLabel,
                onChangeMin: this.onChangeMin,
                onChangeMax: this.onChangeMax,
                onLabelTextStyle: this.onLabelTextStyle,
                onChangeColorGrid: this.onChangeColorGrid,
                onSplitNumber: this.onSplitNumber,
                onUnitName: this.onUnitName,
                onChangeLegend: this.onChangeLegend,
                onChangeSymbolSize: this.onChangeSymbolSize,
                onChangeFontLegend: this.onChangeFontLegend,
                onChangeSymbolIcon: this.onChangeSymbolIcon,
                onChangeLegendPosition: this.onChangeLegendPosition,
                onChangeValuePosition: this.onChangeValuePosition,
                onChangeFontValue: this.onChangeFontValue,
                onTrigger: this.onTrigger,
                onChangeTooltip: this.onChangeTooltip,
                onChangeFontTooltip: this.onChangeFontTooltip,
                onChangeSelectTooltip: this.onChangeSelectTooltip,
                onChangeTooltipColor: this.onChangeTooltipColor,
                onChangeTooltipBorderWidth: this.onChangeTooltipBorderWidth,
                onChangeAnimation: this.onChangeAnimation,
                onChangeAnimatioSelect: this.onChangeAnimatioSelect,
                addSeries: this.addSeries,
                delSeries: this.delSeries,
                copySeries: this.copySeries,
                onChangeColorSererie: this.onChangeColorSererie,
                onChangeSererieWidth: this.onChangeSererieWidth,
                onChangeSererieIcon: this.onChangeSererieIcon,
                onChangeSererieType: this.onChangeSererieType,
                onChangeSererieSymbolType: this.onChangeSererieSymbolType,
                onSwitchSererie: this.onSwitchSererie
            },
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
        // deepClone(value) {
        //     return JSON.parse(JSON.stringify(value))
        // },
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
        /** charts */
        addSeries() {
            let obj = this.$flineFunction.deepClone(echartsJson.seriesForm[this.type.split('&')[0]])
            this.seriesForm = [...this.seriesForm, ...obj]
            let len = obj.length
            let KIndex = this.seriesForm.length / len
            let color = 'ffffff'
            this.changeExtend('seriesForm', 'fontColor' + '_' + KIndex, '#' + color)
            this.changeExtend('seriesForm', 'fontHex' + '_' + KIndex, color)
            let chooseItme = {
                ...this.chooseItme,
            }
            chooseItme.chartOption.color[KIndex - 1] = '#' + color
            this.updateChooseItme(chooseItme, 'chartOption')
        },
        copySeries(index) {
            let obj = this.$flineFunction.deepClone(echartsJson.seriesForm[this.type.split('&')[0]])
            let len = obj.length
            let temp = this.seriesForm.slice(index, len)
            this.seriesForm = [...this.seriesForm, ...temp]
            let indexs = (parseInt(index / len) + 1)
            let color = this.$refs.seriesForm.$refs.baseForm.getFieldValue('fontHex_' + indexs)
            let KIndex = Object.keys(this.extend.seriesForm).length / 2 + 1
            this.changeExtend('seriesForm', 'fontColor' + '_' + KIndex, '#' + color)
            this.changeExtend('seriesForm', 'fontHex' + '_' + KIndex, color)
            let chooseItme = {
                ...this.chooseItme,
            }
            chooseItme.chartOption.color[KIndex - 1] = '#' + color
            this.updateChooseItme(chooseItme, 'chartOption')
        },
        delSeries(index) {
            let obj = this.$flineFunction.deepClone(echartsJson.seriesForm[this.type.split('&')[0]])
            let len = obj.length
            this.seriesForm.splice(index, len)
            let indexs = (parseInt(index / len) + 1)
            for (let key in this.extend.seriesForm) {
                if (key.indexOf('_' + indexs) > -1) {
                    delete this.extend.seriesForm[key]
                }
            }
            let chooseItme = {
                ...this.chooseItme,
            }
            chooseItme.chartOption.color.splice(indexs - 1, 1)
            this.updateChooseItme(chooseItme, 'chartOption')
        },
        onChangeColorSererie(e, item, KIndex) {
            let color = e.target.value
            if (!((color.indexOf('#') == 0 && color.length == 7) || (color.indexOf('#') == -1 && color.length == 6))) {
                return
            }
            color = color.indexOf('#') == 0 ? color.substring(1) : color
            let code = item.code.replace('Color', '').replace('Hex', '')
            this.changeExtend('seriesForm', code + 'Color' + '_' + KIndex, '#' + color)
            this.changeExtend('seriesForm', code + 'Hex' + '_' + KIndex, color)
            let obj = {
                ...this.chooseItme,
            }
            if (code.indexOf('node') > -1 || code.indexOf('area') > -1) {
                if (!obj.extraOption.series) {
                    let keys = this.getlegendKeys(obj)
                    let series = keys.map(() => {
                        if (code.indexOf('node') > -1) {
                            return {
                                // symbol: 'circle',
                                symbolSize: 8,
                                itemStyle: {
                                    borderColor: '#' + color,
                                    borderWidth: 8
                                }
                            }
                        }
                    })
                    obj.extraOption.series = series
                } else {
                    obj.extraOption.series.map(t => {
                        if (code.indexOf('node') > -1) {
                            if (!t.itemStyle) {
                                t.itemStyle = {}
                            }
                            // t.symbol = 'circle'
                            t.symbolSize = 8
                            t.itemStyle.borderColor = '#' + color
                            t.itemStyle.borderWidth = 8
                        }
                    })
                }
                this.updateChooseItme(obj, 'extraOption')
            } else {
                obj.chartOption.color[KIndex - 1] = '#' + color
                this.updateChooseItme(obj, 'chartOption')
            }
        },
        onChangeSererieWidth(value, item, KIndex) {
            this.changeExtend('seriesForm', item.code + '_' + KIndex, value)
            let obj = {
                ...this.chooseItme,
            }
            if (!obj.extraOption.series) {
                let keys = this.getlegendKeys(obj)
                let series = keys.map(() => {
                    return {
                        lineStyle: {
                            width: value
                        }
                    }
                })
                obj.extraOption.series = series
            } else {
                obj.extraOption.series.map(t => {
                    if (!t.lineStyle) {
                        t.lineStyle = {}
                    }
                    t.lineStyle.width = value
                })
            }
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeSererieIcon(code, KIndex) {
            this.changeExtend('seriesForm', 'smooth_' + KIndex, code)
            this.changeFormItem('seriesForm', 'lineStyle', 'defaultValue', code)
            let obj = {
                ...this.chooseItme,
            }
            if (!obj.extraOption.series) {
                let keys = this.getlegendKeys(obj)
                let series = keys.map(() => {
                    return {
                        smooth: code == 'curve'
                    }
                })
                obj.extraOption.series = series
            } else {
                obj.extraOption.series.map(t => {
                    t.smooth = code == 'curve'
                })
            }
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeSererieType(value, item, KIndex) {
            this.changeExtend('seriesForm', item.code + '_' + KIndex, value)
            let obj = {
                ...this.chooseItme,
            }
            if (!obj.extraOption.series) {
                let keys = this.getlegendKeys(obj)
                let series = keys.map(() => {
                    return {
                        lineStyle: {
                            type: value
                        }
                    }
                })
                obj.extraOption.series = series
            } else {
                obj.extraOption.series.map(t => {
                    if (!t.lineStyle) {
                        t.lineStyle = {}
                    }
                    t.lineStyle.type = value
                })
            }
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeSererieSymbolType(value, item, KIndex) {
            this.changeExtend('seriesForm', item.code + '_' + KIndex, value)
            let obj = {
                ...this.chooseItme,
            }
            if (!obj.extraOption.series) {
                let keys = this.getlegendKeys(obj)
                let series = keys.map(() => {
                    return {
                        symbol: value
                    }
                })
                obj.extraOption.series = series
            } else {
                obj.extraOption.series.map(t => {
                    t.symbol = value
                })
            }
            this.updateChooseItme(obj, 'extraOption')
        },
        // 请求类型
        onChartsCommonFun(nameX, nameY, typeX, typeY, code, value, fun) {
            let name = nameX, type = typeX
            if (this.extend.mode == 'y') {
                type = typeY
                name = nameY
            }
            this.changeExtend(name, code, value)
            let obj = {
                ...this.chooseItme,
            }
            let axis = obj.extraOption[type]
            axis = fun(axis)
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeSelect(value) {
            let code = ['result']
            this.formConfigData.map(t => {
                if (t.code != 'type') {
                    value == 1 ? code.map((j) => { t.disabled = j == t.code ? false : true }) : code.map((j) => { t.disabled = j == t.code ? true : false })
                }
            })
        },
        onInputChange(e, code) {
            let value = e.target.value
            let obj = {
                ...this.chooseItme,
            }
            obj[code] = value
            this.changeExtend('baseDataForm', code, value)
            this.updateChooseItme(obj, code)
        },
        onTransform(value, item) {
            this.changeExtend('baseDataForm', item.code, value)
            this.updateItem(this.extend, 'extend')
        },
        onRotate(item, codes) {
            let value = 0
            this.baseDataForm.map(t => {
                if (t.code == item.code) {
                    t[codes] = t[codes] == 0 ? 1 : 0
                    value = t[codes]
                }
            })
            this.changeExtend('baseDataForm', codes, value)
            this.updateItem(this.extend, 'extend')
        },
        onSlider(value, item) {
            this.changeExtend('baseDataForm', item.code, value)
            this.updateItem(this.extend, 'extend')
        },
        onChangeGrid(code, value) {
            value = Number(value)
            this.changeExtend('spacingForm', code, value)
            this.updateExtraOptionKeys(code, value, 'grid')
            this.$nextTick(() => {
                this.changeFormItem('spacingForm', 'grid', code, value)
            })
        },
        onChartSlider(value, item) {
            this.changeFormItem('barForm', item.code, 'defaultValue', value)
            let obj = {
                ...this.chooseItme,
            }
            if (!obj.extraOption.series) {
                let keys = this.getlegendKeys(obj)
                let series = keys.map(() => {
                    return {
                        [item.code]: value + '%'
                    }
                })
                obj.extraOption.series = series
            } else {
                obj.extraOption.series.map(t => {
                    t[item.code] = value + '%'
                    return t
                })
            }
            this.updateChooseItme(obj, 'extraOption')
        },
        onstack(e, code) {
            let value = e.target.value
            this.changeExtend('barForm', code, value)
            let obj = {
                ...this.chooseItme,
            }
            if (!obj.extraOption.series) {
                let keys = this.getlegendKeys(obj)
                let series = keys.map(t => {
                    return value == 'stack' ? {
                        stack: 'stack'
                    } : {}
                })
                obj.extraOption.series = series
            } else {
                obj.extraOption.series.map(t => {
                    if (value == 'stack') {
                        t.stack = 'stack'
                    } else {
                        delete t.stack
                    }
                    return t
                })
            }
            this.updateChooseItme(obj, 'extraOption')
        },
        getlegendKeys(obj) {
            let chartOption = obj.chartOption
            let legend = chartOption.legend
            let seriesData = chartOption.seriesData
            let keys = []
            seriesData.map(t => {
                if (keys.length == 0) {
                    keys.push(t[legend])
                } else if (keys.indexOf(t[legend]) == -1) {
                    keys.push(t[legend])
                }
            })
            return keys
        },
        onbarGap(e, code) {
            let value = e.target.value
            this.changeExtend('barForm', code, value)
            let obj = {
                ...this.chooseItme,
            }
            if (!obj.extraOption.series) {
                let keys = this.getlegendKeys(obj)
                let series = keys.map(() => {
                    return {
                        barGap: value + '%'
                    }
                })
                obj.extraOption.series = series
            } else {
                obj.extraOption.series.map(t => {
                    t.barGap = value + '%'
                    return t
                })
            }
            this.updateChooseItme(obj, 'extraOption')
        },
        onSplitNumber(e, item) {
            let value = e.target.value
            let fun = (axis = []) => {
                return axis.map(t => {
                    t.splitNumber = value
                    return t
                })
            }
            this.onChartsCommonFun('xlabelForm', 'ylabelForm', 'xAxis', 'yAxis', item.code, value, fun)
        },
        onUnitName(e, item) {
            let value = e.target.value
            let fun = (axis = []) => {
                return axis.map(t => {
                    t.name = value
                    return t
                })
            }
            this.onChartsCommonFun('xlabelForm', 'ylabelForm', 'xAxis', 'yAxis', item.code, value, fun)
        },
        onChangeFontSizeLabel(value, item) {
            let fun = (axis = []) => {
                return axis.map(t => {
                    t.axisLabel.textStyle.fontSize = value + 'px'
                    return t
                })
            }
            this.onChartsCommonFun('xlabelForm', 'ylabelForm', 'xAxis', 'yAxis', item.code, value, fun)
        },
        onChangeFontWeightLabel(value, item) {
            let fun = (axis = []) => {
                return axis.map(t => {
                    t.axisLabel.textStyle.fontWeight = value
                    return t
                })
            }
            this.onChartsCommonFun('xlabelForm', 'ylabelForm', 'xAxis', 'yAxis', item.code, value, fun)
        },
        onChangeLegend(value, code) {
            this.changeExtend('legendForm', code, value)
            let obj = {
                ...this.chooseItme,
            }
            obj.extraOption.legend = {
                ...obj.extraOption.legend,
                [code]: value
            }
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeSymbolSize(value, item) {
            this.onChangeLegend(value, item.code)
        },
        onChangeSymbolIcon(value, item) {
            this.onChangeLegend(value, item.code)
        },
        onChangeLegendPosition(value) {
            this.changeExtend('legendForm', 'legendPosition', value)
            this.changeFormItem('legendForm', 'legendPosition', 'defaultValue', value)
            let obj = {
                ...this.chooseItme,
            }
            let legend = obj.extraOption.legend
            delete legend.top
            delete legend.bottom
            delete legend.left
            delete legend.right
            if (value == 'leftTop') {
                legend.left = '10%'
                legend.top = 10
            } else if (value == 'top') {
                legend.top = 10
            } else if (value == 'rightTop') {
                legend.top = 10
                legend.right = '10%'
            } else if (value == 'leftBottom') {
                legend.left = '10%'
                legend.bottom = 10
            } else if (value == 'bottom') {
                legend.bottom = 10
            } else if (value == 'rightBottom') {
                legend.bottom = 10
                legend.right = '10%'
            }
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeFontLegend(e, item) {
            let value = e.target ? e.target.value : e
            let code = item.code
            this.changeExtend('legendForm', code, value)
            let obj = {
                ...this.chooseItme,
            }
            obj.extraOption.legend.textStyle = {
                ...obj.extraOption.legend.textStyle,
                [code]: value
            }
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeColorLabel(e, item) {
            let color = e.target.value
            if (!((color.indexOf('#') == 0 && color.length == 7) || (color.indexOf('#') == -1 && color.length == 6))) {
                return
            }
            color = color.indexOf('#') == 0 ? color.substring(1) : color
            let code = item.code.replace('Color', '').replace('Hex', '')
            let name = 'xlabelForm', type = 'xAxis'
            if (this.extend.mode == 'y') {
                type = 'yAxis'
                name = 'ylabelForm'
            }
            this.changeExtend(name, code + 'Color', '#' + color)
            this.changeExtend(name, code + 'Hex', color)
            let obj = {
                ...this.chooseItme,
            }
            let axis = obj.extraOption[type]
            axis.map(t => {
                t.axisLabel.textStyle.color = '#' + color
                return t
            })
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeColorAxis(e, item) {
            let color = e.target.value
            if (!((color.indexOf('#') == 0 && color.length == 7) || (color.indexOf('#') == -1 && color.length == 6))) {
                return
            }
            color = color.indexOf('#') == 0 ? color.substring(1) : color
            let code = item.code.replace('Color', '').replace('Hex', '')
            let name = 'xaxisForm', type = 'xAxis'
            if (this.extend.mode == 'y') {
                type = 'yAxis'
                name = 'yaxisForm'
            }
            this.changeExtend(name, code + 'Color', '#' + color)
            this.changeExtend(name, code + 'Hex', color)
            let obj = {
                ...this.chooseItme,
            }
            let axis = obj.extraOption[type]
            axis.map(t => {
                t.axisLine.lineStyle.color = '#' + color
                return t
            })
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeMin(value, item) {
            this.changeExtend('yForm', item.code, value)
            let obj = {
                ...this.chooseItme,
            }
            let axis = obj.extraOption['yAxis']
            axis.map(t => {
                t.min = value
                return t
            })
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeMax(value, item) {
            this.changeExtend('yForm', item.code, value)
            let obj = {
                ...this.chooseItme,
            }
            let axis = obj.extraOption['yAxis']
            axis.map(t => {
                t.max = value
                return t
            })
            this.updateChooseItme(obj, 'extraOption')
        },
        onLabelTextStyle(value) {
            let name = 'xlabelForm'
            if (this.extend.mode == 'y') {
                name = 'ylabelForm'
            }
            this.changeFormItem(name, 'positionIcon', 'defaultValue', value)
            this.changeExtend(name, 'positionIcon', value)
            let type = 'xAxis'
            if (this.extend.mode == 'y') {
                type = 'yAxis'
            }
            let obj = {
                ...this.chooseItme,
            }
            let axis = obj.extraOption[type]
            axis.map(t => {
                if (value == 'tilt') {
                    t.axisLabel.rotate = '45'
                } else if (value == 'vertical') {
                    t.axisLabel.rotate = '90'
                } else if (value == 'horizontal') {
                    t.axisLabel.rotate = '90'
                }
                return t
            })
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeColorGrid(e, item) {
            let color = e.target.value
            if (!((color.indexOf('#') == 0 && color.length == 7) || (color.indexOf('#') == -1 && color.length == 6))) {
                return
            }
            color = color.indexOf('#') == 0 ? color.substring(1) : color
            let code = item.code.replace('Color', '').replace('Hex', '')
            let name = 'xgridlinesForm', type = 'xAxis'
            if (this.extend.mode == 'y') {
                type = 'yAxis'
                name = 'ygridlinesForm'
            }
            this.changeExtend(name, code + 'Color', '#' + color)
            this.changeExtend(name, code + 'Hex', color)
            let obj = {
                ...this.chooseItme,
            }
            let axis = obj.extraOption[type]
            axis.map(t => {
                t.splitLine.lineStyle.color = '#' + color
                return t
            })
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeValuePosition(value) {
            this.changeExtend('valueForm', 'position', value)
            this.changeFormItem('valueForm', 'position', 'defaultValue', value)
            let obj = {
                ...this.chooseItme,
            }
            obj.extraOption.series.map(t => {
                t.label.position = value
            })
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeFontValue(e, item) {
            let value = e.target ? e.target.value : e
            let code = item.code
            this.changeExtend('valueForm', code, value)
            let obj = {
                ...this.chooseItme,
            }
            obj.extraOption.series.map(t => {
                if (code == 'fontSize') {
                    t.label[code] = value + 'px'
                } else {
                    t.label[code] = value
                }
                return t
            })
            this.updateChooseItme(obj, 'extraOption')
        },
        onTrigger(value) {
            this.changeFormItem('tooltipForm', 'triggerOn', 'defaultValue', value)
            this.changeExtend('tooltipForm', 'triggerOn', value)
            let obj = {
                ...this.chooseItme,
            }
            obj.extraOption.tooltip.triggerOn = value
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeTooltip(value, code) {
            this.changeExtend('tooltipForm', code, value)
            let obj = {
                ...this.chooseItme,
            }
            obj.extraOption.tooltip[code] = code == 'borderWidth' ? value + 'px' : value
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeTooltipBorderWidth(value, item) {
            this.onChangeTooltip(value, item.code)
        },
        onChangeFontTooltip(e, item) {
            let value = e.target ? e.target.value : e
            let code = item.code
            this.changeExtend('tooltipForm', code, value)
            let obj = {
                ...this.chooseItme,
            }
            obj.extraOption.tooltip.textStyle[code] = code == 'fontSize' ? value + 'px' : value
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeSelectTooltip(value) {
            this.changeFormItem('tooltipForm', 'position', 'defaultValue', value)
            this.changeExtend('tooltipForm', 'position', value)
            let obj = {
                ...this.chooseItme,
            }
            obj.extraOption.tooltip.position = value
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeTooltipColor(e, item) {
            let color = e.target ? e.target.value : e
            if (!((color.indexOf('#') == 0 && color.length == 7) || (color.indexOf('#') == -1 && color.length == 6))) {
                return
            }
            color = color.indexOf('#') == 0 ? color.substring(1) : color
            let code = item.code.replace('Color', '').replace('Hex', '')
            this.changeExtend('tooltipForm', code + 'Color', '#' + color)
            this.changeExtend('tooltipForm', code + 'Hex', color)
            let obj = {
                ...this.chooseItme,
            }
            if (item.code == 'backgroundHex') {
                obj.extraOption.tooltip['backgroundColor'] = '#' + color
            } else {
                obj.extraOption.tooltip[item.code] = '#' + color
            }
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeAnimation(value, code) {
            this.changeExtend('animationForm', code, value)
            let obj = {
                ...this.chooseItme,
            }
            obj.extraOption[code] = value
            this.updateChooseItme(obj, 'extraOption')
        },
        onChangeAnimatioSelect(value) {
            this.onChangeAnimation(value, 'animationEasing')
        },
        /** charts */
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
        /** page */
        /** other */
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