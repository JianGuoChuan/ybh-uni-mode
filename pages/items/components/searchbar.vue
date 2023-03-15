<template>
	<view>
		<ybh-navbar title='搜索栏'></ybh-navbar>
		<ybh-searchBar v-model="para" :filterFields='filterFields' @confirm='ack' :filterMode='isOpenfilter' placeholder='请输入关键字' actionText='查询'></ybh-searchBar>
		<view class="padding-md">
			<view class="margin-bottom-md border-bottom-f1 padding-bottom-sm">
				<text class="font-bold font-sx">组件描述：</text>
				<text class="font-bold">modal</text><text>搜索栏在原搜索栏的功能基础上，增加了升降序与筛选功能；</text>
			</view>
			<view>
				<view>
					<text class="font-bold font-sx">组件特点：</text>
				</view>
				<view class="padding-lr-md">
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 支持开启/关闭多功能模式 </view>
						<view> <text class="text-base-color font-italic" @tap='openFilter'> {{isOpenfilter ? '立即关闭' : '立即开启'}}</text> </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 支持搜索框自定义提示文字 </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 开启多功能模式后支持升降序触发 </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 开启多功能模式后筛选触发 </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 筛选支持关键字筛选、日期筛选、多标签筛选 </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 自动过滤空字符搜索 </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 支持修改右侧按钮文件 </view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isOpenfilter: true,
				filterFields: [
				    {
				        key: 'key1',
				        label: '筛选条件1【输入类型】',
				        type: 'text',
				        placeholder: '请输入内容'
				    },
				    {
				        key: 'key2',
				        label: '筛选条件2【选择类型】',
				        type: 'select',
						multiple : true,
						maxShow : 3,
				        props: {
				            label: 'name',
				            value: 'id'
				        },
				        dcitData: [
							{
							    id: '1',
							    name: '北京'
							},
				            {
				                id: '2',
				                name: '上海'
				            },
				        ]
				    },
					{
					    key: 'key3',
					    label: '筛选条件2【日期类型】',
					    type: 'date',
					},
				],
				para: {
					key1 : '',
					key2 : '',
					key3 : '',
				},
			}
		},
		methods: {
			ack(val){
				console.log('搜索或筛选触发了,取得值：');
				console.log(val);
			},
			openFilter(){
				this.isOpenfilter = !this.isOpenfilter;
			}
		},
	}
</script>

<style>
</style>
