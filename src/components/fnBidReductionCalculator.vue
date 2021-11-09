<template>
<v-container>
  <!-- <v-card>
  <v-card-title class="text-h4" >Bid Reduction Worksheet</v-card-title>
  <v-card-text> -->

  <v-card-title> Adjusted Bid Value {{adjustedBidValue}} <v-spacer> </v-spacer> Unadjusted Bid Value {{totalBidValue}} <v-spacer> </v-spacer>  Savings {{totalBVROwnership}} </v-card-title>
  <v-card>
  <v-card-title>Ownership</v-card-title>
    <v-card-text>Enter the dollar value of work based on the percentage of Yukon First Nations ownership for the business or subcontracted business(es). This must exclude the amount for Yukon First Nations labour.</v-card-text>
    <div 
      v-for="(owner, index) in owners"
      :key="index">
       <fnBVROwnership 
      :ownership.sync='owners[index]'
      @delete="removeElement(owners, index)"/>
    </div>  
    <v-card-actions> <v-spacer> </v-spacer> 
      <v-fab-transition>
        <v-btn
          class="d-print-none"
          color="#0097a9"
          dark
          absolute
          bottom
          right
          fab
          @click="addOwnership()"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-actions>
  </v-card>
  <v-card class="mt-5">
  <v-card-title>Location</v-card-title>
  <v-card-text>Enter the dollar value committted to be performed by Yukon First Nations businesses that have their primary operations located in the Yukon community where the work is taking place. Businesses with their primary operations in Whitehorse are not eligible. This must exclude the amount for Yukon First Nations labour.</v-card-text>

  <div 
    v-for="(location, index) in locations"
    :key="index">
      <fnBVRLocation
    :location.sync='locations[index]'
    @delete="removeElement(locations, index)"/>
  </div>  
    <v-card-actions> <v-spacer> </v-spacer> 
      <v-fab-transition>
        <v-btn
          class="d-print-none"
          color="#0097a9"
          dark
          absolute
          bottom
          right
          fab
          @click="addLocation()"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-actions>
 
  </v-card>
  
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
      {"businessName":"", "percentage": "", "value": "", "bvr": "" },
    ],
    locations: [
      {"businessName":"", "community": "", "value": "", "bvr": ""},
      ],
    labour: {"value": 0, "bvr": 0.05 },
    ownerInstance: {},
    locationInstance: {},
    // Location formula
    // If outside Whitehorse and on title
    // BVR += 5% 

    //YFNL BVR =+ 5%
  }),
  async created() {
 
  },
  methods: {
    removeElement: function (array, elem) {
    if (array.length > 1) {
        array.splice(elem, 1);
    }
},
    addOwnership: function () {
      this.owners.push({"businessName":"", "percentage": "", "value": "", "bvr": "" })
    
    },
    addLocation: function () {
      this.locations.push({"businessName":"", "community": "", "value": "", "bvr": ""})
    },
    formatDollars(amount) {
      return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    },
    cleanDollars(amount) {
      return Number(amount.replaceAll("$","").replaceAll(",", ""))
    }

  },
  computed: {
    adjustedBidValue: function () {
     
       return this.formatDollars(this.cleanDollars(this.totalBidValue) - this.cleanDollars(this.totalBVROwnership))
    },
    totalBVROwnership: function () {
      if (this.owners[0].bvr) {
      const a = this.owners.map(item => Number(item.bvr.replaceAll("$", "")))
                           .reduce((prev, curr) => prev + curr, 0)
      
      return this.formatDollars(a)
      }
      return this.formatDollars(0)
    
    },
    totalBidValue: function () {
      const a= this.owners.map(item => Number(item.value))
                          .reduce((prev, curr) => prev + curr, 0)
      return this.formatDollars(a)
    }
  }
};
</script>
