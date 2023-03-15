function getStatus() {
    return new Promise((reslove, reject) => {
        uni.getBluetoothAdapterState({
            complete(res) {
                console.log(res);
                reslove(res);
            }
        })
    });
}
let kit = {
    writeCharacter: false,
    writeCharacterId: false,
    writeServiceId: '',
    readCharacter: false,
    readCharacterId: '',
    readServiceId: '',
    notifyCharacter: false,
    notifyCharaterId: '',
    notifyServiceId: '',
    deviceId: '',
    serviceId: '',
    openSettingPage() {
        // #ifdef APP-PLUS
        let main = plus.android.runtimeMainActivity();
        let Intent = plus.android.importClass('android.content.Intent');
        let Settings = plus.android.importClass('android.provider.Settings');
        main.startActivity(new Intent(Settings.ACTION_BLUETOOTH_SETTINGS));
        // #endif
    },
    /**
     * 蓝牙是否启用
     */
    isEnabled() {
        return getStatus().then(res => {
            console.log(res);
            return res.errCode != 10000
        });
    },
    isAvailable() {
        return getStatus().then(res => res.available || false);
    },
    isDiscovering() {
        return getStatus().then(res => res.discovering || false);
    },
    open() {
        return this.openAdapter();
    },
    openAdapter() {
		let _this = this;
        return new Promise((reslove, reject) => {
            uni.openBluetoothAdapter({
                success: function(res) {
                    reslove(res);
                },
                fail: (res) => {
                    console.log(res);
                    if (res.errCode === 10001) {
						//如果没打开蓝牙提示用户打开蓝牙
					// #ifdef APP-PLUS
							let device = uni.getSystemInfoSync().platform;
							let BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
							let BAdapter = BluetoothAdapter.getDefaultAdapter();
							if(!BAdapter.isEnabled()) {
								BAdapter.enable();
							}else {
								_this.openAdapter();
							}
					// #endif
                    }
                    reject(res);
                }
            })
        })
    },
    close() {
        return new Promise((reslove, reject) => {
            uni.closeBluetoothAdapter({
                success() {
                    reslove();
                },
                fail(res) {
                    reject(res);
                }
            });
        });
    },
    closeConnect(deviceId) {
        deviceId = deviceId || this.deviceId;
        return new Promise((reslove, reject) => {
            uni.closeBLEConnection({
                deviceId: deviceId,
                success() {
                    reslove();
                },
                fail(res) {
                    if (res.errCode === 10004) {
                        reslove();
                    } else {
                        console.log(res);
                        reject(res);
                    }
                }
            })
        })
    },
    async startSearch(onDeviceFind) {
        return new Promise((reslove, reject) => {
            uni.startBluetoothDevicesDiscovery({
                success: (res) => {
                    let i = 0;
                    let intervalId = setInterval(() => {
                        this.getDevices().then(devices => {
                            onDeviceFind(devices);
                            if (i++ >= 5) {
                                clearInterval(intervalId);
                                this.stopSearch();
                                reslove();
                            }
                        });
                    }, 1000);
                },
                fail: (res) => {
                    reject(res);
                }
            })
        });
    },
    getDevices() {
        return new Promise((reslove, reject) => {
            uni.getBluetoothDevices({
                success: function(res) {
                    let devices = res.devices.filter(e => e
                        .name && e.name != '未知设备');
                    reslove(devices);
                },
                fail(res) {
                    reject(res);
                }
            })
        });
    },
    stopSearch() {
        return new Promise((reslove, reject) => {
            uni.stopBluetoothDevicesDiscovery({
                success: (res) => {
                    reslove(res);
                },
                fail: (res) => {
                    reject(res);
                }
            })
        });
    },
    async connectDevice(deviceId) {
        await this.stopSearch();
        return new Promise((reslove, rejcet) => {
            uni.createBLEConnection({
                deviceId: deviceId,
                success: function(res) {
                    this.deviceId = deviceId;
                    reslove(res);
                },
                fail: function(res) {
                    rejcet(res)
                }
            })
        });
    },
    getServices(deviceId) {
        deviceId = deviceId || this.deviceId;
        let times = 0;
        return new Promise((reslove, reject) => {
            tryGetService(reslove, reject);
        })

        function tryGetService(reslove, reject) {
            uni.getBLEDeviceServices({
                deviceId: deviceId,
                success: (res) => {
                    // 处理在刚连接到蓝牙时,services获取为空的问题
                    if (res.services.length > 0) {
                        reslove(res.services);
                    } else if (times++ < 10) {
                        setTimeout(() => {
                            tryGetService(reslove, reject);
                        }, 200 * times);
                    } else {
                        console.log("services get error");
                        reject(res);
                    }
                },
                fail: function(res) {
                    console.log(res);
                    reject(res);
                },
            })
        }
    }
}
export default kit;
