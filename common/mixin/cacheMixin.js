class Cache {
    constructor(id) {
        this.id = id;
        this.watchKeys = [];
        this.valueMap = uni.getStorageSync('vueCache:' + this.id) || {};
    }
    get(key) {
        return this.valueMap[key];
    }
    set(key, value) {
        if (this.valueMap[key] != value) {
            this.valueMap[key] = value;
        }
        uni.setStorageSync('vueCache:' + this.id, this.valueMap);
    }
}

function getThisAndKey(obj, key) {
    if (!key.includes('.')) {
        return [obj, key];
    } else {
        let keys = key.split('.');
        let _this = obj;
        let lastKey = keys[keys.length - 1];
        for (var i = 0; i < keys.length - 1; i++) {
            _this = _this[keys[i]];
        }
        return [_this, lastKey];
    }
}

function getKeyAndValue(obj, key) {
    [obj, key] = getThisAndKey(obj, key);
    return [key, obj[key]];
}

function setValue(obj, key, value) {
    [obj, key] = getThisAndKey(obj, key);
    obj[key] = value;
}
export default {
    created() {
        // 初始化需要缓存的值
        if (this.cacheConfig && this.cacheConfig.id) {
            if (!this._cache) {
                let key = this.cacheConfig.id;
                this._cache = new Cache(key);
            }
            this.cacheConfig.keys.forEach(key => {
                let value = this._cache.get(key);
                if (value !== undefined && value != null) {
                    setValue(this, key, value);
                }
                if (typeof(this[key]) == "object") {
                    this.$watch(key, {
                        handler() {
                            let [xx, value] = getKeyAndValue(this, key);
                            this._cache.set(key, value);
                        },
                        deep: true
                    });
                } else {
                    this.$watch(key, function() {
                        let [xx, value] = getKeyAndValue(this, key);
                        this._cache.set(key, value);
                    });
                }
            })
        }
    }
}
