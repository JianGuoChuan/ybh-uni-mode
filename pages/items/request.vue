<template>
	<view>
		<ybh-navbar title='请求'></ybh-navbar>
		<view class="padding-tb-md padding-lr-md font-com font-indent border-bottom">
			<view class="margin-bottom-md font-bold flex">
				<u-icon name='question-circle-fill' class="padding-lr-md text-bdBlue font-lg"></u-icon>
				<text>使用说明：</text>
			</view>
			<view class="text-indent">请求后台数据方法讲解：(如何配置请求、如何全局挂载、如何调用请求)</view>
		</view>
		<view class="padding-lg">
			<view class="font-com padding-bottom-md border-bottom margin-bottom-md">
				<u-icon name='setting' size="35" class="margin-right-sm"/><strong>如何配置请求</strong>
			</view>
			<view>
				<text>● 1）在根目录的common文件下找到api文件夹，自定义请求js文件；</text></br>
				<text>● 2）配置请求方法：api文件夹下的http.interceptorne.js内配置具体的请求参数、请求头配置、请求拦截等；</text></br>
				<text>● 3）配置的请求有2种请求方式，分别是：vm.$u.get与vm.$u.post,在此配置请求路径、请求参数,具体使用详情查看原文件；</text>
			</view>
			<view class="font-com padding-tb-md border-bottom margin-bottom-md">
				<u-icon name='setting' size="35" class="margin-right-sm"/><strong>如何全局挂载</strong>
			</view>
			<view>
				<text>● 1）在api文件夹下，在http.api.js文件中为需全局调用的请求做配置，配置方法见内部示例；</text></br>
			</view>
			<view class="font-com padding-tb-md border-bottom margin-bottom-md">
				<u-icon name='setting' size="35" class="margin-right-sm"/><strong>如何调用请求</strong>
			</view>
			<view>
				<text>● 1）以上配置到全局后，就可以直接使用 ：</br>
					<strong>this.$api.自定义请求js配置的文件名.自定义请求方法名(请求参数)</strong>；</text></br>
				<text>● 2）示例：</br><strong>this.$api.testApi.test()</strong></text></br>
				<text class="text-bdBlue font-underline margin-left-md" @tap='request'>亲自体验（控制台查看）</text>
			</view>
			<view class="padding-tb-lgx padding-lr-md font-indent">
				<text>注：此请求方法仅为基础的请求方式，建议已自身项目做定制化调整后使用；</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data(){
			return {
			}
		},
		methods:{
			async request(){
				let res = await this.$api.otherApi.test();
				//查看打印值
				console.log(res);
			}
		}
	}
</script>
<style scoped lang="scss"></style>