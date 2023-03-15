<template>
	<view>
		<ybh-navbar title='注册'></ybh-navbar>
		<view class="padding-tb-lgx padding-lr-40px topHeight">
			<text class="font-bold font-lg">注册体验账号</text>
		</view>
		<view class="padding-lr-40px">
			<u-form :model="user" ref="uForm">
				<u-form-item label="手机号" label-width="150" left-icon='phone'>
					<u-input v-model="user.phone" type="number" maxlength="11" placeholder="请输入手机号"/>
				</u-form-item>
				<u-form-item label="验证码" label-width="150" left-icon='fingerprint'>
					<u-input v-model="user.verifiCode" type="number" maxlength="6" :clearable='false' placeholder="请输入验证码"/>
					<u-button @tap="getCode" size="mini">{{tips}}</u-button>
					<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
							@change="codeChange"></u-verification-code>
				</u-form-item>
				<u-form-item label="密　码" label-width="150" left-icon='lock'>
					<u-input v-model="user.password" type="password" placeholder="请输入密码"/>
				</u-form-item>
			</u-form>
		</view>
		<view class="padding-lr-40px padding-tb-lgx">
			<ybh-button :isLoadMode="true" :isLoad.sync="isLoad" @click='register'>{{registerText}}</ybh-button>
			<view class="text-center font-sm margin-top-md">
				<text @tap='toLogin'>已有账号，去登录</text>
			</view>
		</view>
		<view class="fixed width-all" style="bottom: 40px;">
			<!-- 提交按钮组2 -->
			<u-divider>其他方式登录</u-divider>
			<view class="flex space-around width-half margin-auto padding-top-md">
				<u-icon name='qq-fill' size="50" color="#42A5FF"></u-icon>
				<u-icon name='weixin-fill' size="50" color="#1AA034"></u-icon>
				<u-icon name='weibo' size="50" color="#ED432B"></u-icon>
			</view>
			<!-- 法律信息相关 -->
			<view class="font-ms text-center margin-top-md text-darkgrey">
				<u-checkbox v-model="agreement" size="28" shape='circle'>我同意</u-checkbox>
				<text class="text-underline margin-lr-sm">用户协议</text>
				和
				<text class="text-underline margin-left-sm">隐私政策</text>
			</view>
		</view>
	</view>
</template>
<script>
	import legalCheck from '@/common/js/kit/legalCheck.js'
	export default {
		data() {
			return {
				isLoad : false,
				agreement :　true,
				tips: '',
				seconds: 10,
				registerText : ' 注册',
				user : {
					phone : '',
					verifiCode : '',
					password : ''
				}
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
			register(){
				this.isLoad = true;
				this.registerText = ' 注册中';
				setTimeout(()=>{
					this.$iipKit.toast('服务器连接失败');
					this.isLoad = false;
					this.registerText = ' 注册';
				},2000)
			},
			toLogin(){
				this.$routes.reLaunch('/pages/login/login');
			},
		},
	}
</script>
<style scoped lang="scss">
	.topHeight{ margin-top: 60px; }
	.padding-lr-40px{padding-left: 40px;padding-right: 40px;}
	.button-round{border-radius: 50px;font-size: 16px;border-width: 1px;border-style: solid;}
</style>