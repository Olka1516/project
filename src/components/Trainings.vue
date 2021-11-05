<template>
  <div class="hello">
    <Card style="width: 100%; margin-bottom: 2em">
      <template #content>
        <Button label="Зменшити кількість тренувань." @click="handleClick" />
        <h2>У мене залишилося {{ count }} {{ pluralform }}.</h2>
      </template>
    </Card>
  </div>
</template>

 <script>
//TODO: vuex: trainingcounts move to store
// Esmodule, next to do git hub everything in main , git comit, branch, rebase?
import Button from "primevue/button";
import Card from "primevue/card";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    Card,
    Button,
  },
  setup() {
    const store = useStore();
    const count = computed(() => store.state.count);
    const handleClick = () => {
      store.getters.decrease;
    };

    const pluralform = computed(() =>
      !store.state.count || store.state.count >= 5 ? "тренувань" : "тренування"
    );
    return {
      handleClick,
      pluralform,
      count,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
h2 {
  font-size: 20px;
  color: rgb(36, 36, 36);
}
a {
  color: #42b983;
}
button {
  border: none;
  margin: 19px;
  width: 220px;
  height: 30px;
  background-color: #5cc1ec;
  cursor: pointer;
}
</style>

