<template>
  <v-card>
  <v-card-title>Location</v-card-title>
  <v-card-text>Enter the dollar value committted to be performed by Yukon First Nations businesses that have their primary operations located in the Yukon community where the work is taking place. Businesses with their primary operations in Whitehorse are not eligible. This must exclude the amount for Yukon First Nations labour.</v-card-text>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field 
            v-model="location.businessName"
            label= "Business Name"> 
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field 
            v-model="location.name"
            label= "Location"> 
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field 
        v-model="location.value"
        label= "Estimated Value"> 
      </v-text-field>
        </v-col>
        <v-col>
          <v-text-field 
            v-model= "bvrPercentage"
            label= "Bid Value Reduction"> 
          </v-text-field>
        </v-col>
      
        
      </v-row>
    </v-card-text>
  </v-card>

</template>

<script>


export default {
  name: "fnBVRLocation",
  props:{

  },
  data: () => ({
    location: {"businessName":"", "name": "", "value": "", "bvr": 0.05 },
    
  }),
  methods: {
  },
  computed: {
    cleanedValue: function () {
      return Number(this.location.value.replaceAll(",", ""))
    },
    bvrPercentage: function () {
      if (this.location.value){
        const calculatedBVR = this.cleanedValue * this.location.bvr
        return (calculatedBVR).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
        //return (`${this.labour.value * this.labour.bvr}`)
      }
      else
        return null
    }
  }
};
</script>
