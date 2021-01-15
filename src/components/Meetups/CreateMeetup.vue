<template> 
  <v-container class="d-flex justify-center">
    <form @submit.prevent="onCreateMeetup" class="crete">
        <div>
        <h2 class="text-center">Create a new meetup</h2>
        <v-text-field
            name="title"
            label="Title*"
            id="title"
            v-model="title"
            required></v-text-field>
        <v-text-field
            name="location" 
            label="Location*"
            id="location"
            v-model="location"
            required></v-text-field>
        <!-- <v-file-input
            accept="image/*"
            label="File input"
            name="image"
            v-model="imageUrl"
            required></v-file-input> -->
        <div>
            <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
            <input 
                type="file"
                style="display: none;"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked">
        </div>
        <v-img :src="imageUrl" height="150"></v-img>
        <v-textarea
            name="description"
            label="Description*"
            id="description"
            v-model="description"
            required></v-textarea>
        </div>
        <div> 
            <div>
                <h2 class="text-center mb-5">Choose a Date and Time</h2>
            </div>
            <v-row class="mb-5" justify="space-around" align="center">
                <v-date-picker
                    v-model="date"
                    flat></v-date-picker>
            </v-row>
            <v-row justify="center">
                <v-time-picker 
                    v-model="time"
                    format="24hr"></v-time-picker>
            </v-row>
            <v-row justify="center">
                <v-btn 
                    color="primary"
                    class="mt-3"
                    :disabled="!formIsValid"
                    type="submit">Create Meetup</v-btn>
            </v-row>
        </div>
    </form>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        location: '',
        imageUrl: '',
        description: '',
        date: new Date(),
        time: new Date(),
        image: null,

        picker: null,
        e7: null,
      }
    },
    computed: {
        formIsValid() {
            return this.title !== '' &&
            this.location !== '' &&
            this.imageUrl !== '' &&
            this.description !== ''
        },
        submittableDateTime() {
            const date = new Date(this.date)
            if(typeof this.time === 'string') {
                let hours = this.time.match(/^(\d+)/)[1]
                const minutes = this.time.match(/:(\d+)/)[1]
                date.setHours(hours)
                date.setMinutes(minutes)
            } else {
                date.setHours(this.time.getHours())
                date.setMinutes(this.time.getMinutes())
            }
                return date
        }
    },
    methods: {
        onCreateMeetup() {
            if(!this.formIsValid) {
                return
            }
            if(!this.image) {
                return
            }
            const meetupData = {
                title: this.title,
                location: this.location,
                image: this.image,
                description: this.description,
                date: this.submittableDateTime
            }
            this.$store.dispatch('createMeetup', meetupData)
            this.$router.push('/meetups')
        },
        onPickFile() {
            this.$refs.fileInput.click();
        },
        onFilePicked(event) {
            const files = event.target.files
            let filename = files[0].filename
            if(filename.lastIndexOf('.') <= 0) {
                return alert('Please add a valid file!')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0];
        }
    }
  }
</script>

<style scoped>
.crete {
    width: 300px;
}
</style>