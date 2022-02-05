<template>
  <div class="hello">
    <Card style="width: 100%; margin-bottom: 2em">
      <template #content>
        <h2>
          {{ t("message.hello") }} {{ name }}! {{ t("message.question") }}?
        </h2>
        <Button @click="handleClick"> {{ t("message.decrease") }}.</Button>
        <h2>{{ t("message.howMuch") }} {{ count }} {{ pluralform }}.</h2>
      </template>
    </Card>
    <hr />
    <Button @click="locale = 'en'">{{ t("message.language.eng") }}</Button>
    <Button @click="locale = 'ua'">{{ t("message.language.ukr") }}</Button>
  </div>
</template>

 <script>
//TODO: vuex: trainingcounts move to store
// Esmodule, next to do git hub everything in main , git comit, branch, rebase?
import Button from "primevue/button";
import Card from "primevue/card";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
export default {
  components: {
    Card,
    Button,
  },
  setup() {
    const store = useStore();
    const { t, locale } = useI18n();
    const count = computed(() => store.state.count);
    const name = computed(() => store.state.name);
    const handleClick = () => {
      store.dispatch("decrease");
    };

    const pluralform = computed(() => {
      if (locale.value === "ua")
        return !store.state.count || store.state.count >= 5
          ? "тренувань"
          : "тренування";
      return store.state.count === 1 ? "workout" : "workouts";
    });
    return {
      handleClick,
      pluralform,
      count,
      t,
      locale,
      name,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
Button {
  border: none;
  color: white;
  margin: 40px 15px;
  width: 220px;
  height: 23px;
  background-color: #06668f;
  cursor: pointer;
  border-radius: 0.25rem;
}
Button:active {
  background-color: #1386b8;
  border: 1px solid;
}
</style>

