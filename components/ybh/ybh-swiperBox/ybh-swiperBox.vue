<template>
	<view class="relative">
		<view v-if="mode === 'imgMode'">
			<swiper 
				:current="current"
				:indicator-dots="indicatorDots" 
				:indicator-active-color = 'activeColor ? activeColor : vuex_themeColor.colorCode'
				:autoplay="autoplay" 
				:interval="interval" 
				:duration="duration" 
				:circular='circular' 
				:disable-touch='disabled'
				:vertical='vertical'
				:style="{'height': swiperHeight + 'px'}">
				<swiper-item v-for="item in list" :key='item.value' @click="click(item)">
					<image :src="item.image" style="width: 100%;height: 100%;"></image>
				</swiper-item>
			</swiper>
		</view>
		<view v-if="mode === 'comonMode'">
			<swiper 
				:current="current"
				:indicator-dots="indicatorDots" 
				:autoplay="autoplay" 
				:interval="interval" 
				:duration="duration" 
				:circular='circular' 
				:disable-touch='disabled'
				:vertical='vertical'
				:indicator-active-color='activeColor || vuex_themeColor.colorCode'
				:style="{'height': swiperHeight + 'px'}">
				<template>
				    <slot></slot>
				</template>
			</swiper>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			mode : {
				type : String,
				default: 'imgMode'
			},
			list : {
				type : Array,
				required:false
			},
			swiperHeight : {
				type : Number,
				default: 120
			},
			// 是否显示指示面板
			indicatorDots : {
				type : Boolean,
				default : true
			},
			// 是否自动切换
			autoplay : {
				type : Boolean,
				default : true
			},
			// 是否禁止滑动
			disabled : {
				type : Boolean,
				default : false
			},
			// 是否首尾衔接  步骤模式下务必开启 否则返回上一步的逻辑是跳过整个周期直到下一个current
			circular : {
				type : Boolean,
				default : true
			},
			// 自动切换时长
			interval : {
				type : [ String , Number],
				default : 5000
			},
			// 滑动动画时长
			duration : {
				type : [ String , Number],
				default : 500
			},
			// 默认位置
			current : {
				type : [ String , Number],
				default : 0
			},
			// 激活指示点颜色
			activeColor: {
				type : String,
			},
			// 是否纵向
			vertical: {
				type : Boolean,
				default : false
			}
		},
		data() {
			return {
			}
		},
		watch:{
			current(){
				this.change();
			}
		},
		methods: {
			click(data){
				this.$emit('click',{ImgData : data});
			},
			change(){
				this.$emit('change',{current : this.current});
			},
		},
	}
</script>
<style scoped lang="scss">
</style>