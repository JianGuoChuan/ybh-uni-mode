<template>
	<view>
		<ybh-navbar title='无限树'></ybh-navbar>
		<view class="padding-md">
			<ybh-infiniteTree :data="tree" :edit='true' :divider='true' :unfold='true'
				@node-click="nodeClick" @node-add='addNode' @node-edit='editNode' @node-del='delNode'></ybh-infiniteTree>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				tree: [
					{
						checked: false,
						children: [
							{
								children: [],
								id: 13,
								label:"株洲市",
								name: "株洲市",
								pid: "3"
							},
							{
								children: [],
								id: 11,
								label:"长沙市",
								name: "长沙市",
								pid: "1"
							},
							{
								children: [],
								id: 12,
								label:"常德市",
								name: "常德市",
								pid: "2"
							}
						],
						id: 1,
						label:"湖南省",
						name: "湖南省",
						pid: "0"
					}
				]
			}
		},
		methods:{
			// 节点点击事件
			nodeClick(e) {
				console.log('点击的项目', JSON.stringify(e));
			},
			// 节点新增事件
			addNode(e){
				console.log('新增子节点的项目', JSON.stringify(e));
			},
			// 节点编辑事件
			editNode(e){
				console.log('编辑的节点', JSON.stringify(e));
			},
			// 节点删除事件
			delNode(e){
				console.log('删除的节点', JSON.stringify(e));
			}
		}
	}
</script>

<style>
</style>
