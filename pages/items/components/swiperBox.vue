<template>
	<view class="padding-md">
		<ybh-navbar title='滑动容器'></ybh-navbar>
		<view class="margin-bottom-md border-bottom-f1 padding-bottom-sm">
			<text class="font-bold font-sx">组件描述：</text>
			<text class="font-bold">swiperBox</text><text>滑动容器组件在原轮播图的基础上做扩展，主要实现多元素、多内容的的滑动切屏效果</text>
		</view>
		<view>
			<view>
				<text class="font-bold font-sx">组件特点：</text>
			</view>
			<view class="padding-lr-md">
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 图片轮播模式【默认】 </view>
					<view> 
						<ybh-swiperBox 
							:list='list' 
							:indicatorDots='true'  
							:autoplay='true' 
							:disabled='false' 
							:circular='true'
							interval='5000'
							duration='500'
							current='0'
							@click='swiperClick'>
						</ybh-swiperBox>
					</view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 步骤模式,利用插槽完成自定义滑动内容 </view>
					<view> 
						<ybh-swiperBox mode='comonMode' :indicatorDots='true' activeColor='red'>
							<swiper-item v-for="item in 4" :key='item'>
								<view class="flex">
									<view class="flex-6 text-center padding-top-md" v-for="(item,index) in recordList" :key='item.key' @click='swiperClick(item)'>
										<view class="border-radius-md bg-whiteSmoke font-bold font-lg margin-auto" style="width: 50px; height: 50px;line-height: 50px;">
											{{item.num}}
										</view>
										<text>{{item.title}}</text>
									</view>
								</view>
							</swiper-item>
						</ybh-swiperBox>
					</view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持显影指示面板 </view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持设置是否自动切换 </view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持设置是否禁止滑动 </view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持设置是否首尾衔接 </view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持设置自动切换时长 </view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持设置滑动动画时长 </view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持设置默认显示位置 </view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持设置激活指示点颜色 </view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持设置是否纵向 </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list : [
					{
						image : require('@/static/img/long.png'),
						value : 1
					},
					{
						image : require('@/static/img/feng.png'),
						value : 2
					}
				],
				recordList : [
					{
						title : '今日完成',
						key : 'todayCompleteNum',
						listKey : 'today',
						num : 0,
					},{
						title : '本周完成',
						key : 'weekCompleteNum',
						listKey : 'week',
						num : 0,
					},{
						title : '本月排行',
						key : 'top',
						num : 1,
					},
				],
			}
		},
		methods: {
			swiperClick(data){
				console.log(data);
			},
		},
	}
</script>

<style>
	
</style>
