<template>
  <div class="bg">
    <form action="">
      <div class="container">
        <h2>Sign Up</h2>
        <p>Будь ласка, заповніть цю форму, щоб створити обліковий запис.</p>
        <!-- Please fill in this form to create an account. -->
        <hr />

        <div class="header">
          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" required />

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" required />

          <label for="psw-repeat"><b>Repeat Password</b></label>
          <input type="password" placeholder="Repeat Password" required />
        </div>

        <label>
          <input
            type="checkbox"
            checked="checked"
            name="remember"
            style="margin-bottom: 15px"
          />
          Remember me
        </label>
        <div class="clearfix">
          <Button type="submit" class="signupbtn">Sign Up</Button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Button from "primevue/button";
import firebase from "firebase";

export default {
  components: {
    Button,
  },

  setup() {
    const email = ref("");
    const password = ref("");

    const register = async () => {
      const data = await firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value); // need .value because ref()
      console.log("Successfully registered!", data);
      router.push("/");
    };
    return { register };
  },
};
</script>
<style>
p {
  color: rgb(41, 31, 31);
}

.bg {
  height: 90.4vh;
  background-color: rgba(133, 178, 196, 0.836);
}

input[type="text"],
input[type="password"] {
  width: 80%;
  padding: 10px;
  margin: 5px 0 22px 15px;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}

.signupbtn:hover {
  opacity: 1;
}

.signupbtn {
  width: 220px;
  height: 23px;
  background-color: #04aa6d;
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0.9;
  float: center;
}

/* Add padding to container elements */
.container {
  margin: 0 30px 0 30px;
  padding: 1px;
  text-align: center;
}

.header {
  text-align: left;
  padding: 10px;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
</style>