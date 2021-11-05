
<template>
  <v-card>
    <v-card-title>Labour</v-card-title>
    <v-card-text>Enter the dollar value of the work that will be paid to Yukon First Nations employees for labour. This must exclude the amount submitted for ownership and business location. Value-driven procurements must match the amount submitted for labour levels within the proposal.</v-card-text>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field 
            v-model= "labour.value"
            label= "Estimated Labour Value"> 
          </v-text-field>
        </v-col>
        <v-col
          md="2"
          sm= "4">
          <v-text-field 
            :value= "bvrPercentage"
            label= "Bid Value Reduction (in dollars)"
            > 
          </v-text-field>
        </v-col>
        
      </v-row>
    </v-card-text>  
  </v-card>

</template>

<script>


export default {
  name: "fnBVRLabour",
  data: () => ({
    labour: {"value": "", "bvr": 0.15 },
  }),
  methods: {
  },
  computed: {
    cleanedValue: function () {
      return Number(this.labour.value.replaceAll(",", ""))
    },
    bvrPercentage: function () {
      if (this.labour.value){
        const calculatedBVR = this.cleanedValue * this.labour.bvr
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
