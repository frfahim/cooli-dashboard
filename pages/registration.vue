<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <!-- <img src="../static/m.png" alt="Enxpress" width="120" height="120"> -->
                  <h1 class="flex primary--text">Enxpress</h1>
                  <h4 class="flex mb-4 primary--text">Merchant Registration</h4>
                </div>
                <v-form>
                  <v-text-field name="name" label="Name" type="text"
                    :rules="[rules.required]"
                                v-model="formModel.name"></v-text-field>
                  <v-text-field name="phone" label="Phone" type="text"
                    :rules="[rules.required, rules.phone]"
                                v-model="formModel.phone"></v-text-field>
                  <v-text-field name="email" label="Email" type="text"
                    :rules="[rules.required, rules.email]"
                                v-model="formModel.email"></v-text-field>
                  <v-text-field name="password1" label="Password" id="password1" type="password"
                    :rules="[rules.required]"
                                v-model="formModel.password1"></v-text-field>
                  <v-text-field name="password2" label="Password" id="password2" type="password"
                    :rules="[rules.required]"
                                v-model="formModel.password2"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <p v-if="passwordNotMatched" class="routerLink mb-1 text-center">
                    Password not mached
                </p>
              </v-card-actions>
              <v-card-actions>
                <!-- <v-btn block>
                  Register
                </v-btn> -->
                <!-- <v-spacer></v-spacer> -->
                <v-btn large block color="primary" @click="submit" :loading="loading">Registration</v-btn>
              </v-card-actions>
              <v-card-text>
                  Already have an account? <router-link class="routerLink font-weight-bold" to="/login">Login</router-link>
                </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    layout: 'default',
    data: () => ({
      loading: false,
      passwordNotMatched: false,
      formModel: {},
      rules: {
        required: value => !!value || 'This field is required.',
        phone: value => value && value.length <= 11 || 'Max 11 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }),

    mounted () {
      this.$store.dispatch('clearAllData')
    },

    methods: {
      submit () {
        this.loading = true;
        this.$store.dispatch('registerUser', this.formModel)
          .then(res => {
            this.loading = false;
            this.$store.commit('removeLoading')
            this.$store.dispatch('setNotification', {type: 'success', msg: 'Account Created'});
            this.$router.push('/login');
          })
          .catch( err => {
            this.$store.commit('removeLoading')
            this.loading = false
            this.$store.dispatch('setNotification', {type: 'error', msg: 'Something wrong'});
          })
      },
    }

  };
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
  .routerLink{
    text-decoration: none;
    color: red;
  }
</style>
