<template>
  <div id="social">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex>
            <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>Order</h4></v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>       -->
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-actions
          class="elevation-0 table-striped"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.product }}</td>
            <td class="text-xs-left">{{ props.item.price }}</td>
            <td class="text-xs-left">Jhon Doe</td>
            <td class="text-xs-left">01712000000</td>
            <td class="text-xs-left"><v-chip label small :color="getColorByStatus(props.item.status)" text-color="white" >{{ props.item.status }}</v-chip></td>
            <td class="text-xs-right">
              <v-btn flat icon color="grey">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn flat icon color="grey">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </template>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import items from '@/api/order';

  export default {
    layout: "dashboard",
    components: {
    },
    data() {
      return {
        headers: [
            {
                text: 'Order No',
                align: 'left',
                sortable: false,
                value: 'id'
            },
            { text: 'Invoice No', value: 'invoice' },
            { text: 'Amount', value: 'amount' },
            { text: 'Recipient Name', value: 'recipient_name' },
            { text: 'Phone', value: 'phone' },
            { text: 'Status', value: 'status' },
            { text: 'Action', value: 'action', align: 'right' },

        ],
        items: items,
        colors: {
            processing: 'blue',
            sent: 'red',
            delivered: 'green'
        }
      };
    },
    methods: {
      handleClick: (e) => {
        console.log(e);
      },
      getColorByStatus (status) {
        return this.colors[status];
      },
    },

  };
</script>
