<template>
  <v-card ref="form">
    <v-card-text>
      <v-subheader class="pa-0 mb-3">PICKUP INFORMATION</v-subheader>
      <v-text-field
        label="Name"
        placeholder="Jhon Doe"
        v-model="formModel.name"
        :rules="[rules.required]"
        :error-messages="errorMessages"
      ></v-text-field>
      <v-text-field
        label="Phone"
        placeholder="01712000000"
        :rules="[rules.required, rules.phone]"
        :error-messages="errorMessages"
        v-model="formModel.phone"
        type="number"
        required
      ></v-text-field>

      <v-autocomplete
        label="Pickup Area"
        placeholder="Select..."
        :rules="[rules.required]"
        :items="nearest_zones"
        v-model="formModel.pickup_zone"
        required
        ref="formModel.pickup_zone"
        :menu-props="{ top: true, }"
      ></v-autocomplete>
      <v-text-field
        label="Pickup Address"
        placeholder=""
        v-model="formModel.pickup_address"
        :rules="[rules.required]"
        :error-messages="errorMessages"
      ></v-text-field>

      <v-layout row wrap>
        <v-flex sm6 lg6>
          <v-dialog
            ref="pickupDateModalRef"
            persistent
            v-model="pickupDateModal"
            lazy
            full-width
            width="290px"
            :return-value.sync="formModel.pickupDate"
          >
            <v-text-field
              slot="activator"
              label="Pickup Date"
              v-model="formModel.pickupDate"
              append-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker color="green lighten-1" header-color="red" v-model="formModel.pickupDate" scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="pickupDateModal = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.pickupDateModalRef.save(formModel.pickupDate)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-flex>

        <v-flex sm6 lg6>
          <v-dialog
            ref="pickupTimeModalRef"
            persistent
            v-model="pickupTimeModal"
            lazy
            full-width
            width="290px"
            :return-value.sync="formModel.pickupTime"
          >
            <v-text-field
              slot="activator"
              label="Pickup Time"
              v-model="formModel.pickupTime"
              append-icon="access_time"
              readonly
            ></v-text-field>
            <v-time-picker color="green lighten-1" header-color="red" v-model="formModel.pickupTime" scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="pickupTimeModal = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.pickupTimeModalRef.save(formModel.pickupTime)">OK</v-btn>
            </v-time-picker>
          </v-dialog>
        </v-flex>
      </v-layout>


      <v-select
        :items="productTypes"
        v-model="formModel.product_type"
        label="Product Type"
        :menu-props="{top: true, auto: true, overflowY: true }"
        required
        item-text="value"
        item-value="name"
      ></v-select>
      <v-textarea
        v-model="formModel.description"
        auto-grow
        filled
        color="deep-purple"
        label="Description"
        rows="1"
      ></v-textarea>
      <v-text-field
        label="Invoice number"
        placeholder=""
        v-model="formModel.invioce_number"
        :error-messages="errorMessages"
      ></v-text-field>
      <v-text-field
        label="Invoice value"
        placeholder=""
        v-model="formModel.invioce_value"
        :error-messages="errorMessages"
      ></v-text-field>
      <v-text-field
        label="Cash Collection Amount"
        placeholder=""
        v-model="formModel.amount"
        :rules="[rules.required]"
        :error-messages="errorMessages"
      ></v-text-field>

      <v-subheader class="pa-0 mb-3 mt-3">RECIPIENT INFORMATION</v-subheader>

      <!-- Recipient Information -->

      <v-text-field
        label="Recipient Name"
        placeholder="Jhon Doe"
        v-model="formModel.reciient_name"
        :rules="[rules.required]"
        :error-messages="errorMessages"
      ></v-text-field>
      <v-text-field
        label="Phone"
        placeholder="01712000000"
        :rules="[rules.required, rules.phone]"
        :error-messages="errorMessages"
        v-model="formModel.reciient_phone"
        type="number"
        required
      ></v-text-field>
      <v-autocomplete
        label="Delivery Area"
        placeholder="Select..."
        :rules="[rules.required]"
        :items="nearest_zones"
        :menu-props="{ top: true, }"
        v-model="formModel.delivery_zone"
        required
      ></v-autocomplete>
      <v-text-field
        label="Delivery Address"
        placeholder=""
        v-model="formModel.delivery_address"
        :rules="[rules.required]"
        :error-messages="errorMessages"
      ></v-text-field>

      <v-layout row wrap>
        <v-flex sm6 lg6>
          <v-dialog
            ref="deliveryDateModalRef"
            persistent
            v-model="deliveryDateModal"
            lazy
            full-width
            width="290px"
            :return-value.sync="formModel.excepted_delivery_date"
          >
            <v-text-field
              slot="activator"
              label="Excepted Delivery Date"
              v-model="formModel.excepted_delivery_date"
              append-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker color="green lighten-1" header-color="red" v-model="formModel.excepted_delivery_date" scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="deliveryDateModal = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.deliveryDateModalRef.save(formModel.excepted_delivery_date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-flex>

        <v-flex sm6 lg6>
          <v-dialog
            ref="deliveryTimeModalRef"
            persistent
            v-model="deliveryTimeModal"
            lazy
            full-width
            width="290px"
            :return-value.sync="formModel.excepted_delivery_time"
          >
            <v-text-field
              slot="activator"
              label="Excepted Delivery Time"
              v-model="formModel.excepted_delivery_time"
              append-icon="access_time"
              readonly
            ></v-text-field>
            <v-time-picker color="green lighten-1" header-color="red" v-model="formModel.excepted_delivery_time" scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="deliveryTimeModal = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.deliveryTimeModalRef.save(formModel.excepted_delivery_time)">OK</v-btn>
            </v-time-picker>
          </v-dialog>
        </v-flex>
      </v-layout>

      <v-textarea
        v-model="formModel.delivery_note"
        auto-grow
        filled
        color="deep-purple"
        label="Note"
        rows="1"
      ></v-textarea>

    </v-card-text>
    <!-- <v-divider class="mt-5"></v-divider> -->
    <v-card-actions class="pb-3">
      <!-- <v-btn flat>Cancel</v-btn>
      <v-spacer></v-spacer> -->
      <!-- <v-slide-x-reverse-transition>
      </v-slide-x-reverse-transition> -->
      <v-spacer></v-spacer>
      <v-btn color="indigo" large @click="submit">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ProductTypes from '@/api/product_types';
export default {
  data: () => ({
    errorMessages: [],
    pickupDateModal: false,
    pickupTimeModal: false,
    deliveryDateModal: false,
    deliveryTimeModal: false,
    formHasErrors: false,
    productTypes: ProductTypes,
    formModel: {
      'pickupDate': new Date().toISOString().substr(0, 10),
      'pickupTime': null,
      'excepted_delivery_date': null,
      'excepted_delivery_time': null,
    },
    rules: {
      required: value => !!value || 'This field is required.',
      phone: value => value && value.length <= 11 || 'Max 11 characters',
    },
    nearest_zones: ['Dhanmondi', 'Mohammadpur', 'Shyamoli', 'Mirpur'],
  }),

  methods: {
    submit () {
      this.formHasErrors = false;
    }
  }
};
</script>