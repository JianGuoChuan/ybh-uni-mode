var tsc = require("@/common/js/kit/print/tsc.js");
var esc = require("@/common/js/kit/print/esc.js");
import bleKit from '@/common/js/kit/bluetoothKit.js'

/**
 * 返回蓝牙的读写特征值
 * @param {Object} bluetoothAddress
 * @param {Object} services
 */
function getCharacteristics(bluetoothAddress, services) {
    let result = {
        notifyCharaterId: '',
        notifyServiceId: '',
        writeCharaterId: '',
        writeServiceId: '',
        readServiceId: '',
        readCharaterId: ''
    }
    let serviceIndex = 0;
    return new Promise((reslove, reject) => {
        getBLEDeviceCharacteristics(reslove, reject);
    });

    function getBLEDeviceCharacteristics(reslove, reject) {
        uni.getBLEDeviceCharacteristics({
            deviceId: bluetoothAddress,
            serviceId: services[serviceIndex].uuid,
            success: (res) => {
                for (var i = 0; i < res.characteristics.length; ++i) {
                    var properties = res.characteristics[i].properties
                    console.log(properties);
                    var item = res.characteristics[i].uuid
                    if (!result.notifyCharaterId && properties.notify) {
                        result.notifyCharaterId = item
                        result.notifyServiceId = services[serviceIndex].uuid
                    } else if (!result.writeCharaterId && properties.write) {
                        result.writeCharaterId = item
                        result.writeServiceId = services[serviceIndex].uuid
                    } else if (!result.readCharaterId && properties.read) {
                        result.readCharaterId = item
                        result.readServiceId = services[serviceIndex].uuid
                    }
                }
                if (result.readCharaterId && result.writeCharaterId && result.notifyCharaterId) {
                    reslove(result);
                    return;
                }
                if (serviceIndex == services.length) {
                    reject(result);
                    return;
                }
                serviceIndex++
                getBLEDeviceCharacteristics(reslove, reject);
            },
            fail: function(res) {
                reject(res);
            }
        })
    }
}
let kit = {
    bluetoothAddress: '',
    characteristics: {
        notifyCharaterId: '',
        notifyServiceId: '',
        writeCharaterId: '',
        writeServiceId: '',
        readServiceId: '',
        readCharaterId: ''
    },
    isInited() {
        return Boolean(this.bluetoothAddress);
    },
    // 打印机初始化
    async init(bluetoothAddress) {
        uni.showLoading({
            mask: true,
            title: '连接中'
        });
        //console.log('关闭蓝牙连接');
        await bleKit.closeConnect(bluetoothAddress);
        console.log('连接蓝牙');
        await bleKit.connectDevice(bluetoothAddress);
        console.log('蓝牙连接成功');
        let services = await bleKit.getServices(bluetoothAddress);
        //console.log("services: ",services);
        this.characteristics = await getCharacteristics(bluetoothAddress, services);
        console.log("this.characteristics: ", this.characteristics);
        uni.notifyBLECharacteristicValueChange({
            deviceId: bluetoothAddress,
            serviceId: this.characteristics.notifyServiceId,
            characteristicId: this.characteristics.notifyCharaterId,
            state: true,
            success: (res) => {
                console.log(res);
                console.log('printer init finish');
                this.bluetoothAddress = bluetoothAddress;
                uni.hideLoading();
                uni.onBLECharacteristicValueChange(function(r) {
                    console.log(
                        `characteristic ${r.characteristicId} has changed, now is ${r}`)
                })
            },
            fail: function(e) {
                console.log(e)
            }
        });
        // this.queryStatus();
    },
    // 查询打印机状态
    queryStatus() {
        /*
        n = 1：传送打印机状态
        n = 2：传送脱机状态
        n = 3：传送错误状态
        n = 4：传送纸传感器状态
        */
        let n = 1;
        let buf = new ArrayBuffer(3)
        let dateView = new DataView(buf)
        dateView.setUint8(0, 16)
        dateView.setUint8(1, 4)
        dateView.setUint8(2, n)
        console.log("this.characteristics.writeCharaterId: ", this.characteristics.writeCharaterId);
        uni.writeBLECharacteristicValue({
            deviceId: this.bluetoothAddress,
            serviceId: this.characteristics.writeServiceId,
            characteristicId: this.characteristics.writeCharaterId,
            value: buf,
            success: function(res) {
            },
            complete: function(res) {
                console.log(res)
                buf = null
                dateView = null;
            }
        })
    },
    // 发送数据至打印机
    sendData(buff) {
        if (!this.bluetoothAddress) {
            throw new Error('请先连接蓝牙');
        }
        let currentTime = 1,
            onTimeData = 100;
        let loopTime = parseInt(buff.length / onTimeData) + 1;
        let lastData = parseInt(buff.length % onTimeData);
        let deviceId = this.bluetoothAddress;
        let serviceId = this.characteristics.writeServiceId;
        let characteristicId = this.characteristics.writeCharaterId;
        let delay = true;
        // 发送错误重试次数
        let repeateTimes = 0;
        // 最大重试次数
        var maxRepeateTimes = 100;
        send();

        function send() {
            let buf, dataView
            if (currentTime < loopTime) {
                buf = new ArrayBuffer(onTimeData)
                dataView = new DataView(buf)
                for (var i = 0; i < onTimeData; ++i) {
                    dataView.setUint8(i, buff[(currentTime - 1) * onTimeData + i])
                }
            } else {
                buf = new ArrayBuffer(lastData)
                dataView = new DataView(buf)
                for (var i = 0; i < lastData; ++i) {
                    dataView.setUint8(i, buff[(currentTime - 1) * onTimeData + i])
                }
            }
            console.log("第" + currentTime + "次发送数据大小为：" + buf.byteLength);
            uni.writeBLECharacteristicValue({
                deviceId: deviceId,
                serviceId: serviceId,
                characteristicId: characteristicId,
                value: buf,
                success: function(res) {
                    currentTime++
                },
                fail: function(e) {
                    maxRepeateTimes++;
                    delay = true;
                    console.error(e)
                },
                complete: () => {
                    if (currentTime <= loopTime && repeateTimes < maxRepeateTimes) {
                        if (delay) {
                            delay = false;
                            setTimeout(() => {
                                send();
                            }, 100);
                        } else {
                            send();
                        }
                    }
                }
            })
        }
    }
}
export default kit;
