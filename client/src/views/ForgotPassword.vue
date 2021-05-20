<template>
  <div class="about vertical-center">
    <div class="d-flex justify-content-center">
      <b-card style="box-shadow: 0 5px 20px 0 rgb(21 27 38 / 8%)" border-variant="light"
              class="p-2"
      >
        <b-card-title>
          Forgot your Password?
        </b-card-title>
        <h6>
          Please enter your email below.
        </h6>
        <p>
          We will send you instructions on how to reset your password
        </p>
        <b-card-body class="py-2">
          <h6 class="text-danger" v-if="getParameterByName('error') ">{{ getParameterByName('error') }}</h6>
          <h6 class="text-danger" v-if="getParameterByName('message') ">{{ getParameterByName('message') }}</h6>
        </b-card-body>

        <b-form action="/api/forgot-password" method="POST" role="form">
          <b-form-input
            class="mt-0"
            type="email"
            name="email"
            v-model="form.email"
            placeholder="Email"
            required
          ></b-form-input>
          <b-button class="mt-4" type="submit" variant="primary"
          >Submit
          </b-button
          >
        </b-form>
        <p class="p-0 m-0 mt-4">Trouble in Resetting Password?</p>
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
  name: 'Error.vue',
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
