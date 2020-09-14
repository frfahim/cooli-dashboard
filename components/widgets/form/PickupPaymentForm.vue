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
      <v-select
        autocomplete
        label="Nearest Zone"
        placeholder="Select..."
        :rules="[rules.required]"
        :items="nearest_zones"
        v-model="formModel.zone"
        ref="zones"
        required
      ></v-select>

      <v-select
        :items="paymentOptions"
        v-model="formModel.payment_method"
        label="Payment Method"
        auto
        required
        item-text="name"
        item-value="value"
      ></v-select>
      <v-select
        :items="withdrawalOptions"
        v-model="formModel.withdrawal"
        label="Withdrawal"
        auto
        required
        item-text="name"
        item-value="value"
      ></v-select>

    </v-card-text>
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
    formHasErrors: false,
    formModel: {},
    rules: {
      required: value => !!value || 'This field is required.',
    },
    nearest_zones: ['Dhanmondi', 'Mohammadpur', 'Shyamoli', 'Mirpur'],
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