<template>
	<view>
		<ybh-navbar title='通用组件'></ybh-navbar>
		
		<view class="padding-tb-md padding-lr-md font-com font-indent border-bottom">
			<view class="margin-bottom-md font-bold flex">
				<u-icon name='question-circle-fill' class="padding-lr-md text-bdBlue font-lg"></u-icon>
				<text class="font-com">使用说明：</text>
			</view>
			<view class="text-indent font-sm">基于<text class="font-bold">uniapp</text>与<text class="font-bold">uView1.0</text>
				做二次整合，包含了一些强化定制后的常用组件，用来满足多变的业务需求，页面仅作功能演示、具体参数请查看源代码。</view>
		</view>
		
		<view class="padding-lg">
			<view v-for="item in componentList" :key='item.id' @tap='to(item)' class="margin-bottom-md">
				<view class="margin-bottom-sm">
					<text class="margin-right-md">●</text>
					<text class="font-bold font-com text-underline text-base-color font-italic"> {{ item.title }} </text>
				</view>
				<view class="padding-left-md">
					<text>组件描述：</text>
					<text>{{ item.desc }}</text>
				</view>
			</view>
			
		</view>
	</view>
</template>
<script>
	export default {
		data(){
			return {
				componentList: [
					{
						id: 1,
						title: 'navbar 自定义导航',
						desc: '自定义顶部导航栏',
						path: '/pages/items/components/navbar'
					},{
						id: 2,
						title: 'themeSys 换肤系统',
						desc: '模板内组件基本支持此换肤系统预设皮肤',
						path: '/pages/items/components/themeSys'
					},{
						id: 3,
						title: 'modal 模态框',
						desc: '支持录入数据与扫码的强化模态框',
						path: '/pages/items/components/modal'
					},{
						id: 3.5,
						title: 'modalPlus 模态框强化版',
						desc: '保留基础模态框功能外，对外观样式、显隐动画做了深度强化，新增了按钮组多选模式',
						path: '/pages/items/components/modalPlus'
					},{
						id: 4,
						title: 'searchBar 搜索栏',
						desc: '支持排序与筛选的搜索栏',
						path: '/pages/items/components/searchbar'
					},{
						id: 5,
						title: 'button 按钮',
						desc: '配套主题配色的按钮',
						path: '/pages/items/components/button'
					},{
						id: 6,
						title: 'input-box 步进器',
						desc: '配套主题配色步进器，优化了浮点类型增减的显示异常',
						path: '/pages/items/components/inputBox'
					},{
						id: 7,
						title: 'loading 加载中状态',
						desc: '三套预设的加载中状态动画组件',
						path: '/pages/items/components/loading'
					},{
						id: 8,
						title: 'swiperBox 滑动容器',
						desc: '滑动容器可以实现轮播或者元素的滑动切屏效果',
						path: '/pages/items/components/swiperBox'
					},{
						id: 9,
						title: 'imageModal 图片查看',
						desc: '提供图片大图预览与保存本地相册',
						path: '/pages/items/components/imageModal'
					},{
						id: 10,
						title: 'listItem 列表菜单',
						desc: '使用数据配置即可快速搭建列表菜单',
						path: '/pages/items/components/listItem'
					},{
						id: 11,
						title: 'listCard 列表卡片',
						desc: '使用数据配置即可快速搭建列表卡片',
						path: '/pages/items/components/listCard'
					},{
						id: 12,
						title: 'fab 悬浮按钮组',
						desc: '脱离文本流的悬浮按钮组',
						path: '/pages/items/components/fab'
					},{
						id: 13,
						title: 'collapse 折叠菜单',
						desc: '折叠菜单',
						path: '/pages/items/components/collapse'
					},{
						id: 14,
						title: '视觉组件',
						desc: '视觉组件合集',
						path: '/pages/items/components/views'
					}
				]
			}
		},
		methods:{
			to(item){
				this.$routes.to(item.path)
			}
		}
	}
</script>
<style scoped lang="scss"></style>