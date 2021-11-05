<template>
  <div class="about">
    <h1>Привіт Олька!</h1>
    <h2>Якщо хочеш збільшити кількість тренувань натисни на кнопку.</h2>
    <Button label="Поповнити на 8" @click="set8" />
    <Button label="Поповнити на 12" @click="set12" />
    <h2>Твоя кількість тренувань дорівнює {{ count }}.</h2>
  </div>
</template>
<script>
import Button from "primevue/button";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    Button,
  },
  setup() {
    const store = useStore();
    const count = computed(() => store.state.count);
    const set8 = () => {
      store.dispatch("set8");
    };
    const set12 = () => {
      store.dispatch("set12");
    };

    return { set8, set12, count };
  },
};
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
h2 {
  font-size: 20px;
  color: rgb(36, 36, 36);
}
button {
  border: none;
  margin: 40px 15px;
  width: 220px;
  height: 23px;
  background-color: #5cc1ec;
  cursor: pointer;
}
</style>