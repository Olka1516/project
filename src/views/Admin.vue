<template>
  <div class="about">
    <h1>{{ t("message.hello") }} {{ name }}</h1>
    <h2>{{ t("message.advice") }}</h2>
    <Button @click="set8">{{ t("message.topUp") }} 8</Button>
    <Button @click="set12">{{ t("message.topUp") }} 12</Button>
    <h2>{{ t("message.totalNumber") }}{{ count }}.</h2>
    <hr />
    <Button @click="locale = 'en'">{{ t("message.language.eng") }}</Button>
    <Button @click="locale = 'ua'">{{ t("message.language.ukr") }}</Button>
  </div>
</template>
<script>
import Button from "primevue/button";
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

export default {
  components: {
    Button,
  },
  setup() {
    //Nest, Node.
    const store = useStore();
    const { t, locale } = useI18n();
    const count = computed(() => store.state.count);
    const name = computed(() => store.state.name);
    const set8 = () => {
      store.dispatch("set8");
    };
    const set12 = () => {
      store.dispatch("set12");
    };

    return { set8, set12, count, t, locale, name };
  },
};
</script>

<style scoped>
Button {
  color: white;
  border: none;
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