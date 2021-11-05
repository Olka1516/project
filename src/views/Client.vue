<template>
  <div class="home">
    <h1>Gfamily</h1>
    <h2>
      Привіт Олька! Ти потренувалась і хочеш зменшити кількість тренувань?
    </h2>
    <Trainings />
  </div>
</template>

<script>
// @ is an alias to /src
import Trainings from "@/components/Trainings.vue";

export default {
  name: "Home",
  components: {
    Trainings,
  },
};
</script>
<style>
h1 {
  font-size: 48px;
  color: rgb(21, 49, 47);
}
h2 {
  font-size: 20px;
  color: rgb(36, 36, 36);
}
</style>