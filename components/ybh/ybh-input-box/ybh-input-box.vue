<template>
	<view id="inputBox" class="flex">
		<u-icon name='minus' size="25"
			:class="[vuex_themeColor.colorCharacter || 'bg-gradual-blue','buttonBorder','border-radius-round','padding-sm']"
			@click='minus'></u-icon>
		<view style="width: 60px;" class="margin-lr-sm">
			<u-input v-model="defaultValue" :trim = 'true' type='number' border inputAlign="center" height="25" 
				:placeholder='placeholderValue' :clearable='false' style="padding: 0;" @input='change' @blur='blur' @click='click'/>
		</view>
		<u-icon name='plus' size="25" 
			:class="[vuex_themeColor.colorCharacter || 'bg-gradual-blue','buttonBorder','border-radius-round','padding-sm']"
			@click='plus'></u-icon>
	</view>
</template>

<script>
	/*
	*  防误差步进器
	*/
	export default {
		props:{
			value : { //默认值
				type : [String , Number],
				default: '0'
			},
			max : { //最大值
				type : String,
				default:''
			},
			min : { // 最小值
				type : String,
				default: '0'
			},
			step : { // 加减步长
				type : String,
				default: '1'
			},
			keepInt : { // 是否保持 整数
				type : Boolean,
				default: false
			},
			insertMode : { // 插入模式 会覆盖原数据 直接在元数据上修改
				type : Boolean,
				default: false
			}
		},
		data(){
			return {
				defaultValue : this.keepInt ? parseInt(this.value) : this.value,
				placeholderValue : ' ',
				timeValue : ''
			}
		},
		watch: {
		    value() {
				this.defaultValue = Number(this.value)
		    },
		},
		methods:{
			// 数据广播 0 change   1 blur   2 minus   3  plus
			emitData(type){
				this.defaultValue = this.keepInt ? parseInt(this.defaultValue ) : parseFloat(this.defaultValue);
				this.$emit('input',this.defaultValue);
				switch(type){
					case 0 : this.$emit('change',this.defaultValue);break;
					case 1 : this.$emit('blur',this.defaultValue);break;
					case 2 : this.$emit('minus',this.defaultValue);break;
					case 3 : this.$emit('plus',this.defaultValue);break;
					default : this.$emit('change',this.defaultValue);break;
				}
			},
			click(){
				this.timeValue = this.value;
				if(this.insertMode && this.value){
					this.placeholderValue = this.value + '';
					this.defaultValue = '';
				}
			},
			// 焦点消失 触发
			blur(){
				if((this.timeValue == this.placeholderValue) && !this.defaultValue){
					this.defaultValue = this.timeValue
				}
				if( this.max && this.defaultValue > Number(this.max) ){ this.defaultValue = Number(this.max); }
				if( this.defaultValue < Number(this.min) ){ this.defaultValue = Number(this.min); }
				if( !this.defaultValue ){
					this.defaultValue = 0;
					this.$emit( 'input' , 0);
					this.$emit( 'blur' , 0);
					return
				}
				this.emitData(1)
			},
			// 数值改变
			change(value){
				if( this.max && this.defaultValue > Number(this.max) ){ this.defaultValue = Number(this.max); }
				if( this.defaultValue < Number(this.min) ){ this.defaultValue = Number(this.min); }
				if( !this.defaultValue ){ return }
				this.emitData(0);
			},
			// 减少按钮
			minus(){
				// 调用防误差方法  防止：2.55 - 1 != 1.55  而是 =1.5499999999999998 的情况
				this.defaultValue = this.mathNum( this.defaultValue , Number(this.step) , 0);
				if( this.defaultValue <= Number(this.min) ){
					this.defaultValue = Number(this.min) ;
				}
				this.emitData(2);
			},
			plus(){
				// 与上同理
				this.defaultValue = this.mathNum(this.defaultValue , Number(this.step) , 1);
				if(this.max){
					if(this.defaultValue >= Number(this.max) ){
						this.defaultValue = Number(this.max) ; 
					}
				}
				this.emitData(3);
			},
			// 解决误差
			mathNum (num1, num2, key = 1) {
			    let sq1, sq2, multiple;
			    try {sq1 = num1.toString().split(".")[1].length;}
			    catch (e) {sq1 = 0;}
			    try {sq2 = num2.toString().split(".")[1].length;}
			    catch (e) {sq2 = 0;}
			    multiple = Math.pow(10, Math.max(sq1, sq2) + 1);
				if(key){return (num1 * multiple + num2 * multiple) / multiple;}
				return (num1 * multiple - num2 * multiple) / multiple;
			}
		},
	}
</script>
<style></style>