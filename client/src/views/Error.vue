<template>
  <div class="about vertical-center">
    <div class="d-flex justify-content-center">
      <b-card style="box-shadow: 0 5px 20px 0 rgb(21 27 38 / 8%)" border-variant="light"
              class="p-2"
      >
        <b-row no-gutters align-v="center">
          <b-col>

              <lottie-animation
                path="38463-error.json"
                style="height: 200px"
              />
          </b-col>
          <b-col>
            <b-card-title >
              Oops!
            </b-card-title>
            <p>
              Some error occurred
            </p>
            <b-card-body class="py-4" >
              <h6 class="text-danger" v-if="getParameterByName('error') ">{{ getParameterByName('error') }}</h6>
              <h6 class="text-danger" v-if="getParameterByName('message') ">{{ getParameterByName('message') }}</h6>
            </b-card-body>
            <p>
              Need help?<br/><a href="#"><u>Contact Support</u></a>
            </p>
          </b-col>
        </b-row>
      </b-card>
    </div>

  </div>
</template>
<style>
.vertical-center {
  min-height: 80%; /* Fallback for browsers do NOT support vh unit */
  min-height: 80vh; /* These two lines are counted as one :-)       */

  display: inline-flex;
  align-items: center;
}
</style>
<script>
import LottieAnimation from 'lottie-vuejs/src/LottieAnimation.vue' // import lottie-vuejs

export default {
  name: 'Error.vue',
  components: {
    LottieAnimation
  },
  methods: {
    getParameterByName (name) {
      const match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash)
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
    }
  }
}
</script>
