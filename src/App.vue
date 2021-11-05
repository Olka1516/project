<template>
  <div class="forBackground">
    <div id="nav">
      <router-link to="/">Client</router-link> |
      <router-link to="/admin">Admin</router-link>
    </div>
    <hr />
    <router-view />
  </div>
</template>

<style>
.forBackground {
  width: 100%;
  height: 100vh;
  background: url("../src/assets/backgroundForProject.jpg") center no-repeat;
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
  color: #5cc1ec;
}

hr {
  background-color: #5cc1ec;
  height: 4px;
  border: none;
}
</style>
