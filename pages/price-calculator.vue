<template>
  <div id="social">
    <v-container grid-list-xl fluid>
      <v-card class="mx-auto" max-width="900">
      <v-layout row wrap justify-center pa-4>
        <v-flex lg3>
          <v-select
            label="From"
            placeholder="Select..."
            :items="districts"
            v-model="fromCity"
            item-text="name"
            item-value="id"
          ></v-select>
        </v-flex>
        <v-flex lg3>
          <v-select
            label="Destination"
            placeholder="Select..."
            :items="districts"
            v-model="destinationCity"
            item-text="name"
            item-value="id"
          ></v-select>
        </v-flex>
        <v-flex lg3>
          <v-select
            label="Service"
            placeholder="Select..."
            :items="services"
            v-model="service"
            item-text="name"
            item-value="id"
          ></v-select>
        </v-flex>
        <v-flex lg3>
          <v-text-field
            :label="getLabel"
            v-model="serviceWeght"
            type="number"
            :rules="[rules.required]"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-card-text class="text-center">
        <v-flex text-xs-center>
          <v-chip
            class="short"
            color="orange"
            x-large
          >
            <span>
              {{getServicePrice}}
            </span>
          </v-chip>
        </v-flex>
      </v-card-text>

      <v-divider class="mt-4"></v-divider>
      <v-card
        class="mx-auto"
        max-width="600"
        tile
      >
      <v-card-text>* 1% Cash Handling Charge will be added.</v-card-text>
      <v-card-text>* All charges are VAT & Tax excluded.</v-card-text>
      <v-card-text>* Small Box: Max 6 inch; Medium Box: Max 8 inch.</v-card-text>
      <v-card-text>* For Food/Fish Item Marchant ensure sufficient packaging.</v-card-text>
      <v-card-text>* No Liquid except Bottled is allowed, no Fragile item.</v-card-text>
      <v-card-text>* Unavoidable circumstances may change in time of delivery.</v-card-text>
      <v-card-text>* For Food/Fish/Grocery 12 hour prior booking is mandatory.</v-card-text>
      </v-card>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { packageServices } from "@/api/prices";

export default {
  layout: "dashboard",
  middleware: ["auth"],
  components: {},
  data: () => ({
      districts: [ {'id': 1, 'name': 'Dhaka'}],
      services: packageServices,
      fromCity: {'id': 1, 'name': 'Dhaka'},
      destinationCity: {'id': 1, 'name': 'Dhaka',},
      service: packageServices[0],
      serviceWeght: 1,
      labels: {'regular': 'Weight (KG)', 'food': 'Small/Medium Box', 'book': 'Books'},
      rules: {
        required: value => !!value || 'This field is required.',
      },
  }),

  computed: {
    getLabel () {
      let service = this.findServiceObject(this.service)
      return this.labels[service.group]
    },
    getServicePrice () {
      let currentService = this.findServiceObject(this.service)
      let price = currentService.base_price
      if (this.serviceWeght > currentService.base_unit) {
        price = price + (currentService.unit_price * (this.serviceWeght - currentService.base_unit))
      }
      return price
    }
  },

  methods: {
    findServiceObject (service) {
      let serviceObj = service
      if (typeof(service) != 'object') {
        serviceObj = this.services.find(x => x.id === service);
      }
      return serviceObj
    },
  },
};
</script>

<style scoped>
.short{
  width:120px;
  height: 65px;
}
.short span {
    padding-left: 32px;
    font-size: 25px;
    font-weight: bold;
}
</style>