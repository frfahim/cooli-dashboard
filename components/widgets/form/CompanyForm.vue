<template>
  <v-card ref="form">
    <!-- <input
        type="text"
        :value="this.$store.state.users.meData.name"> -->
    <v-card-text>
      <v-text-field
        label="Name"
        placeholder=""
        v-model="formModel.name"
        required
        :rules="[rules.required]"
        :error-messages="errorMessages"
      ></v-text-field>
      <v-text-field
        label="Phone"
        placeholder=""
        :rules="[rules.required, rules.phone]"
        :error-messages="errorMessages"
        v-model="formModel.phone"
        type="number"
        required
      ></v-text-field>
      <v-text-field
        label="Address"
        placeholder=""
        :rules="[rules.required]"
        :error-messages="errorMessages"
        v-model="formModel.address"
        required
      ></v-text-field>
      <v-text-field
        label="Website"
        placeholder=""
        :error-messages="errorMessages"
        v-model="formModel.website"
      ></v-text-field>
      <v-text-field
        label="Social Media"
        placeholder=""
        :error-messages="errorMessages"
        v-model="formModel.social_media"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn flat to="/profile">Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-slide-x-reverse-transition>
        <!-- <v-tooltip
          left
          v-if="formHasErrors"
        >
          <v-btn
            icon
            @click="resetForm"
            slot="activator"
            class="my-0"
          >
            <v-icon>refresh</v-icon>
          </v-btn>
          <span>Refresh form</span>
        </v-tooltip> -->
      </v-slide-x-reverse-transition>
      <v-btn color="primary" @click="submit" :loading="loading">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    errorMessages: [],
    formHasErrors: false,
    loading: false,
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
    console.log("company form")
    // this.getCompanyInfo()
  },

  created () {
    this.getCompanyInfo()
  },

  methods: {
    getCompanyInfo () {
      this.loading = true
      this.$store.commit('setLoading')
      this.$store.dispatch('users/fetchMeDetails')
      .then( res => {
        this.formModel = res
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
        'name': this.formModel.name,
        'phone': this.formModel.phone,
        'phone': this.formModel.phone,
        'address': this.formModel.address,
        'website': this.formModel.website,
        'social_media': this.formModel.social_media,
      }
      console.log(this.formModel);
      ['name', 'phone', 'address'].forEach(f => {
        console.log(f)
        if (!payload[f]) this.formHasErrors = true;
      });
      if (this.formHasErrors) {
        this.loading = false
        this.$store.dispatch('setNotification', {type: 'error', msg: 'Something wrong'});
        return
      }


      this.$store.dispatch(
        'users/updateCompanyInfo', payload
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