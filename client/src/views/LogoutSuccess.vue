<template>
  <div class="about vertical-center">
    <div class="d-flex justify-content-center">
      <b-card style="box-shadow: 0 5px 20px 0 rgb(21 27 38 / 8%)" border-variant="light"
              class="p-2"
      >
        <b-card-title>
          Logout Successful
        </b-card-title>
        <p>
          You have been successfully logged out.
        </p>
        <b-card-body class="py-2">
          <b-button class="my-3" to="/" type="submit" variant="primary"
          >Login Again
          </b-button>
        </b-card-body>

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
  name: 'LogoutSuccess.vue',
  data: () => {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  components: {}
}
</script>
