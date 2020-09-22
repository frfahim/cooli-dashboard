<template>
  <v-card ref="form">
    <v-card-text>
      <v-subheader class="pa-0 mb-3">PICKUP INFORMATION</v-subheader>
      <v-layout row wrap>
        <v-flex sm6 lg6>
          <v-text-field
            label="Name"
            placeholder="Jhon Doe"
            v-model="formModel.requestor_name"
            :rules="[rules.required]"
            :error-messages="errorMessages"
          ></v-text-field>
        </v-flex>
        <v-flex sm6 lg6>
          <v-text-field
            label="Phone"
            placeholder="01712000000"
            :rules="[rules.required, rules.phone]"
            :error-messages="errorMessages"
            v-model="formModel.requestor_phone"
            type="number"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex sm6 lg6>
          <v-autocomplete
            label="Pickup Area"
            placeholder="Select..."
            :rules="[rules.required]"
            :items="zoneList"
            v-model="formModel.requestor_zone"
            required
            ref="formModel.requestor_zone"
            item-value="id"
            item-text="name"
            :menu-props="{ top: true, }"
          ></v-autocomplete>
        </v-flex>
        <v-flex sm6 lg6>
          <v-text-field
            label="Pickup Address"
            placeholder=""
            v-model="formModel.requestor_address"
            :rules="[rules.required]"
            :error-messages="errorMessages"
          ></v-text-field>
        </v-flex>
      </v-layout>

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


      <v-layout row wrap>
        <v-flex sm6 lg6>
          <v-select
            :items="productTypes"
            v-model="formModel.product_type"
            label="Product Type"
            :menu-props="{top: true, auto: true, overflowY: true }"
            required
            item-text="value"
            item-value="name"
          ></v-select>
        </v-flex>
        <v-flex sm6 lg6>
          <v-textarea
            v-model="formModel.description"
            auto-grow
            filled
            color="deep-purple"
            label="Description"
            rows="1"
          ></v-textarea>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
      <v-flex lg4>
          <v-select
            label="Service"
            placeholder="Select..."
            :items="services"
            v-model="formModel.service"
            item-text="name"
            item-value="id"
            @input="formModel.product_weight=1"
          ></v-select>
        </v-flex>
        <v-flex lg4>
          <v-text-field
            :label="getWeightLabel"
            v-model="formModel.product_weight"
            type="number"
            :rules="[rules.required]"
          ></v-text-field>
        </v-flex>
        <v-flex lg4>
          <v-text-field
            label="Delivery Charge"
            :value="getServicePrice"
            type="number"
            readonly
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex sm4 lg4>
          <v-text-field
            label="Invoice number"
            placeholder=""
            v-model="formModel.invioce_number"
            :error-messages="errorMessages"
          ></v-text-field>
        </v-flex>
        <v-flex sm4 lg4>
          <v-text-field
            label="Invoice value"
            placeholder=""
            v-model="formModel.invioce_value"
            :error-messages="errorMessages"
          ></v-text-field>
        </v-flex>
        <v-flex sm4 lg4>
          <v-text-field
            label="Collection Amount"
            placeholder=""
            v-model="formModel.cash_amount"
            :error-messages="errorMessages"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <!-- <v-layout row wrap>
        <v-flex sm4 lg4>
          <v-text-field
            label="Collection Amount"
            placeholder=""
            v-model="formModel.cash_amount"
            :error-messages="errorMessages"
          ></v-text-field>
        </v-flex>
      </v-layout> -->

      <v-subheader class="pa-0 mb-3 mt-3">RECIPIENT INFORMATION</v-subheader>

      <!-- Recipient Information -->

      <v-layout row wrap>
        <v-flex sm6 lg6>
          <v-text-field
            label="Recipient Name"
            placeholder="Jhon Doe"
            v-model="formModel.receiver_name"
            :rules="[rules.required]"
            :error-messages="errorMessages"
          ></v-text-field>
        </v-flex>
        <v-flex sm6 lg6>
          <v-text-field
            label="Phone"
            placeholder="01712000000"
            :rules="[rules.required, rules.phone]"
            :error-messages="errorMessages"
            v-model="formModel.receiver_phone"
            type="number"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex sm6 lg6>
          <v-autocomplete
            label="Delivery Area"
            placeholder="Select..."
            :rules="[rules.required]"
            :items="zoneList"
            :menu-props="{ top: true, }"
            v-model="formModel.receiver_zone"
            item-value="id"
            item-text="name"
            required
          ></v-autocomplete>
        </v-flex>
        <v-flex sm6 lg6>
          <v-text-field
            label="Delivery Address"
            placeholder=""
            v-model="formModel.receiver_address"
            :rules="[rules.required]"
            :error-messages="errorMessages"
          ></v-text-field>
        </v-flex>
      </v-layout>

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
import { packageServices } from "@/api/prices";

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
      'pickupDate': null,
      'pickupTime': null,
      'excepted_delivery_date': null,
      'excepted_delivery_time': null,
      'product_weight': 1,
      'service': packageServices[0],
    },
    meData: JSON.parse(localStorage.getItem("meData")),
    rules: {
      required: value => !!value || 'This field is required.',
      phone: value => value && value.length <= 11 || 'Max 11 characters',
    },
    services: packageServices,
    weightLabels: {'regular': 'Weight (KG)', 'food': 'Small/Medium Box', 'book': 'Books'},
  }),
  computed:  {
    getName () {
      return this.meData.name
    },
    getWeightLabel () {
      let service = this.findServiceObject(this.formModel.service)
      return this.weightLabels[service.group]
    },
    getServicePrice () {
      let currentService = this.findServiceObject(this.formModel.service)
      let price = currentService.base_price
      if (this.formModel.product_weight > currentService.base_unit) {
        price = price + (currentService.unit_price * (this.formModel.product_weight - currentService.base_unit))
      }
      return price
    }
  },
  created () {
    const meData = JSON.parse(localStorage.getItem("meData"))
    if (meData) {
      this.formModel.requestor_name = meData.name;
      this.formModel.requestor_phone = meData.phone;
      this.formModel.requestor_zone = meData.zone;
      this.formModel.requestor_address = meData.pickup_address;
    }
    console.log("mount form", this.formModel);
  },

  props: {
    zoneList: {
      type: Array,
      required: true
    },
  },

  methods: {
    findServiceObject (service) {
      let serviceObj = service
      if (typeof(service) != 'object') {
        serviceObj = this.services.find(x => x.id === service);
      }
      return serviceObj
    },
    submit () {
      console.log(this.formModel)
      const payload = {}
      Object.keys(this.formModel).forEach(key => {
        if (this.formModel[key]) payload[key] = this.formModel[key]
      })
      if (typeof payload.requestor_zone === 'object') {
        payload.requestor_zone = payload.requestor_zone.id
      }
      if (this.formModel.pickupDate) {
        payload['pickup_date'] = `${this.formModel['pickupDate']}T${this.formModel['pickupTime']}`
      }
      if (this.formModel.excepted_delivery_date) {
        payload['delivery_date'] = `${this.formModel['excepted_delivery_date']}T${this.formModel['excepted_delivery_time']}`
      }
      console.log(payload);


      this.$store.commit('setLoading')
      this.$store.dispatch(
        'orders/createOrder', payload
      ).then(res => {
        this.$store.commit('removeLoading')
        this.$store.dispatch('setNotification', {type: 'success', msg: 'Catalog Created'});
        let token = localStorage.getItem("UserToken")
        if (token) {
          this.$router.push('/parcel/list')
        } else {
          this.$router.push('/parcel/individual')
        }
      }).catch(error =>{
        this.$store.commit('removeLoading')
        this.$store.dispatch('setNotification', {type: 'error', msg: 'Something wrong'});
      })
    }
  }
};
</script>