import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import * as firebase from 'firebase'

import router from './router'
import { store } from './store'
import Datefilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'

Vue.config.productionTip = false
Vue.filter('date', Datefilter)
Vue.component('app-alert', AlertCmp)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyDOCAbC123dEf456GhI789jKl01-MnO",
      authDomain: "myapp-project-123.firebaseapp.com",
      databaseURL: "https://myapp-project-123.firebaseio.com",
      projectId: "myapp-project-123",
      storageBucket: "",
    })
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadedMeetups')
  }
}).$mount('#app')
