<template>
	<view class="relative shadow-md-bottom padding-lr-sm padding-tb-md overflow-hidden" 
		:class="[vuex_themeColor.colorCharacter || 'bg-gradual-blue']"
		:style="{'padding-right' : filterMode ? '38px' : '0','height': checked ? '80px' :'50px','transition' : '200ms'}">
		<u-search :placeholder="placeholder" v-model="para.searchKey" @search='searchStart' @custom='searchStart' @change='clearSearch'
			style="height: 30px;" :action-text='actionText'></u-search>
		<view style="top: 16px;right: 8px" class='text-white flex absolute font-md' 
			@tap='checked = !checked' v-if="filterMode">
			<u-icon :name="checked ? 'setting-fill' : 'setting'"/>
			<text class="font-sm">更多</text>
		</view>
		<view class="flex space-between padding-top-md">
			<view class="flex text-darkgreyplus padding-left-sm">
				<view v-for="(item,index) in checkList" :key='item.key' 
					:class="item.checked ? 'text-white' : 'text-smokyWhite'" 
					@tap='selectSort(item)'>
					<u-icon :name='item.icon' style="font-size: 15px;" />
					<text class="margin-right-md">{{item.label}}</text>
				</view>
			</view>
			<view class="flex absolute" style="right: 8px;">
				<ybh-filter v-model="para" :fields="filterFields" @confirm="getPara"></ybh-filter>
			</view>
		</view>
	</view>
</template>

<script>
	/*
	* ybh-searchBar 筛选搜索栏
	* 
	* value ：搜索关键值
	* filterFields ：筛选对象配置　详情查阅subpkg组件示例代码
	* filterMode ：是否开启筛选
	*/
	export default {
		props:{
			value : {
				type : Object,
				required : false
			},
			filterFields : {
				type : Array,
				required : false
			},
			filterMode : {
				type : Boolean,
				default: true
			},
			placeholder: {
				type: String,
				default: '请输入内容'
			},
			actionText: {
				type: String || Number,
				default: '搜索'
			}
		},
		computed: {
			checkList() {
				return this.checkListFun.filter(item => item.checked )
			}
		},
		data(){
			return {
				para : {},
				checked : false,
				checkListFun : [
					{
						label : '降序',
						icon : 'arrow-downward',
						key : 'desc',
						checked : false,
					},
					{
						label : '升序',
						icon : 'arrow-upward',
						key : 'asc',
						checked : true,
					},
				],
			}
		},
		watch:{
			value(){
				this.para = this.value;
			}
		},
		methods:{
			getPara(paraData){
				this.$emit('input',paraData);
				this.$emit('confirm',paraData);
			},
			searchStart(){
				if(!this.para.searchKey){return}
				this.$emit('input',this.para);
				this.$emit('confirm',this.para);
			},
			clearSearch(){
				if(this.para.searchKey){return}
				this.$emit('input',this.para);
				this.$emit('confirm',this.para);
			},
			selectSort(sortItem){
				this.checkListFun.map(item=>{
					item.checked = true;
				});
				sortItem.checked = false;
				this.para.orderBy = sortItem.key;
				this.$emit('input',this.para);
				this.$emit('confirm',this.para);
			}
		}
	}
</script>

<style scoped lang="scss">
	/deep/ .u-action-active{
		width: 55px;
	}
	/deep/ .u-action{
		padding-right: 15px;
		color: #fff;
	}
</style>
