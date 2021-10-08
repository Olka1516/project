<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Trainings :count="count" />
  </div>
</template>

<script>
// @ is an alias to /src
import Trainings from '@/components/Trainings.vue'

export default {
  props: ["count"],
  //  props: {
  //     count:{
  //         type: Number,
  //         default:0,
  //     },
  // },
  name: 'Home',
  components: {
    Trainings
  }
}
</script>
