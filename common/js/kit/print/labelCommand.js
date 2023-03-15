// 标签打印命令封装
var tsc = require('@/common/js/kit/print/tsc.js');
// 打印机单位 1mm = 8dots
export function labelCommand(width, height, unit = 'percent') {
    // unit 单位: mm|percent ,当单位为百分比时,最小值为1,最大值为100
    this.width = width;
    this.height = height;
    this.unit = unit;
    this.tscCommand = tsc.jpPrinter.createNew();
    this.tscCommand.setSize(width, height);
    this.tscCommand.setGap(3);
    this.tscCommand.setCls();
    this.toDotX = function(x) {
        if (this.unit === 'percent') {
            x = this.width * x / 100;
        }
        return (x * 8).toFixed(0);
    }
    this.toDotY = function(y) {
        if (this.unit === 'percent') {
            y = this.height * y / 100;
        }
        return (y * 8).toFixed(0);
    }

    this.setHome = function() {
        this.tscCommand.setHome();
    }

    /**
     * 该指令用于定义两张卷标纸间的垂直间距距离
     * @param {Object} printGap 单位 mm
     */
    this.setGap = function(printGap) {
        this.tscCommand.setGap(printGap);
    }

    /**
     * 将纸向前推出指定长度 单位mm
     * @param {Object} length
     */
    this.setFeed = function(length) {
        length = length * 8;
        this.tscCommand.setFeed(length)
    };

    /**
     * 将纸向后回拉指定长度
     * @param {Object} backupLength 单位mm
     */
    this.setBackFeed = function(backupLength) {
        backupLength = backupLength * 8;
        this.tscCommand.setBackFeed(backupLength);
    }
    /**
     * 设置文字
     * @param {Object} x
     * @param {Object} y
     * @param {Object} text 
     * @param {Number} rotation {0,90,180,270}
     */
    this.setText = function(x, y, text, option = {}) {
        option = Object.assign({
            rotation: 0,
            font: 'TSS24.BF2',
            xScale: 1, // 横向放大系数
            yScale: 1 // 纵向放大系数
        }, option)
        x = this.toDotX(x);
        y = this.toDotY(y);
        let data =
            `TEXT ${x},${y},"${option.font}",${option.rotation},${option.xScale},${option.yScale},"${text}"\r\n`;
        console.log(data);
        this.tscCommand.addCommand(data);
    }
    /**
     * 设置垂直放置的文字
	 * y% x% 内容
     */
    this.setVerticalText = function(x, y, text, option = {}) {
        option = Object.assign({}, option, {
            rotation: 90
        })
        this.setText(x, y, text, option)
    }
    /**
     * 设置二维码
     * width 1-10
	 * (y%, x%, 内容，大小（单位未知) 向上打印
     */
    this.setQrCode = function(x, y, content, width, option = {}) {
        option = Object.assign({
            eccLevel: 'L', // 纠错等级 L(7%)  M(15%) Q(25%) H(30%)
            mode: 'M', // A 自动 M 手动
            rotation: 0 // 旋转角度 0,90,180,270
        }, option)
        x = this.toDotX(x);
        y = this.toDotY(y);
        let data =
            `QRCODE ${x},${y},${option.eccLevel},${width},${option.mode},${option.rotation},"${content}"\r\n`;
        this.tscCommand.addCommand(data)
    }
    // 设置线条
	//（y%, x%, 粗细(一般0.5)， 宽度）
    this.setBar = function(x, y, width, height = 0.5) {
        x = this.toDotX(x);
        y = this.toDotY(y);
        width = (width * 8).toFixed(0);
        height = (height * 8).toFixed(0);
        this.setBarByDot(x, y, width, height);
    }
    this.setBarByDot = function(x, y, width, height = 4) {
        let data = `BAR ${x},${y},${width},${height}\r\n`;
        console.log(data);
        this.tscCommand.addCommand(data);
    }
    // 设置边框
    this.setBox = function(xStart, yStart, xEnd, yEnd, thickness = 0.5) {
        thickness = Number(thickness * 8).toFixed(0);
        xStart = this.toDotX(xStart);
        xEnd = this.toDotX(xEnd);
        yStart = this.toDotY(yStart);
        yEnd = this.toDotY(yEnd);
        let width = (xEnd - xStart).toFixed(0);
        let height = (yEnd - yStart).toFixed(0);
        // 横线
        this.setBarByDot(xStart, yStart, width, thickness);
        // 竖线
        this.setBarByDot(xStart, yStart, thickness, height);
        this.setBarByDot(xEnd, yStart, thickness, height);
        // 横线  
        this.setBarByDot(xStart, yEnd, width, thickness);
        //  下面指令不能用,自己封装一个
        /* let data = `BOX ${xStart},${yStart},${xEnd},${yEnd},${thickness}\r\n`;
        console.log(data);  
        this.tscCommand.addCommand(data); */
    }
    this.setPagePrint = function() {
        this.tscCommand.setPagePrint();
    }
    // 获取data
    this.getData = function() {
        console.log(this.tscCommand.getData().length);
        return this.tscCommand.getData();
    }
}
