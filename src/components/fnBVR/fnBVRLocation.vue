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
          md=2
          sm=2> 
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
  name: "fnBVRLocation",
  props:{
    location: Object,
    showDelete: Boolean
  },
  data: () => ({
    //location: {"businessName":"", "name": "", "value": "", "bvr": 0.05 },
    bvrLocation: 0.05,
    items: [],
    search: null,
    select: null,
    communities: [
      'Beaver Creek',
      'Burwash Landing',
      'Carcross',
      'Carmacks',
      'Dawson City',
      'Faro',
      'Haines Junction',
      'Keno',
      'Marsh Lake',
      'Mayo',
      'Old Crow',
      'Pelly Crossing',
      'Ross River',
      'Stewart Crossing',
      'Tagish',
      'Teslin',
      'Watson Lake',
      'Whitehorse'
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