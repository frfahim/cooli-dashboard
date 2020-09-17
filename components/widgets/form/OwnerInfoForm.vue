<template>
  <v-card ref="form">
    <v-card-text>
      <v-text-field
        label="Name"
        placeholder="John Doe"
        v-model="formModel.name"
        required
        ref="name"
        :rules="[rules.required]"
        :error-messages="errorMessages"
      ></v-text-field>
      <v-text-field
        label="Email"
        placeholder="jondoe@example.com"
        name="email"
        ref="email"
        v-model="formModel.email"
        :rules="[rules.required, rules.email]"
        :error-messages="errorMessages"
        required
      ></v-text-field>
      <v-text-field
        label="Phone"
        ref="phone"
        placeholder="01712000000"
        :rules="[rules.required, rules.phone]"
        :error-messages="errorMessages"
        v-model="formModel.phone"
        type="number"
        required
      ></v-text-field>
    </v-card-text>
    <!-- <v-divider class="mt-5"></v-divider> -->
    <v-card-actions>
      <v-btn flat to="/profile">Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-slide-x-reverse-transition>
        <v-tooltip
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
        </v-tooltip>
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
    formModel: {},
    loading: false,
    rules: {
      required: value => !!value || 'This field is required.',
      phone: value => value && value.length <= 11 || 'Max 11 characters',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
    },
  }),

  props: {
    // meData: {
    //   type: Object,
    //   required: true
    // }
  },

  mounted () {
    console.log("mount owner");
    this.getUser()
  },

  methods: {
    resetForm () {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.formModel).forEach(f => {
        this.$refs[f].reset();
      });
    },
    submit () {
      this.loading = true
      this.$store.commit('setLoading')
      this.formHasErrors = false;
      let payload = {
        'name': this.formModel.name,
        'email': this.formModel.email,
        'phone': this.formModel.phone,
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
        'users/updateUser', payload
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

    getUser () {
      this.loading = true
      this.$store.commit('setLoading')
      this.$store.dispatch('users/fetchUser')
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
    }
  }
};
</script>