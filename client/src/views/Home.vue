<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <div class="vertical-center">
      <b-row align-h="center">
        <b-col col lg="7" md="12">
          <b-card
            no-body
            class="pt-4"
            border-variant="light"
            style="box-shadow: 0 5px 20px 0 rgb(21 27 38 / 8%)"
          >
            <b-row no-gutters align-v="center">
              <b-col lg="7" class="d-none d-lg-block">
                <b-card-img
                  src="https://pbs.twimg.com/media/Ej2_bd_VkAA9wq6.jpg"
                  alt="Image"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col md="12" lg="5" class="px-4">
                <b-card-title> Login to your Account</b-card-title>
                <b-card-text> Please enter your credentials</b-card-text>
                <!--        <b-card-text>-->
                <!--          Some quick example text to build on the card title and make up the bulk of the card's content.-->
                <!--        </b-card-text>-->
                <b-card-body>
                  <b-form :action="url1" method="POST" role="form">
                    <b-form-input
                      class="mt-0"
                      type="email"
                      name="email"
                      v-model="form.email"
                      placeholder="Email"
                    ></b-form-input>
                    <b-form-input
                      class="mt-2"
                      type="password"
                      name="password"
                      v-model="form.password"
                      placeholder="Password"
                    ></b-form-input>
                    <b-button class="mt-4" type="submit" variant="primary"
                    >Submit
                    </b-button
                    >
                    <div class="mt-4 mb-4">
                      <a href="#"><u>Forgot Password</u></a>
                    </div>

                    <p class="p-0 m-0">Not able to login?</p>
                    <a href="#"><u>Contact Support</u></a>
                  </b-form>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

export default Vue.extend({
  name: 'Home',
  data: () => {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {},
  computed: {
    url1 () {
      return '/interaction/' + this.$route.params.uid + '/login'
    }
  },
  components: {}
})
</script>

<style>
.vertical-center {
  min-height: 80%; /* Fallback for browsers do NOT support vh unit */
  min-height: 80vh; /* These two lines are counted as one :-)       */

  display: inline-flex;
  align-items: center;
}
</style>
