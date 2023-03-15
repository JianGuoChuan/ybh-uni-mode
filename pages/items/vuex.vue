<template>
	<view>
		<ybh-navbar title='Vuex'></ybh-navbar>
		<view class="padding-tb-md padding-lr-md font-com font-indent border-bottom">
			<view class="margin-bottom-md font-bold flex">
				<u-icon name='question-circle-fill' class="padding-lr-md text-bdBlue font-lg"></u-icon>
				<text>使用说明：</text>
			</view>
			<view class="text-indent">参考uView对原生Vuex做的功能加强，使其Vuex的数据可以持久化的存储在本地，解决了项目重启等原因导致的数据丢失问题。
				以下就配置Vuex与使用方法做分析演示。</view>
		</view>
		<view class="padding-lg">
			<view class="font-com padding-bottom-md border-bottom margin-bottom-md">
				<u-icon name='setting' size="35" class="margin-right-sm"/>
				<text class="font-bold">Vuex使用方法</text>
			</view>
			<view>
				<text>● 1）实现数据的持久化保存前，需要前往vuex的配置页配置需要持久化保存的数据名称。</br>
					<strong>（路径：根目录/sotre/index.js）</strong>，具体配置请查阅源代码；</text></br>
				<text>● 2）存入持久化数据到vuex：</text></br>
				<text class="padding-left-lgx">示例：<strong>this.$u.vuex('vuex_token','999');</strong></text></br>
				<text>● 3）从vuex中取出持久化数据：</text></br>
				<text class="padding-left-lgx">示例：<strong>let token = this.vuex_token;</strong></text></br>
				<text>● 4）测试：进入浏览器后打开控制台/application下查看本地存储数据</text></br>
				<view class="margin-tb-md flex space-around">
					<view class="text-bdBlue font-underline margin-left-md dis-inline-block" @tap='show = true'>亲自体验(存)</view>
					<view class="text-bdBlue font-underline margin-left-md dis-inline-block" @tap='getVuexData'>亲自体验(取)</view></br>
				</view>
				<view class="padding-top-lg text-right" v-if="token">取得的数据 ：{{token}}</view>
			</view>
		</view>
		<ybh-modal :visible.sync="show" :scanMode='true' inputType="text" @confirm='confirmPostion'></ybh-modal>
	</view>
</template>
<script>
	export default {
		data(){
			return {
				show : false,
				token : ''
			}
		},
		methods:{
			confirmPostion(val){
				this.$u.vuex('vuex_token',val);
			},
			getVuexData(){
				this.token = this.vuex_token;
			}
		}
	}
</script>
<style scoped lang="scss"></style>