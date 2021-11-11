
<template>
  <v-card class="mt-5">
    <v-card-title>Labour</v-card-title>
    <v-card-text>Enter the dollar value of the work that will be paid to Yukon First Nations employees for labour. This must exclude the amount submitted for ownership and business location. Value-driven procurements must match the amount submitted for labour levels within the proposal.</v-card-text>
    <v-container>
    <v-card-text>
      <v-row>
        <v-spacer> </v-spacer>
        <v-col 
          cols=12 
          md=3 
          sm=3>
          <v-text-field 
            v-model= "labour.value"
            label= "Estimated Labour Value"> 
          </v-text-field>
        </v-col>
        <v-spacer> </v-spacer>
        <v-col 
          cols=12 
          md=3 
          sm=3>
          <v-text-field 
              v-model="bvrPercentage"
              label= "Bid Value Reduction"
              readonly
              solo-inverted>
            </v-text-field>
        
        </v-col>
        <v-col
        cols="1"
        >
        </v-col>
        
      </v-row>
    </v-card-text>
    </v-container>  
  </v-card>

</template>

<script>


export default {
  name: "fnBVRLabour",
  props: {
    labour: Object
  },
  data: () => ({
    bvrLabour: 0.15,
    // labour: {"value": "", "bvr": 0.15 },
  }),
  methods: {
  },
  watch: {
    bvrPercentage: function() {
      this.labour.bvr = this.bvrPercentage
    }
  },
  computed: {
    cleanedValue: function () {
      return Number(this.labour.value.replaceAll(",", ""))
    },
    bvrPercentage: function () {
      if (this.labour.value){
        const calculatedBVR = this.cleanedValue * this.bvrLabour
        return (calculatedBVR).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
      }
      else
        return null
    }

  }
};
</script>
