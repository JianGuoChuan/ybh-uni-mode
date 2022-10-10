<template>
	<view>
		<ybh-editSign @sumbit='sumbit'></ybh-editSign>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				action : uni.getStorageSync('storageData').vuexBaseUrl + '/blade-resource/oss/endpoint/put-file?code=minio-iipcloud-zw',
				header : {
					'Authorization' : 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
					'Blade-Auth' : uni.getStorageSync('storageData').vuexBladeAuth
				},
			}
		},
		methods: {
			sumbit(res){
				console.log(res);
			}
		},
		onReady() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: this.vuex_themeColor.color || '#0081ff'
			});
		}
	}
</script>

<style>
</style>
