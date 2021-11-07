<template>
  <div :key="key" class="mx-auto w-100">
    <div class="mx-auto w-75"><ConfigsList /></div>
  </div>
</template>

<script>
import ConfigsList from "../../components/configs/ConfigList.vue";

export default {
  watch: {},
  data() {
    return {
      key: new Date().getTime()
    };
  },

  name: "Configs",
  components: { ConfigsList }
};
</script>
