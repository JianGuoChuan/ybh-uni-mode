<template>
    <view>
        <view @click="showFilter" class="flex">
            <text class="padding-right-sm">筛选</text>
			<u-icon name='edit-pen' />
        </view>
        <u-popup v-model="show.filter" mode="bottom" height="80%" border-radius="25" closeable :mask-close-able='false'>
			<view class="text-center padding-tb-lg">
				<text class="text-black font-com">筛选全部</text>
			</view>
            <view class="filter-body padding-lg padding-top-lgx">
                <view class="filter-item text-darkgrey" v-for="(field, index) in fields" :key="index">
					<!-- 输入 -->
                    <template v-if="field.type == 'text'">
                        <view class="title">{{ field.label }}</view>
                        <view class="padding-tb-sm"><u-input v-model="filterPara[field.key]" :placeholder="field.placeholder" style="border-bottom: solid 1px lightgrey;" /></view>
                    </template>
					<!-- 日期 -->
                    <template v-else-if="field.type == 'date'">
                        <view class="title">{{ field.label }}</view>
                        <view class="margin-tb-sm time-picker">
							<view class="flex space-between padding-lr-lg">
								<u-input class="border-radius-scoped-lg" v-model="startTime" @tap='shows = true' type='date' input-align='center' border disabled placeholder="开始时间"/>
								<view class="date_line"></view>
								<u-input class="border-radius-scoped-lg" v-model="endTime" @tap='shows = true' type='date' input-align='center' border disabled placeholder="结束时间"/>
							</view>
							<u-calendar v-model="shows" mode="range" @change='test' max-date='2025-12-31'></u-calendar>
						</view>
                    </template>
					<!-- 选择 -->
                    <template v-else-if="field.type == 'select'">
                        <view class="title padding-bottom-md">{{ field.label }}</view>
                        <view class="margin-tb-sm padding-bottom-sm border-bottom">
                            <ybh-select v-model="filterPara[field.key]" :options="field.dcitData" :pk="field.props.value" :filterKeys="[field.props.value]" :multiple="field.multiple">
                                <template slot-scope="{ item }">
                                    {{ item[field.props.label] }}
                                </template>
                            </ybh-select>
                        </view>
                    </template>
                </view>
            </view>
            <view class="flex space-around absolute text-center width-all ack_btn_group text-darkgrey">
                <view class="border-xs border-radius-md padding-tb-md padding-lr-lgx" @click="reset">重置</view>
                <view 
					class="padding-tb-md padding-lr-lgx border-radius-md"
					:class="vuex_themeColor.colorCharacter ? vuex_themeColor.colorCharacter : 'bg-gradual-blue'"
					@click="confirm">确定</view>
            </view>
        </u-popup>
    </view>
</template>

<script>
/**
 * ybh-fields 筛选组件
 * 
 */
export default {
    props: {
        value: {
            type: Object,
            required: true
        },
        fields: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
			shows : false,
			startTime : '',
			endTime : '',
            show: {
                filter: false
            },
            filterPara: {}
        };
    },
    computed: {
        existFilterCondition() {
            return this.fields.some(e => this.filterPara[e.key]);
        }
    },
    watch: {
        value: function(value) {
            this.filterPara = value;
        },
		startTime:function() {
			this.filterPara.startTime = this.startTime;
		},
		endTime:function() {
			this.filterPara.endTime = this.endTime;
		}
    },
    methods: {
		test(val){
			this.startTime = val.startDate;
			this.endTime = val.endDate;
		},
        showFilter() {
            this.show.filter = true;
        },
        reset() {
            this.fields.forEach(e => {
                this.filterPara[e.key] = '';
            });
			this.startTime = '';
			this.endTime = '';
            this.$emit('input', this.filterPara);
        },
        confirm() {
			this.filterPara.endTime = this.endTime ? this.endTime + ' 23:59:59' : '';
			if(this.filterPara.status){
				this.filterPara.status.toString();
			}
            this.$emit('input', this.filterPara);
            this.$emit('confirm', this.filterPara);
            this.show.filter = false;
			// this.reset();
        }
    },
    created() {
        this.filterPara = this.value;
    }
};
</script>

<style lang="scss" scoped>
	.filter-item {
		margin-bottom: 15px;
		.title {
			font-size: 1.1em;
			font-weight: bold;
		}
		.time-picker {
			position: relative;
			padding: 10px 0px;
			border-bottom: solid 1px lightgrey;
			&::after {
				display: block;
				position: absolute;
				font-size: 17px;
				color: #8799a3;
				width: 30px;
				text-align: center;
				bottom: 10px;
				right: -10px;
				margin: auto;
			}
		}
		.date_line{
			background-color: #999;
			width: 80px;
			height: 1px;
			margin: auto 10px;
		}
		.border-radius-scoped-lg{
			border-radius: 20px;
		}
	}
	.ack_btn_group{
		bottom: 15px;padding: 15px 80px;
	}
</style>
