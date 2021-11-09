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
          <v-autocomplete
            v-model="location.community"
            hide-no-data
            :items="items"
            :search-input.sync="search"
            clearable
            label="Location"
          ></v-autocomplete>
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
    bvrLocation: 0.05,
    items: [],
    search: null,
    select: null,
    communities: [
      "Beaver Creek",
      "Carmacks",
      "Dawson",
      "Destruction Bay",
      "Faro",
      "Haines Junction",
      "Mayo",
      "Old Crow",
      "Pelly Crossing",
      "Ross River",
      "Stewart Crossing",
      "Teslin",
      "Watson Lake",
      "Whitehorse"
    ]
  }),
  methods: {
    querySelections (v) {
        console.log('Querying...')
          this.items = this.communities.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
      },
  },
  watch: {
    bvrPercentage: function() {
      this.location.bvr = this.bvrPercentage
    },
    search (val) {
        val && val !== this.select && this.querySelections(val)
      },
  },
  computed: {
    cleanedValue: function () {
      return Number(this.location.value.replaceAll(",", ""))
    },
    bvrPercentage: function () {
      if (this.location.value){
        const calculatedBVR = this.cleanedValue * this.bvrLocation
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