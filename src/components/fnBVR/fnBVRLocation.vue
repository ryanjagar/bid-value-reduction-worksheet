<template>
  <v-container>
  
    <v-card-text>
      <v-row>
        <v-col 
          cols=12 
          md=3
          sm=3> 
          <v-text-field 
            v-model="location.businessName"
            label= "Business Name"> 
          </v-text-field>
        </v-col>
        <v-col 
          cols=12 
          md=3
          sm=3> 
          <v-text-field 
            v-model="location.community"
            label= "Location"> 
          </v-text-field>
        </v-col>
        <v-col 
          cols=12 
          md=3
          sm=3> 
          <v-text-field 
        v-model="location.value"
        label= "Estimated Value"> 
      </v-text-field>
        </v-col>
        <v-col 
          cols=12 
          md=3
          sm=3> 
          <v-text-field 
            v-model= "bvrPercentage"
            label= "Bid Value Reduction"
            readonly
            solo-inverted>> 
          </v-text-field>
        </v-col>
      
        
      </v-row>
    </v-card-text>
  </v-container>

</template>

<script>


export default {
  name: "fnBVRLocation",
  props:{
    location: Object
  },
  data: () => ({
    //location: {"businessName":"", "name": "", "value": "", "bvr": 0.05 },
    
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
