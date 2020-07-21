<template>
	<div>
		<van-row>
			<van-col span="12" style="padding: 5px;" v-for="(item, index) in list" :key="index" @click="toPlay(item.vod_id)">
				<van-image
				width="100%"
				height="120"
				lazy-load
				:src="item.vod_pic"
				/>
				<p class="card-title">{{ item.vod_name }}</p>
			</van-col>
		</van-row>
	</div>
</template>

<script>
export default {
	name:"VodCard",
	props:{
		list:Array
	},
	methods:{
		toPlay(id){
			this.$router.push({path:'/play/'+id});
		},
	}
}
</script>

<style>
.card-title {
    color: #fff;
    position: relative;
    margin-top: -36px;
    padding-left: 5px;
    height: 35px;
    line-height: 35px;
    background: -webkit-gradient(linear,left top,left bottom,from(transparent),color-stop(5%,transparent),color-stop(10%,transparent),color-stop(90%,rgba(0,0,0,.6)),color-stop(95%,rgba(0,0,0,.4)),to(transparent));
    background: linear-gradient(180deg,transparent 0,transparent 5%,transparent 10%,rgba(0,0,0,.6) 90%,rgba(0,0,0,.4) 95%,transparent);
}
</style>
