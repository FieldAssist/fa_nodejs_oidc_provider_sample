<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <div class="d-flex justify-content-center vertical-center mx-2">
      <b-card
        no-body
        class="pt-4"
        border-variant="light"
        style="box-shadow: 0 5px 20px 0 rgb(21 27 38 / 8%)"
      >
        <b-row no-gutters align-v="center">
          <b-col class="d-none d-lg-block">
            <b-carousel
              id="carousel-1"
              :interval="4000"
              controls
              img-width="500"
              indicators
              style="width: 500px; max-height:400px; min-height:400px;overflow: hidden"
            >
              <b-carousel-slide img-src="@/assets/t1.jpeg"></b-carousel-slide>

              <b-carousel-slide img-src="@/assets/t2.jpeg"></b-carousel-slide>
            </b-carousel>
            <!--            <img-->
            <!--              src="@/assets/t1.jpeg"-->
            <!--              alt="Image"-->
            <!--              class="rounded-0"-->
            <!--              style="width: 500px;"-->
            <!--            />-->
          </b-col>
          <b-col class="px-4">
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
                  required
                ></b-form-input>
                <b-form-input
                  class="mt-2"
                  type="password"
                  name="password"
                  v-model="form.password"
                  placeholder="Password"
                  required
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
    </div>
  </div>
</template>

<script lang="ts">
// import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
export default ({
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
    url1 (): string {
      return '/interaction/' + (this as any).$route.params.uid + '/login'
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
