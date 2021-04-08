
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/lectures/0">Lectures</router-link> 
      | 
      <router-link to="/texts/0">Texts</router-link> 
    </div>
    <router-view />
     <!-- Footer -->

    <div class="footer-copyright text-center py-3">
        &copy; 2021 Copyright: <a href="https://www.nyazjaff.co.uk"> Nyaz Jaff</a>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

@import './assets/css/mdb.min.css';
@import './assets/css/mdb.rtl.min.css';
</style>

<script>
export default {
  created () {
    document.title = 'BestNation : N-Jaff'
    document.icon = 'assets/logo.png'
  },
};
</script>