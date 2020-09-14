<template>
  <v-card ref="form">
    <v-card-text>
      <v-text-field
        label="bKkash"
        placeholder=""
        v-model="formModel.bkash"
        :error-messages="errorMessages"
      ></v-text-field>
    </v-card-text>
    <!-- <v-divider class="mt-5"></v-divider> -->
    <v-card-actions>
      <v-btn flat>Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-slide-x-reverse-transition>
      </v-slide-x-reverse-transition>
      <v-btn color="primary" flat @click="submit">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    errorMessages: [],
    // name: null,
    // email: null,
    // phone: null,
    formHasErrors: false,
    formModel: {},
  }),

  // computed: {
  //   form () {
  //     return {
  //       name: this.name,
  //       email: this.email,
  //       phone: this.phone,
  //     };
  //   }
  // },

  watch: {
    name () {
      this.errorMessages = [];
    }
  },

  methods: {
    submit () {
      this.formHasErrors = false;
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true;

        this.$refs[f].validate(true);
      });
    }
  }
};
</script>