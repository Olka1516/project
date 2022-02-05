<template>
  <div class="bg">
    <form action="" method="post">
      <div class="container">
        <h2>Sign In</h2>
        <hr />

        <div class="header">
          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" required />

          <label for="psw"><b>Password</b></label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
          />
        </div>

        <Button class="signinbtn" type="submit" @click="signIn">Login</Button>
        <label>
          <input type="checkbox" checked="checked" name="remember" /> Remember
          me
        </label>

        <span class="psw">Forgot <a href="#">password?</a></span>
      </div>
    </form>
  </div>
</template>
<script>
import Button from "primevue/button";
import { useStore } from "vuex";

export default {
  components: {
    Button,
  },
  setup() {
    const store = useStore();
    const signIn = () => {
      store.dispatch("signIn");
    };

    return { signIn };
  },
};
</script>
<style>
/* Full-width inputs */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.signinbtn {
  width: 220px;
  height: 23px;
  background-color: #04aa6d;
  margin-left: 200px;
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0.9;
  float: center;
}

.signinbtn:hover {
  opacity: 0.8;
}

/* The "Forgot password" text */
span.psw {
  float: right;
  margin-right: 30px;
  /* padding-top: 16px; */
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
}
</style>