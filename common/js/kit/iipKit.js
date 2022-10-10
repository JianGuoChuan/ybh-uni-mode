import qs from 'qs';
import legalCheck from './legalCheck.js';

// 版本比较 如果v1>v2返回true
function compareVersion(v1, v2) {
    try {
        var v1Arr = v1.split('.');
        var v2Arr = v2.split('.');
        for (var i = 0; i < v1Arr.length; i++) {
            if (parseInt(v1Arr[i]) > parseInt(v2Arr[i])) {
                return true;
            } else if (parseInt(v1Arr[i]) < parseInt(v2Arr[i])) {
                return false;
            }
        }
        return false;
    } catch (e) {
        console.log(`v1:${v1},v2:${v2},error:${e}`);
        return false;
    }
}

let kit = {
    // 延迟跳转系列
    delayBack(delay = 1000,delta = 1) {
        setTimeout(() => {
            uni.navigateBack({
				delta: delta
            });
        }, delay);
    },
	delayToRouter(path,delay = 1000,data){
		setTimeout(() => {
		    let toUrl = path + '?' + qs.stringify(data);
		    uni.navigateTo({
		    	url : toUrl
		    })
		}, delay);
	},
	delayReLaunchRouter(path,delay = 1000,data){
		setTimeout(() => {
		    let toUrl = path + '?' + qs.stringify(data);
		    uni.reLaunch({
		    	url : toUrl
		    })
		}, delay);
	},
	delaySwitchTabRouter(path,delay = 1000){
		setTimeout(() => {
		    uni.switchTab({
		    	url : path
		    })
		}, delay);
	},
	// 复制文本
	copyText(copyValue){
		let that = this;
		uni.setClipboardData({
			data:copyValue, //要被复制的内容
			success:()=>{ //复制成功的回调函数
				that.toast("内容已复制")
			}
		});
	},
	// 扫码
    scanCode() {
		// #ifdef H5
		console.log( '此方法需要在真实环境下执行' );
		// #endif
		// #ifdef APP-PLUS
        return new Promise((reslove, reject) => {
            uni.scanCode({
                success(res) {
                    reslove(res);
                },
                fail(err) {
                    reject(res);
                }
            });
        });
		// #endif
    },
	// 调用三方打开文档 支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx。
	openDocument(documentLink) {
		let that = this;
		// #ifdef H5
		console.log( '此方法需要在真实环境下执行' );
		// #endif
		// #ifdef APP-PLUS
	    uni.downloadFile({
	    	url: documentLink,
	    	success:function(res){
	    		var filePath = res.tempFilePath;
				uni.showLoading({title : '加载中'});
				uni.openDocument({
					filePath: filePath,
					success:function(res){
						uni.hideLoading();
						that.toast("文档加载完成，即将打开");
					},
					fail(err){
						that.toast("文档打开失败");
					}
				});
	    	},
			fail:(err)=>{
				console.log('文档下载失败');
			}
	    });
		// #endif
	},
	// 图片预览
	preview(link) {
	    let previewArr = [];
	    previewArr[0] = link;
	    uni.previewImage({ current:previewArr[0], urls: previewArr });
	},
	// 拨打电话
	callPhone(phoneNumber){
		// #ifdef H5
		console.log( '此方法需要在真实环境下执行' );
		// #endif
		// #ifdef APP-PLUS
		if(!legalCheck.phoneCheck(phoneNumber)){
			that.toast("手机号非法");
			return
		}
		plus.android.requestPermissions(
			["android.permission.CALL_PHONE"], 
			function(resultObj) {
				var result = 0;
				for (var i = 0; i < resultObj.granted.length; i++) {
					var grantedPermission = resultObj.granted[i];
					console.log('已获取的权限：' + grantedPermission);
					result = 1
				}
				for (var i = 0; i < resultObj.deniedPresent.length; i++) {
					var deniedPresentPermission = resultObj.deniedPresent[i];
					console.log('拒绝本次申请的权限：' + deniedPresentPermission);
					result = 0
				}
				for (var i = 0; i < resultObj.deniedAlways.length; i++) {
					var deniedAlwaysPermission = resultObj.deniedAlways[i];
					console.log('永久拒绝申请的权限：' + deniedAlwaysPermission);
					result = -1
				}
				if(result == 1){
					uni.makePhoneCall({
						phoneNumber: phoneNumber,//电话号码
						success(ress) {
							console.log("拨打电话成功",ress)
						},
						fail(err) {
							uni.showToast({title:"拨打电话失败",icon:"error",})
							console.log("拨打电话失败",'err')
						}
					});
				}else{
					uni.showToast({title:"请开启拨号权限",icon:"error",})
				}
			},
			function(error) {
				console.log('申请权限错误：' + error.code + " = " + error.message);
			}
		);
		// #endif
	},
	// 简单加密
	pwdEncrypt(pass) {
		let passArr = pass.split('');
		let newPass = '';
		passArr.map((item,index)=>{
			newPass += index ? '-' + (item.charCodeAt() + index) : item.charCodeAt() + index
		});
		return newPass
	},
	// 简单解密
	pwdDecode(pass) {
		let oldPass = '';
		let oldPassArr = pass.split('-');
		oldPassArr.map((item,index)=>{
			oldPass += String.fromCharCode(item - index)
		});
		return oldPass
	},
	// 获取app信息
	getAppName() {
	    return new Promise((reslove, reject) => {
	        let appName = uni.getStorageSync('_appName');
	        if (appName) {
	            reslove(appName);
	        }
	        plus.runtime.getProperty(plus.runtime.appid, (appInfo) => {
	            uni.setStorageSync('_appName', appName);
	            reslove(appInfo.name);
	        })
	    });
	},
    // 通用确认方法 @param {Object} content
    confirm(content, option = {}) {
        return new Promise((reslove, reject) => {
            option = Object.assign({
                content: content,
            }, option, {
                success: function(res) {
                    reslove(res.confirm || false);
                }
            })
            uni.showModal(option);
        })
    },
    alert(content, option = {}) {
        return new Promise((reslove, reject) => {
            option = Object.assign({
                content: content,
            }, option, {
                showCancel: false,
                success: function(res) {
                    reslove(true);
                }
            })
            uni.showModal(option);
        })
    },
    toast(title, option = { icon: 'none', position: 'bottom', duration: 2000}) {
        uni.showToast( Object.assign({title}, option));
    },
    
    // 检查更新
    async checkVersion(vm, isAuto = true) {
		// 获取app名称
        let appName = await this.getAppName();
		
		// 是否自动检测更新
        if (isAuto) {
            this.toast('检查更新中...');
        }
		
		// 获取app更新信息
        // let versionInfo = await vm.$u.get('/m/getVersionInfo', {
        //     appName
        // });
		
        // 获取当前版本信息 
        var currVersion = plus.runtime.version;
		console.log(currVersion);
		var minVersion = '13.2.15';
		var maxVersion = '13.2.17';
        // var minVersion = versionInfo.min || '0.0.1';
        // var maxVersion = versionInfo.max || '0.0.1';
        if (compareVersion(minVersion, currVersion)) {
            // 当前版本小于最低可用版本
            // let ack = await this.confirm('当前版本已不可用,请立即更新', '提示');
            // if (ack) {
            //     this.updateApp(vm);
            // } else {
            //     plus.runtime.quit();
            // }
			return 101
        } else if (compareVersion(maxVersion,currVersion)) {
            // let ack = await this.confirm('有新版本发布,是否更新?', '提示');
            // if (ack) {
            //     setTimeout(()=>{
            //         this.updateApp(vm);
            //     });
            // }
			return 100
        } else if (!isAuto) {
            this.toast('当前已是最新版本');
        }
    },
    downloadFile(vm, url, onProgressUpdate) {
        // 下载文件
        let downloadUrl = `${vm.vuexBaseUrl}${url}`;
        return new Promise((reslove, reject) => {
            let downloadTask = uni.downloadFile({
                url: downloadUrl,
                header: {
                    Authorization: vm.vuexUser.token
                },
                success: (res) => {
                    if (res.statusCode == 400) {
                        // #ifdef APP-PLUS
                        // app无全局监听扑捉异常,临时采用uniapp的自定义事件机制处理请求非法时的异常
                        uni.$emit('requestUnhandledRejection', {
                            msg: '文件不存在,下载失败',
                            state: 'fail'
                        });
                        // #endif
                        reject('文件不存在,下载失败');
                        return;
                    }
                    let filePath = res.tempFilePath;
                    //#ifdef APP-PLUS
                    // 转换为绝对路径
                    filePath = plus.io.convertLocalFileSystemURL(res.tempFilePath);
                    // #endif
                    reslove(filePath);
                },
                fail: (res) => {
                    console.log(res);
                    reject('下载失败');
                }
            });
            downloadTask.onProgressUpdate(res => {
                onProgressUpdate(res);
            })
            if (typeof(onProgressUpdate) == 'function') {}
        })
    },
    downloadApp(vm,appName) {
        var url = `${vm.vuexBaseUrl}/m/file/downloadApp?name=${appName}`;
        return new Promise((reslove, reject) => {
            let intervalId;
            // 下载前删除之前的apk文件
            uni.removeSavedFile({
                filePath:`_downloads/${appName}.apk`,
            })
            let dTask = plus.downloader.createDownload(url, {
                filename: `_downloads/${appName}.apk`,
                priority:10,
            }, function(task, status) {
                console.log(task);
                console.log(status);
                if (status == 200) {
                    reslove(task.filename);
                } else {
                    reject(task);
                }
            });
            // 监听此事件会导致页面渲染阻塞,故采用SetInterval进行轮询
            /* dTask.addEventListener("statechanged", function(task, status) {
                updateAppDownloadProgress(task, status);
            }); */
            let times = 0;
            intervalId = setInterval(()=>{
                updateAppDownloadProgress(dTask,intervalId);
                if(times++ > 500){
                    // 防止死循环
                    clearInterval(intervalId);
                    if(dTask.state != 4){
                        reject('下载失败');
                    }
                }
            },500)
            dTask.setRequestHeader('Authorization', vm.vuexUser.token);
            dTask.start();
        });
        function updateAppDownloadProgress(task, intervalId) {
            if (!task.downloadedSize) {
                uni.appUpdateProgress = 0;
                return;
            }
            let appUpdateProgress = Math.floor(task.downloadedSize / getTotalSize(task) * 100);
            if (isFinite(appUpdateProgress) &&  appUpdateProgress - uni.appUpdateProgress >= 1) {
                uni.appUpdateProgress  = appUpdateProgress; 
                uni.$emit('onAppUpdateProgressUpdate', appUpdateProgress);
            }
            if(appUpdateProgress >= 100){
                uni.$emit('onAppUpdateProgressUpdate', 100);
                clearInterval(intervalId);
                setTimeout(()=>{
                    uni.appUpdateProgress = 0;
                    uni.$emit('onAppUpdateProgressUpdate', 0);
                },3000);
            }
        }

        function getTotalSize(task) {
            if (task.totalSize) {
                return task.totalSize;
            }
            // 若后端获取不到,则获取默认值
            return uni.getStorageSync('appTotalSize') || 17281840;
        }
    },
    async updateApp(vm) {
		this.toast('已开始下载');
        // #ifndef APP-PLUS
        // 暂时只支持app更新app
        return;
        // #endif
        // let appName = await this.getAppName();
        // plus.nativeUI.closeWaiting();
        // uni.appUpdateProgress = 0;
        // plus.nativeUI.showWaiting("下载中...");
        // let filePath = await this.downloadApp(vm,appName);
        // console.log(filePath);
        // plus.nativeUI.closeWaiting();
        // plus.nativeUI.showWaiting("更新中...");
        // plus.runtime.install(filePath, {}, function() {
        //     plus.nativeUI.closeWaiting();
        // }, function(e) {
        //     plus.nativeUI.closeWaiting();
        //     plus.nativeUI.toast("安装失败[" + e.code + "]:" + e.message);
        // }); 
    },
}
export default kit
