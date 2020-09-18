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
                  <h4 class="flex mb-4 primary--text">Merchant Login</h4>
                </div>
                <v-form>
                  <v-text-field
                    name="login"
                    label="Username"
                    type="text"
                    v-model="modelForm.username"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="passwordVisible ? 'text' : 'password'"
                    @click:append="passwordVisible = !passwordVisible"
                    v-model="modelForm.password"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
              <p v-if="wrongCredential" class="routerLink mb-1 text-center">
                  Wrong username or password!
              </p>
              </v-card-actions>
              <v-card-actions>
                <!-- <v-btn block>
                  Register
                </v-btn> -->
                <!-- <v-spacer></v-spacer> -->
                <v-btn large block color="primary" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
              <v-card-text>
                  Don't have an account? <router-link class="routerLink font-weight-bold" to="/registration">Signup</router-link>
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
      wrongCredential: false,
      passwordVisible: false,
      modelForm: {},
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
      this.$store.dispatch('clearUserData')
    },

    methods: {
      login() {
        this.loading = true;
        this.$store.dispatch('loginUser', this.modelForm)
          .then(res => {
            this.wrongCredential = false;
            console.log(res.data.user);
            if (res.data.user.is_verified) {
              this.$router.push('/parcel/list');
            } else {
              this.$router.push('/profile');
            }
            this.loading = false;
          })
          .catch( err => {
            this.wrongCredential = true;
            this.loading = false;
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
