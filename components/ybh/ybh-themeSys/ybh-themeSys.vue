<template>
	<view class="themeSysStyle" style="width: 50px;">
		<u-modal v-model="show" :zoom="false" :show-title='false' :show-confirm-button='false' :show-cancel-button='true' @cancel="cancel">
			<view class="slot-content">
				<view class="padding-md flex space-between flex-warp padding-top-lg">
					<view class="text-center margin-bottom-sm" v-for="(item,index) in colorKu" :key='index' @tap='changeThemeColor(item)'
					style="width: 33%">
						<view :class="item.colorCharacter" style="width: 50px;height: 50px;border-radius: 15px;margin: 0 auto;"></view>
						<text class="font-sm text-gray">{{item.colorTitle}}</text>
					</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		props:{
			visible : {
				type : Boolean,
				default:false
			},
		},
		data(){
			return {
				show : false,
				colorKu : [
					{
						colorTitle : '魔幻蓝',
						colorCharacter : 'bg-gradual-blue',
						colorCode : 'linear-gradient(45deg, #0081ff, #1cbbb4)',
						color : '#0081ff'
					},
					{
						colorTitle : '烈焰红',
						colorCharacter : 'bg-gradual-red',
						colorCode : 'linear-gradient(45deg, #FF0000, #FF4500)',
						color : '#FF0000'
					},
					{
						colorTitle : '活力橙',
						colorCharacter : 'bg-gradual-orange',
						colorCode : 'linear-gradient(45deg, #ed1c24 ,#ff9700)',
						color : '#ff9700'
					},
					{
						colorTitle : '沉稳绿',
						colorCharacter : 'bg-gradual-green',
						colorCode : 'linear-gradient(45deg, #39b54a, #8dc63f)',
						color : '#39b54a'
					},
					{
						colorTitle : '神秘紫',
						colorCharacter : 'bg-gradual-purple',
						colorCode : 'linear-gradient(45deg, #9000ff, #5e00ff)',
						color : '#9000ff'
					},
					{
						colorTitle : '可爱粉',
						colorCharacter : 'bg-gradual-pink',
						colorCode : 'linear-gradient(45deg, #ec008c, #f58f98)',
						color : '#f58f98'
					},
					{
						colorTitle : '冷酷灰',
						colorCharacter : 'bg-gradual-grey',
						colorCode : 'linear-gradient(45deg, #333333, #666666)',
						color : '#666666'
					},
					{
						colorTitle : '天空青',
						colorCharacter : 'bg-gradual-sky',
						colorCode : 'linear-gradient(45deg, #50b7c1, #90d7ec)',
						color : '#50b7c1'
					},
					{
						colorTitle : '土豪金',
						colorCharacter : 'bg-gradual-gold',
						colorCode : 'linear-gradient(45deg, #faa755, #f58220)',
						color : '#faa755'
					},
				]
			}
		},
		watch: {
		    visible() {
		        this.show = this.visible;
		    },
		},
		methods:{
			cancel(){
			    this.show = false;
			    this.$emit('update:visible',this.show);
			},
			changeThemeColor(item){
				this.$u.vuex('vuex_themeColor',item);
				this.show = false;
				this.$emit('update:visible',this.show);
			}
		}
	}
</script>

<style scoped>
	
</style>
