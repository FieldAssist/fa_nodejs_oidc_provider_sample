<template>
  <div class="vertical-center">
    <div class="p-4">
      <div class="spinner-border text-primary mb-2" style="width: 2.5rem; height: 2.5rem;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="mt-4"></div>
      <div class="mt-4">
        <h5><em>“Establishing trust is better than any sales technique.”</em></h5>
      </div>
      <div class="mt-3">
        <p>– Mike Puglia</p>
      </div>
    </div>

  </div>
</template>

<script>
// import { generators, Issuer } from 'openid-client'

// const nonce = generators.nonce()
// import axios from 'axios'

export default {
  name: 'Root.vue',
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted () {
    console.log('gsdgss')
    // axios
    //   .get('/api/url')
    //   .then((res) => {
    //     console.log(res.data)
    //     window.location.href = res.data
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //   })
    const url = `/oidc/auth?client_id=foo&scope=openid email profile&response_type=id_token&redirect_uri=${window.location.origin}/about&nonce=DQLVEKPS-ab25Q7AxTXnw36T_-J4Pln_tUgxPAhC2Ys`
    window.location.href = url
    // http://localhost:3000/oidc/auth?
    // client_id=foo&
    // scope=openid%20email%20profile&
    // response_type=id_token&
    // redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fabout&
    // nonce=DQLVEKPS-ab25Q7AxTXnw36T_-J4Pln_tUgxPAhC2Ys

    // http://localhost:3000/oidc/auth?client_id=foo&scope=openid%20email%20profile&response_type=id_token&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fabout&nonce=5I9gz2v-oZtaRdMNx_ngqzynOazKWVT8eJ3jN-6kcS0
  }
}
</script>

<style scoped>
.vertical-center {
  min-height: 80%; /* Fallback for browsers do NOT support vh unit */
  min-height: 80vh; /* These two lines are counted as one :-)       */

  display: inline-flex;
  align-items: center;
}
</style>
