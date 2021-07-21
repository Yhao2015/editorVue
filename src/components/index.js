import headerCon from './header'
import { LayerLeft, LayerRight } from './layer'
import controlArea from './control'
import canvasArea from './canvas'
// import formConfig from './formConfig'
// import formSeriesConfig from './formSeriesConfig'

export default {
    install(Vue) {
        Vue.use(headerCon)
        Vue.use(LayerLeft)
        Vue.use(LayerRight)
        Vue.use(controlArea)
        Vue.use(canvasArea)
        // Vue.use(formConfig)
        // Vue.use(formSeriesConfig)
    }
}