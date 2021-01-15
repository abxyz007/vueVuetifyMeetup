<template>
  <v-app>
    <v-navigation-drawer temporarly v-model="sideNav" app>
      <v-list 
        class="mx-auto"
        max-width="300"
        dense>
        <v-list-item-group
          color="primary">
          <v-list-item 
            v-for="item in menuItems" 
            :key="item.title"
            router
            :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="userIsAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar 
      color="primary"
      dark
      app>
      <v-app-bar-nav-icon 
        @click.native.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer;">Dev Meetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-items 
        class="hidden-xs-only"
        v-for="item in menuItems" 
        :key="item.title">
          <v-btn
            color="primary"
            depressed
            router 
            :to="item.link"
          >
            <v-icon left>
              {{ item.icon }}
            </v-icon>
            {{ item.title }}
          </v-btn>
      </v-app-bar-items>
      <v-app-bar-items>
        <v-btn
          v-if="userIsAuthenticated"
          color="primary"
          depressed>
          <v-icon left>
            mdi-logout
          </v-icon>
          Logout
        </v-btn>
      </v-app-bar-items>      
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app>

    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        sideNav: false,
      }
    },
    computed: {
      menuItems() {
        let menuItems = [
        { title: 'Sign Up', icon: 'mdi-face', link: '/signup'},
        { title: 'Sign In', icon: 'mdi-lock-open-outline', link: '/signin'}
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
            { title: 'View Meetups', icon: 'mdi-account-supervisor', link: '/meetups'},
            { title: 'Organize Meetup', icon: 'mdi-map-marker', link: '/meetup/new'},
            { title: 'Profile', icon: 'mdi-account', link: '/profile'},
          ]
        }
          return menuItems
      },
      userIsAuthenticated() {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
