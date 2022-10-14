<template>
	<view>
		<view class="padding-md border-bottom-f1 stickyTop top-zero">
			<ybh-navbar title='通用方法'></ybh-navbar>
			<u-search v-model="searchKey" placeholder="输入方法名称查找" :show-action='false' @change='filterFunction'></u-search>
		</view>
		<view class="padding-lg">
			<view v-for="item in showList" :key='item.id' class="margin-bottom-md padding-bottom-sm border-bottom-f1">
				<view class="margin-bottom-sm"> 
					<text class="margin-right-md">●</text>
					<text class="font-sx font-bold">{{item.title}}</text>
				</view>
				<view class="padding-left-md">
					<text class="margin-right-xs">示例代码：</text>
					<text>{{item.code}}</text>
				</view>
				<view class="padding-left-md">
					<text>注：</text>
					<text>{{item.info}}</text>
				</view>
				<view class="padding-left-md">
					<text>功能体验：</text>
					<text class="text-bdBlue font-underline" @tap='userFunctions(item.id)'>{{item.experienceText}}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import formatKit from '@/common/js/kit/formatKit.js'
	export default {
		data(){
			return {
				searchKey: '',
				showList: [],
				functionList: [
					{
						id: 1,
						title: '扫码',
						code: 'this.$iipKit.scanCode();',
						info: '函数返回值为扫描结果，无参数传递;',
						experienceText: '开始扫码'
					},{
						id: 2,
						title: '表单序列化',
						code: 'this.$qs.stringify({name:xxx,age:xx});',
						info: '函数返回值为序列化结果，传递参数为转化对象;',
						experienceText: '立即转化'
					},{
						id: 3,
						title: '日期格式化',
						code: '{{ dateTime | customFormatDate }}',
						info: '此方法把标准日期格式转化为可读日期格式显示，具体实现请查阅源码;',
						experienceText: '立即转化'
					},{
						id: 4,
						title: '拨打电话',
						code: "this.$iipKit.callPhone('19988889999');",
						info: '此方法直接调用设备拨号权限，并拨打传参号码;',
						experienceText: '立即拨打'
					},{
						id: 5,
						title: '打开文档',
						code: "this.$iipKit.openDocument(文档链接);",
						info: '此方法可尝试调用设备三方软件打开传参链接的文档;',
						experienceText: '立即打开'
					},{
						id: 6,
						title: '一键复制',
						code: "this.$iipKit.copyText(需复制的文本内容);",
						info: '此方法可将参数文本加入设备剪贴版，进行复制粘贴操作；',
						experienceText: '立即复制'
					},{
						id: 7,
						title: '图片预览',
						code: "this.$iipKit.preview(图片链接);",
						info: '此方法可将传参的图片链接进行全屏展示；',
						experienceText: '立即查看'
					},{
						id: 8,
						title: '提示消息',
						code: "this.$iipKit.toast(提示内容);",
						info: '此方法可直接调用无需表现层代码绑定，调用uni内部方法直接进行消息提示;',
						experienceText: '立即提示'
					},{
						id: 9,
						title: '消息确认',
						code: "this.$iipKit.alert(内容);",
						info: '此方法可直接调用无需表现层代码绑定，调用uni内部方法直接进行消息确认;',
						experienceText: '立即显示'
					},{
						id: 10,
						title: '简易模态框',
						code: "this.$iipKit.confirm(内容);",
						info: '此方法可直接调用无需表现层代码绑定，调用uni内部方法直接进行模态框操作;',
						experienceText: '立即显示'
					},{
						id: 11,
						title: '二维码生成',
						code: "this.$iipKit.qrCode(文本, 画板id);",
						info: '此方法由将传入内容生成二维码',
						experienceText: '立即生成'
					},
				]
			}
		},
		// 过滤器
		filters: {
			customFormatDate(time) {
				let date = new Date(time)
				return formatKit.customDateTimeFormat(date, 'MM-dd hh:mm:ss')
			},
		},
		methods:{
			filterFunction(value){
				if( value == '' ){
					this.showList = [...this.functionList];
					return
				}
				console.log(value);
				this.showList = this.functionList.filter( item => item.title.includes(value) )
			},
			userFunctions(key){
				switch( key ){
					case 1 : this.$iipKit.scanCode();break;
					case 2 : console.log( this.$qs.stringify({name: 123, age: 321}) );break;
					case 4 : this.$iipKit.callPhone(19988889999);break;
					case 5 : this.$iipKit.openDocument('https://wenku.baidu.com/view/4bdd65105427a5e9856a561252d380eb62942391.pdf');break;
					case 6 : this.$iipKit.copyText('如何让富婆爱上我？');break;
					case 7 : this.$iipKit.preview('https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc16e535f5384256bbb1145aa235416f~tplv-k3u1fbpfcp-watermark.awebp');break;
					case 8 : this.$iipKit.toast('如何让富婆爱上我？');break;
					case 9 : this.$iipKit.alert('这一拳20年的功力，你接不住的。');break;
					case 10 : this.$iipKit.confirm('这一拳20年的功力，你接的住吗？').then( res => {
						this.$iipKit.toast( res ? '我接得住！' : '我怕是接不住。');
					});break;
					default : uni.showToast({
						title: '暂无演示',
						duration: 2000,
						icon: 'none'
					}); break;
				}
			},
		},
		onLoad() {
			this.showList = [...this.functionList]
		}
	}
</script>
<style scoped lang="scss"></style>