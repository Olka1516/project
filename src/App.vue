<template>
  <div class="forBackground">
    <header>
      <div id="nav">
        <div class="header_inner_1">
          <router-link to="/">Client</router-link> |
          <router-link to="/admin">Admin</router-link>
        </div>
        <div class="header_inner_2">
          <router-link to="/signUp">Sign up</router-link> |
          <router-link to="/signIn">Sign in</router-link>
        </div>
      </div>
    </header>
    <hr />
    <router-view />
  </div>
</template>

<style>
.forBackground {
  width: 100%;
  height: 100vh;
  background: url("../src/assets/cloud.jpg") center no-repeat;
  background-size: cover;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 28px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #06668f;
}

hr {
  background-color: #06668f;
  height: 4px;
  border: none;
  margin: 0;
  /* padding: 2px; */
}

.header_inner_1 {
  position: absolute;
  margin-left: 605px;
}

.header_inner_2 {
  float: right;
  margin-right: 40px;
}

h2 {
  font-size: 20px;
  color: rgb(36, 36, 36);
}

</style>
