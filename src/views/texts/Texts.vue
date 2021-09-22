<template>
  <div :key="parentId" class="mx-auto w-100">
    <div class="mx-auto w-50 inline"><TextsCreate :parentId="parentId || '0'"/></div>
    <div class="mx-auto w-75"><TextsList :parentId="parentId || '0'"/></div>
  </div>
</template>

<script>
import TextsCreate from "../../components/texts/TextsCreate.vue";
import TextsList from '../../components/texts/TextsList.vue';


export default {
  watch: {
  },
  data () {
    return {
    }
  },

  props: ['parentId'],
  name: "Texts",
  components: { TextsCreate, TextsList }
};
</script>
