(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-53c3ea13"],{d504:function(_,e,t){"use strict";t.r(e);var s=function(){var _=this,e=_.$createElement,t=_._self._c||e;return t("div",{staticClass:"fx_EditCon"},[t("header-con",{attrs:{name:_.name}}),t("div",{staticClass:"fx_main"},[_.isShow.isLayerLeft?t("div",{staticClass:"width200 fx_layerArea"},[t("layer-left")],1):_._e(),_.isShow.isLayerRight?t("div",{staticClass:"width250 fx_layerArea"},[t("layer-right")],1):_._e(),t("div",{staticClass:"fx_canvas"},[_.isShow.isTools?t("div",{staticClass:"fx_tools"},[t("div",{staticClass:"fx_tool marginL8"},[t("a-icon",{staticClass:"marginR8",attrs:{type:"sync"}}),_._v("刷新画布 ")],1),t("div",{staticClass:"fx_tool marginL8"},[t("a-icon",{staticClass:"marginR8",attrs:{type:"fullscreen"}}),_._v("重置画布大小 ")],1)]):_._e(),t("canvas-area",{ref:"canvasArea"})],1),_.isShow.isSetting?t("div",{staticClass:"width350 fx_control"},[t("control-area",{ref:"controlArea"})],1):_._e()])],1)},a=[],i=t("fecc"),n=i["a"],o=t("2877"),r=Object(o["a"])(n,s,a,!1,null,null,null);e["default"]=r.exports},fecc:function(module,__webpack_exports__,__webpack_require__){"use strict";var D_workspace_flinev_editor_vue_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("2909"),D_workspace_flinev_editor_vue_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("5530"),core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("99af"),core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2__),core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("b0c0"),core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3__),core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("d81d"),core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_4__),core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("d3b7"),core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__),core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("25f0"),core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_6__),core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("ac1f"),core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_7__),core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("1276"),core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_8__),vuex__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("2f62"),_cf_setting_BaseConfig_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("6ebd");__webpack_exports__["a"]={data:function(){return{findJsonUrl:this.$api.findJson,pageInfo:_cf_setting_BaseConfig_js__WEBPACK_IMPORTED_MODULE_10__["d"],name:"",id:0,updateJsonUrl:this.$api.updateJson}},computed:Object(vuex__WEBPACK_IMPORTED_MODULE_9__["b"])(["isShow","assemblyList"]),watch:{isShow:{handler:function(){this.$refs.canvasArea.initCanvas()},deep:!0}},provide:function(){return{updateChooseItme:this.updateChooseItme,updateItmeActive:this.updateItmeActive,updatePage:this.updatePage,delItem:this.delItem,save:this.save}},mounted:function(){var _=this.$route.query.id||1;window.staticContentConfig.id=_,this.getInfo(_)},methods:{getInfo:function getInfo(id){var _this=this;this.$get("".concat(this.findJsonUrl).concat(id)).then((function(res){if(200==res.code){_this.name=res.data.name;var basicsSetting=res.data.content?JSON.parse(res.data.content):{};console.log("basicsSetting",basicsSetting),basicsSetting.templateContent.map((function(t){if("gauge"==t.type){var funcStr=t.extend.chartOption.formatter;return t.extend.chartOption.formatter=eval("(false || "+funcStr+")"),t}}));var _pageInfo=basicsSetting.pageInfo;for(var key in _this.pageInfo=_pageInfo,_pageInfo)_this.$refs.canvasArea.hasOwnProperty(key)&&(_this.$refs.canvasArea[key]=_pageInfo[key]);var templateContent=basicsSetting.templateContent;templateContent=templateContent.map((function(_){return _=Object(D_workspace_flinev_editor_vue_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["a"])(Object(D_workspace_flinev_editor_vue_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["a"])(Object(D_workspace_flinev_editor_vue_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["a"])({},_),_.style),{},{chartOption:_.extend.chartOption}),_.clientX=_.positionX,_.clientY=_.positionY,_})),_this.$refs.canvasArea.assemblyList=templateContent,_this.$store.commit("updateLayer",templateContent)}}))},updateChooseItme:function(_,e){var t=this.$refs.canvasArea.assemblyList;t.map((function(t){t.id==_.id&&(t[e]=_[e])})),this.save()},updateItmeActive:function(_){var e=this.$refs.canvasArea.assemblyList;e.map((function(e){e.active=e.id==_})),this.$refs.canvasArea.isCanvasContainer=!1,this.$refs.canvasArea.isCanvasContainer=!0},updatePage:function(_,e){this.$refs.canvasArea[e]=_,_cf_setting_BaseConfig_js__WEBPACK_IMPORTED_MODULE_10__["d"][e]=_,this.save()},delItem:function(_){this.$refs.canvasArea.assemblyList=_||[],this.$store.commit("updateLayer",_),this.save()},save:function(){var _=Object(D_workspace_flinev_editor_vue_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["a"])(this.assemblyList);console.log("assemblyList",_);var e=function(_){var e={};for(var t in _)_[t]instanceof Function?e[t]=_[t].toString():e[t]=_[t];return e},t={},s=[];_.map((function(_){var a=Object(D_workspace_flinev_editor_vue_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["a"])({},_),i=a.type;if("inline"==i||"horizontal"==i||"vertical"==i)t=Object(D_workspace_flinev_editor_vue_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["a"])(Object(D_workspace_flinev_editor_vue_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["a"])({},_cf_setting_BaseConfig_js__WEBPACK_IMPORTED_MODULE_10__["c"]),{},{id:a.id,name:a.name,type:a.type,style:{positionX:a.clientX,positionY:a.clientY,width:a.width,height:a.height},extend:{cssStyle:a.cssStyle,mode:a.mode},children:json.children});else{var n=i.split("&");t=n.length>1?Object(D_workspace_flinev_editor_vue_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["a"])(Object(D_workspace_flinev_editor_vue_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["a"])({},_cf_setting_BaseConfig_js__WEBPACK_IMPORTED_MODULE_10__["a"]),{},{id:a.id,name:a.name,alias:a.alias,iconType:a.iconType,type:i,style:{positionX:a.clientX,positionY:a.clientY,width:a.width,height:a.height},dataSource:{result:a.chartOption.seriesData},extend:Object(D_workspace_flinev_editor_vue_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["a"])({chartOption:e(a.chartOption),extraOption:a.extraOption,width:a.width,height:a.height},a.extend)}):Object(D_workspace_flinev_editor_vue_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["a"])(Object(D_workspace_flinev_editor_vue_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["a"])({},_cf_setting_BaseConfig_js__WEBPACK_IMPORTED_MODULE_10__["a"]),{},{id:a.id,name:a.name,alias:a.alias,iconType:a.iconType,type:i,style:{positionX:a.clientX,positionY:a.clientY,width:a.width,height:a.height},extend:Object(D_workspace_flinev_editor_vue_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["a"])({chartOption:e(a.chartOption),width:a.width,height:a.height},a.extend)})}s.push(t)}));var a={pageInfo:Object(D_workspace_flinev_editor_vue_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["a"])({},_cf_setting_BaseConfig_js__WEBPACK_IMPORTED_MODULE_10__["d"]),templateContent:[].concat(s)},i={id:window.staticContentConfig.id,content:JSON.stringify(a)};this.$post(this.updateJsonUrl,i)}}}}}]);