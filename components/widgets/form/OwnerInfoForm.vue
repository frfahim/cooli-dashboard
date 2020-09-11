<template>
  <v-card ref="form">
    <v-card-text>
      <v-text-field
        label="Name"
        placeholder="John Doe"
        v-model="name"
        required
        ref="name"
        :rules="[rules.required]"
        :error-messages="errorMessages"
      ></v-text-field>
      <v-text-field
        label="Email"
        placeholder="jondoe@example.com"
        name="email"
        v-model="email"
        :rules="[rules.required, rules.email]"
        :error-messages="errorMessages"
        required
      ></v-text-field>
      <v-text-field
        label="Phone"
        placeholder="01712000000"
        :rules="[rules.required, rules.phone]"
        :error-messages="errorMessages"
        v-model="phone"
        type="number"
        required
      ></v-text-field>
    </v-card-text>
    <!-- <v-divider class="mt-5"></v-divider> -->
    <v-card-actions>
      <v-btn flat>Cancel</v-btn>
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
      <v-btn color="primary" flat @click="submit">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    errorMessages: [],
    name: null,
    email: null,
    phone: null,
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

  computed: {
    form () {
      return {
        name: this.name,
        email: this.email,
        phone: this.phone,
      };
    }
  },

  watch: {
    name () {
      this.errorMessages = [];
    }
  },

  methods: {
    resetForm () {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset();
      });
    },
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