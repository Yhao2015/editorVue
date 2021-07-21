import Main from './src/Index.vue';
Main.install = function(Vue) {
    Vue.component(Main.name, Main);
};
export default Main;