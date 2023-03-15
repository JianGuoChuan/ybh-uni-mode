<template>
	<view>
		<view :class="[vuex_themeColor.colorCharacter || 'bg-gradual-blue', 'card_box']" :style="{ 'paddingTop': `${paddingTop}px`, 'height': `${height}px` }">
			<!-- 顶部操作栏 -->
			<view class="padding-lr-lg flex space-between padding-bottom-sm">
				<view>
					<u-icon name="setting-fill" size="25px" color="#fff" class="margin-right-sm" @tap='setting'/>
					<u-icon name="scan" size="22px" color="#fff" @tap='scan'/>
				</view>
				<view class="margin-top-sm margin-right-sm relative" @tap='notice'>
					<u-icon name="chat" size="16px" color="#fff" class="margin-right-xs"></u-icon>
					<text>消息</text>
					<u-badge type="error" :is-dot="true" style="right: -3px;top: 0px;"></u-badge>
				</view>
			</view>
			<!-- 内容区域 -->
			<view :style="{ 'height': `${contentHeight}px` }" class="bg-white padding-lr-md margin-lr-lg border-radius-md shadow-md-bottom">
				<template>
					<slot name='userCardContent'></slot>
				</template>
			</view>
		</view>
		<view class="padding-tb-md margin-tb-md"></view>
	</view>
</template>
<script>
	export default {
		props:{
			paddingTop: {
				type: String,
				default: '15'
			},
			height: {
				type: String,
				default: '140'
			},
			contentHeight: {
				type: String,
				default: '120'
			}
		},
		data(){
			return{
				userInfo : {},
			}
		},
		methods:{
			setting(){
				this.$emit( 'set', {key : 0} )
			},
			scan(){
				this.$emit( 'scan', {key : 1} )
			},
			notice(){
				this.$emit( 'notice', {key : 2} )
			}
		},
		created() {
			this.userInfo = this.vuex_userInfo || {}
		}
	}
</script>

<style lang='scss' scoped>
	.card_box{
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
</style>

