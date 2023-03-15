<template>
	<view id="indexListBox">
		<view class="padding-tb-md padding-lr-md" id="searchBox">
			<u-search placeholder="搜索内容" :show-action='false' v-model="searchKey" @input='input'></u-search>
		</view>
		<view class="index-list-wrap" :style="{height: `${llHieght}px`}">
			<scroll-view 
				scroll-y="true" 
				style="height: calc(100%);" 
				:scroll-into-view="scrollIntoView" 
				:scroll-with-animation="scrollWithAnimation"
				@scroll.passive ="onScroll" 
				scroll-anchoring >
				<view 
					v-for="(item, index) in list" 
					:key="genIndexKey(item[indexKey],index)" 
					:id="item[indexKey]" 
					class="part" 
					v-if="item.data.length && item.show"
					:data-id="item[indexKey]" 
					@click.stop="">
					<!-- 列表索引标题 -->
					<view class="part-title" :style="{color: currentFlag === item[indexKey] ? activeColor : ''}" @click.stop="">
						{{item[indexKey]}}
					</view>
					<!-- 列表内容 -->
					<view 
					:class="['item', {disabled: citem.disabled}]" 
					v-for="(citem, cindex) in item[dataKey]" 
					:key="genIndexKey(citem, cindex)"
					 :data-cindex="cindex" 
					 @click.stop="itemClick(citem, index, cindex)"
					 v-if='citem.show'>
						<label v-if="multiple" class="radio">
							<checkbox v-if="checkType === 'rect'" style="transform: scale(0.8);" :color="checkColor" :value="`${index}${cindex}`"
							 :checked="isCheck(index, cindex, citem)" :disabled="citem.disabled" />
							<radio v-else style="transform: scale(0.8);" :color="checkColor" :disabled="citem.disabled" :value="`${index}${cindex}`"
							 :checked="isCheck(index, cindex, citem)" />
						</label>
						<slot v-bind="citem">
							{{contentForItem(citem, index)}}
						</slot>
					</view>
				</view>
			</scroll-view>
		
			<!-- 索引  -->
			<view v-if="showIndex" class="index-part" >
				<view class="index-item" :data-id="item" :data-index="index" v-for="(item, index) in indexList" :key="genIndexKey(item, index)"
				:style="{color: currentFlag === item ? activeColor : ''}">
					{{item}}
				</view>
				<view class="shadow-layer" @click.stop="shadowLayerClick" @touchmove="shadowLayerMove"></view>
			</view>
		</view>
		
	</view>
</template>

<script>
	/**
	 * @property {Array} list: 数据数组
	 * @property {String} indexKey: 索引的字段
	 * @property {Sting} dataKey: 列表的字段
	 * @property {Array | string} fileds: 显示的字段
	 * @property {Boolean} multiple: 是否多选 
	 * @property {string} checkType: 多选图标 default: 'circle' // 'rect'
	 * @property {string} checkColor: 多选图标选中的颜色
	 * @property {string} activeColor: 索引激活的颜色
	 * @event {Function()} name: onSelect(data, partIndex, itemIndex)]
	 */
	export default {
		name: 'aIndexedList',
		props: {
			value : {
				type : String,
				default: ''
			},
			list: {
				type: Array,
				required: false
			},
			indexKey: {
				type: String,
				default: 'letter'
			},
			dataKey: {
				type: String,
				default: 'data'
			},
			lHeight: {
				type: String | Number
			},
			multiple: {
				type: Boolean,
				default: false
			},
			showIndex: {
				type: Boolean,
				default: true
			},
			fileds: {
				type: String | Array,
				default: null
			},
			activeColor: {
				type: String,
				default: '#007AFF'
			},
			scrollWithAnimation: {
				type: Boolean,
				default: false
			},
			checkColor: {
				type: String,
				default: '#007AFF'
			},
			checkType: {
				type: String,
				default: 'circle' //'rect'/'circle'
			}
		},
		data() {
			return {
				llHieght: 0,
				searchKey : '',
				indexList: [],
				scrollIntoView: '',
				indexNodeInfo: [],
				indexTitleInfo: [],
				moveTimer: null,
				showCurrentTimer: null,
				showCFlag: false,
				currentFlag: '',
				resultArr: [],
				multipleObj: {},
			}
		},
		watch: {
			list: {
				immediate: true,
				handler(val) {
					let tmp = []
					this.list.forEach((item, index) => {
						tmp.push(item[this.indexKey]);
						item.show = true;
						item.data.map(citem=>{citem.show = true;});
					})
					this.indexList = tmp
					this.currentFlag = tmp[0]
					this.findIndexPosition()
				}
			},
			value(){
				this.searchKey = this.value;
			}
		},
		mounted() {
			// 动态设置列表高度
			let navbarHeight = 0;
			let searchBarHeight = 0;
			let theNode1 = uni.createSelectorQuery().select("#indexListBox")
			theNode1.boundingClientRect((data)=>{
				navbarHeight = data.top;
				let theNode2 = uni.createSelectorQuery().select("#searchBox")
				theNode2.boundingClientRect((data)=>{
					searchBarHeight = data.height;
					uni.getSystemInfo({
						success: (obj) => {this.llHieght = obj.windowHeight - (navbarHeight + searchBarHeight);}
					});
				}).exec()
			}).exec()
		},
		methods: {
			input(){
				let that = this;
				this.list.filter(function(items){
					return items.data.map(item=>{
						let itemShow = false;
						if(item.name.indexOf(that.searchKey) != -1){
							itemShow = true;
							item.show = true;
							items.show = true;
							return
						}
						item.show = false;
						if(!itemShow){
							items.show = false;
						}
					})
				});
				this.$emit('input',this.searchKey)
			},
			contentForItem(item, index) {
				if (!this.fileds) {
					return item
				}
				if (typeof this.fileds === 'string') {
					return item[this.fileds]
				}
				if (toString.call(this.fileds) === '[object Array]') {
					return item[this.fileds[index]] || item[this.fileds[0]]
				}
			},
			genIndexKey(key, index, prefix = '_') {
				let str = encodeURIComponent(key + index) || key
				return prefix + '_' + str + Math.random() + index
			},
			isCheck(index, cindex, item) {
				let key = `${index}${cindex}`
				// 默认选中
				if (item.checked) {
					this.$set(this.multipleObj, key, item)
				}
				return !!this.multipleObj[key]
			},
			itemClick(item, index, cindex) {
				// wechat 小程序  v-for 暂不支持循环数据：
				if (!item) {
					item = this.list[index][this.dataKey][cindex]
				}
				if (item.disabled) {
					return
				}
				if (this.multiple) {
					this.multipleSelect(item, index, cindex)
				} else {
					this.$emit('onSelect', item, index, cindex)
				}
			},
			multipleSelect(item, index, cindex) {
				let key = `${index}${cindex}`
				if (this.multipleObj[key]) {
					if (item.checked !== undefined) {
						item.checked = false
					}
					this.$delete(this.multipleObj, key)
				} else {
					if (item.checked !== undefined) {
						item.checked = true
					}
					this.$set(this.multipleObj, key, item)
				}
				this.resultArr = Object.values(this.multipleObj)
				this.$emit('onSelect', this.resultArr, index, cindex)
			},
			shadowLayerClick(e) {
				let pageY = e.detail.y
				let node = this.indexPartNodeTrigger(pageY)
				this.flagClick(node.id, node.index)
			},
			flagClick(flag, index) {
				// wechat 小程序  v-for 暂不支持循环数据：
				if (!flag) {
					flag = this.indexList[index]
				}
				this.showCurrentFlag(flag)
				this.scrollIntoView = flag
			},
			indexPartNodeTrigger(pageY) {
				let node = this.indexNodeInfo.find(item => pageY >= item.top && pageY < item.bottom)
				return node
			},
			shadowLayerMove(e) {
				let touch = e.changedTouches[0]
				if (!touch) {
					return
				}
				let pageY = touch.pageY
				clearTimeout(this.moveTimer)
				let node = this.indexPartNodeTrigger(pageY)
				if (node) {
					this.showCurrentFlag(node.id)
					this.moveTimer = setTimeout(() => {
						this.scrollIntoView = node.id
					}, 20)
				}
			},
			showCurrentFlag(flag) {
				clearTimeout(this.showCurrentTimer)
				this.currentFlag = flag
				this.showCFlag = true
				this.showCurrentTimer = setTimeout(() => {
					this.showCFlag = false
				}, 1000)
			},
			onScroll(e) {
				if (this.showCFlag) { return }
				let scrollTop = e.detail.scrollTop + 100;
				let node = this.indexTitleInfo.find((item) => scrollTop >= item.top && scrollTop < item.bottom );
				if (node) {	this.currentFlag = node.id }
			},
			findIndexPosition() {
				let nodeInfo = []
				let titleInfo = []
				this.$nextTick(() => {
					const query = uni.createSelectorQuery().in(this);
					query.selectAll('.index-part .index-item').boundingClientRect(data => {
							data.forEach((node, index) => {
								let obj = {
									id: node.dataset.id,
									top: node.top,
									bottom: node.bottom,
									index
								}
								nodeInfo.push(obj)
							})
							this.indexNodeInfo = nodeInfo
						}).selectAll('.part').boundingClientRect(data => {
							data.forEach((node, index) => {
								let obj = {
									id: node.dataset.id,
									top: node.top,
									bottom: node.bottom,
									index
								}
								titleInfo.push(obj)
							})
							this.indexTitleInfo = titleInfo
						}).select('.index-part').boundingClientRect(data => {
							this.indexPartTop = data.top
						})
						.exec();
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	* {
		box-sizing: border-box;
	}
	.scroller {
		width: 100%;
		height: 100%;
		overflow: auto;
		border: 1px solid #f90;
	}
	.index-list-wrap {
		height: 100%;
		overflow: hidden;
		position: relative;
		display: flex;
		width: 100%;

		.part {
			font-size: 26rpx;

			.part-title {
				background: #f0f0f0;
				padding: 10rpx 20rpx;
				position: sticky;
				z-index: 9;
				top: 0;
			}

			.item {
				padding: 18rpx 20rpx;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #e3e3e3;
			}

			.disabled {
				color: rgba(0, 0, 0, .3);
				background-color: #f7f7f7;
			}
		}

		.index-part {
			position: fixed;
			z-index: 999;
			right: 6rpx;
			top: 50%;
			transform: translateY(-50%);
			width: 40rpx;
			text-align: center;
			font-size: 24rpx;
			color: #333;
			font-weight: bold;
			border-radius: 4rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: rgba(0, 0, 0, 0.2);
			.index-item {
				width: 100%;
				padding: 2rpx 0;
				font-size: 22rpx;
			}
			.shadow-layer {
				position: absolute;
				width: calc(100% + 6rpx);
				right: -6rpx;
				height: 100%;
			}
		}

		.show-select-flag {
			position: absolute;
			top: calc(50% - 88rpx);
			left: 50%;
			z-index: 999;
			font-size: 66rpx;
			color: #666;
			animation: selectFlagAnimation 0.5s;
		}

		@keyframes selectFlagAnimation {
			0% {
				opacity: 0;
				scale: 0;
				transform: translateY(40rpx);
			}

			100% {
				scale: 1;
				opacity: 1;
				transform: translateY(0);
			}
		}

		.list {
			flex: 1;
			background-color: #f56;
		}
	}
</style>
