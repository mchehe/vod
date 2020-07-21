<template>
	<div>
		<form action="/">
			<van-search
			v-model="value"
			:autofocus="true"
			:show-action="show_action"
			placeholder="请输入搜索关键词"
			@search="onSearch"
			@cancel="onCancel"
			@focus="focus"
			/>
		</form>
		<VodCard :list="list"></VodCard>
	</div>
</template>

<script>
import VodCard from "../components/VodCard.vue";
import { getData } from '../api/index.js';
export default {
	data(){
		return{
			value:'',
			show_action:false,
			list:[]
		}
	},
	components:{
		VodCard
	},
	methods:{
		focus(){
			this.show_action=true;
		},
		onSearch(val) {
			this.fetchData(val);
		},
		onCancel() {
			this.$router.go(-1);
		},
		async fetchData(val) {
			const { data } = await getData({
				ac:'detail',
				wd:val,
				});
			this.list = data.list;
		}
	}
}
</script>

<style>
</style>
