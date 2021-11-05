<template>
  <v-card>
  <v-card-title class="text-h4" >Bid Reduction Worksheet</v-card-title>
  <v-card-text>
  
  <fnBVROwnership />
  <fnBVRLocation />
  <fnBVRLabour />
  </v-card-text>
</v-card>

</template>

<script>
// @ is an alias to /src
import fnBVROwnership from "./fnBVR/fnBVROwnership"
import fnBVRLabour from "./fnBVR/fnBVRLabour"
import fnBVRLocation from "./fnBVR/fnBVRLocation.vue"

export default {
  name: "fnBidReductionCalculator",
  components: {
    fnBVRLabour,
    fnBVRLocation,
    fnBVROwnership
  },
  data: () => ({
    // title: `Welcome to ${config.applicationName}`,
    // Ownership formula
    // for the parts of work completed by a FNB: 
    // if owner is >= 50 then BVR = 5%
    // if owner is >= 75 then BVR = 10%
    // if owner is >= 100 then BVR = 15%
    owners: [{"businesName":"", "fnOwnership": "", "value": "", "bvr": "" }],
    locations: [],
    labour: {"value": 0, "bvr": 0.05 },
    ownerInstance: {},
    locationInstance: {} 
    // Location formula
    // If outside Whitehorse and on title
    // BVR += 5% 

    //YFNL BVR =+ 5%
  }),
  async created() {
 
  },
  methods: {
  },
  computed: {

  }
};
</script>
