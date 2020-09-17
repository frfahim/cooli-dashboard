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
          :items="orderList"
          hide-actions
          class="elevation-0 table-striped"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.reference }}</td>
            <td class="text-xs-left">{{ props.item.receiver_name }}</td>
            <td class="text-xs-left">{{ props.item.receiver_phone }}</td>
            <td class="text-xs-left">{{ props.item.cash_amount }}</td>
            <td class="text-xs-left">{{ props.item.total_amount }}</td>
            <td class="text-xs-left">
              <v-chip label small :color="getColorByStatus(props.item.status)" text-color="white" >
                {{ props.item.status }}
              </v-chip>
            </td>
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
    middleware: ['auth'],
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
            { text: 'Receiver Name', value: 'receiver_name' },
            { text: 'Receiver Phone', value: 'receiver_phone' },
            { text: 'Cash Amount', value: 'cash_amount' },
            { text: 'Total Amount', value: 'total_amount' },
            { text: 'Status', value: 'status' },
            { text: 'Action', value: 'action', align: 'right' },

        ],
        orderList: [],
        colors: {
            processing: 'blue',
            sent: 'red',
            delivered: 'green'
        }
      };
    },

    mounted () {
      this.getOrderList()
    },
    methods: {
      handleClick: (e) => {
        console.log(e);
      },
      getColorByStatus (status) {
        return this.colors[status];
      },
      getOrderList () {
        this.$store.commit('setLoading')
        this.$store.dispatch('orders/fetchOrderList')
        .then( res => {
          this.orderList = res.results
          this.$store.commit('removeLoading')
        })
        .catch(err => {
          this.orderList = []
          this.$store.dispatch('setNotificaation', {type: 'error', msg: 'Some thing wrong'});
          this.$store.commit('removeLoading')
        })
      }
    },

  };
</script>
