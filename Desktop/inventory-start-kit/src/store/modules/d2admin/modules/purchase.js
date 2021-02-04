export default {
    namespaced: true,
    state: {
        details_id: undefined, // 详情行数据id
        importStatus: false, // 导入状态
        record_id: undefined, // cateID根据分类id获得详情数据
        wareDrawerShow: false, // 控制入库抽屉组件显示或隐藏一个条件
        details_goodsName: undefined,
        purchaseInfo: undefined, //采购入库首页表格中的信息。
        detailInfo: undefined, //采购入库x详情表格中的信息。
        isLookUp: false, //是否是查看按钮跳转过来的,
        tableData: undefined //编辑按钮获取的数据详情表格数据,
    },
    mutations: {

        /**
         * @description 表格导入需要详情数据id。保存起来供接口使用
         * @param {Object} state state
         */
        getDetails_id(state, payload) {
            state.details_id = payload
        },
        /**
         * @description 点击导入按钮更改状态。如果状态时true，则可以跳转到表格页面
         * @param {Object} state state
         */
        getImportStatus(state, payload) {
            state.importStatus = payload
        },

        /**
         * @description 保存采购入库分类id。根据分类id获得详情数据
         * @param {Object} state state
         */
        getRecord_id(state, payload) {
            state.record_id = payload
        },
        /**
         * @description 控制入库抽屉组件显示或隐藏一个条件，在采购入库的beforeRouteLeave中设置为false。只有在表格导入中设置为true。这样只有从表格导入中跳转到采购入库页面才会进入页面就渲染出抽屉组件
         * @param {Object} state state
         */
        getWareDrawerShow(state, payload) {
            state.wareDrawerShow = payload
        },
        /**
         * @description 保存抽屉表格中物料名称。在表格导入页面做显示
         * @param {Object} state state
         */
        getDetails_goodsName(state, payload) {
            state.details_goodsName = payload
        },
        // 保存采购表格信息
        getPurchaseInfo(state, payload) {
            state.purchaseInfo = payload
        },
        // 保存详情表格信息
        getDetailInfo(state, payload) {
            state.detailInfo = payload
        },
        // 保存查看按钮信息
        getIsLookUp(state, payload) {
            state.isLookUp = payload
        },
        // 保存编辑表格获取到的详情数据
        getTableData(state, payload) {
            state.tableData = payload
        },
    }
}
