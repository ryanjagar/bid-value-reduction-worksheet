
<template>
  <v-container>
    <v-system-bar
      class="d-print-none d-flex d-sm-none"
      height="1"
      lights-out>   
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="$emit('delete')"
        >
        <v-icon>mdi-close</v-icon>
      </v-btn>
</v-system-bar>
    <v-card-text>
      <v-row class="">
      
        <v-col 
          cols=12 
          md=3 
          sm=3>
          <v-text-field 
            label= "Business Name"
            v-model="ownership.businessName"> 
          </v-text-field>
        </v-col>
        <v-col
          cols=12
          md=2
          sm=2>
          <v-text-field 
            label= "Ownership (in %)"
            v-model="ownership.percentage">
          </v-text-field>
        </v-col>
        <v-col
          cols=12
          md=3
          sm=3>
          <v-text-field 
            label= "Estimated Value"
            v-model="ownership.value">
          </v-text-field>
        </v-col>
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
           
            cols=1>
     
      
     <v-btn
        class="d-none d-sm-flex"
        color="grey"
       
          small
          dark
          icon
          top
          right
        
        @click="$emit('delete')"
        >
        <v-icon>mdi-close</v-icon>
      </v-btn>
     
          </v-col>
      </v-row>
    </v-card-text>
  </v-container>
</template>

<script>
export default {
  name: "fnBVROwnership",
  props:{
    ownership: Object
  },
  data: () => ({
  }),
  mounted (){
    this.ownership.bvr = this.bvrPercentage
  },
  watch: {
    bvrPercentage: function() {
      this.ownership.bvr = this.bvrPercentage
    }
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
  },
  
};
</script>
