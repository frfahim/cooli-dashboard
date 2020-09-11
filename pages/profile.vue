<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <!-- <v-layout row wrap justify-center> -->
        <v-card>
          <template v-slot:extension>
            <v-tabs
              v-model="tab"
              background-color="deep-purple accent-4"
              dark
              next-icon="mdi-arrow-right-bold-box-outline"
              prev-icon="mdi-arrow-left-bold-box-outline"
              show-arrows
              grow
            >
              <v-tab
                v-for="item in tabItems"
                :key="item.tab"
              >
              {{ item.tab }}
              </v-tab>
            </v-tabs>
          </template>

          <v-tabs-items v-model="tab">
            <v-tab-item
              v-for="item in tabItems"
              :key="item.tab"
            >
            <v-layout row wrap justify-center>
            <v-flex lg6>
              <v-divider class="mt-4"></v-divider>
              <v-card flat>
                <!-- <v-card-text class=""> -->
                  <component :is="item.component" />
                <!-- </v-card-text> -->
              </v-card>
              </v-flex>
            </v-layout>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      <!-- </v-layout> -->
    </v-container>
  </div>
</template>

<script>
  import VWidget from '@/components/VWidget';
  import ProfileForm from '@/components/widgets/form/ProfileForm';
  import OwnerInfoForm from '@/components/widgets/form/OwnerInfoForm';

  export default {
    layout: "dashboard",
    components: {
      VWidget,
      ProfileForm,
      OwnerInfoForm,
    },
    data() {
      return {
        tab: null,
        tabItems: [
          {'tab': 'Owner Information', 'component': 'OwnerInfoForm'},
          {'tab': 'Company Information', 'component': 'ProfileForm'},
          {'tab': 'Pickup & Payment', 'component': 'ProfileForm'},
          {'tab': 'Bank Account', 'component': 'ProfileForm'},
          {'tab': 'Other Account', 'component': 'ProfileForm'},
        ],
      };
    },
    computed: {},
    methods: {}
  };
</script>
