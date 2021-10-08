<template>
<div class="hello">
 <Card style="width: 100%; margin-bottom: 2em">
   <template #title>Gfamily</template>
   <template #content>
     Count from parent: {{ count }}
     <p> У мене залишилося {{ localTrainingCount}} {{training}}.</p>
     <Button label="Зменшити кількість тренувань." @click="handleClick" />
     </template>
 </Card>
 </div>
</template>

<script>
import Card from "primevue/card";
import Button from "primevue/button";
import {ref} from "vue";

export default {
  props: ["count"],
  components:{
    Card,
    Button,
  },
  
  setup(props){
    console.log(props);
    const localTrainingCount = ref(props.count);
    const training = ref("тренувань");
    const handleClick = () =>{
      if(localTrainingCount.value > 5 || localTrainingCount.value ==1){
        localTrainingCount.value  = localTrainingCount.value-1;
        training.value = "тренування";
      } else if(localTrainingCount.value > 1){
        localTrainingCount.value = localTrainingCount.value-1;
        training.value = "тренування";
      } else return;
    };
    return {
      handleClick,
      localTrainingCount,
      training,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button{
  border: none;
  weight: 110px;
  height: 30px;
  background-color: #97c9df ; 
  cursor: pointer;
}
</style>

