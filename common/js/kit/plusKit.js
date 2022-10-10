function generateDeviceId() {
    let deivceId = uni.getStorageSync('deviceId');
    if (!deivceId) {
        deivceId = String(new Date().getTime());
        uni.setStorageSync('deviceId', deivceId);
    }
    return deivceId;
}
let kit = {
    plusExist: false,
    getDeviceInfo() {
        return new Promise((reslove, reject) => {
            let deviceInfo = uni.getStorageSync('deviceInfo');
            if (deviceInfo) {
                try {
                    reslove(deviceInfo);
                    return;
                } catch (e) {
                    console.log('getInfo failed: ' + JSON.stringify(e));
                }
            }
            plus.device.getInfo({
                success(deviceInfo) {
                    uni.setStorageSync('deviceInfo', deviceInfo);
                    reslove(deviceInfo);
                },
                fail: function(e) {
                    reject(e);
                    console.log('getDeviceInfo failed: ' + JSON.stringify(e));
                }
            })
        });
    },
    getDeviceId() {
        // #ifdef H5
        return new Promise((reslove, reject) => {
            reslove(generateDeviceId())
        })
        // #endif
        return this.getDeviceInfo().then(info => {
            return info.uuid;
        }).catch(res => {
            console.error(res);
            return generateDeviceId();
        });
    }
}
export default kit;
