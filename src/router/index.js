import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import index from "../views/index.vue";
import detail from "../views/detail.vue";
import play from "../views/play.vue";
import search from "../views/search.vue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    {
        path:"/",
        component: index,
        meta: { footShow: true }
    },
	{
		path:"/detail",
		component: detail,
		meta: { footShow: true }
	},
	{
		path:"/play/*",
		component: play,
		meta: { footShow: true }
	},
	{
		path:"/search",
		component: search,
		meta: { footShow: true }
	}
]

var router =  new VueRouter({
	mode:'history',
    routes
})
export default router;