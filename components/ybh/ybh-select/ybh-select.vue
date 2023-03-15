<template>
    <view class="iip-select flex">
        <template v-if="enableSearch">
            <u-search
                maxlength="10"
                shape="square"
                v-model="keyword"
                :placeholder="searchInputPlaceholder"
                :input-style="searchInputStyle"
                clearable
                border
                :show-action="false"
                @focus="searching = true"
                @blur="searching = false"
            ></u-search>
        </template>
		<view style="width: 33%;" class="text-center margin-bottom-md" v-for="(item, index) in showOptions" :key="index">
			<view 
				class="border-radius-lgxs iip-select-option padding-tb-md" 
				style="background-color: #eee;width: 90px;margin: 0 auto;" 
				:class="vuex_themeColor.colorCharacter && isSelected(item) ? vuex_themeColor.colorCharacter : ''"
				@click="toogleSelect(item)">
				<slot :item="item">{{ item }}</slot>
			</view>
		</view>
        <button class="cu-btn bg-grey" v-show="showExpand" @click="toogleExpand">{{ expand ? '收缩' : '展开' }}</button>
    </view>
</template>

<script>
export default {
	// :class="{ selected: isSelected(item) }" 
    props: {
        value: {
            type: [Number, String, Array]
        },
        options: {
            type: Array,
            required: true
        },
        multiple: {
            type: Boolean,
            default: false
        },
        filterKeys: {
            type: [String, Array],
            default: function() {
                return ['name'];
            }
        },
        pk: {
            type: String,
            default: 'id'
        },
        required: {
            type: Boolean,
            default: false
        },
        maxShow: {
            type: Number,
            default: 20
        }
    },
    computed: {
        searchInputPlaceholder() {
            return this.searching ? '请输入关键字进行搜索' : '搜索';
        },
        searchInputStyle() {
            return {
                width: this.searching ? '120px' : '40px'
            };
        },
        enableSearch() {
            return this.options.length > this.maxShow;
        },
        filterKeyArr() {
            return typeof this.filterKeys == 'string' ? this.filterKeys.split(',') : this.filterKeys;
        },
        stringArray() {
            return this.options.some(e => typeof e != 'object');
        },
        selectdOption() {
            return this.options.filter(e => this.isSelected(e));
        },
        showOptions() {
            if (!this.keyword) {
                if (this.expand || !this.showExpand) {
                    return this.options;
                } else {
                    let result = Object.assign([], this.selectdOption);
                    for (var i = 0; i < this.options.length; i++) {
                        let item = this.options[i];
                        if (result.length >= this.maxShow) {
                            return result;
                        }
                        if (!result.includes(item)) {
                            result.push(item);
                        }
                    }
                    return result;
                }
            }
            if (this.stringArray) {
                return this.options.filter(item => item.includes(this.keyword));
            } else {
                return this.options.filter(item => {
                    return this.filterKeyArr.some(key => item[key].includes(this.keyword)) || this.isSelected(item);
                });
            }
        },
        showExpand() {
            return this.options.length > this.maxShow && !this.keyword;
        }
    },
    data: function() {
        return {
            values: [],
            keyword: '',
            searching: false,
            expand: false
        };
    },
    watch: {
        value: function(value) {
            this.values = this.multiple ? value : [value];
			if(!this.values){this.values = [];}
        }
    },
    methods: {
        toogleExpand() {
            this.expand = !this.expand;
        },
        clearKeywordAndClose() {
            this.clearKeyword();
            this.close();
        },
        close() {
            this.searching = false;
        },
        clearKeyword() {
            this.keyword = '';
        },
        isSelected(item) {
            let value = this.getValue(item);
            return this.values.includes(value);
        },
        toogleSelect(item) {
            let value = this.getValue(item);
            let index = this.values.indexOf(value);
            // 必填项,最后一个不能取消选择
            if (index > -1 && this.required && this.values.length == 1) {
                return;
            }
            if (this.multiple) {
                index > -1 ? this.values.splice(index, 1) : this.values.push(value);
				if(this.values.length <= 0){
					this.$emit('input', '');
					this.$emit('change', '');
					return
				}
                this.$emit('input', this.values);
                this.$emit('change', this.values);
            } else {
                this.values = index > -1 ? [] : [value];
                this.$emit('input', this.values[0]);
                this.$emit('change', this.values[0]);
            }
        },
        getValue(item) {
            return this.stringArray ? item : item[this.pk];
        }
    },
    created() {
        if (this.value) {
            this.values = this.multiple ? this.value : [this.value];
        } else if (this.required) {
            this.toogleSelect(this.options[0]);
        }
    }
};
</script>

<style lang="scss">
.el-dialog__body .iip-select {
    margin-top: 5px;
}
.iip-select {
    display: flex;
    flex-wrap: wrap;
    padding-left: 2px;
    max-height: 200rpx;
    overflow: auto;
    .button [class*='el-icon-'] + span {
        margin-left: 0px;
    }
    .iip-select-option {
        &.selected {
            color: #fff;
            // background-color: #2a8a88;
			background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
        }
    }
	.border-radius-lgxs{
		border-radius: 20px;
	}
}
</style>
