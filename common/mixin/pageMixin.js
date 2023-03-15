/**
 * 此混入方法用于处理后台数据分页
 * 1. 使用此混入的组件需提供doQuery(para)方法和para(可选)对象,
 * 2. 数据放在page对象中，详情请查看源码
 */
export default {
    data() {
        return {
            page: {
                current: 1,
                size: 7,
                list: [],
                lastPage: false
            }
        }
    },
    methods: {
        async query(refresh) {
            if (refresh) {
                this.page.current = 1;
                this.page.lastPage = false;
            } else {
                this.page.current ++;
            }
            if (this.page.lastPage) {
                uni.showToast({
                    title: '没有更多了',
                    icon: 'none',
                    position: 'bottom',
                    duration: 2000,
                });
                return;
            }
            let para = Object.assign({
                current: this.page.current,
                size: this.page.size,
            }, this.para);
            if (typeof(this.doQuery) !== 'function') {
                throw new Error('请提供doQuery方法');
            }
            let res = await this.doQuery(para);
            this.page.lastPage = (res.data.current * res.data.size > res.data.total);
            refresh ? this.page.list = [] : '';
            this.page.list.push(...res.data.records);
        }
    },
    async onPullDownRefresh() {
        await this.query(true);
        uni.stopPullDownRefresh();
    },
    onReachBottom() {
        this.query(false);
    }
}
