<template>
  <div id="social">
    <v-container grid-list-xl fluid>
      <v-layout row wrap justify-center>
        <v-flex lg10>
          <v-card>
            <v-toolbar card dense color="indigo lighten-2">
              <v-spacer></v-spacer>
              <v-toolbar-title>
                PRICE CHART
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider style="margin-top:50px;"></v-divider>
            <v-card-text class="pa-0">
              <template>
                <v-data-table
                  hide-actions
                  :headers="headers"
                  :items="tableDatas"
                  class="elevation-1 table-striped"
                >
                  <template  slot="items" slot-scope="props">
                    <td>{{ props.item.package }}</td>
                    <td class="text-xs-left">{{ props.item.time_preiod }}</td>
                    <td class="text-xs-left">{{ props.item.charges }}</td>
                    <td class="text-xs-left">{{ props.item.extras }}</td>
                    <td class="text-xs-left">{{ props.item.cut_of_time }}</td>
                  </template>
                </v-data-table>
              </template>
              <v-divider></v-divider>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

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

    </v-container>
  </div>
</template>

<script>
import { pricesChartHeader, pricesChartData } from "@/api/prices";

export default {
  layout: "dashboard",
  middleware: ["auth"],
  components: {},
  data: () => ({
      headers: pricesChartHeader,
      tableDatas: pricesChartData,
  }),
};
</script>
