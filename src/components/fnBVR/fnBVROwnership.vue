
<template>
  <v-container>
    <v-card-text>
      <v-row 
        class="d-print-none d-flex d-sm-none"
        >
        <v-spacer></v-spacer>
        <v-col
        cols=1
        class="my-n5 pa-0"
        v-show="showDelete">
        <v-btn
        icon
        @click="$emit('delete')"
        >
        <v-icon>mdi-close</v-icon>
      </v-btn>
        </v-col>
      </v-row>
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
            cols=1
            v-show="showDelete">
           <v-btn
            class="d-none d-sm-flex"
            color="grey"
            small
            dark
            icon
            top
            right
            @click="$emit('delete')"
            v-show="false"
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
    ownership: Object,
    showDelete: Boolean
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
      if (this.ownership.percentage >= 100){
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
