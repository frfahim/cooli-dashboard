<template>
  <v-card ref="form">
    <v-card-text>
      <v-autocomplete
        label="Bank"
        placeholder="Select..."
        :rules="[rules.required]"
        :items="banks"
        v-model="formModel.bank_name"
        ref="bank_name"
        required
      ></v-autocomplete>
      <v-text-field
        label="Branch"
        placeholder=""
        v-model="formModel.branch"
        :rules="[rules.required]"
        :error-messages="errorMessages"
      ></v-text-field>
      <v-text-field
        label="Routing No."
        placeholder=""
        v-model="formModel.routing_number"
        :rules="[rules.required]"
        :error-messages="errorMessages"
      ></v-text-field>
      <v-autocomplete
        label="A/C Type"
        placeholder="Select..."
        :rules="[rules.required]"
        :items="account_types"
        v-model="formModel.account_type"
        item-value="key"
        item-text="name"
        ref="country"
        required
      ></v-autocomplete>
      <v-text-field
        label="A/C Holder Name"
        placeholder=""
        v-model="formModel.account_holder_name"
        :rules="[rules.required]"
        :error-messages="errorMessages"
      ></v-text-field>
      <v-text-field
        label="A/C No."
        placeholder=""
        v-model="formModel.account_number"
        :rules="[rules.required]"
        :error-messages="errorMessages"
      ></v-text-field>
    </v-card-text>
    <!-- <v-divider class="mt-5"></v-divider> -->
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
import banks from "@/api/banks";
export default {
  data: () => ({
    errorMessages: [],
    loading: false,
    formHasErrors: false,
    formModel: {},
    rules: {
      required: value => !!value || 'This field is required.',
    },
    banks: banks,
    account_types: [
      {'key': 'current', 'name': 'Current'},
      {'key':'savings', 'name': 'Savings'}
    ]
  }),

  created () {
    this.getBankInfo()
  },


  methods: {
    getBankInfo () {
      this.loading = true
      this.$store.commit('setLoading')
      this.$store.dispatch('users/fetchBankInfo', {'payment_option': 'bank'})
      .then( res => {
        this.formModel = res.data
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
        'payment_option': 'bank',
        'bank_name': this.formModel.bank_name,
        'branch': this.formModel.branch,
        'routing_number': this.formModel.routing_number,
        'account_type': this.formModel.account_type,
        'account_holder_name': this.formModel.account_holder_name,
        'account_number': this.formModel.account_number,
      }
      console.log(this.formModel);
      Object.keys(payload).forEach(f => {
        console.log(f)
        if (!payload[f]) this.formHasErrors = true;
      });
      if (this.formHasErrors) {
        this.loading = false
        this.$store.dispatch('setNotification', {type: 'error', msg: 'Something wrong'});
        return
      }


      this.$store.dispatch(
        'users/updateBankInfo', payload
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