<template>
  <v-card ref="form">
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
      <v-btn flat>Cancel</v-btn>
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
      <v-btn color="primary" flat @click="submit">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    errorMessages: [],
    formHasErrors: false,
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

  // computed: {
  //   form () {
  //     return {
  //       name: this.name,
  //       address: this.address,
  //       city: this.city,
  //       state: this.state,
  //       zip: this.zip,
  //       country: this.country
  //     };
  //   }
  // },


  methods: {
    resetForm () {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.formModel).forEach(f => {
        this.$refs[f].reset();
      });
      this.formModel = {}
    },
    submit () {
      this.formHasErrors = false;
      Object.keys(this.formModel).forEach(f => {
        if (!this.formModel[f]) this.formHasErrors = true;

        this.$refs[f].validate(true);
      });
    }
  }
};
</script>