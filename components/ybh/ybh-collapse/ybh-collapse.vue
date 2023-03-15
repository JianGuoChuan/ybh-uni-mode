<template>
	<view>
		<view v-for="(item, index) in data" :key='item.id'>
			<view :style="{ 'backgroundColor': titleBgColor || vuex_themeColor.color, 'color': titleColor }"
				:class="['flex' , 'space-between' , titleBgColor ? '' : vuex_themeColor.colorCharacter , 'padding-md' ]" @click='changeCollapseStatus(item)'>
				<view class="flex">
					<u-icon :name='item.icon' class="margin-right-sm" v-show='!item.userIcon'></u-icon>
					<text :class="[ 'margin-right-sm', 'ybh-icon', item.icon ]" v-show='item.userIcon'></text>
					<text>{{item.label || ''}}</text>
				</view>
				<view>
					<u-icon name="arrow-down" :class="[ item.open ? 'rotate180' : 'rotate0' , 'transition200' ]"></u-icon>
				</view>
			</view>
			<view :class="[ 'transition300', 'overflow-hidden' ]" :style="{ 'height': item.open ? `${contentHeight}px` : 0}">
				<view class="collapse-content padding-md">
					{{item.content || ''}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			data: {
				type: Array,
				required: true
			},
			titleBgColor: {
				type : String,
			},
			titleColor: {
				type : String,
			},
		},
		data(){
			return{
				contentHeight : 0
			}
		},
		methods:{
			watchDocumentHeight(){
				this.$nextTick(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.collapse-content').boundingClientRect(data => {
						this.contentHeight = data.height;
					}).exec();
				});
			},
			changeCollapseStatus(item){
				item.open = !item.open;
				this.watchDocumentHeight();
			},
		},
		created() {
			this.watchDocumentHeight();
		}
	}
</script>
<style scoped lang="scss">
</style>