<template>
  <v-container>
    <v-row class="d-flex justify-center mt-1">
      <v-col xs="12" sm="6" md="3" lg="3">
        <v-btn
          router
          to="/meetups"
          class="pa-5"
          color="info"
        >
          Explore Meetups
        </v-btn>
      </v-col>
      <v-col xs="12" sm="6" md="3" lg="3">
        <v-btn
          router
          to="/meetup/new"          
          class="pa-5"
          color="info"
        >
          Organize a Meetup
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-progress-circular
        indeterminate
        color="primary"
        v-if="loading"
      ></v-progress-circular>
    </v-row>
    <v-carousel class="mt-4">
      <v-carousel-item style="cursor: pointer;"
        v-for="meetup in meetups"
        :src="meetup.imageUrl" 
        :key="meetup.id"
        @click="onLoadMeetup(meetup.id)"
        >
          <div class="d-flex justify-center">
            <div class="title">
              {{ meetup.title }}
            </div>
          </div>
      </v-carousel-item>
    </v-carousel>
    <v-row class="mt-5" justify="center">
      <span>Join our Awesome Meetups!</span>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    computed: {
      meetups() {
        return this.$store.getters.featuredMeetups
      },
      loading() {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadMeetup(id) {
        this.$router.push('/meetups/' + id)
      }
    }
  }
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background: #00000042;
  background-attachment: rgba(0,0,0,0.5);
  color: white;
  font-size: 2em;
  padding: 15px; 
}

.v-progress-circular {
  margin: 1rem;
}
</style>