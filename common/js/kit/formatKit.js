// 日期格式化
function padLeftZero(str) {
	return ('00' + str).substr(str.length)
}
let formatKit = {
	dateTimeFormat(datetime) {
		let date = new Date(datetime);
		let YY = (date.getFullYear() + '').substring(2,4) + '-';
		let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
		let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
		return YY + MM + DD +" " + hh + mm
	},
	customDateTimeFormat(date , fmt){
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
		}
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds()
		}
		for (let k in o) {
			if (new RegExp(`(${k})`).test(fmt)) {
				let str = o[k] + ''
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
			}
		}
		return fmt
	}
}
export default formatKit