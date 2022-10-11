<template>
	<view>
		<ybh-navbar title='路由'></ybh-navbar>
		<view class="padding-lg">
			<view class="font-com padding-bottom-md border-bottom margin-bottom-md">
				<u-icon name='setting' />路由基础
			</view>
			<view v-for="(itemLv1,indexLv1) in routesListLv1" :key='itemLv1.key' class="margin-bottom-md">
				<view class="margin-bottom-sm">
					<text class="margin-right-sm">●</text>
					<text class="font-sx font-bold"> {{itemLv1.label}} </text>
				</view>
				<view class="margin-left-md">
					示例代码：{{itemLv1.content}}
				</view>
				<view class="margin-left-md">
					<text class="text-bdBlue font-underline" @tap='toPath(itemLv1)'>立即跳转</text>
				</view>
			</view>
			<view class="font-com padding-tb-md border-bottom margin-bottom-md">
				<u-icon name='setting' />路由进阶
			</view>
			<view v-for="(itemLv2,indexLv2) in routerListLv2" :key='itemLv2.key' class="margin-bottom-md">
				<view class="margin-bottom-sm">
					<text class="margin-right-sm">●</text>
					<text class="font-sx font-bold"> {{itemLv2.label}} </text>
				</view>
				<view class="margin-left-md">
					示例代码：{{itemLv2.content}}
				</view>
				<view class="margin-left-md">
					<text class="text-bdBlue font-underline" @tap='toPath(itemLv2)'>立即跳转</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data(){
			return {
				routesListLv1 : [
					{
						label : '路由前进/跳转：',
						content : 'this.$routes.to(路径,数据)',
						key : 1
					},
					{
						label : '路由跳转(关闭当前页后跳转)：',
						content : 'this.$routes.redirect(路径,数据)',
						key : 2
					},
					{
						label : '路由跳转(关闭所有后跳转)：',
						content : 'this.$routes.reLaunch(路径,数据)',
						key : 3
					},
					{
						label : '路由跳转(前往tabbar页)：',
						content : 'this.$routes.switchTab(路径)',
						key : 4
					},
					{
						label : '路由回退：',
						content : 'this.$routes.back(层数)',
						key : 5
					}
				],
				routerListLv2 : [
					{
						label : '路由前进/跳转(延时)：',
						content : 'this.$routes.delayToRouter(路径,时间,数据)',
						key : 6
					},
					{
						label : '路由回退(延时)：',
						content : 'this.$routes.delayBack(时间,层数)',
						key : 7
					},
					{
						label : '场景1：登录后延迟进入目标页面',
						content : 'this.$routes.delayReLaunchRouter(路径,时间,数据)',
						key : 8
					},
					{
						label : '场景2：登录后延迟进入tabar页',
						content : 'this.$routes.delaySwitchTabRouter(路径,时间)',
						key : 9
					},
				]
			}
		},
		methods:{
			toPath(item){
				switch(item.key){
					case 1 : this.to();break;
					case 2 : this.redirect();break;
					case 3 : this.reLaunch();break;
					case 4 : this.switchTab();break;
					case 5 : this.back();break;
					case 6 : this.delayToRouter();break;
					case 7 : this.delayBack();break;
					default : uni.showToast({ title: '暂无演示', duration: 2000, icon: 'none' });break;
				}
			},
			to(){
				this.$routes.to( '/pages/other/router_page', { key: '路由to方法'});
			},
			redirect(){
				this.$routes.redirect( '/pages/other/router_page', { key: '路由redirect方法'});
			},
			reLaunch(){
				this.$routes.reLaunch( '/pages/other/router_page', { key: '路由reLaunch方法'});
			},
			switchTab(){
				console.log( '若无tabbar页，无法跳转' );
				this.$routes.switchTab( '/pages/home/home' );
			},
			back(){
				console.log('回退的前提是存在可以回退的路由页，回退可能受redirect、reLaunch、switchTab影响导致原地刷新');
				this.$routes.back(1);
			},
			delayToRouter(){
				this.$routes.delayToRouter('/pages/other/router_page', 1000, { key: '路由delayToRouter方法'});
			},
			delayBack(){
				console.log('回退的前提是存在可以回退的路由页，回退可能受redirect、reLaunch、switchTab影响导致原地刷新');
				this.$routes.delayBack(1000, 1);
			},
		}
	}
</script>
<style scoped lang="scss"></style>