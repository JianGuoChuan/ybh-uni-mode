<template>
	<view style="z-index: 99;" class="relative flex flex-end">
		<view @click='show = !show' class="flex">
			<view class="margin-right-xs" 
				:style="{'color' : item.checked ? vuex_themeColor.color : '#999'}" 
				v-for="item in checkedItem" :key='item.value'>{{item.label}}
			</view>
			<view class="margin-right-xs"
				:style="{'color' : item.checked ? '#ff9700' : '#999'}"
				v-if="!checkedItem.length">请选择
			</view>
			<u-icon name='arrow-up' 
				:class="show ? 'rotate-180' : 'rotate-0'" ></u-icon >
		</view>
		<view 
			:style="{
				'top' : '22px',
				'right' : '0',
				'width' : '80px',
				'overflow' : 'hidden',
				'transition' : '200ms',
				'height' : show ? `${options.length * menuHeight + 5}px` : 0
			}"
			class="absolute text-center">
			<view style="width:0;height:0;margin-left: 50px;
				border-right:10px solid transparent;
				border-left:10px solid transparent;
				border-bottom:10px solid #f1f1f1;"></view>
			<view class="bg-whiteSmoke border-radius-md overflow-hidden font-bold" id="menuBox">
				<view 
					class="padding-tb-md"
					:style="{'color' : item.checked ? vuex_themeColor.color : '#999'}" 
					v-for="(item,index) in options" :key='item.value' 
					@click='select(item)'>
					{{item.label}}
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	/*
	* ybh-dialogMenu : 对话框式下拉菜单
	* 注意 ：1、使用时的位置需要根据父级位置做定位依据,自动选择checked为true的项为选中项
	* 		2、默认checked值只允许有一个为true 多个true时不影响逻辑，显示上为显示多个字符，请注意规避
	* options ：菜单内容
	* 示例 ：
	* 	options: [
			{
				label: '样式一',
				value: 1,
				checked : true
			},
		]
	*/
	export default{
		props: {
			options : {
				type : Array,
				required: true
			}
		},
		data() {
			return {
				show : false,
				menuHeight : 0,
			}
		},
		computed: {
			checkedItem() {
				return this.options.filter( item => item.checked );
			}
		},
		methods: {
			select(item){
				this.selectHistoryName = item.label;
				this.selectHistorykey = item.value;
				this.show = false;
				this.options.map(item=>{item.checked = false;});
				item.checked = true;
				this.$emit('select',item)
			},
		},
		updated() {
			// 动态获取菜单列表高度
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this);
				query.select('#menuBox').boundingClientRect(data => {
					this.menuHeight = data.height || 0;
				}).exec();
			});
		},
	}
</script>
<style scoped lang="scss">
	.rotate-180{
		transition:200ms;
		transform:rotate(180deg);
	}
	.rotate-0{
		transition:200ms;
		transform:rotate(0deg);
	}
</style>