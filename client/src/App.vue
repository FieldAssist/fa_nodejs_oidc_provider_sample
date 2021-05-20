<template>
  <div id="app" style="background-color: #f6f8f9">
    <!--    <div id="nav">-->
    <!--      <router-link to="/">Home</router-link> |-->
    <!--      <router-link to="/about">About</router-link>-->
    <!--    </div>-->
    <b-navbar toggleable="lg" type="dark" variant="white" fixed>
      <b-navbar-brand href="#">
        <img src="./assets/logo.png" alt="Kitten" height="32px" />
        FieldAssist
      </b-navbar-brand>
      <div class="mx-auto" />
      <b-button to="/about" variant="default" class="d-none d-sm-block"
        >Blog</b-button
      >
      <b-button href="#" variant="default" class="d-none d-sm-block"
        >Website</b-button
      >
    </b-navbar>
    <router-view />
    <footer class="footer fixed-bottom py-3 d-none d-sm-flex mx-auto">
      <!-- Copyright -->
      <div class="footer-copyright text-center mx-auto">
        © 2021 Copyright:
        <a href="https://mdbootstrap.com/">FieldAssist</a>
      </div>
      <!-- Copyright -->
    </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
nav {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  min-height: 56px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.footer{
  background-color: #f6f8f9;
}
</style>
