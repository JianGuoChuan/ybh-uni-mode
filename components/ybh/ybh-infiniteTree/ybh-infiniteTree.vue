<template>
	<view class="leo-tree">
		<view v-if="edit && !data.length" style='padding-left: 18px;' >
	        <view class="head h-flex">
	            <view class="head-1">
	                <text class="txt">创建根节点</text>
	            </view>
	            <view class="p-t-20 p-r-30">
	                <image src="./static/addblue.png" class="edit-icon" @click="addItem({id:0})"  />
	            </view>
	        </view>
	    </view>
		<!-- 节点 -->
		<treeNode v-for="item in data" :items="data" :item="item" :key="item[defaultProps.id]" 
			:defaultProps="defaultProps" :divider="divider" :edit="edit" :unfold="unfold"
	        @add-item="addItem" @delete-item="deleteItem">
		</treeNode>
		<!-- 新增/编辑 模态框 -->
		<ybh-modal :visible.sync="inputshow" :defalutValue='inputcontent' :title='inputtitle' :scanMode='false' inputType="text"
			@confirm='inputConfirm' @cancel="inputCancel" placeholder="请输入节点名称"></ybh-modal>
		<!-- 操作确认模态框 -->
		<u-modal v-model="toastModalShow" :content="toastModalContent" :show-cancel-button='true' @confirm="removeNodeData"></u-modal>
	</view>
</template>

<script>
	/*
	*	data : tree数据原
	* 		{
	*			id:1,
	*			label:'',
	*			hildren:[]
	*		} 每个节点必须有children,无子节点设置为[];
	* 	edit: 是否开启编辑
	* 	divider: 是否开启分割线
	* 	unfold: 是否默认展开
	* 	defaultProps 配置选项，return { id: 'id', label: 'label', children: 'children' }
	* 	@node-click : 节点点击事件
	* 	@node-add : 节点新增事件
	* 	@node-edit : 节点编辑事件
	* 	@node-del : 节点删除事件
	*/
	import treeNode from './tree-node/tree-node.vue';
	export default {
		components : { treeNode },
		props: {
			data: {
				type: Array,
				default: () => {
					return []
				}
			},
			divider: {
				type: Boolean,
				default: false
			},
			unfold: {
				type: Boolean,
				default: false
			},
			edit: {
				type: Boolean,
				default: false
			},
			defaultProps: {
				type: Object,
				default: () => {
					return {
		            	id: 'id',
		            	children: 'children',
		                label : 'label'
		            }
				}
			}
		},
		provide(){
			return {
			  defaultProps: this.defaultProps,
			  onClickItem: this.onClickItem,
			  addItem: this.addItem,
			  editItem: this.editItem,
			  deleteItem: this.deleteItem,
			  divider: this.divider,
			  unfold: this.unfold,
			  edit: this.edit,
			}
		},
		data() {
			return {
				pNodeData: {},
				inputtitle: '新增节点',
				inputshow: false,
				toastModalShow: false,
				selectNodeId : '',
				selectNode : {},
				toastModalContent: '',
				inputcontent: '',
			}
		},
		methods:{
			// 节点点击
			onClickItem(e) {
				this.$emit('node-click', e);
			},
			// 新增子节点
			addItem(e) {
			    this.pNodeData = e;
			    this.inputcontent = '';
			    this.inputtitle = '新增节点';
			    this.inputshow = true;
			},
			// 编辑节点
			editItem(e) {
			    this.inputcontent = e[this.defaultProps.label];
			    this.inputtitle = '编辑节点';
			    this.pNodeData = e;
			    this.inputshow = true;
			},
			// 模态框确认
			inputConfirm(text) {
				this.inputcontent = text;
			    if( this.inputtitle === '新增节点' ) {
			        if( this.inputcontent  && this.pNodeData ) {
						this.addNode({pNodeData: this.pNodeData, addContent: this.inputcontent});
						this.$emit('node-add', this.pNodeData);
			        }
			    }
			    if( this.inputtitle === '编辑节点' ) {
					this.editNode({pNodeData: this.pNodeData, editContent: this.inputcontent});
					this.$emit('node-edit', this.pNodeData);
			    }
			},
			// 模态框取消
			inputCancel() {
			    this.inputcontent = '';
			    this.pNodeData = {};
			},
			//节点新增按钮点击事件
			addNode(e) {
				// 根据自身需求，自行修改数据新增方法；
				// 可以配合异步请求 执行服务器删除操作
				let data = {};
				if( e.id === 0 ) {
					data = {id: this.tree.length + 1, pid: e.id, label:'新增节点', name:'新增节点',children:[]}
				} else {
					data = {
						id: e.pNodeData.id + e.pNodeData.children.length + 100, 
						pid: e.pNodeData.id, 
						label: e.addContent, 
						name: e.addContent,
						children:[]
					}
				}
				if(data) {
					this.addNodeData(this.data, e.pNodeData.id, data);
				}
			},
			//遍历id节点添加子项
			addNodeData(datas, id, nodedata){ //遍历树  获取id数组
				var addflag = false;
				if( id === 0 ) {
					datas.unshift(nodedata);
					addflag=true;
				} else {
					for(var i in datas){
						if(id===datas[i].id) {
							datas[i].children.unshift(nodedata);
							addflag=true;
							break;
						} else {
							if(datas[i].children){  //存在子节点就递归
							  this.addNodeData(datas[i].children, id, nodedata);
							}
						}
					}
				}
			},
			//节点更新按钮点击事件
			editNode(e) {
				if(e.editContent.length >= 2 && e.editContent.length <= 16) {
					e.pNodeData.label = e.editContent;
					e.pNodeData.name = e.editContent;
				}
			},
			// 删除节点入口
			deleteItem(e) {
				this.deleteNode(e);
			},
			// 删除节点
			deleteNode(e) {
				// 根据自身需求，自行修改数据删除方法；
				this.selectNode = e;
				this.selectNodeId = e.id;
				this.toastModalContent = '确认删除此节点信息吗？'
				this.toastModalShow = true;
			},
			//遍历id节点并删除 
			removeNodeData(datas,id){ //遍历树  获取id数组
				let cDatas = datas || this.data;
				let cId = id || this.selectNodeId
				for(var i in cDatas){
					if( cId === cDatas[i].id ) {
						cDatas.splice(i,1);
						break;
					} else {
						if(cDatas[i].children){  //存在子节点就递归
							this.removeNodeData( cDatas[i].children, cId );
						}
					}
				}
				this.$emit('node-del', this.selectNode);
			},
		}
	}
</script>

<style scoped>
    .head{
        display: flex;
        align-items: center;
        line-height: 60rpx;
    }
    .head-1{
        display: flex;
        flex-basis: auto;
        margin-top: 10rpx;
    }
    .txt{
        font-size: 30rpx;
        color: #222;
    }
    .p-r-30{
        margin-right: 30rpx;
    }
    .p-t-20{
        margin-top: 20rpx;
    }
    .h-flex{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }
    .edit-icon{
		width: 40rpx;
		height: 40rpx;
		padding-right: 10rpx;
    }
</style>