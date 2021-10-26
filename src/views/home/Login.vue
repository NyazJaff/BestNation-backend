<template>
  <div>  
   <h2>Login</h2>  
   <div class="mx-auto w-50 inline">
    <b-form @submit.stop.prevent @submit="login" >
      <div>
        <b-form-group id="input-group-2" label="Email:" label-for="email">
          <b-form-input
            id="email"
            type="email"
            v-model="email"
            placeholder="Email address..."
          ></b-form-input>
        </b-form-group>
      </div>
	  <div>
        <b-form-group id="input-group-2" label="Password:" label-for="password">
          <b-form-input
            id="password"
            type="password"
            v-model="password"
            placeholder="password..."
          ></b-form-input>
        </b-form-group>
      </div>


      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
   </div>
</div>
</template> 

<script>
import {firebaseApp} from "@/firebase";
export default {
  watch: {
  },
  data () {
    return {
	email: '', 
    password: '', 	
    }
  },
  methods: {
  login() {
	  console.log('sds')
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
		  console.log(firebaseApp.auth().currentUser)
        // alert('Successfully logged in');
        this.$router.push('/lectures/0');
      })
      .catch(error => {
        alert(error.message);
      });
  },
},
  name: "Login",
};
</script>
