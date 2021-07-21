import LayerLeft from './src/LayerLeft.vue';
LayerLeft.install = function (Vue) {
    Vue.component(LayerLeft.name, LayerLeft);
};

import LayerRight from './src/LayerRight.vue';
LayerRight.install = function (Vue) {
    Vue.component(LayerRight.name, LayerRight);
};

export { LayerLeft, LayerRight };