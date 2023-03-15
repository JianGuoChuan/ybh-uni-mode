/**
  * 求小数点后的数据长度
  */
 function deal(arg) {
     var t = 0;
     try {
         t = arg.toString().split(".")[1].length
     } catch (e) {}
     return t;
 }
 let mathKit = {
     subtract(a,b){
         return this.add(a,-b);
     },
     /**
      * 加法函数，用来得到精确的加法结果
      * @param {Object} arg1
      * @param {Object} arg2
      */
     add(arg1, arg2) {
         var r1 = deal(arg1);
         var r2 = deal(arg2);
         var m = Math.pow(10, Math.max(r1, r2))
         return (arg1 * m + arg2 * m) / m
     },

     /**
      * 乘法函数，用来得到精确的乘法结果
      * @param {Object} arg1
      * @param {Object} arg2
      */
     multiple(arg1, arg2) {
         var m = 0;
         m += deal(arg1);
         m += deal(arg2);
         var r1 = Number(arg1.toString().replace(".", ""));
         var r2 = Number(arg2.toString().replace(".", ""));
         return (r1 * r2) / Math.pow(10, m)
     },

     /**
      * 除法函数，用来得到精确的除法结果
      * @param {Object} arg1
      * @param {Object} arg2
      */
     divide(arg1, arg2) {
         var t1 = deal(arg1);
         var t2 = deal(arg2);
         var r1 = Number(arg1.toString().replace(".", ""))
         var r2 = Number(arg2.toString().replace(".", ""))
         return (r1 / r2) * Math.pow(10, t2 - t1);
     }

 }
 export default mathKit;
