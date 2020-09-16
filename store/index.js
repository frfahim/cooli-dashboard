export const state = () => ({
  drawer: true,
  notificationMSG: null,
  notificationType: null,
  loading: false,
  auth: null,
  userData: null,
  token: null,
  refresh_token: null,
  secret: null,
})

export const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer
  },
  drawer(state, val) {
    state.drawer = val
  },
  setLoading(state) {
    state.loading = true
  },
  removeLoading(state) {
    state.loading = false
  },
  setAuth(state, auth) {
    state.auth = auth
  },
  setUserData(state, data) {
    state.userData = data
  },
  setUserToken(state, data) {
    state.access_token = data
  },
  setUserRefreshToken(state, data) {
    state.refresh_token = data
  },
  clearUserTokens(state) {
    state.userData = null,
      state.access_token = null,
      state.refresh_token = null
  },
  setNotification(state, data) {
    state.notificationMSG = data.msg,
      state.notificationType = data.type
  },
  removeNotification(state) {
    state.notificationMSG = null,
      state.notificationType = null
  }
}

export const actions = {
  loginUser(vuexContext, authData) {
    return this.$axios.$post(
      "users/auth/login/",
      authData
    ).then(result => {
      vuexContext.commit("setUserData", result.data.user)
      vuexContext.commit("setUserToken", result.data.access_token)
      vuexContext.commit("setUserRefreshToken", result.data.refresh_token)

      localStorage.setItem("User", JSON.stringify(result.data.user))
      localStorage.setItem("UserToken", `JWT ${result.data.access_token}`)
      localStorage.setItem("UserRefreshToken", `${result.data.refresh_token}`)
      return result
    }).catch(e => {
      throw new Error(e)
    })
  },

  logOutUser(vuexContext) {
    const refreshToken = localStorage.getItem("UserRefreshToken");
    return this.$axios.$post(
      "users/auth/logout/", {
      refresh: refreshToken
    }
    ).then(result => {
      vuexContext.dispatch("clearUserData")
    })
  },
  clearUserData(vuexContext) {
    localStorage.removeItem("User");
    localStorage.removeItem("UserToken");
    localStorage.removeItem("TokenExpiration");
    localStorage.removeItem("UserRefreshToken");
    vuexContext.commit("clearUserTokens");
    this.$router.push('/login');
  },
  setNotificaation(vuexContext, notification) {
    vuexContext.commit("setNotification", notification)
    setTimeout(() => {
      vuexContext.commit("removeNotification")
    }, 5000);
  },
  refreshToken(vuexContext) {
    const refreshToken = localStorage.getItem("UserRefreshToken");
    return this.$axios.$post(
      "users/auth/token/refresh/", {
      refresh: refreshToken
    }
    ).then(res => {
      vuexContext.commit("setUserToken", res.data.access)
      vuexContext.commit("setUserRefreshToken", res.data.refresh)

      localStorage.setItem("UserToken", `JWT ${res.data.access}`)
      localStorage.setItem("UserRefreshToken", `${res.data.refresh}`)
      return res
    })
      .catch(e => {
        vuexContext.dispatch("logOutUser")
      })
  },
  newPassword(vuexContext, payload) {
    return this.$axios.$post(
      `/accounts/password/reset/confirm/${payload.uid}/${payload.token}/`, {
      new_password1: payload.new_password1,
      new_password2: payload.new_password2,
      uid: payload.uid,
      token: payload.token
    }
    ).then(res => {
      return res
    })
  },
  resetPassword(vuexContext, email) {
    return this.$axios.$post(
      "users/auth/password/reset/", {
      email: email
    }
    ).then(res => {
      return res
    })
  }
}
