<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <!-- <v-layout row wrap justify-center> -->
        <v-card v-if="Object.keys(meData).length">
          <template v-slot:extension>
            <v-tabs
              v-model="tab"
              background-color="deep-purple accent-4"
              dark
              next-icon="mdi-arrow-right-bold-box-outline"
              prev-icon="mdi-arrow-left-bold-box-outline"
              show-arrows
              grow
            >
              <v-tab
                v-for="item in tabItems"
                :key="item.tab"
                @click="currentTab = item.id"
              >
              {{ item.tab }}
              </v-tab>
            </v-tabs>
          </template>

          <v-tabs-items v-model="tab">

            <!-- User info tab -->
            <v-tab-item>
            <v-layout row wrap justify-center>
            <v-flex lg6>
              <v-divider class="mt-4"></v-divider>
              <v-card flat>
                <div v-if="currentTab === 1">
                  <OwnerInfoForm/>
                  <!-- <component :is="item.component" :meData="meData"/> -->
                </div>
              </v-card>
              </v-flex>
            </v-layout>
            </v-tab-item>

            <!-- Company info tab-->
            <v-tab-item>
            <v-layout row wrap justify-center>
            <v-flex lg6>
              <v-divider class="mt-4"></v-divider>
              <v-card flat>
                <div v-if="currentTab === 2">
                  <CompanyForm/>
                </div>
              </v-card>
              </v-flex>
            </v-layout>
            </v-tab-item>

            <!-- Pickup payment -->
            <v-tab-item>
            <v-layout row wrap justify-center>
            <v-flex lg6>
              <v-divider class="mt-4"></v-divider>
              <v-card flat>
                <div v-if="currentTab === 3">
                  <PickupPaymentForm/>
                </div>
              </v-card>
              </v-flex>
            </v-layout>
            </v-tab-item>

            <!-- Bank Acount Tab -->
            <v-tab-item>
            <v-layout row wrap justify-center>
            <v-flex lg6>
              <v-divider class="mt-4"></v-divider>
              <v-card flat>
                <div v-if="currentTab === 4">
                  <BankAccountForm/>
                </div>
              </v-card>
              </v-flex>
            </v-layout>
            </v-tab-item>

            <!-- Other Accoun Tab -->
            <v-tab-item>
            <v-layout row wrap justify-center>
            <v-flex lg6>
              <v-divider class="mt-5"></v-divider>
              <v-card flat>
                <div v-if="currentTab === 5">
                  <OthersAccountForm/>
                </div>
              </v-card>
              </v-flex>
            </v-layout>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      <!-- </v-layout> -->
    </v-container>
  </div>
</template>

<script>
  import VWidget from '@/components/VWidget';
  import ProfileForm from '@/components/widgets/form/ProfileForm';
  import OwnerInfoForm from '@/components/widgets/form/OwnerInfoForm';
  import CompanyForm from '@/components/widgets/form/CompanyForm';
  import PickupPaymentForm from '@/components/widgets/form/PickupPaymentForm';
  import BankAccountForm from '@/components/widgets/form/BankAccountForm';
  import OthersAccountForm from '@/components/widgets/form/OthersAccountForm';

  export default {
    layout: "dashboard",
    middleware: ['auth'],
    components: {
      VWidget,
      // ProfileForm,
      OwnerInfoForm,
      CompanyForm,
      PickupPaymentForm,
      BankAccountForm,
      OthersAccountForm,
    },
    data() {
      return {
        currentTab: 1,
        loading: false,
        meData: {},
        // meData: {"uuid":"4cd3fc1d-3f51-49c6-85ea-20048466e1da","name":"Test Company","phone":"0173051321","pickup_phone":"","email":"","address":"Dhaka","pickup_address":"Dhanmondi","payment_method":"bank","withdrawal":"daily","user":{"uuid":"28d8b642-da81-4c61-a27d-73e1e30609d0","username":"admin","phone":"","email":"admin@mail.com","name":""},"website":"","social_media":"","payment":[]},
        tab: null,
        tabItems: [
          {'tab': 'Owner Information', 'component': 'OwnerInfoForm', 'id': 1},
          {'tab': 'Company Information', 'component': 'CompanyForm', 'id': 2},
          {'tab': 'Pickup & Payment', 'component': 'PickupPaymentForm', 'id': 3},
          {'tab': 'Bank Account', 'component': 'BankAccountForm', 'id': 4},
          {'tab': 'Other Account', 'component': 'OthersAccountForm', 'id': 5},
        ],
      };
    },
    asyncData (context) {
      context.store.commit('setLoading')
      return context.store.dispatch('users/fetchMeDetails')
      .then( res => {
        context.store.commit('removeLoading')
        return {
            meData: res
          }
      })
      .catch(err => {
        this.meData = {}
        this.store.dispatch('setNotification', {type: 'error', msg: 'Some thing wrong'});
        this.store.commit('removeLoading')
      })
    },
    methods: {
      getMeDetails() {
        this.loading = true;
        this.$store.commit('setLoading')
        this.$store.dispatch('users/fetchMe')
        .then( res => {
          this.meData = res
          this.$store.commit('removeLoading')
          this.loading = false;
        })
        .catch(err => {
          this.customerData = {}
          this.$store.dispatch('setNotification', {type: 'error', msg: 'Some thing wrong'});
          this.$store.commit('removeLoading')
          this.loading = false;
        })
      }
    }
  };
</script>
