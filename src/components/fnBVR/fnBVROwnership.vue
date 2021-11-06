
<template>
  <v-card>
    <v-card-title>Ownership</v-card-title>
    <v-card-text>Enter the dollar value of work based on the percentage of Yukon First Nations ownership for the business or subcontracted business(es). This must exclude the amount for Yukon First Nations labour.</v-card-text>
     <v-card-text>
       <br /> 
      <v-row>
        <v-col>
          <v-text-field 
            label= "Business Name"
            v-model="ownership.businessName"> 
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field 
            label= "First Nation Ownership (in %)"
            v-model="ownership.percentage">
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field 
            label= "Estimated Value"
            v-model="ownership.value">
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field 
            v-model="bvrPercentage"
            label= "Bid Value Reduction">
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "fnBVROwnership",
  props:{
    ownership: 
    {
      type: Object,
      default () {
        return {
          businessName: "Default",
          percentage: ""
        }
      }
    }
      
  },
  data: () => ({
    
  }),
  methods: {
    
  },
  watch: {
    bvrPercentage: function() {
      console.log('waa')
      this.ownership.bvr = this.bvrPercentage
    }
  },
  created () {
  
  },
  computed: {
    
    cleanedValue: function () {
      return Number(this.ownership.value.replaceAll(",", ""))
    },
    bvrPercentage: function () {
      if (this.ownership.value){
        const calculatedBVR = this.cleanedValue * this.ownershipBVR
        return (calculatedBVR).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
      }
      else
        return null
    },
    ownershipBVR: function (){
      if (this.ownership.percentage == 100){
        return 0.15
      }
      else if (this.ownership.percentage >= 75){
        return 0.10
      }
      else if (this.ownership.percentage >=50){
        return 0.05
      }
      else 
        return 0
      }  
  }
};
</script>
