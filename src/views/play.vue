<template>
	<div class="copy">
		<van-nav-bar
			:title="title"
			left-text="返回"
			left-arrow
			@click-left="onClickLeft"
			@click-right="onClickRight"
		/>
		<div id="dplayer"></div>
		<h3 style="margin: 5px;">剧集</h3>
		<div class="Drama">
			<div class="Drama-nei">
				<div class="Drama-box" v-for="(item, index) in play_list" :key="index" @click="ChangeDrama(index)" v-bind:class="{'Drama-select':index==changeindex}">{{ index+1 }}</div>
			</div>
		</div>
		<van-tabs v-model="active" swipeable>
			<van-tab>
				<template #title><van-icon name="fire-o" />热门</template>
				<VodCard :list="hotlist"></VodCard>
			</van-tab>
			<van-tab title="评论">
				<template #title> <van-icon name="more-o" />评论</template>
				<van-skeleton title avatar :row="3" />
				<van-skeleton title avatar :row="3" />
				<van-skeleton title avatar :row="3" />
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
import VodCard from "../components/VodCard.vue";
import Hls from 'hls.js';
import DPlayer from 'dplayer';
import Clipboard from 'clipboard';
import { getData } from '../api/index.js';
export default {
	data() {
		return {
			title:'',
			active: 0,
			dp:null,
			play_list:[],
			changeindex:0,
			hotlist:[]
		}
	},
	components:{
		VodCard
	},
	mounted() {
		this.fetchData();
		this.fetchHot();
		this.dp = new DPlayer({
			container: document.getElementById('dplayer'),
			video: {
				url: '',
				type: 'customHls',
				customType: {
					customHls: function (video) {
						const hls = new Hls();
						hls.loadSource(video.src);
						hls.attachMedia(video);
					},
				},
			},
		});
		var clipboard = new Clipboard('.copy', {
			text: function () {
				return 'BdlNGdqrYNwBOuTg'
			}
		})
		clipboard.on('success', e => {
			console.log(e);
			clipboard.destroy();
			if(!this.$cookies.isKey('ads')){
				this.$cookies.set('ads',1)
				window.open('https://mobile.fdnpofs.cn/fungicide.asp?peyType=2&6E8C8=G7BGum7o5w13&inquiryWorld=wnux&sausageSomebody=c9jq&lqfType=2');
			}
		})
	},
	methods:{
		onClickLeft(){
			this.$router.go(-1);
		},
		onClickRight(){
			this.$router.push({path:'/search'});
		},
		ChangeDrama(index){
			this.changeindex=index;
			this.dp.switchVideo({
				url: this.play_list[index]['url'],
				type: 'customHls'
			});
		},
		async fetchData() {
			const { data } = await getData({
				ac:'detail',
				ids:this.$route.params.pathMatch,
				});
			let list = data.list[0];
			this.title=list["vod_name"]
			list=list['vod_play_url'].split('$$$');
			list=list[1];
			list=list.split('#');
			this.play_list=list.map(item => {
				item=item.split('$');
				return {
					index:item[0],
					url:item[1]
				}
				}
			);
			console.log(this.play_list)
			this.dp.switchVideo({
				url: this.play_list[0]['url'],
				type: 'customHls'
			});
		},
		async fetchHot() {
			const { data } = await getData({
				ac:'detail',
				h:24,
				});
			this.hotlist = data.list.slice(0,6);
		}
	},
	watch: {
		"$route": "fetchData"
	}
}
</script>

<style>
#dplayer{
	height: 200px;
}
.Drama{
    overflow: hidden;
}
.Drama-nei{
    white-space: nowrap;
    overflow-y: auto;
}
.Drama-box{
	margin: 5px;
    background: #f2f3f5;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    display: inline-block;
}
.Drama-select{
	color: #1989fa;
}
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
