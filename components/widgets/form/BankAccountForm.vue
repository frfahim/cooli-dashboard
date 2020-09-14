<template>
  <v-card ref="form">
    <v-card-text>
      <v-select
        autocomplete
        label="Bank"
        placeholder="Select..."
        :rules="[rules.required]"
        :items="banks"
        v-model="formModel.bank_name"
        ref="bank_name"
        required
      ></v-select>
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
      <v-text-field
        label="A/C Type"
        placeholder=""
        v-model="formModel.account_type"
        :rules="[rules.required]"
        :error-messages="errorMessages"
      ></v-text-field>
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
    rules: {
      required: value => !!value || 'This field is required.',
    },
    banks: ['UCB', 'Bank Asia', 'EBL']
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