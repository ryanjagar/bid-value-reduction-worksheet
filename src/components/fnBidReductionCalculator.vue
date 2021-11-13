<template>
<v-container>
  <!-- <v-card>
  <v-card-title class="text-h4" >Bid Reduction Worksheet</v-card-title>
  <v-card-text> -->

  <v-card-title> Adjusted Bid Value {{adjustedBidValue}} <v-spacer> </v-spacer> Unadjusted Bid Value {{totalBidValue}} <v-spacer> </v-spacer>  Savings {{totalBidValueReduction}} </v-card-title>
  <v-card>
  <v-card-title>Ownership</v-card-title>
    <v-card-text>Enter the dollar value of work based on the percentage of Yukon First Nations ownership for the business or subcontracted business(es). This must exclude the amount for Yukon First Nations labour.</v-card-text>
    <div 
      v-for="(owner, index) in owners"
      :key="index"
      class="my-n3 ">
       <fnBVROwnership 
      :ownership.sync='owners[index]'
      :showDelete='isMultiple(owners)'
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
    class="my-n3"
    v-for="(location, index) in locations"
    :key="index">
      <fnBVRLocation
    :location.sync='locations[index]'
    :showDelete='isMultiple(locations)'
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
  :labour.sync='labour' />
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
    labour: {"value": "", "bvr": "" },
    // Location formula
    // If outside Whitehorse and on title
    // BVR += 5% 

    //YFNL BVR =+ 5%
  }),
  async created() {
 
  },
  methods: {
    isMultiple: function (array) {
      console.log(array.length)
      if (array.length > 1){
        return true;
      }
      return false
    },
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
      if (amount){
        return Number(amount.replaceAll("$","").replaceAll(",", ""))
      }
      return 0
    }

  },
  computed: {
    adjustedBidValue: function () {
     
       return this.formatDollars(this.cleanDollars(this.totalBidValue) - this.cleanDollars(this.totalBidValueReduction))
    },
    totalBVROwnership: function () {
      if (this.owners[0].bvr) {
      const a = this.owners.map(item => this.cleanDollars(item.bvr))
                           .reduce((prev, curr) => prev + curr, 0)
      
        return this.formatDollars(a)
      }
      return this.formatDollars(0)
    
    },
    totalBVRLocation: function () {
      if (this.locations[0].bvr) {
      const a = this.locations.map(item => this.cleanDollars(item.bvr))
                           .reduce((prev, curr) => prev + curr, 0)
      
        return this.formatDollars(a)
      }
      return this.formatDollars(0)
    
    },
    totalBidValueReduction: function (){
      var bvrLabour = 0
      if (this.labour.bvr){
        bvrLabour = this.cleanDollars(this.labour.bvr)
      }
      return this.formatDollars(
        this.cleanDollars(this.totalBVROwnership) + 
        this.cleanDollars(this.totalBVRLocation) + 
        bvrLabour
      )
    },

    totalBidValue: function () {
      const a= this.owners.map(item => this.cleanDollars(item.value))
                          .reduce((prev, curr) => prev + curr, 0)
      const b = this.locations.map(item => this.cleanDollars(item.value))
                          .reduce((prev, curr) => prev + curr, 0)
      var c = 0
      if (this.labour.value) {
        c = this.cleanDollars(this.labour.value)
      }
      return this.formatDollars(a+b+c)
    }
  }
};
</script>
