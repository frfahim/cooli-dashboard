<template>
  <v-card ref="form">
    <v-card-text>
      <v-text-field
        label="bKkash"
        placeholder=""
        v-model="formModel.phone_number"
        type="number"
        :rules="[rules.required, rules.phone]"
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
export default {
  data: () => ({
    errorMessages: [],
    loading: false,
    loading: false,
    formHasErrors: false,
    formModel: {},
    rules: {
      required: value => !!value || 'This field is required.',
      phone: value => value && value.length <= 11 || 'Max 11 characters',
    },
  }),
  // props: {
  //   currentTab: {
  //     name: {
  //     type: Number,
  //     default: ''
  //   },
  //   }
  // },

  mounted () {
    this.getBankInfo()
  },

  methods: {
      getBankInfo () {
        this.loading = true
        this.$store.commit('setLoading')
        this.$store.dispatch('users/fetchBankInfo', {'payment_option': 'bkash'})
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
        })
      },

      submit () {
        this.loading = true
        this.$store.commit('setLoading')
        this.formHasErrors = false;
        let payload = {
          'payment_option': 'bkash',
          'phone_number': this.formModel.phone_number,
        }
        console.log(this.formModel);
        Object.keys(payload).forEach(f => {
          console.log(f)
          if (!payload[f]) this.formHasErrors = true;
        });
        if (this.formHasErrors) {
          this.loading = false
          return
        }


        this.$store.dispatch(
          'users/updateBankInfo', payload
        ).then(res => {
          this.$store.commit('removeLoading')
          this.loading = false
          // this.$router.push('/profile/update/')
          // this.$emit('update:currentTab', 2)
        }).catch(error =>{
          this.$store.commit('removeLoading')
          this.loading = false
        })
      },
    }


};
</script>