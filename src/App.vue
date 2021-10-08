<template>
  <div id="nav">  
    <router-link to="/">Client</router-link> |
    <router-link to="/admin">Admin</router-link> 
  </div>
  <!-- {{localTrainingCount}} Hello -->
            <router-view  :count="trainingsCount" />
              Count:{{trainingsCount}}
</template>

<script>

import {ref} from "vue";
export default {
  //  props:["count"],
   props: {
      count:{
          type: Number,
          default:3,
      },
  },
  setup(props){
    console.log("123: "+ props.count);
    //  const trainingsCount = ref(props.count);
          const trainingsCount = ref(5);
  
    return {trainingsCount};
      }
      // data() {
      //    const trainingsCount = ref(5);
      //   return{
      //   trainingsCount
      //   }
      // }
      
        };

</script> 

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
  color: #97c9df ;
}
</style>
