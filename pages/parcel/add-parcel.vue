<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <v-layout row wrap justify-center>
        <v-flex lg8>
          <v-card>

            <v-toolbar color="teal" dark flat dense cad>
                <v-toolbar-title class="subheading">Add Parcel</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-divider></v-divider>

              <v-card-text class="">
                <!-- <merchant-order-form></merchant-order-form> -->
                <order-form></order-form>
              </v-card-text>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import VWidget from '@/components/VWidget';
  import MerchantOrderForm from '@/components/widgets/form/MerchantOrderForm';
  import OrderForm from '@/components/widgets/form/OrderForm';

  export default {
    layout: "dashboard",
    components: {
      VWidget,
      MerchantOrderForm,
      OrderForm,
    },
    data() {
      return {
      };
    },
    computed: {},
    methods: {}
  };
</script>
