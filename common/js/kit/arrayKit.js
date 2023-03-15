let kit = {
    /**
     * 翻转二维数组
     * @param {Object} biArr
     */
    reverseBiArray(biArr) {
        return biArr[0].map((col, i) => {
            return biArr.map(row => row[i]);
        })
    },
    distinct(list = [], key) {
        let map = {};
        if (key) {
            return Object.values(this.convertToMap(list), key);
        } else {
            return list.reduce((arr, e) => {
                if (!arr.includes(e)) {
                    arr.push(e);
                }
                return arr;
            }, []);
        }
    },
    convertToMap(list = [], key) {
        let map = {};
        list.forEach(item => {
            map[item[key]] = item;
        })
        return map;
    },
    convertToObj(list = [], key) {
        let map = {};
        list.forEach(item => {
            map[item[key]] = item;
        })
        return map;
    },
    /**
     * @description 根据指定字段分组
     * @param {Object} list
     * @param {Object} keyField
     * @return {key:[item]}
     */
    groupByField(list = [], keyField) {
        let result = {};
        list.forEach(item => {
            let key = item[keyField];
            let arr = result[key];
            if (!arr) {
                arr = result[key] = [];
            }
            arr.push(item);
        });
        return result;
    },
    /**
     * @description 合并相同的项
     * @param {Object} list 
     * @param {Object} keyField 指定的键
     * @param {Object} op 操作
     * @return [] 合并后的数组
     */
    merge(list, keyField, op) {
        return Object.values(this.mergeToMap(list, keyField, op));
    },
    /**
     * @param {Object} list 
     * @param {Object} keyField 指定的键
     * @param {Object} op 操作
     * @return {}
     */
    mergeToMap(list, keyField, op) {
        let map = {};
        list.forEach(item => {
            let key = item[keyField];
            if (map[key]) {
                if (typeof(op) == 'function') {
                    op(map[key], item);
                }
            } else {
                map[key] = item;
            }
        });
        return map;
    }
}
export default kit;
