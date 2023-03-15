let kit = {
    /**
     * 判断对象中的字段是否包含指定的关键字
     * @param {Object} obj
     * @param {String} keyword 需要检查的关键字
     * @param {Array} needMatchFields 需检查的字段,不传则检查全部的
     */
    includes(obj, keyword, needMatchFields) {
        if (!needMatchFields) {
            needMatchFields = Object.keys(obj);
        }
        return needMatchFields.some(key => {
            if(key.includes('.')){
               let objKey= key.substr(0,key.indexOf('.'));
               return obj[objKey] && this.includes(obj[objKey],keyword,[key.substr(key.indexOf('.')+1)]);
            }
            if (!obj[key]) {
                return false;
            }
            return String(obj[key]).includes(keyword);
        })
    },
    /**
     * @description  对象的深克隆
     * @param {Object} obj
     */
    deepClone(obj) {
        let type = typeof(obj);
        switch (type) {
            case 'undefined':
                return undefined;
            case 'string':
                return String(obj);
            case 'function':
                return obj;
            case 'object':
                if (obj == null) {
                    return null;
                }
                if (Array.isArray(obj)) {
                    return this.deepCloneArr(obj);
                }
                let newObj = {};
                for (let key in obj) {
                    newObj[key] = this.deepClone(obj[key]);
                }
                return newObj;
            default:
                return JSON.parse(obj);
        }
    },
    deepCloneArr(arr = []) {
        return arr.map(item => {
            return this.deepClone(item);
        });
    },
    /**
     * @param {Object} obj
     */
    isDeepEmpty(obj) {
        let type = typeof(obj);
        switch (type) {
            case "string":
                return obj == false;
            case "boolean":
                return obj;
            case "number":
                return obj == 0;
            case "object":
                return this.isEmptyObj(obj);
            default:
                return true;
        }
    },
    /**
     * 深层次的判断对象是否为空
     * @param {Object} obj
     */
    isEmptyObj(obj) {
        if (Array.isArray(obj)) {
            return this.isEmptyArray(obj);
        } else {
            for (let key in obj) {
                if (!this.isDeepEmpty(obj[key])) {
                    return false;
                }
            }
            return true;
        }
    },
    /**
     * 深层次的判断数组是否为空
     * @param {Array}
     */
    isEmptyArray(arr) {
        let len = arr.length;
        if (len == 0) {
            return true;
        }
        for (let i = 0; i < len; i++) {
            if (!this.isDeepEmpty(arr[i])) {
                return false;
            }
        }
        return true;
    },
    /**
     * 重置对象,规则:string=>"",boolean=>"",number=>0,array=>[]
     * @param {Object} obj
     */
    resetObj(obj) {
        for (let key in obj) {
            let value = obj[key];
            let type = typeof(value);
            switch (type) {
                case "string":
                    obj[key] = '';
                    break;
                case "boolean":
                    obj[key] = false;
                    break;
                case "number":
                    obj[key] = 0;
                    break;
                case "object":
                    if (Array.isArray(value)) {
                        obj[key] = [];
                    } else {
                        obj[key] = this.resetObj(value);
                    }
                    break;
                default:
                    break;
            }
        }
        return obj;
    },
    notEmpty(obj) {
        return !this.isEmpty(obj);
    },
    isEmpty(obj) {
        if (obj === undefined || obj === null) {
            return true;
        }
        switch (typeof(obj)) {
            case 'object':
                if (JSON.stringify(obj) === '{}' || JSON.stringify(obj) === '[]') {
                    return true;
                }
                break;
            default:
                return !Boolean(obj);
                break;
        }
        return false;
    },
    log(data) {
        if (typeof(config) == 'undefined' || config.DEV_MODE) {
            if (typeof(data) === "object") {
                try {
                    console.log("输出信息:" + JSON.stringify(data));
                } catch (e) {
                    console.log("不支持序列化的对象");
                }

            } else {
                console.log("输出信息:" + data);
            }
        }
    },
    /**
     * @description 转换数组为对象,根据指定字段作为key
     * @param {Array} arr
     * @param {String} key
     */
    convertArrToObj(arr, key) {
        arr = arr || [];
        let obj = {};
        arr.forEach(item => {
            let objKey = item[key];
            obj[objKey] = item;
        });
        return obj;
    }
}
export default kit;
