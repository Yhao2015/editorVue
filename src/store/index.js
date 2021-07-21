/*
 * @Author: yuanhao
 * @Date: 2021-04-08 17:03:11
 * @LastEditTime: 2021-07-13 15:28:16
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \flinev-editor-vue\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		dragInfo: {}, //拖拽组件信息 - 单个
		isLayerShow: { 	//显示隐藏标记
			isLayerLeft: true,
			isLayerRight: true,
			isSetting: true,
			isTools: true
		},
		assemblyList: [], // 画布层组件的详细信息
		layerLeftAdd: {}, // 左侧图层添加
		layerLeftDel: {}, // 左侧图层删除
		layerLayout: [], // 左侧图层布局，层级改变或者增删 需要更新
		choose: null, //当前选中的组件 null：画布
		updateTime: null, // 更新时间
		chooseLayers: [], //图层选择的组件
	},
	mutations: {
		// 拖拽组件的信息
		updateDragInfo(state, value) {
			state.dragInfo = value
		},
		// 布局信息
		updateShow(state, value) {
			state.isLayerShow[value.name] = value.value
		},
		// 数据集合
		updateLayer(state, value) {
			state.assemblyList = value
		},
		// 新增 
		layertAdd(state, value) {
			state.layerLeftAdd = value
		},
		// 删除
		layerDel(state, value) {
			state.layerLeftDel = value
		},
		// 选中组件
		updateChoose(state, value) {
			state.choose = value
		},
		updateTime(state, value) {
			state.updateTime = value
		},
		updateLayout(state, value) {
			state.layerLayout = value
		},
		setChooseLayers(state, value) {
			state.chooseLayers = value
		}
	},
	actions: {
	},
	modules: {
	}
})
