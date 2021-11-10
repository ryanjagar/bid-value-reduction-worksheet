<template>
  <v-app>

    <v-app-bar
      app
      color="#fff"
      flat
      height="70"
      style="left: 0; border-bottom: 3px #f3b228 solid"
    >
      <!-- <v-icon color="#f3b228" class="mr-5">{{ applicationIcon }}</v-icon> -->
      <!-- <img src="./yukon.svg" style="margin: -8px 155px 0 0" height="44" /> -->
      <v-img :src="require('./assets/logo.svg')" style="margin: -8px 155px 0 0" height="44" />
      <v-toolbar-title>
        <span style="font-weight: 700">{{ applicationName }}</span>

       
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
    </v-app-bar>

    <v-main v-bind:style="{ 'padding-left: 33px !important': !hasSidebar }">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-row>
          <v-col>
            <fnBidReductionCalculator />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import fnBidReductionCalculator from "./components/fnBidReductionCalculator.vue"
import * as config from "./config";

// import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    fnBidReductionCalculator
  },
  computed: {
  
  },
  data: () => ({
    // dialog: false,
    // drawer: null,
    // drawerRight: null,
    // headerShow: false,
    // menuShow: false,
    // loadingClass: "d-none",
    applicationName: config.applicationName,
    applicationIcon: config.applicationIcon,
    // sections: config.sections,
    // hasSidebar: false, //config.hasSidebar,
    // hasSidebarClosable: config.hasSidebarClosable
  }),
  created: async function() {
   
  },
  watch: {
   
  },
  methods: {
    
  }
};
</script>
