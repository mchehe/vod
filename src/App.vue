<template>
  <div id="#app">
	<transition name="slide-fade">
		<keep-alive>
			<router-view />
		</keep-alive>
	</transition>
	<van-tabbar placeholder v-model="active">
		<van-tabbar-item replace icon="home-o" to="/">首页</van-tabbar-item>
		<van-tabbar-item replace icon="search" to="/search">搜索</van-tabbar-item>
	</van-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
		return{
		active:0
	}
  },
  mounted() {},
};
</script>
<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>