<template>
  <div class="home">
    <h1>Gfamily</h1>
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
</style>