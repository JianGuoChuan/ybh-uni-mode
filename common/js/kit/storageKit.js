let kit = {
	setStorage(key, value=null, ...args) {
		uni.setStorage({
			key: key,
			data: value,
			success() {
				args[0] && args[0]();
			},
			fail() {
				args[1] && args[1]();
			},
			complete() {
				args[2] && args[2]();
			}
		})
	},
	setStorageSync(key, value) {
		uni.setStorageSync(key, value)
	},
	getStorage(key, value=null, ...args) {
		uni.getStorage({
			key: key,
			data: value,
			success() {
				args[0] && args[0]();
			},
			fail() {
				args[1] && args[1]();
			},
			complete() {
				args[2] && args[2]();
			}
		})
	},
	getStorageSync(key, clear) {
		const value = uni.getStorageSync(key);
		if(clear === 'clear' || clear === true) {
			this.removeStorageSync(key);
		}
		return value;
	},
	removeStorage(key,...args) {
		uni.removeStorage({
			key: key,
			success() {
				args[0] && args[0]();
			},
			fail() {
				args[1] && args[1]();
			},
			complete() {
				args[2] && args[2]();
			}
		})
	},
	removeStorageSync(key) {
		uni.removeStorageSync(key)
	}	
}
export default kit;