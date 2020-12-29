export default {
  namespaced: true,
  state: {
    // 用户 UA
    details_id:undefined,
    record_id:undefined//cateID
  },
  mutations: {
    /**
     * @description 记录 UA
     * @param {Object} state state
     */
    getDetails_id (state,payload) {
      state.details_id = payload
    },
    getRecord_id (state,payload) {
      state.record_id = payload
    }
  }
}
