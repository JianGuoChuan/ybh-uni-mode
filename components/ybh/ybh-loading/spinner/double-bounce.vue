<template>
	<view class="relative" :style="{ width: spinnerSize,height: spinnerSize }">
		<view class="mint-spinner-double-bounce mint-spinner-double-bounce-bounce1" :style="{ backgroundColor: spinnerColor }"></view>
		<view class="mint-spinner-double-bounce mint-spinner-double-bounce-bounce2" :style="{ backgroundColor: spinnerColor }"></view>
	</view>
</template>

<script>
  import common from './common.vue';
  export default {
    name: 'double-bounce',
    mixins: [common]
  };
</script>

<style lang="css">
	.mint-spinner-double-bounce{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		opacity: 0.6;
		position: absolute;
		top: 0;left: 0;
		animation: mint-spinner-double-bounce 2.0s infinite ease-in-out;
	}
	.mint-spinner-double-bounce-bounce1{
		animation-delay: -0.2s;
	}
	.mint-spinner-double-bounce-bounce2{
		animation-delay: -1.0s;
	}

  @keyframes mint-spinner-double-bounce {
		0%, 100% {
			transform: scale(0.0);
		}
		50% {
			transform: scale(1.0);
		}
  }
</style>
