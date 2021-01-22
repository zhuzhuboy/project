export default {
    namespaced: true,
    state: {
        deliveryStatus: false, // 出库状态
        wareDrawerShow: false, // 控制入库抽屉组件显示或隐藏一个条件
        cateTableInfo: undefined, //分类表格保存的数据
        detailTableInfo: undefined, //详情表格保存的数据
        lookUpStatus: undefined, //查看的状态
        dialogShow: false, //新建退货入库单dialog显示或隐藏
        retWareDetail: undefined
    },
    mutations: {


        /**
         * @description 点击导入按钮更改状态。如果状态时true，则可以跳转到表格页面
         * @param {Object} state state
         */
        getDeliveryStatus(state, payload) {
            state.deliveryStatus = payload
        },


        /**
         * @description 控制入库抽屉组件显示或隐藏一个条件，在采购入库的beforeRouteLeave中设置为false。只有在表格导入中设置为true。这样只有从表格导入中跳转到采购入库页面才会进入页面就渲染出抽屉组件
         * @param {Object} state state
         */
        getWareDrawerShow(state, payload) {
            state.wareDrawerShow = payload
        },

        /**
         * @description 保存分类表格的数据。其他页面使用
         * @param {Object} state state
         */
        getCateTableInfo(state, payload) {
            state.cateTableInfo = payload
        },
        /**
         * @description 保存详情表格的数据。其他页面使用
         * @param {Object} state state
         */
        getDetailTableInfo(state, payload) {
            state.detailTableInfo = payload
        },
        /**
         * @description 查看按钮的状态，为true则可以调转查看页面
         * @param {Object} state state
         */
        getLookUpStatus(state, payload) {
            state.lookUpStatus = payload
        },
        /**
         * @description 新建退货入库单的dialog窗口显示或隐藏
         * @param {Object} state state
         */
        getDialogShow(state, payload) {
            state.dialogShow = payload
        },

        /**
         * @description 退款入库详情表格数据，包含id等信息
         * @param {Object} state state
         */
        getRetWareDetail(state, payload) {
            state.retWareDetail = payload
        },
    }
}
