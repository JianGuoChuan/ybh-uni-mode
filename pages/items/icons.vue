<template>
	<view>
		<view class="padding-md border-bottom-f1 stickyTop top-zero">
			<ybh-navbar title='内置图标'></ybh-navbar>
			<u-search placeholder="输入图标名称查找" :show-action='false' @change='filterIcon'></u-search>
		</view>
		<view class="padding-md">
			<u-grid :col="4">
				<u-grid-item v-for="(item,index) in iconListFilter">
					<text :class="[ 'ybh-icon', item.icon, 'font-lgcx', 'margin-bottom-md' ]" ></text>
					<text class="grid-text">{{item.name}}</text>
					<text class="grid-text font-xs text-center text-darkgrey margin-top-sm">{{item.code}}</text>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				key: '',
				iconList: [
					{
						code: 'home',
						name: '首页',
						icon: 'ybh-icon-home'
					},{
						code: 'home-fill',
						name: '首页[填充]',
						icon: 'ybh-icon-home-fill'
					},{
						code: 'user',
						name: '个人',
						icon: 'ybh-icon-user'
					},{
						code: 'user-fill',
						name: '个人[填充]',
						icon: 'ybh-icon-user-fill'
					},{
						code: 'like',
						name: '喜欢',
						icon: 'ybh-icon-like'
					},{
						code: 'like-fill',
						name: '喜欢[填充]',
						icon: 'ybh-icon-like-fill'
					},{
						code: 'error',
						name: '错误',
						icon: 'ybh-icon-error'
					},{
						code: 'error-fill',
						name: '错误[填充]',
						icon: 'ybh-icon-error-fill'
					},{
						code: 'success',
						name: '成功',
						icon: 'ybh-icon-success'
					},{
						code: 'success-fill',
						name: '成功[填充]',
						icon: 'ybh-icon-success-fill'
					},{
						code: 'heart',
						name: '爱心',
						icon: 'ybh-icon-heart'
					},{
						code: 'heart-fill',
						name: '爱心[填充]',
						icon: 'ybh-icon-heart-fill'
					},{
						code: 'add-round',
						name: '增加',
						icon: 'ybh-icon-add-round'
					},{
						code: 'add-fill',
						name: '增加[填充]',
						icon: 'ybh-icon-add-fill'
					},{
						code: 'reduce',
						name: '减少',
						icon: 'ybh-icon-reduce'
					},{
						code: 'reduce-fill',
						name: '减少[填充]',
						icon: 'ybh-icon-reduce-fill'
					},{
						code: 'praise',
						name: '点赞',
						icon: 'ybh-icon-praise'
					},{
						code: 'praise-fill',
						name: '点赞[填充]',
						icon: 'ybh-icon-praise-fill'
					},{
						code: 'checked',
						name: '选择',
						icon: 'ybh-icon-checked'
					},{
						code: 'checked-fill',
						name: '选择[填充]',
						icon: 'ybh-icon-checked-fill'
					},{
						code: 'jup',
						name: '上箭头',
						icon: 'ybh-icon-jup'
					},{
						code: 'jright',
						name: '右箭头',
						icon: 'ybh-icon-jright'
					},{
						code: 'jdown',
						name: '下箭头',
						icon: 'ybh-icon-jdown'
					},{
						code: 'back',
						name: '返回',
						icon: 'ybh-icon-back'
					},{
						code: 'setting',
						name: '设置',
						icon: 'ybh-icon-setting'
					},{
						code: 'edit',
						name: '编辑',
						icon: 'ybh-icon-edit'
					},{
						code: 'help',
						name: '帮助',
						icon: 'ybh-icon-help'
					},{
						code: 'creation',
						name: '创作',
						icon: 'ybh-icon-creation'
					},{
						code: 'setting',
						name: '设置',
						icon: 'ybh-icon-setting'
					},{
						code: 'fingerprint',
						name: '指纹',
						icon: 'ybh-icon-fingerprint'
					},{
						code: 'shopCar',
						name: '购物车',
						icon: 'ybh-icon-shopCar'
					},{
						code: 'TopOne',
						name: '皇冠',
						icon: 'ybh-icon-TopOne'
					},{
						code: 'sort',
						name: '分类',
						icon: 'ybh-icon-sort'
					},{
						code: 'tags',
						name: '标签',
						icon: 'ybh-icon-tags'
					},{
						code: 'device',
						name: '设备',
						icon: 'ybh-icon-device'
					},{
						code: 'warehouse',
						name: '仓库',
						icon: 'ybh-icon-warehouse'
					},{
						code: 'department',
						name: '部门',
						icon: 'ybh-icon-department'
					},{
						code: 'language',
						name: '语言',
						icon: 'ybh-icon-language'
					},{
						code: 'hate',
						name: '不感兴趣',
						icon: 'ybh-icon-hate'
					},{
						code: 'tel',
						name: '电话',
						icon: 'ybh-icon-tel'
					},{
						code: 'location',
						name: '定位',
						icon: 'ybh-icon-location'
					},{
						code: 'map',
						name: '地图',
						icon: 'ybh-icon-map'
					},{
						code: 'order',
						name: '订单',
						icon: 'ybh-icon-order'
					},{
						code: 'more',
						name: '更多',
						icon: 'ybh-icon-more'
					},{
						code: 'double',
						name: '翻倍',
						icon: 'ybh-icon-double'
					},{
						code: 'redbag',
						name: '红包',
						icon: 'ybh-icon-redbag'
					},{
						code: 'copy',
						name: '拷贝',
						icon: 'ybh-icon-copy'
					},{
						code: 'share',
						name: '分享',
						icon: 'ybh-icon-share'
					},{
						code: 'topic',
						name: '话题',
						icon: 'ybh-icon-topic'
					},{
						code: 'vip',
						name: '会员',
						icon: 'ybh-icon-vip'
					},{
						code: 'pwd',
						name: '密码',
						icon: 'ybh-icon-pwd'
					},{
						code: 'man',
						name: '男人',
						icon: 'ybh-icon-man'
					},{
						code: 'woman',
						name: '女人',
						icon: 'ybh-icon-woman'
					},{
						code: 'gift',
						name: '礼物',
						icon: 'ybh-icon-gift'
					},{
						code: 'ranking',
						name: '排行',
						icon: 'ybh-icon-ranking'
					},{
						code: 'friends',
						name: '朋友圈',
						icon: 'ybh-icon-friends'
					},{
						code: 'scan',
						name: '扫描',
						icon: 'ybh-icon-scan'
					},{
						code: 'calendar',
						name: '日历',
						icon: 'ybh-icon-calendar'
					},{
						code: 'comments',
						name: '评论',
						icon: 'ybh-icon-comments'
					},{
						code: 'screen',
						name: '筛选',
						icon: 'ybh-icon-screen'
					},{
						code: 'delete',
						name: '删除',
						icon: 'ybh-icon-delete'
					},{
						code: 'upload',
						name: '上传',
						icon: 'ybh-icon-upload'
					},{
						code: 'time',
						name: '时间',
						icon: 'ybh-icon-time'
					},{
						code: 'voice',
						name: '声音',
						icon: 'ybh-icon-voice'
					},{
						code: 'collect',
						name: '收藏',
						icon: 'ybh-icon-collect'
					},{
						code: 'cellphone',
						name: '手机',
						icon: 'ybh-icon-cellphone'
					},{
						code: 'refresh',
						name: '刷新',
						icon: 'ybh-icon-refresh'
					},{
						code: 'saerch',
						name: '搜索',
						icon: 'ybh-icon-saerch'
					},{
						code: 'toast',
						name: '提示',
						icon: 'ybh-icon-toast'
					},{
						code: 'image',
						name: '图片',
						icon: 'ybh-icon-image'
					},{
						code: 'uncheck',
						name: '未选择',
						icon: 'ybh-icon-uncheck'
					},{
						code: 'weibo',
						name: '微博',
						icon: 'ybh-icon-weibo'
					},{
						code: 'questionnaire',
						name: '问卷',
						icon: 'ybh-icon-questionnaire'
					},{
						code: 'weixin',
						name: '微信',
						icon: 'ybh-icon-weixin'
					},{
						code: 'camera',
						name: '相机',
						icon: 'ybh-icon-camera'
					},{
						code: 'notice',
						name: '消息',
						icon: 'ybh-icon-notice'
					},{
						code: 'position',
						name: '位置',
						icon: 'ybh-icon-position'
					},{
						code: 'noticecenter',
						name: '消息',
						icon: 'ybh-icon-noticecenter'
					},{
						code: 'eye',
						name: '可见性',
						icon: 'ybh-icon-eye'
					},{
						code: 'WIFI',
						name: 'WIFI',
						icon: 'ybh-icon-WIFI'
					},{
						code: 'loading',
						name: '加载中',
						icon: 'ybh-icon-loading'
					},{
						code: 'phone',
						name: '手机',
						icon: 'ybh-icon-phone'
					},{
						code: 'eraser',
						name: '橡皮擦',
						icon: 'ybh-icon-eraser'
					},{
						code: 'palette',
						name: '调色板',
						icon: 'ybh-icon-palette'
					},{
						code: 'graffiti',
						name: '线条',
						icon: 'ybh-icon-graffiti'
					},{
						code: 'withdraw',
						name: '撤销',
						icon: 'ybh-icon-withdraw'
					},{
						code: 'histogram',
						name: '柱状图',
						icon: 'ybh-icon-histogram'
					},{
						code: 'line',
						name: '折线图',
						icon: 'ybh-icon-line'
					},{
						code: 'bar',
						name: '饼图',
						icon: 'ybh-icon-bar'
					},{
						code: 'curve',
						name: '曲线',
						icon: 'ybh-icon-curve'
					},{
						code: 'radio',
						name: '圆形',
						icon: 'ybh-icon-radio'
					},{
						code: 'ellipse',
						name: '椭圆',
						icon: 'ybh-icon-ellipse'
					},{
						code: 'code',
						name: '编号',
						icon: 'ybh-icon-code'
					},{
						code: 'up',
						name: '收起',
						icon: 'ybh-icon-up'
					},{
						code: 'down',
						name: '下拉',
						icon: 'ybh-icon-down'
					},{
						code: 'icon',
						name: '图标',
						icon: 'ybh-icon-icon'
					},{
						code: 'tools',
						name: '工具箱',
						icon: 'ybh-icon-tools'
					},{
						code: 'request',
						name: '请求',
						icon: 'ybh-icon-request'
					},{
						code: 'component',
						name: '插件',
						icon: 'ybh-icon-component'
					},{
						code: 'function',
						name: '事件',
						icon: 'ybh-icon-function'
					},{
						code: 'route',
						name: '路径',
						icon: 'ybh-icon-route'
					},{
						code: 'manager',
						name: '管理',
						icon: 'ybh-icon-manager'
					},
				]
			}
		},
		computed:{
			iconListFilter(){
				return this.iconList.filter( e => {
					return e.name.includes(this.key) || e.code.includes(this.key);
				})
			},
		},
		methods: {
			filterIcon(value){
				this.key = value;
			}
		},
	}
</script>

<style>
</style>
