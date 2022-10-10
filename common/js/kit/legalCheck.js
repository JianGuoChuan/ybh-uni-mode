/*
 * 数据合法校验JS整合
 */
let legalCheck = {
    // 手机号合法校验  phoneNumber ：校验手机号
    phoneCheck(phoneNumber) {
		phoneNumber = phoneNumber + '';
		let reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
		if(!reg_tel.test(phoneNumber)){
			return false
		}
		return true
    },
	// 邮箱合法校验  email ： 校验邮箱
	emailCheck(email) {
		let reg_email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		if(!reg_email.test(email)){
			return false
		}
		return true
	},
	
	// 长度合法校验 sourceText ： 校验文本  minLength ：最小长度  maxLength ：最大长度
	lengthCheck(sourceText,minLength,maxLength) {
		return (sourceText.length > minLength && sourceText.length <= maxLength) ? true : false;
	},
}
export default legalCheck