<template>
<v-container>
  <!-- <v-card>
  <v-card-title class="text-h4" >Bid Reduction Worksheet</v-card-title>
  <v-card-text> -->
  <v-card-title> Adjusted Bid Value {{adjustedBidValue}} <v-spacer> </v-spacer> Unadjusted Bid Value {{totalBidValue}} <v-spacer> </v-spacer>  Savings {{totalBVROwnership}} </v-card-title>
  <v-card-title>Ownership</v-card-title>
    <v-card-text>Enter the dollar value of work based on the percentage of Yukon First Nations ownership for the business or subcontracted business(es). This must exclude the amount for Yukon First Nations labour.</v-card-text>
  
    <div 
      v-for="(owner, index) in owners"
      :key="index">
       <fnBVROwnership 
      :ownership.sync='owners[index]'/>
    </div>  
  <v-card-actions> <v-spacer> </v-spacer> Add a line (replace with an icon) </v-card-actions>

  <fnBVRLocation
  v-show="true" />
  <fnBVRLabour
  v-show="true" />
  <!-- </v-card-text>
</v-card> -->
</v-container>
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
    owners: [
      {"businessName":"AAAA", "percentage": "55", "value": "3500", "bvr": "" },
      {"businessName":"BBB", "percentage": "75", "value": "2500", "bvr": "" }
    ],
    locations: [],
    jack: {"businessName":"AAAA", "percentage": "", "value": "", "bvr": "" },
    labour: {"value": 0, "bvr": 0.05 },
    ownerInstance: {},
    locationInstance: {},
    businessName: "aName" 
    // Location formula
    // If outside Whitehorse and on title
    // BVR += 5% 

    //YFNL BVR =+ 5%
  }),
  async created() {
 
  },
  methods: {
    formatDollars(amount) {
      return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    },
    cleanDollars(amount) {
      return Number(amount.replace("$","").replace("%","").replace(",", ""))
    }

  },
  computed: {
    adjustedBidValue: function () {
     
       return this.formatDollars(this.cleanDollars(this.totalBidValue) - this.cleanDollars(this.totalBVROwnership))
    },
    totalBVROwnership: function () {
      const a = this.owners.map(item => Number(item.bvr.replace("$", "")))
                           .reduce((prev, curr) => prev + curr, 0)
      
      return this.formatDollars(a)
    
    },
    totalBidValue: function () {
      const a= this.owners.map(item => Number(item.value))
                          .reduce((prev, curr) => prev + curr, 0)
      return this.formatDollars(a)
    }
  }
};
</script>
