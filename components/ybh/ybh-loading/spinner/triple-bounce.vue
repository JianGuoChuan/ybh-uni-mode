<template>
	<view class="margin-top-sm">
		<view class="mint-spinner-triple-bounce mint-spinner-triple-bounce-bounce1" :style="bounceStyle"></view>
		<view class="mint-spinner-triple-bounce mint-spinner-triple-bounce-bounce2" :style="bounceStyle"></view>
		<view class="mint-spinner-triple-bounce mint-spinner-triple-bounce-bounce3" :style="bounceStyle"></view>
	</view>
</template>
<script>
  import common from './common.vue';
  export default {
		name: 'triple-bounce',
		mixins: [common],
		computed: {
			spinnerSize() {
				return ((this.size || 28) / 3) + 'px';
			},
			bounceStyle() {
				return {
					width: this.spinnerSize,
					height: this.spinnerSize,
					backgroundColor: this.spinnerColor
				};
			}
		}
	};
</script>

<style lang="css">
	.mint-spinner-triple-bounce{
		border-radius: 100%;
		display: inline-block;
		animation: mint-spinner-triple-bounce 1.4s infinite ease-in-out both;
	}
	.mint-spinner-triple-bounce-bounce1{
		animation-delay: -0.10s;
	}
	.mint-spinner-triple-bounce-bounce2{
		animation-delay: -0.16s;
	}
	.mint-spinner-triple-bounce-bounce3{
		animation-delay: -0.24s;
	}
	@keyframes mint-spinner-triple-bounce {
		0%, 80%, 100% {
			transform: scale(0);
		} 40% {
			transform: scale(1.0);
		}
	}
</style>