export const state = () => ({
    meData: {},
    meUserData: {},
    authUserData: {},
    nextPage: null,
    previousPage: null,
    pageNumber: 0,
    totalPage: 0
});

export const mutations = {
  addOrders(state, orders) {
      state.orders = orders;
  },
  // setNextPage(state, pageLink) {
  //     state.nextPage = pageLink;
  // },
  // setPreviousPage(state, pageLink) {
  //     state.previousPage = pageLink;
  // },
  // setPageNumber(state, pageNumber) {
  //     state.pageNumber = pageNumber;
  // },
  // setTotalPage(state, totalPage) {
  //     state.totalPage = totalPage;
  // }
};

export const actions = {
  // async fetchNextPage(vuexContext) {
  //     vuexContext.commit("setPageNumber", vuexContext.state.pageNumber + 1);
  //     return await vuexContext
  //         .dispatch("fetchOrderList", vuexContext.state.pageNumber)
  //         .then(res => {
  //             return res;
  //         })
  //         .catch(err => {
  //             throw new Error(err);
  //         });
  // },
  // async fetchPreviousPage(vuexContext) {
  //     vuexContext.commit("setPageNumber", vuexContext.state.pageNumber - 1);
  //     return await vuexContext
  //         .dispatch("fetchOrderList", vuexContext.state.pageNumber)
  //         .then(res => {
  //             return res;
  //         })
  //         .catch(err => {
  //             throw new Error(err);
  //         });
  // },
  // async fetchPage(vuexContext, pageNumber) {
  //     vuexContext.commit("setPageNumber", pageNumber);
  //     return await vuexContext
  //         .dispatch("fetchOrderList", pageNumber)
  //         .then(res => {
  //             return res;
  //         })
  //         .catch(err => {
  //             throw new Error(err);
  //         });
  // },
  async fetchZones(vuexContext) {
    return await this.$axios
      .$get(`/orders/zones/`)
      .then(res => {
          return res.data;
      })
      .catch(err => {
          throw new Error(err);
      });
  },
  async createOrder(vuexContext, payload) {
    return await this.$axios
      .$post(`/orders/`, payload)
      .then(res => {
          return res;
      })
      .catch(error => {
          throw new Error(err);
      });
  },
  async fetchOrderList(vuexContext, params) {
    return await this.$axios
      .$get(`/orders/`, {
        params: params
      })
      .then(res => {
        vuexContext.commit("addOrders", res.data.results);
        return res.data;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
};

export const getters = {};
