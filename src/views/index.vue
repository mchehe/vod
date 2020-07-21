<template>
	<div>
		<van-tabs v-model="active" swipeable animated>
			<van-tab>
				<template #title><van-icon name="video-o" />电影</template>
				<van-pull-refresh v-model="refreshing" @refresh="onRefresh(0)">
					<van-list
					v-model="loading"
					:finished="finished"
					finished-text="没有更多了"
					@load="onLoad"
					>
						<VodCard :list="dylist"></VodCard>
					</van-list>
				</van-pull-refresh>
			</van-tab>
			<van-tab>
				<template #title> <van-icon name="tv-o" />电视剧</template>
				<van-pull-refresh v-model="refreshing" @refresh="onRefresh(1)">
					<van-list
					v-model="loading"
					:finished="finished"
					finished-text="没有更多了"
					@load="onLoad"
					>
						<VodCard :list="tvlist"></VodCard>
					</van-list>
				</van-pull-refresh>
			</van-tab>
			<van-tab>
				<template #title> <van-icon name="smile-comment-o" />动漫</template>
				<van-pull-refresh v-model="refreshing" @refresh="onRefresh(2)">
					<van-list
					v-model="loading"
					:finished="finished"
					finished-text="没有更多了"
					@load="onLoad"
					>
						<VodCard :list="dmlist"></VodCard>
					</van-list>
				</van-pull-refresh>
			</van-tab>
			<van-tab>
				<template #title> <van-icon name="aim" />综艺</template>
				<van-pull-refresh v-model="refreshing" @refresh="onRefresh(3)">
					<van-list
					v-model="loading"
					:finished="finished"
					finished-text="没有更多了"
					@load="onLoad"
					>
						<VodCard :list="zylist"></VodCard>
					</van-list>
				</van-pull-refresh>
			</van-tab>
		</van-tabs>
	</div>
</template>
<script>
import VodCard from "../components/VodCard.vue";
import { getData } from "@/api/index";
export default {
	data() {
		return {
			active:0,
			dylist: [],
			tvlist:[],
			dmlist:[],
			zylist:[],
			loading: false,
			finished: false,
			refreshing: false,
		}
	},
	components:{
		VodCard
	},
	mounted() {
		this.fetchDy();
		this.fetchTv();
		this.fetchDm()
		this.fetchZy()
	},
	methods: {
		onLoad() {
			this.loading = false;
		},
		onRefresh(e) {
			switch(e) {
				case 0:
					this.fetchDy();
					break;
				case 1:
					this.fetchTv();
					break;
				case 2:
					this.fetchDm();
					break;
				case 3:
					this.fetchZy();
					break;
				default:
					this.fetchDy();
			}
		},
		async fetchDy() {
			const { data } = await getData({
				ac:'detail',
				t:9
				});
			this.dylist = data.list;
			this.refreshing=false;
		},
		async fetchTv() {
			const { data } = await getData({
				ac:'detail',
				t:13
				});
			this.tvlist = data.list;
			this.refreshing=false;
		},
		async fetchDm() {
			const { data } = await getData({
				ac:'detail',
				t:29
				});
			this.dmlist = data.list;
			this.refreshing=false;
		},
		async fetchZy() {
			const { data } = await getData({
				ac:'detail',
				t:25
				});
			this.zylist = data.list;
			this.refreshing=false;
		}
	},
}
</script>

<style>
</style>
