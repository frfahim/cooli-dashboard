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
    addMeData(state, meData) {
        state.meData = meData;
    },
    // addMeUserData(state, meUserData) {
    //     state.meUserData = meUserData;
    // },
    // addAuthUserData(state, authUserData) {
    //     state.authUserData = authUserData;
    // },
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
    async fetchMe(vuexContext) {
        return await this.$axios
            .$get(`/customers/me/`)
            .then(res => {
                vuexContext.commit("addMeData", res.data);
                localStorage.setItem("meData", JSON.stringify(res.data))
                return res.data;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    async fetchMeDetails(vuexContext) {
      return await this.$axios
        .$get(`/customers/me/details/`)
        .then(res => {
            // vuexContext.commit("addMeUserData", res.data);
            return res.data;
        })
        .catch(err => {
            throw new Error(err);
        });
    },
    async fetchUser(vuexContext) {
      return await this.$axios
        .$get(`/users/auth/user/`)
        .then(res => {
            // vuexContext.commit("addAuthUserData", res.data);
            return res.data;
        })
        .catch(err => {
            throw new Error(err);
          });
    },
  async updateUser(vuexContext, payload) {
    return await this.$axios
      .$put(`/users/auth/user/`, payload)
      .then(res => {
        return res;
      })
      .catch(error => {
        throw new Error(err);
      });
  },
  async updateCompanyInfo(vuexContext, payload) {
    return await this.$axios
      .$put(`/customers/info/`, payload)
      .then(res => {
        return res;
      })
      .catch(error => {
        throw new Error(err);
      });
  },
  async updatePickupPayment(vuexContext, payload) {
    return await this.$axios
      .$put(`/customers/pickup-payment/`, payload)
      .then(res => {
        return res;
      })
      .catch(error => {
        throw new Error(err);
      });
  },
  async fetchBankInfo(vuexContext, params) {
    return await this.$axios
      .$get(`/customers/bank/`, {params: params})
      .then(res => {
        return res;
      })
      .catch(error => {
        throw new Error(err);
      });
  },
  async updateBankInfo(vuexContext, payload) {
    return await this.$axios
      .$put(`/customers/bank/`, payload)
      .then(res => {
        return res;
      })
      .catch(error => {
        throw new Error(err);
      });
  },
};

export const getters = {};
