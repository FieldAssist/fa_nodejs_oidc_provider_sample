<template>
  <div class="about vertical-center">
    <div class="d-flex justify-content-center">
      <b-card style="box-shadow: 0 5px 20px 0 rgb(21 27 38 / 8%)" border-variant="light"
              class="p-2"
      >
        <b-card-title>
          Check your Inbox
        </b-card-title>
        <p>
          We have send you instructions on how to<br/>reset your password on your mail
        </p>
        <b-card-body class="py-2">
          <h5 class="text-primary" v-if="getParameterByName('email') ">{{ getParameterByName('email') }}</h5>
        </b-card-body>
        <p class="p-0 m-0 mt-2 mb-4 text-danger">*Please check spam folder in case you dont find email</p>
        <p class="p-0 m-0 mt-4">Didn't get email?</p>
        <a href="#"><u>Contact Support</u></a>
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

export default {
  name: 'PasswordChangeSuccess.vue',
  data: () => {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  components: {},
  methods: {
    getParameterByName (name) {
      const match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash)
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
    }
  }
}
</script>
