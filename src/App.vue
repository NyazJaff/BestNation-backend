<template>
  <div id="app">
    <div id="nav">
      <div v-if="user.loggedIn">
        <router-link class="btn" to="/lectures/0">Lectures</router-link>
        |
        <router-link class="btn primary" to="/texts/0">Texts</router-link>
        |
        <router-link class="btn" to="/books/0">Books</router-link>
        |
        <router-link class="btn" to="/configs">Configs</router-link>
        |
        <b-button @click="logout" variant="danger">Logout</b-button>
      </div>
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
input {
  margin-right: 20px;
}

@import './assets/css/mdb.min.css';
@import './assets/css/mdb.rtl.min.css';
</style>

<script>
import { firebaseApp } from "@/firebase";
import { mapGetters } from "vuex";

export default {
  data: function() {
    return {
      loggedIn: false
    };
  },
  created() {
    document.title = "BestNation : N-Jaff";
    document.icon = "assets/logo.png";
    this.checkLoggedInUser();
  },
  methods: {
    checkLoggedInUser() {
      this.loggedIn = true;
      // firebaseApp.auth().onAuthStateChanged(function(user) {
      //   alert(user != null);
      //   this.loggedIn = user != null;
      // });
    },
    logout() {
      firebaseApp
        .auth()
        .signOut()
        .then(() => {
          // alert("Successfully logged out");
          this.$router.push("/");
        })
        .catch(error => {
          alert(error.message);
          this.$router.push("/");
        });
    }
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  }
};
</script>
