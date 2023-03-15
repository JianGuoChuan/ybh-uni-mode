<template>
</template>

<script>
</script>

<style>
</style>
<template>
	<view>
		<ybh-navbar title='日历'></ybh-navbar>
		<view>
			<ybh-calendarView ref='cander' :showMonth='true' :selected='selectedData' :showDateInfo='true'
				@getDateInfo='getDateInfo' @change="change" @monthSwitch='changeMonth'>
				<!-- 自定义内容区域 -->
				<template v-slot:calendarView>
					<view class="padding-md margin-top-md bg-white opacity08 border-radius-sm text-bdBlue" style="min-height: 10px;" 
						v-show="selectDateInfo.date">
						<view class="font-bold font-lg">{{selectDateInfo.info}} {{selectDateInfo.date && selectDateInfo.date.substring(5,10)}}</view>
						<view class="">{{selectDateInfo.data && selectDateInfo.data.custom}}</view>
					</view>
				</template>
			</ybh-calendarView>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectedData : [
					{	
						date: '2022-05-01', 
						info: '劳动节', 
						data: {name: "五一国际劳动节", custom: "劳动节一般指五一国际劳动节。 国际劳动节又称“五一国际劳动节”“国际示威游行日”（International Workers' Day或者May Day），是世界上80多个国家的全国性节日。"},
					},
				],
				selectDateInfo : {},
			}
		},
		methods: {
			async getDateInfo(date){
				console.log(date);
				this.selectDateInfo = date.extraInfo || {};
			},
			async change(date){
				console.log(date);
				this.selectDateInfo = date.extraInfo || {};
			},
			async changeMonth(date){
				console.log(date);
			},
		},
		onReady() {
			this.$refs.cander.getDateInfo();
		}
	}
</script>
<style>
</style>
