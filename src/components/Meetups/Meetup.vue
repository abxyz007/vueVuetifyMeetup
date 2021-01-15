<template>
  <v-container>
    <v-card
      class="mx-auto mt-5"
      max-width="1000">
      <v-card-subtitle>
        <h3 class="red--text">{{ meetup.title }}</h3>
      </v-card-subtitle>
      <template v-if="userIsCreator">
        <v-spacer></v-spacer>
      </template>
      <v-img
        class="white--text align-end"
        height="200px"
        :src="meetup.imageUrl"
      >
      </v-img>
      <v-card-text class="text--primary">
        <span class="info--text lighten-5">{{ meetup.date | date }} - {{ meetup.location }}</span>
        <p>{{ meetup.description }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
        >
          Register
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      meetup() {
        return this.$store.getters.loadedMeetup(this.id)
      }
    },
    userIsAuthenticated() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator() {
      if(!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.meetup.userIsCreator
    }
  }
</script>
