<template>
	<view>
		<view :class="[vuex_themeColor.colorCharacter || 'bg-gradual-blue']" class="card_box">
			<view class="padding-lr-lg flex space-between padding-bottom-sm">
				<view>
					<u-icon name="setting-fill" size="25px" color="#fff" class="margin-right-sm" />
					<u-icon name="scan" size="22px" color="#fff" />
				</view>
				<view class="margin-top-sm margin-right-sm relative">
					<u-icon name="chat" size="16px" color="#fff" class="margin-right-xs"></u-icon>
					<text>消息</text>
					<u-badge type="error" :is-dot="true" style="right: -3px;top: 0px;"></u-badge>
				</view>
			</view>
			<view style="height: 120px;" class="bg-white padding-lr-md margin-lr-lg border-radius-md shadow-md-bottom">
				{{vuex_themeColor.colorCharacte}}
			</view>
		</view>
		<view class="padding-tb-md margin-tb-md"></view>
	</view>
</template>
<script>
	export default {
		data(){
			return{
				userInfo : {}
			}
		},
		methods:{
			
		},
		created() {
			this.userInfo = this.vuex_userInfo || {}
		}
	}
</script>

<style lang='scss' scoped>
	.card_box{
		height: 140px;
		padding-top: 15px;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
</style>

