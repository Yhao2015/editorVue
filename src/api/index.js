/*
 * @Author: yhao
 * @Date: 2021-05-12 10:15:30
 * @LastEditTime: 2021-07-21 15:54:56
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \flinev-editor-vue\src\api\index.js
 * fline
 */
const baseUrl = '/fline/'
const monitorStation = 'flinev-monitor-station/api/v1/'
const spaceStation = 'flinev-space-station/api/v1/'
const api = {
    // 单文件上传
    singleFile: baseUrl + 'flinev-fileup/api/v1/fileup/single-file',
    // 静态数据文件上传
    uploadFile: baseUrl + spaceStation + 'space-cockpit/upload',
    // 通过id查询已发布驾驶舱
    findPublishedJson: baseUrl + spaceStation + 'space-cockpit/published/',
    // 空间站 - 驾驶舱
    findJson: baseUrl + spaceStation + 'space-cockpit/',
    // 查询驾驶舱（不区分code和id）
    shareJson: baseUrl + spaceStation + 'space-cockpit/share/',
    updateJson: baseUrl + spaceStation + 'space-cockpit/update',
    // 监管中心 - 模板
    findTemplateJson: baseUrl + monitorStation + 'monitor-cockpit-template/',
    updateTemplateJson: baseUrl + monitorStation +'monitor-cockpit-template/update',
    // 发布
    publish: baseUrl + spaceStation + 'flinev-space-station/api/v1/space-cockpit/publish',
    // 查询组件父级分组
    findAllGroup: baseUrl + monitorStation +'monitor-cockpit-group/all-component',
    // 查询组件子级分组
    findGroup: baseUrl + monitorStation + 'monitor-cockpit-group/all-component/second',
    // 通过父级分组id或者子级分组id查询组件 [不分页]
    findAllComponent: baseUrl + monitorStation +'monitor-cockpit-component/all-by-group',
    //字典查询
    dictionary: baseUrl + monitorStation + 'space-cockpit-dictionary/find',
    // 驾驶舱
    dictionaryUser: baseUrl + spaceStation + 'space-cockpit-dictionary/findByUser',
    // 代码片段
    codeSnippet: baseUrl + monitorStation + 'space-cockpit-code-snippet/find',
    // 驾驶舱
    codeSnippetUser: baseUrl + spaceStation + 'space-cockpit-code-snippet/findByUser',
    // 获取字典值
    dictionaryCode: baseUrl + monitorStation + 'space-cockpit-dictionary-code/find',
    // 驾驶舱
    dictionaryCodeUser: baseUrl + spaceStation + 'space-cockpit-dictionary-code/findUse',
    // 查询大数据平台接口（库表）列表
    findInterface: baseUrl + spaceStation +'space-cockpit/find-interface',
    // 接口调用
    showInterface: baseUrl + spaceStation + 'space-cockpit/show-interface',
    // 库表接口调用
    showDatabase: baseUrl + spaceStation + 'space-cockpit/show-database',
    // 发布
    publish: baseUrl + spaceStation + 'space-cockpit/publish',
    // 取消发布
    unpublish: baseUrl + spaceStation + 'space-cockpit/unpublish',
    // 详情
    postingDetail: baseUrl + spaceStation + 'space-cockpit/posting-details',
    // 驾驶舱发布限制条件添加
    updateSpaceCokpit: baseUrl + spaceStation + 'space-cockpit-limit/update-spaceCokpit',
    // 密码校验
    verification: baseUrl + spaceStation + 'space-cockpit/share/verification',
    // 查询库表名称
    findDatabase: baseUrl + spaceStation + 'space-cockpit/find-database'
}
export default api
