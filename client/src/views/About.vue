<template>
  <div class="about my-1 pt-2 pb-4" style="max-height: 84%; overflow: scroll">
    <div class="d-flex justify-content-center vertical-center mx-2">
      <b-card style="box-shadow: 0 5px 20px 0 rgb(21 27 38 / 8%)" border-variant="light"

      >
        <b-card-title>
          Choose a domain
        </b-card-title>
        <p class="p-0 m-0 px-2">
          You are currently registered with {{ urls.length }} domains
        </p>
        <b-card-body>
          <ul class="list-group text-left"
          >
            <a href="#" class="h6 list-group-item  list-group-item-action borderless mb-0 py-3" v-for="url in urls"
               :key="url">{{
                url
              }}</a>
          </ul>
        </b-card-body>
        <p class="mt-2">
          Not able to see your domain?<br/><a href="#"><u>Contact Support</u></a>
        </p>
      </b-card>
    </div>

  </div>
</template>
<script lang="ts">

export default {
  data: () => {
    return {
      urls: ['dms.fieldassist.com', 'dms.fieldassist.com', 'dms.fieldassist.com', 'debug.flo.com', 'manage.flo.com', 'debug.fieldassist.io', 'manage.fielassist.io', 'sample url 5']
    }
  }
}
</script>
<style>
.vertical-center {
  min-height: 80%; /* Fallback for browsers do NOT support vh unit */
  min-height: 80vh; /* These two lines are counted as one :-)       */

  display: inline-flex;
  align-items: center;
}

a.borderless {
  border-top: 0 none;
  border-right: 0 none;
  border-left: 0 none;
  border-radius: 0;
}

.list-group-item-action:focus, .list-group-item-action:hover {
  background-color: #e8f0fe;
}

/*.list-group {*/
/*  overflow: scroll;*/
/*  -webkit-overflow-scrolling: touch;*/
/*  max-height: 300px;*/

/*}*/
</style>
