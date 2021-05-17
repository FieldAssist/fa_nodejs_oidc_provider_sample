<template>
  <div class="about vertical-center">
    <div class="d-flex justify-content-center">
      <b-card style="box-shadow: 0 5px 20px 0 rgb(21 27 38 / 8%)" border-variant="light"
      >
        <b-card-title>
          Choose a domain
        </b-card-title>
        <p>
          You are currently registered with 2 domains
        </p>
        <b-card-body>
          <b-row no-gutters>
            <b-col cols="12" col sm="6" class="my-2">
              <b-btn variant="primary" href="https://debug.fieldassist.in/">debug.fieldassist.io</b-btn>
            </b-col>
            <b-col cols="12" col sm="6" class="my-2">

              <b-btn variant="info" href="https://debug.workozy.com/">debug.workozy.com</b-btn>

            </b-col>
            <b-col cols="12" col sm="6" class="my-2">

              <b-btn variant="danger" href="https://debug.workozy.com/">debug.workozy.com</b-btn>
            </b-col>
          </b-row>
        </b-card-body>
        <p>
          Not able to see your domain?<br/><a href="#"><u>Contact Support</u></a>
        </p>
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
