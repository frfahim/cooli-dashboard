<template>
  <v-card ref="form">
    <v-card-text>
      <v-text-field
        label="Pickup Address"
        placeholder=""
        :rules="[rules.required]"
        :error-messages="errorMessages"
        v-model="formModel.pickup_address"
        required
      ></v-text-field>
      <v-autocomplete
        label="Nearest Zone"
        placeholder="Select..."
        :rules="[rules.required]"
        :items="zoneList"
        item-value="id"
        item-text="name"
        v-model="formModel.zone"
        ref="zones"
        required
      ></v-autocomplete>

      <v-select
        :items="paymentOptions"
        v-model="formModel.payment_method"
        label="Payment Method"
        required
        item-text="name"
        item-value="value"
      ></v-select>
      <v-select
        :items="withdrawalOptions"
        v-model="formModel.withdrawal"
        label="Withdrawal"
        required
        item-text="name"
        item-value="value"
      ></v-select>

    </v-card-text>
    <v-card-actions>
      <v-btn flat to="/profile">Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-slide-x-reverse-transition>
      </v-slide-x-reverse-transition>
      <v-btn color="primary" @click="submit" :loading="loading">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    errorMessages: [],
    loading: false,
    formHasErrors: false,
    formModel: {},
    rules: {
      required: value => !!value || 'This field is required.',
    },
    zoneList: [],
    paymentOptions: [
      {
        value: "bank",
        name: "Bank"
      },
      {
        value: "bkash",
        name: "bKash"
      },
      {
        value: "cash",
        name: "Cash"
      },
    ],
    withdrawalOptions: [
      {
        value: "as_per_request",
        name: "As per Request"
      },
      {
        value: "daily",
        name: "Daily"
      },
      {
        value: "weekly",
        name: "Weekly"
      },
    ],
  }),

  created () {
    this.getCompanyInfo()
    this.getZones()
  },

  methods: {

    getZones () {
      this.$store.commit('setLoading')
      this.$store.dispatch('orders/fetchZones')
        .then( res => {
          this.$store.commit('removeLoading')
          this.zoneList = res.results
        }
      ).catch(err => {
        this.$store.commit('removeLoading')
        return {
          error: err
        }
      })
    },
    getCompanyInfo () {
      this.loading = true
      this.$store.commit('setLoading')
      this.$store.dispatch('users/fetchMeDetails')
      .then( res => {
        this.formModel = res
        if (!this.formModel.withdrawal) this.formModel.withdrawal = "weekly"
        this.$store.commit('removeLoading')
        this.loading = false
        console.log("gettt",this.formModel);
      })
      .catch(err => {
        this.formModel = {}
        this.$store.commit('removeLoading')
        this.loading = false
        this.$store.dispatch('setNotification', {type: 'error', msg: 'Some thing wrong'});
      })
    },

    submit () {
      this.loading = true
      this.$store.commit('setLoading')
      this.formHasErrors = false;
      let payload = {
        'pickup_address': this.formModel.pickup_address,
        'zone': this.formModel.zone,
        'payment_method': this.formModel.payment_method,
        'withdrawal': this.formModel.withdrawal,
      }
      console.log(this.formModel);
      ['pickup_address', 'zone', 'payment_method'].forEach(f => {
        console.log(f)
        if (!payload[f]) this.formHasErrors = true;
      });
      if (this.formHasErrors) {
        this.loading = false
        this.$store.dispatch('setNotification', {type: 'error', msg: 'Something wrong'});
        return
      }

      if (typeof payload.zone === 'object') {
        payload.zone = payload.zone.id
      }


      this.$store.dispatch(
        'users/updatePickupPayment', payload
      ).then(res => {
        this.$store.commit('removeLoading')
        this.loading = false
        this.$store.dispatch('setNotification', {type: 'success', msg: 'Catalog Created'});
        // this.$router.push('/profile/update/')
      }).catch(error =>{
        this.$store.commit('removeLoading')
        this.loading = false
        this.$store.dispatch('setNotification', {type: 'error', msg: 'Something wrong'});
      })
    },
  }
};
</script>