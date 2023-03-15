<template>
	<view>
		<view class="shadow-md-bottom margin-tb-md overflow-hidden border-xs border-radius-md" v-for="(item,index) in list" :key='index'>
			<view :style="{ 'backgroundColor': titleColor || '', color: titleTextColor || '' }"
				:class="[ titleColor || vuex_themeColor.colorCharacter || 'bg-gradual-blue', 'border-bottom', 'padding-md', 'text-white', 'flex', 'space-between']">
				<view v-for="(it,ind) in config" v-if="it.isTitle" :key='ind'>
					<text>{{it.label}}</text>
					<text>{{item[it.key]}}</text>
				</view>
			</view>
			<view class="border-bottom flex flex-warp padding-lr-md padding-tb-md">
				<view v-for="( cItem, cIndex ) in config" :key='item.key' :style="{ 'width': cItem.width || '50%' }">
					<view class="padding-tb-xs" v-if="!cItem.isTitle && (!hideNullValue || item[cItem.key])" >
						<u-icon :name="cItem.icon" size="15px" color="#666" class='margin-right-xs' v-show='!cItem.userIcon'></u-icon>
						<text color="#666" :class="[ 'ybh-icon', cItem.icon,'margin-right-xs' ]" v-show='cItem.userIcon'></text>
						<text class="text-darkgrey margin-right-xs">{{cItem.label}}</text>
						<text class="font-ms">{{item[cItem.key]}}</text>
					</view>
				</view>
			</view>
			<view>
				<template>
					<slot name='cardBtns' :item="item" :index="index"></slot>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	/*
	*	列表卡片
	* 	list ：卡片数据
	* 	config ：卡片配置
	* 	hideNullValue ： 空值隐藏开关
	*   titleColor: 标题背景
	*   titleTextColor: 标题文本颜色
	*/
	export default {
		props:{
			list : {
				type : Array,
				required:true
			},
			config : {
				type : Array,
				required:true
			},
			hideNullValue : {
				type : Boolean,
				default: false
			},
			titleColor: {
				type: String,
			},
			titleTextColor: {
				type: String,
			},
		}
	}
</script>

<style>
</style>
