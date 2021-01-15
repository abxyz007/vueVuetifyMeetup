<template>
  <v-container>
    <v-row v-if="error">
      <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
    </v-row>
    <form @submit.prevent="onSignup">
        <v-text-field
          name="email"
          label="Mail*"
          id="email"
          v-model="email"
          type="email" 
          required></v-text-field>
        <v-text-field
          name="password"
          label="Password*"
          id="password"
          v-model="name"
          type="password"
          required></v-text-field>
        <v-text-field
          name="confirmpassword"
          label="Confirm Password"
          id="confirmpassword"
          v-model="confirmPassword"
          type="password"
          :rules="[comparePasswords]"></v-text-field>
        <v-btn
          type="submit"
          class="ma-2"
          :disabled="loading4"
          :loading="loading4"
          color="info"
          @click="loader = 'loading4'"
        >
          Sign up
            <span slot="loader" class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
        </v-btn>
    </form>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',

        loader: null,
        loading4: false,
      }
    },
    computed: {
      comparePasswords() {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      },
      user() {
        return this.$store.getters.user
      },
      error() {
        return this.$store.getters.error
      },
      loading() {
        return this.$store.getters.loading
      }
    },
    watch: {
      user(value) {
        if(value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignup() {
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      },
      onDismissed() {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
