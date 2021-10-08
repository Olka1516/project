<template>
    <div class="about">
        <h1>Поповнити</h1>
        <h2> Count from parent: {{ count }}</h2>
      
        <keep-alive>
        Count:{{localTrainingCount}}
        </keep-alive>
        <Button label="Click" @click="handleClick" style="height:25px" />
    </div>
  <router-view  :count="trainingsCount=localTrainingCount" />
    Count:{{localTrainingCount}}
</template>
<script>
import Button from "primevue/button";
import {ref} from "vue";



export default {
     components:{
    Button,
   
  },
//    props: ["count"],
  props: {
      count:{
          type: Number,
         default:0,
      },
  },
 
  setup(props){
      console.log("setup admin", props);
      const localTrainingCount = ref(props.count);
      const handleClick = () => {
          localTrainingCount.value = localTrainingCount.value + 5;
         
      };
    
      
      return { handleClick, localTrainingCount};
      },
        
  };

</script>

