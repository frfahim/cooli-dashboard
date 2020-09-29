<template>
  <div id="pageCard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap justify-center>
      <v-flex lg8>
        <v-card elevation="5">
          <v-toolbar color="teal" dark flat dense cad>
              <v-toolbar-title class="subheading">
                User information
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <!-- <v-toolbar-title class="subheading">
                Edit
              </v-toolbar-title> -->
              <v-btn rounded to="/profile/update">
                Edit
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <template>
                <v-card>
                  <v-card-text>
                  <v-layout row>
                    <v-flex lg6>
                      Owner Name
                    </v-flex>
                    <v-flex lg6>
                      {{ userData.name }}
                    </v-flex>
                  </v-layout>
                  </v-card-text>
                  <v-card-text>
                    <v-layout row>
                      <v-flex lg6>
                        User ID
                      </v-flex>
                      <v-flex lg6>
                        {{ userData.username }}
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-card-text>
                    <v-layout row>
                      <v-flex lg6>
                        Phone Number
                      </v-flex>
                      <v-flex lg6>
                        {{ userData.phone }}
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-card-text>
                    <v-layout row>
                      <v-flex lg6>
                        Company Name
                      </v-flex>
                      <v-flex lg6>
                        {{customerData.name}}
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-card-text>
                    <v-layout row>
                      <v-flex lg6>
                        Address
                      </v-flex>
                      <v-flex lg6>
                        {{customerData.address}}
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <!-- <v-card-text>
                    <v-layout row>
                      <v-flex lg6>
                        Company Name
                      </v-flex>
                      <v-flex lg6>
                        {{customerData.name}}
                      </v-flex>
                    </v-layout>
                  </v-card-text> -->
                </v-card>
              </template>
            </v-card-text>
          
        </v-card>
      </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import VWidget from '@/components/VWidget';

  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    components: {
      VWidget
    },
    data() {
      return {
        customerData: Object,
        userData: Object,
        paymentData: Array
      };
    },
    created () {
      this.getMe()
    },
    computed: {},
    methods: {
      getMe() {
        this.$store.commit('setLoading')
        this.$store.dispatch('users/fetchMe')
        .then( res => {
          if ("user" in res) {
            this.userData = res.user
            this.customerData = res
          } else {
            this.userData = res
          }
          if ("payment" in res) {
            this.paymentData = res.payment
          }
          this.$store.commit('removeLoading')
        })
        .catch(err => {
          this.customerData = {}
          this.$store.commit('removeLoading')
        })
      }
    }
  };
</script>
<style lang="stylus" scoped>
</style>
