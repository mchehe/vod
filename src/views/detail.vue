<template>
	<div>
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
			>
				<van-image
				v-for="(item,index) in list" 
				:key="index"
				width="50%"
				lazy-load
				:src="item.img"
				@click="toplay(item.address)"
				>
				<slot name="default">{{item.title}}</slot>
				</van-image>
			</van-list>
		</van-pull-refresh>
	</div>
</template>
<script>
import { getPingtai } from "@/api/index";
export default {
	data() {
		return {
			list: [],
			loading: false,
			finished: false,
			refreshing: false,
		}
	},
	created() {
		// this.fetchData();
	},
	mounted(){
	},
	methods: {
		onLoad() {
			this.fetchData();
		},
		onRefresh() {
			this.finished = false;
			this.loading = true;
			this.onLoad();
		},
		toplay(src) {
			window.location.href = 'vlc://'+src
			// this.$router.push({ path: "/play", query: { src: src }});
		},
		async fetchData() {
			const { data } = await getPingtai({name:this.$route.query.pt});
			this.list = data.data;
			console.log(data.data);
			// 	data.map((item, index) => {
			// 		if (index === data.length - 1) {
			// 			item.color = "#0bbd87";
			// 		}
			// });
		}
	},
}
</script>

<style>
</style>
