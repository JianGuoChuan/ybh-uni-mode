<template>
	<view class="relative">
		<!-- logo渲染区域 -->
		<view class="padding-tb-lg text-center topHeight">
			<image :src="src" class="logoStyle" @click="showHttpAddress"></image>
			<view class="font-md font-bold">ybh-uniUI</view>
			<text class="text-gray">项目快速起步</text>
		</view>
		<!-- 信息录入区域 -->
		<view class="formStyle">
			<u-form :model="accountInfo" ref="uForm">
				<u-form-item label="手机号" label-width="150" left-icon='phone'>
					<u-input v-model="accountInfo.phone" type="number" maxlength="11" placeholder="请输入手机号"/>
				</u-form-item>
				<u-form-item label="验证码" label-width="150" left-icon='lock'>
					<u-input v-model="accountInfo.verifiCode" type="number" maxlength="6" :clearable='false' placeholder="请输入验证码"/>
					<u-button @tap="getCode" size="mini">{{tips}}</u-button>
					<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
							@change="codeChange"></u-verification-code>
				</u-form-item>
				<u-form-item label="服务器地址" label-width ='200' left-icon='warning' v-show="show">
					<u-input v-model="baseUrl" type="text" placeholder="请输入服务器地址"/>
				</u-form-item>
			</u-form>
			<!-- 提交按钮组1 -->
			<view class="padding-tb-md">
				<ybh-button :loading='isLoad' @click='login'>{{loginText}}</ybh-button>
			</view>
			<view class="flex flex-center text-darkgrey">
				<text @tap='changeLoginState' class="font-sm">账号密码登录</text>
				<text class="padding-lr-md">|</text>
				<text @tap='register' class="font-sm">没有账号？注册</text>
			</view>
		</view>
		<view class="fixed width-all" style="bottom: 40px;">
			<!-- 提交按钮组2 -->
			<u-divider>其他方式登录</u-divider>
			<view class="flex space-around width-half margin-auto padding-top-md">
				<u-icon name='qq-fill' size="50" color="#42A5FF"></u-icon>
				<u-icon name='zhifubao-circle-fill' size="50" color="#42A5FF"></u-icon>
				<u-icon name='weibo' size="50" color="#ED432B"></u-icon>
			</view>
			<!-- 法律信息相关 -->
			<view class="font-ms text-center margin-top-md text-darkgrey">
				<text>未注册的手机号登录时将自动注册，且代表您已经同意</text></br>
				<text class="text-underline margin-right-sm">用户协议</text>和<text class="text-underline margin-left-sm" @tap='testLogin'>隐私政策</text>
			</view>
		</view>
	</view>
</template>

<script>
	import devConfig from '@/common/devConfig.js'
	export default {
		data() {
			return {
				show : false,
				isLoad : false,
				clickTimes : 0,
				loginText : ' 登录',
				baseUrl : devConfig.baseUrl,
				src: require('@/static/img/logo.png'),
				tips: '',
				seconds: 10,
				accountInfo : {
					phone : '19992454529',
					verifiCode : '924452',
				},
			}
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if(!this.$legalCheck.phoneCheck(this.user.phone)){
					this.$iipKit.toast('请输入合法的手机号');
					return
				}
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				this.$u.toast('倒计时结束');
			},
			start() {
				this.$u.toast('倒计时开始');
			},
			// 服务器地址输入开关
			showHttpAddress(){
				this.clickTimes ++ ;
				if(this.clickTimes > 5){ this.show = true; }
			},
			// 设置服务器地址
			setBaseUrl() {
			    if (!this.baseUrl) { return; }
			    let baseUrl = this.baseUrl;
			    if (!baseUrl.startsWith('http')) {
			        baseUrl = 'http://' + baseUrl;
			    }
			    this.$lu.vuex('vuexBaseUrl', baseUrl);
			},
			// 登录
			async login(){
				this.isLoad = true;
				this.loginText = ' 登录中';
				let res = await this.$api.loginApi.login( this.accountInfo );
				if(res.data.code !== 200){
					this.isLoad = false;
					this.loginText = '重新登录';
					return
				}
				this.$routes.delaySwitchTabRouter('/pages/home/home', 2000, ()=>{
					// 存储token
					this.$u.vuex('vuex_token', res.data.token);
					// 存储用户信息
					this.$u.vuex( 'vuex_userinfo', {
						username: res.data.username || '',
						phone: res.data.phone || '',
					})
				});
			},
			changeLoginState(){
				this.$iipKit.toast('账号密码登录触发了');
			},
			register(){
				this.$routes.to('/pages/login/register')
			},
			testLogin(){
				this.$routes.switchTab('/pages/home/home');
			}
		},
		onUnload() {
			this.isLoad = false;
			this.loginText = ' 登录';
		}
	}
</script>
<style scoped lang="scss">
	.topHeight{ padding-top: 60px; }
	.logoStyle{width: 100px;height: 100px;}
	.formStyle{padding: 10px 25px;}
	.button-round{border-radius: 50px;font-size: 16px;border-width: 1px;border-style: solid;}
	button::after{ border: none;} 
</style>
