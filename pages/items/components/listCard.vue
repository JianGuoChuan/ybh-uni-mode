<template>
	<view class="padding-md">
		<ybh-navbar title='列表卡片'></ybh-navbar>
		<view class="margin-bottom-md border-bottom-f1 padding-bottom-sm">
			<text class="font-bold font-sx">组件描述：</text>
			<text class="font-bold">listCard</text><text>列表卡片组件根据数据驱动视图，实现快速搭建卡片列表</text>
		</view>
		<view>
			<view>
				<text class="font-bold font-sx">组件特点：</text>
			</view>
			<view class="padding-lr-md">
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 样式预览 </view>
					<ybh-listCard :config="config" :list='list'>
						<template #cardBtns="{item,index}" >
							<view class="flex padding-sm">
								<button class="font-ms padding-lr-lgx">点赞</button>
								<button class="font-ms padding-lr-lgx">留言</button>
							</view>
						</template>
					</ybh-listCard>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 高自由度配置列表数据 </view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持修改标题栏背景颜色/文本颜色【默认主题色】 </view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持隐藏底部操作按钮组，按钮组修改自由 </view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持uview图标与自定义图标灵活使用 </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config : [
					{
						label : '组件名称：',
						key : 'title',
						isTitle : true,
					},{
						label : '组件代码：',
						key : 'titleSecond',
						isTitle : true,
					},{
						label : '全局注册：',
						icon : 'ybh-icon-topic', // 自定义图标代码
						key : 'registerAll',
						width : '50%',
						userIcon: true // 是否使用自定义图标
					},{
						label : '体积：',
						icon : 'star', // 默认使用uview图标库
						key : 'volume',
						width : '50%' // 单项宽度
					},{
						label : '实用性：',
						icon : 'volume',
						key : 'practicability',
						width : '50%'
					}
				],
				list : [
					{
						title : '卡片列表',
						titleSecond : 'listCard',
						registerAll : '是',
						volume: '很小',
						practicability: '很高'
					},
				],
			}
		},
		methods: {
			
		},
	}
</script>

<style>
	
</style>
