<template>
	<view>
		<view class="flex padding-tb-md padding-lr-sm" 
			:class="[vuex_themeColor.colorCharacter || 'bg-gradual-blue']">
			<view class="content" style="width: 70%;">
				<u-input 
					v-model="contentVal" 
					border
					:height="height" 
					style="border-radius: 15px;background-color: #fff;"
					@input='input' 
					@confirm='confirm'
					@clear='clear'
				/>
			</view>
			<view class="functions text-darkgrey flex space-around" style="width:30%;">
				<u-icon :name='item.checked ? item.iconFill : item.icon' size="40" color="#fff" 
					v-for="(item,index) in funcIcons" :key='index' 
					@tap='checked(item)'/>
			</view>
		</view>
	</view>
</template>

<script>
	/*
	* ybh-commentsBar 评论栏
	* 
	* value ：v-model 的双向绑定值
	* height : 高度
	* isStar ： 点赞默认选中
	* collection ： 收藏默认选中
	* transpond ：是否已转发
	* 
	* @checked : 按钮的选中事件反馈
	* @input : 输入事件反馈
	* @confirm : 输入的回车事件反馈
	* @clear : 输入的清空事件反馈
	*/
	export default{
		props:{
			value : {
				type : String,
				default: ""
			},
			height : {
				type : String,
				default: '45'
			},
			isStar : {
				type: Boolean,
				default: true
			},
			collection : {
				type: Boolean,
				default: false
			},
			transpond : {
				type: Boolean,
				default: false
			}
		},
		watch:{
			value(){
				this.contentVal = this.value;
			}
		},
		data(){
			return{
				contentVal : '',
				funcIcons : [
					{
						icon : 'star',
						iconFill : 'star-fill',
						key : 1,
						checked : this.isStar,
					},
					{
						icon : 'thumb-up',
						iconFill : 'thumb-up-fill',
						key : 2,
						checked : this.collection,
					},
					{
						icon : 'zhuanfa',
						iconFill : 'zhuanfa',
						key : 3,
						checked : this.transpond,
					}
				]
			}
		},
		methods:{
			checked(item){
				item.checked = !item.checked;
				this.$emit('checked',{key : item.key,checked : item.checked})
			},
			input(){
				this.$emit('input',this.contentVal);
			},
			confirm(){
				this.$emit('confirm',this.contentVal);
			},
			clear(){
				this.$emit('clear','清空了');
			}
		}
	}
</script>
<style></style>