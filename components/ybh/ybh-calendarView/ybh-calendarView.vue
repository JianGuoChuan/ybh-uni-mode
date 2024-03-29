<template>
	<view id='calendarBox' class="uni-calendar padding-md overflow-hidden" :class="[vuex_themeColor.colorCharacter || 'bg-gradual-blue']"
		:style="{'min-height' : `calc( 100vh - ${boxTop}px)`}">
		<view v-if="!insert && show" class="uni-calendar__mask" :class="{ 'uni-calendar--mask-show' : aniMaskShow }" @click="clean"></view>
		<view v-if="insert || show" class="uni-calendar__content border-radius-md opacity09"
			:class="{'uni-calendar--fixed':!insert,'uni-calendar--ani-show':aniMaskShow}">
			<!-- 弹窗模式 关闭 确认按钮 -->
			<view v-if="!insert" class="uni-calendar__header uni-calendar--fixed-top">
				<view class="uni-calendar__header-btn-box" @click="close">
					<text class="uni-calendar__header-text uni-calendar--fixed-width">{{cancelText}}</text>
				</view>
				<view class="uni-calendar__header-btn-box" @click="confirm">
					<text class="uni-calendar__header-text uni-calendar--fixed-width">{{okText}}</text>
				</view>
			</view>
			<!-- 顶部操作栏 -->
			<view class="uni-calendar__header">
				<view class="uni-calendar__header-btn-box" @click.stop="pre">
					<view class="uni-calendar__header-btn uni-calendar--left"></view>
				</view>
				<picker mode="date" :value="date" fields="month" @change="bindDateChange">
					<text class="uni-calendar__header-text">{{ (nowDate.year||'') +' / '+( nowDate.month||'')}}</text>
				</picker>
				<view class="uni-calendar__header-btn-box" @click.stop="next">
					<view class="uni-calendar__header-btn uni-calendar--right"></view>
				</view>
				<text class="uni-calendar__backtoday" @click="backtoday">{{todayText}}</text>
			</view>
			<view class="uni-calendar__box">
				<view v-if="showMonth" class="uni-calendar__box-bg">
					<text class="uni-calendar__box-bg-text">{{nowDate.month}}</text>
				</view>
				<view class="uni-calendar__weeks">
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{SUNText}}</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{monText}}</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{TUEText}}</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{WEDText}}</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{THUText}}</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{FRIText}}</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{SATText}}</text>
					</view>
				</view>
				<view class="uni-calendar__weeks" v-for="(item,weekIndex) in weeks" :key="weekIndex">
					<view class="uni-calendar__weeks-item" v-for="(weeks,weeksIndex) in item" :key="weeksIndex">
						<calendar-item class="uni-calendar-item--hook" :weeks="weeks" :calendar="calendar"
							:selected="selected" :lunar="lunar" @change="choiceDate"></calendar-item>
					</view>
				</view>
			</view>
		</view>
		<view v-if='insert'>
			<template>
				<slot name='calendarView'></slot>
			</template>
		</view>
		<view class="padding-top-lg" v-if="showDateInfo && insert">
			<view class="border-radius-md overflow-hidden bg-white opacity08 text-black" style="min-height: 100px;">
				<view class="padding-md flex space-between">
					<view class="flex">
						<view class="font-bold text-bdBlue" style="font-size: 30px;">
							<text>{{selectDateInfo.Animal}}</text>
						</view>
						<view class="font-lg text-bdBlue padding-left-lg" style="padding-top: 12px;">
							<text>{{selectDateInfo.cMonth}}-</text>
							<text>{{selectDateInfo.cDay}}</text>
						</view>
						<view class="font-lg text-bdBlue padding-left-md" style="padding-top: 12px;">
							农历<text>{{selectDateInfo.IMonthCn}}</text>
							<text>{{selectDateInfo.IDayCn}}</text>
						</view>
					</view>
					<view class="font-lg text-bdBlue padding-left-md" style="padding-top: 12px;">
						<text class="margin-left-md">{{selectDateInfo.ncWeek}}</text>
					</view>
				</view>
				<view>
					<view class="text-bdBlue padding-left-md font-sx">
						<text>{{selectDateInfo.gzYear}}年</text>
						<text class="margin-left-sm">{{selectDateInfo.gzMonth}}月</text>
						<text class="margin-left-sm">{{selectDateInfo.gzDay}}日</text>
						<text class="margin-left-sm">{{selectDateInfo.astro}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Calendar from './static/util.js';
	import calendarItem from './items/uni-calendar-item.vue'
	import {initVueI18n} from '@dcloudio/uni-i18n'
	import messages from './static/index.js'
	const {t} = initVueI18n(messages)
	/**
	 * Calendar 日历
	 * @description 日历组件可以查看日期，选择任意范围内的日期，打点操作。常用场景如：酒店日期预订、火车机票选择购买日期、上下班打卡等
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=56
	 * @property {String} date 自定义当前时间，默认为今天
	 * @property {Boolean} lunar 显示农历
	 * @property {String} startDate 日期选择范围-开始日期
	 * @property {String} endDate 日期选择范围-结束日期
	 * @property {Boolean} range 范围选择
	 * @property {Boolean} insert = [true|false] 插入模式,默认为false
	 * 		@value true 弹窗模式
	 * 		@value false 插入模式
	 * @property {Boolean} clearDate = [true|false] 弹窗模式是否清空上次选择内容
	 * @property {Array} selected 打点，期待格式[{date: '2019-06-27', info: '签到', data: { custom: '自定义信息', name: '自定义消息头',xxx:xxx... }}]
	 * @property {Boolean}showDateInfo 是否显示日期信息
	 * @property {Boolean} showMonth 是否选择月份为背景
	 * @event {Function} change 日期改变，`insert :ture` 时生效
	 * @event {Function} confirm 确认选择`insert :false` 时生效
	 * @event {Function} monthSwitch 切换月份时触发
	 * @example <uni-calendar :insert="true":lunar="true" :start-date="'2019-3-2'":end-date="'2019-5-20'"@change="change" />
	 */
	export default {
		components: {calendarItem},
		emits: ['close', 'confirm', 'change', 'monthSwitch'],
		props: {
			date: {
				type: String,
				default: ''
			},
			selected: {
				type: Array,
				default () {
					return []
				}
			},
			lunar: {
				type: Boolean,
				default: false
			},
			startDate: {
				type: String,
				default: ''
			},
			endDate: {
				type: String,
				default: ''
			},
			range: {
				type: Boolean,
				default: false
			},
			insert: {
				type: Boolean,
				default: true
			},
			showMonth: {
				type: Boolean,
				default: true
			},
			showDateInfo: {
				type: Boolean,
				default: false
			},
			clearDate: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				show: false,
				weeks: [],
				calendar: {},
				nowDate: '',
				aniMaskShow: false,
				selectDate: {},
				selectDateInfo: {},
				boxTop : 0,
			}
		},
		computed: {
			/**
			 * for i18n
			 */

			okText() {
				return t("uni-calender.ok")
			},
			cancelText() {
				return t("uni-calender.cancel")
			},
			todayText() {
				return t("uni-calender.today")
			},
			monText() {
				return t("uni-calender.MON")
			},
			TUEText() {
				return t("uni-calender.TUE")
			},
			WEDText() {
				return t("uni-calender.WED")
			},
			THUText() {
				return t("uni-calender.THU")
			},
			FRIText() {
				return t("uni-calender.FRI")
			},
			SATText() {
				return t("uni-calender.SAT")
			},
			SUNText() {
				return t("uni-calender.SUN")
			},
		},
		watch: {
			date(newVal) {
				// this.cale.setDate(newVal)
				this.init(newVal)
			},
			startDate(val) {
				this.cale.resetSatrtDate(val)
				this.cale.setDate(this.nowDate.fullDate)
				this.weeks = this.cale.weeks
			},
			endDate(val) {
				this.cale.resetEndDate(val)
				this.cale.setDate(this.nowDate.fullDate)
				this.weeks = this.cale.weeks
			},
			selected(newVal) {
				this.cale.setSelectInfo(this.nowDate.fullDate, newVal)
				this.weeks = this.cale.weeks
			}
		},
		created() {
			// 获取日历方法实例
			this.cale = new Calendar({
				// date: new Date(),
				selected: this.selected,
				startDate: this.startDate,
				endDate: this.endDate,
				range: this.range,
			})
			// 选中某一天
			this.init(this.date)
		},
		mounted() {
			//计算日历盒子高度
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this);
				query.select('#calendarBox').boundingClientRect(data => {
					this.boxTop = data.top;
				}).exec();
			});
		},
		methods: {
			// 取消穿透
			clean() {},
			bindDateChange(e) {
				const value = e.detail.value + '-1'
				this.setDate(e.detail.value)
				this.$emit('monthSwitch', {
					year: this.cale.getDate(value).year,
					month: this.cale.getDate(value).month
				})
			},
			/*** 初始化日期显示* @param {Object} date*/
			init(date) {
				this.cale.setDate(date)
				this.weeks = this.cale.weeks;
				this.nowDate = this.calendar = this.cale.getInfo(date);
				this.selectDate = this.calendar;
				this.selectDateInfo = this.calendar.lunar;
			},
			/*** 打开日历弹窗*/
			open() {
				// 弹窗模式并且清理数据
				if (this.clearDate && !this.insert) {
					this.cale.cleanMultipleStatus();
					this.init(this.date);
				}
				this.show = true;
				this.$nextTick(() => {
					setTimeout(() => {this.aniMaskShow = true}, 50);
				});
			},
			/*** 关闭日历弹窗*/
			close() {
				this.aniMaskShow = false
				this.$nextTick(() => {
					setTimeout(() => {
						this.show = false
						this.$emit('close')
					}, 300)
				})
			},
			/*** 确认按钮*/
			confirm() {
				this.setEmit('confirm')
				this.close()
			},
			/*** 变化触发*/
			change() {
				if (!this.insert) return
				this.setEmit('change')
			},
			/*** 获取当前选中日期信息*/
			getDateInfo() {
				let {year,month,date,fullDate,lunar,extraInfo,} = this.calendar
				this.$emit('getDateInfo', {range: this.cale.multipleStatus,year,month,date,fulldate: fullDate,lunar,extraInfo: extraInfo || {}})
			},
			/*** 选择月份触发*/
			monthSwitch() {
				let {year,month} = this.nowDate
				this.$emit('monthSwitch', { year, month })
			},
			/*** 派发事件* @param {Object} name*/
			setEmit(name) {
				this.selectDate = this.calendar;
				this.selectDateInfo = this.calendar.lunar;
				let {year,month,date,fullDate,lunar,extraInfo,} = this.calendar
				this.$emit( name, { range: this.cale.multipleStatus,year,month,date,fulldate: fullDate,lunar,extraInfo: extraInfo || {} })
			},
			/*** 选择天触发* @param {Object} weeks*/
			choiceDate(weeks) {
				if (weeks.disable) return
				this.calendar = weeks
				// 设置多选
				this.cale.setMultiple(this.calendar.fullDate)
				this.weeks = this.cale.weeks
				this.change()
			},
			/*** 回到今天*/
			backtoday() {
				let date = this.cale.getDate(new Date()).fullDate
				this.init(date)
				this.change()
			},
			/*** 上个月*/
			pre() {
				const preDate = this.cale.getDate(this.nowDate.fullDate, -1, 'month').fullDate
				this.setDate(preDate)
				this.monthSwitch()
			},
			/*** 下个月*/
			next() {
				const nextDate = this.cale.getDate(this.nowDate.fullDate, +1, 'month').fullDate
				this.setDate(nextDate)
				this.monthSwitch()
			},
			/*** 设置日期* @param {Object} date*/
			setDate(date) {
				this.cale.setDate(date)
				this.weeks = this.cale.weeks
				this.nowDate = this.cale.getInfo(date)
			}
		},
	}
</script>

<style scoped lang="scss">
	.uni-calendar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}
	.uni-calendar__mask {
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background-color: $uni-bg-color-mask;
		transition-property: opacity;
		transition-duration: 0.3s;
		opacity: 0;
		/* #ifndef APP-NVUE */
		z-index: 99;
		/* #endif */
	}
	.uni-calendar--mask-show {
		opacity: 1
	}
	.uni-calendar--fixed {
		position: fixed;
		/* #ifdef APP-NVUE */
		bottom: 0;
		/* #endif */
		left: 0;
		right: 0;
		transition-property: transform;
		transition-duration: 0.3s;
		transform: translateY(460px);
		/* #ifndef APP-NVUE */
		bottom: calc(var(--window-bottom));
		z-index: 99;
		/* #endif */
	}
	.uni-calendar--ani-show {
		transform: translateY(0);
	}
	.uni-calendar__content {
		background-color: #fff;
	}
	.uni-calendar__header {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 50px;
		border-bottom-color: $uni-border-color;
		border-bottom-style: solid;
		border-bottom-width: 1px;
	}
	.uni-calendar--fixed-top {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		border-top-color: $uni-border-color;
		border-top-style: solid;
		border-top-width: 1px;
	}
	.uni-calendar--fixed-width {
		width: 50px;
	}
	.uni-calendar__backtoday {
		position: absolute;
		right: 0;
		top: 25rpx;
		padding: 0 5px;
		padding-left: 10px;
		height: 25px;
		line-height: 25px;
		font-size: 12px;
		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px;
		color: $uni-text-color;
		background-color: $uni-bg-color-hover;
	}
	.uni-calendar__header-text {
		text-align: center;
		width: 100px;
		font-size: $uni-font-size-base;
		color: $uni-text-color;
	}
	.uni-calendar__header-btn-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
	}
	.uni-calendar__header-btn {
		width: 10px;
		height: 10px;
		border-left-color: $uni-text-color-placeholder;
		border-left-style: solid;
		border-left-width: 2px;
		border-top-color: $uni-color-subtitle;
		border-top-style: solid;
		border-top-width: 2px;
	}
	.uni-calendar--left {
		transform: rotate(-45deg);
	}
	.uni-calendar--right {
		transform: rotate(135deg);
	}
	.uni-calendar__weeks {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		color: #000;
	}
	.uni-calendar__weeks-item {
		flex: 1;
	}
	.uni-calendar__weeks-day {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 45px;
		border-bottom-color: #F5F5F5;
		border-bottom-style: solid;
		border-bottom-width: 1px;
	}
	.uni-calendar__weeks-day-text {
		font-size: 14px;
	}
	.uni-calendar__box {
		position: relative;
	}
	.uni-calendar__box-bg {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.uni-calendar__box-bg-text {
		font-size: 200px;
		font-weight: bold;
		color: $uni-text-color-grey;
		opacity: 0.1;
		text-align: center;
		/* #ifndef APP-NVUE */
		line-height: 1;
		/* #endif */
	}
</style>
