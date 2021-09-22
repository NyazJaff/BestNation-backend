<template>
  <div :key="parentId" class="mx-auto w-100">
    <div class="mx-auto w-50 inline"><EpicCreate :parentId="parentId || '0'"/></div>
    <div class="mx-auto w-75"><EpicList :parentId="parentId || '0'"/></div>
  </div>
</template>

<script>
import EpicCreate from "../../components/lectures/EpicCreate.vue";
import EpicList from '../../components/lectures/EpicList.vue';


export default {
  watch: {
  },
  data () {
    return {
    }
  },

  props: ['parentId'],
  name: "Home",
  components: { EpicCreate, EpicList }
};
</script>
