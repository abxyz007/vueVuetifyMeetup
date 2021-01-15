<template>
  <v-container>    
    <v-card 
      class="mx-auto mb-2"
      max-width="1000"
      color="info"
      v-for="meetup in meetups"
      :key="meetup.id"
    >
      <v-list-item 
        class="pa-3 mx-1">
        <v-list-item-avatar
          tile
          size="180">
          <v-img
            :src="meetup.imageUrl">
          </v-img>
        </v-list-item-avatar>
        <v-list-item-content class="d-flex ml-3 mt-5">
          <v-list-item-title>
            <h2 class="white--text">{{ meetup.title }}</h2>
          </v-list-item-title>
          <v-list-item-subtitle><h4>{{ meetup.date | date }}</h4></v-list-item-subtitle>
          <v-card-actions class="mt-5">
            <v-btn
              :to="'/meetups/' + meetup.id"
              text>
                <v-icon
                dark
                left
                >
                mdi-arrow-right
                </v-icon>
                View Meetup
            </v-btn>
          </v-card-actions>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    computed: {
      meetups() {
        return this.$store.getters.loadedMeetups
      }
    }
  }
</script>

<style scoped>
.v-avatar {
    width: 180px!important; 
    height: 120px!important;
}

.v-card__actions {
    margin-left: -15px;
}
</style>