/*
 * @Author: yuanhao
 * @Date: 2021-03-31 09:41:17
 * @LastEditTime: 2021-07-16 14:12:35
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \flinev-editor-vue\src\utils\axios.js
 */
import axios from 'axios'
import Router from '../router'
import message from 'ant-design-vue/es/message'
// 添加请求拦截器
axios.interceptors.request.use((req) => {
    //统一设置传header
    if (req.url.indexOf("login") == -1) {
        let token = localStorage.getItem("token") || "";
        req.headers.token = token;
    }
    return req;
}, error => {
    return Promise.reject(error);
})
axios.defaults.timeout = 36000000 //设置超时时间
axios.interceptors.response.use(
    response => {
        // 检测某种状态进行重定向
        if (response.data.code === 401) {
            message.error(response.data.message || response.data.msg)
            Router.push({
                name: '401'
            })
        }else if (response.data.code !== 200) {
            if(!response.data.code) {
                return response
            }
            message.error(response.data.message || response.data.msg)
        } 
        return response
    },
    error => {
        if (error.response.data.code) {
            if (error.response.data.code === 401) {
                message.error(error.response.data.message || response.data.msg)
                Router.push({
                    name: '401'
                })
            } else {
                message.error(error.response.data.message || response.data.msg)
            }
        } else {
            message.error(error.response.statusText || response.data.msg)
        }
        return Promise.resolve(error.response)
    }
)
export default axios
