<template>
  <div id="pageCard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap justify-center>
      <v-flex lg8>
        <v-card elevation="5">
          <v-toolbar color="teal" dark flat dense cad>
              <v-toolbar-title class="subheading">
                User information
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <!-- <v-toolbar-title class="subheading">
                Edit
              </v-toolbar-title> -->
              <v-btn rounded to="/profile/update">
                Edit
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <template>
                <v-card>
                  <v-card-text>
                  <v-layout row>
                    <v-flex lg6>
                      Name
                    </v-flex>
                    <v-flex lg6>
                      Jhon Doe
                    </v-flex>
                  </v-layout>
                  </v-card-text>
                  <v-card-text>
                    <v-layout row>
                      <v-flex lg6>
                        Name
                      </v-flex>
                      <v-flex lg6>
                        Jhon Doe
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-card-text>
                    <v-layout row>
                      <v-flex lg6>
                        Name
                      </v-flex>
                      <v-flex lg6>
                        Jhon Doe
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </template>
            </v-card-text>
          
        </v-card>
      </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import VWidget from '@/components/VWidget';

  export default {
    layout: 'dashboard',
    components: {
      VWidget
    },
    data() {
      return {
        cardText: 'Hey there, I am a very simple card. I am good at containing small bits of information. I am quite convenient because I require little markup to use effectively.'
      };
    },
    computed: {},
    methods: {}
  };
</script>
<style lang="stylus" scoped>
</style>
